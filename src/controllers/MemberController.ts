import type { MemberInterface } from "../interface/MemberInterface";
import { PrismaClient } from "../../generated/prisma";
import { exists, unlink, mkdir } from 'fs/promises'; // นำเข้าโมดูลที่จำเป็น
import path from 'path';
import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aekamorn.b@ku.th', // อีเมลของคุณ
        pass: 'udyq kkvr zhkh lloi' // App Password
    }
});

const getMemberIdByToken = async (request: any, jwt: any) => {
    const token = request.headers.get('Authorization').replace('Bearer ', '');
    const payload = await jwt.verify(token);
    return payload.id;
}

export const MemberController = {
    // signup: async ({ body }: { body: MemberInterface }) => {
    //     try {
    //         await prisma.member.create({
    //             data: {
    //                 phone: body.phone,
    //                 username: body.username,
    //                 password: body.password,
    //                 name: body.name,
    //                 email: body.email
    //             }
    //         })
    //     } catch (err) {
    //         return { error: err }
    //     }
    // },
    signup: async ({ body }: { body: MemberInterface }) => {
        try {
            // สร้าง salt สำหรับการแฮชรหัสผ่าน
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);

            // แฮชรหัสผ่านด้วย salt
            const hashedPassword = await bcrypt.hash(body.password, salt);

            // ตรวจสอบว่ามีผู้ใช้ที่มี username หรือ email นี้อยู่แล้วหรือไม่ (ขั้นตอนเพิ่มเติมเพื่อป้องกันข้อมูลซ้ำ)
            const existingMember = await prisma.member.findFirst({
                where: {
                    OR: [
                        { email: body.email },
                        { username: body.username }
                    ]
                }
            });

            if (existingMember) {
                // ถ้ามีข้อมูลซ้ำให้แจ้ง error
                return { error: 'Username or email already exists.' };
            }

            // บันทึกข้อมูลสมาชิกใหม่พร้อมกับรหัสผ่านที่ถูกแฮชแล้ว
            const newMember = await prisma.member.create({
                data: {
                    phone: body.phone,
                    username: body.username,
                    password: hashedPassword, // ใช้ hashedPassword ที่ถูกแฮชแล้ว
                    name: body.name,
                    email: body.email
                }
            });

            // สามารถส่งข้อมูลสมาชิกที่สร้างใหม่กลับไปได้
            return newMember;
        } catch (err) {
            console.error(err); // ควรใช้ console.error เพื่อแสดงข้อผิดพลาด
            return { error: 'An unexpected error occurred.' };
        }
    },
    // signin: async ({
    //     body, jwt
    // }: {
    //     body: {
    //         username: string,
    //         password: string
    //     },
    //     jwt: any
    // }) => {
    //     try {
    //         const member = await prisma.member.findUnique({
    //             where: {
    //                 username: body.username,
    //                 password: body.password,
    //                 status: 'active'
    //             },
    //             select: {
    //                 id: true,
    //                 username: true,
    //             }
    //         })

    //         if (!member) {
    //             return new Response("user not found", { status: 401 })
    //         }

    //         const token = await jwt.sign(member)
    //         return { token: token }
    //     } catch (err) {
    //         return { error: err }
    //     }
    // },
    signin: async ({
        body, jwt
    }: {
        body: {
            username: string,
            password: string
        },
        jwt: any
    }) => {
        try {
            // 1. ค้นหาผู้ใช้จาก username เท่านั้น เพื่อดึงรหัสผ่านที่ถูกแฮชมาเปรียบเทียบ
            const member = await prisma.member.findUnique({
                where: {
                    username: body.username,
                }
            });

            // ตรวจสอบว่ามีผู้ใช้หรือไม่
            if (!member) {
                // ควรใช้ข้อความที่ทั่วไปเพื่อป้องกันการคาดเดา username
                return new Response("Invalid username or password", { status: 401 });
            }

            // 2. ใช้ bcrypt.compare() เพื่อเปรียบเทียบรหัสผ่าน
            const isPasswordValid = await bcrypt.compare(body.password, member.password);

            // 3. ตรวจสอบว่ารหัสผ่านถูกต้องและสถานะผู้ใช้เป็น 'active'
            if (!isPasswordValid || member.status !== 'active') {
                return new Response("Invalid username or password", { status: 401 });
            }

            // สร้าง JWT และส่งกลับ
            const token = await jwt.sign({
                id: member.id,
                username: member.username
            });

            return { token: token };

        } catch (err) {
            console.error(err);
            return new Response("An unexpected error occurred", { status: 500 });
        }
    },
    info: async ({ request, jwt }: {
        request: {
            headers: any
        },
        jwt: any
    }) => {
        try {
            const token = request.headers.get('Authorization').replace('Bearer ', '');
            const payload = await jwt.verify(token);
            const member = await prisma.member.findUnique({
                where: {
                    id: payload.id
                },
                select: {
                    username: true,
                    id: true,
                    name: true,
                    phone: true,
                    address: true,
                    profileImage: true,
                    points: true,
                    email: true
                }
            })
            return member
        } catch (err) {
            return err
        }
    },
    // update: async ({ body, jwt, request }: {
    //     body: any,
    //     jwt: any,
    //     request: any
    // }) => {
    //     try {
    //         const MemberId = await getMemberIdByToken(request, jwt);
    //         if (!MemberId) {
    //             return { error: "Unauthorized: Invalid token" };
    //         }
    //         const oldMember = await prisma.member.findUnique({
    //             where: { id: MemberId }
    //         });
    //         if (!oldMember) {
    //             return { error: "Member not found" };
    //         }

    //         const profileImagename = body.profileImage && typeof body.profileImage !== "string"
    //             ? body.profileImage.name
    //             : oldMember.profileImage || '';

    //         const profileImageFile = body.profileImage && typeof body.profileImage !== "string"
    //             ? body.profileImage
    //             : null;

    //         if (profileImageFile) {
    //             const uploadDir = 'public/uploadProfile';
    //             // ตรวจสอบและสร้างโฟลเดอร์ถ้าไม่มี
    //             try {
    //                 await mkdir(uploadDir, { recursive: true });
    //             } catch (e) {
    //                 console.error('Error creating directory:', e);
    //             }

    //             // ลบรูปภาพเก่าถ้ามี
    //             if (oldMember.profileImage) {
    //                 const oldFilePath = path.join(uploadDir, oldMember.profileImage);
    //                 if (await exists(oldFilePath)) {
    //                     await unlink(oldFilePath);
    //                 }
    //             }
                
    //             // บันทึกรูปภาพใหม่
    //             const newFilePath = path.join(uploadDir, profileImagename);
    //             await Bun.write(newFilePath, profileImageFile);
    //         }

    //         const updateData: any = {
    //             name: body.name,
    //             phone: body.phone,
    //             address: body.address,
    //             email: body.email,
    //         };

    //         if (body.password) {
    //             updateData.password = body.password;
    //         }

    //         if (profileImageFile) {
    //             updateData.profileImage = profileImagename;
    //         }

    //         const updatedMember = await prisma.member.update({
    //             data: updateData,
    //             where: { id: MemberId },
    //             select: {
    //                 profileImage: true
    //             }
    //         });

    //         return { message: 'success', profileImage: updatedMember.profileImage };
    //     } catch (err: any) {
    //         return { error: err.message };
    //     }
    // },
    update: async ({ body, jwt, request }: {
        body: any,
        jwt: any,
        request: any
    }) => {
        try {
            const MemberId = await getMemberIdByToken(request, jwt);
            if (!MemberId) {
                return { error: "Unauthorized: Invalid token" };
            }
            const oldMember = await prisma.member.findUnique({
                where: { id: MemberId }
            });
            if (!oldMember) {
                return { error: "Member not found" };
            }

            const profileImagename = body.profileImage && typeof body.profileImage !== "string"
                ? body.profileImage.name
                : oldMember.profileImage || '';

            const profileImageFile = body.profileImage && typeof body.profileImage !== "string"
                ? body.profileImage
                : null;

            if (profileImageFile) {
                const uploadDir = 'public/uploadProfile';
                try {
                    await mkdir(uploadDir, { recursive: true });
                } catch (e) {
                    console.error('Error creating directory:', e);
                }

                if (oldMember.profileImage) {
                    const oldFilePath = path.join(uploadDir, oldMember.profileImage);
                    if (await exists(oldFilePath)) {
                        await unlink(oldFilePath);
                    }
                }
                
                const newFilePath = path.join(uploadDir, profileImagename);
                await Bun.write(newFilePath, profileImageFile);
            }

            // เตรียมข้อมูลสำหรับอัปเดต
            const updateData: any = {
                name: body.name,
                phone: body.phone,
                address: body.address,
                email: body.email,
            };

            // ตรวจสอบว่ามีรหัสผ่านใหม่ส่งมาหรือไม่
            if (body.password) {
                // แฮชรหัสผ่านใหม่
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(body.password, saltRounds);
                updateData.password = hashedPassword;
            }

            if (profileImageFile) {
                updateData.profileImage = profileImagename;
            }

            const updatedMember = await prisma.member.update({
                data: updateData,
                where: { id: MemberId },
                select: {
                    profileImage: true
                }
            });

            return { message: 'success', profileImage: updatedMember.profileImage };
        } catch (err: any) {
            console.error(err);
            return { error: err.message };
        }
    },
    checkDuplicate: async ({ body }: {
        body: {
        username: string;
        email: string;
        phone: string;
        };
    }) => {
        try {
        const existingMember = await prisma.member.findFirst({
            where: {
            OR: [
                { email: body.email },
                { username: body.username },
                { phone: body.phone }
            ]
            }
        });

        // isDuplicate จะเป็น true ถ้าพบข้อมูลที่ตรงกัน
        const isDuplicate = !!existingMember;

        return { isDuplicate: isDuplicate };
        } catch (err) {
        console.error(err);
        return { error: 'Failed to check for duplicates' };
        }
    },
    history: async ({ request, jwt, set }: {
        request: any,
        jwt: any,
        set: {
            status: number
        }
    }) => {
        try {
            const token = request.headers.get('Authorization').replace('Bearer ', '');
            const payload = await jwt.verify(token);

            return await prisma.order.findMany({
                where: {
                    memberId: payload.id,
                },
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    OrderDetail: {
                        select: {
                            id: true,
                            qty: true,
                            price: true,
                            Book: {
                                select: {
                                    name: true,
                                    isbn: true,
                                    image: true
                                }
                            }
                        }
                    },
                    createdAt: true,
                    customerName: true,
                    customerAddress: true,
                    customerPhone: true,
                    trackCode: true,
                    express: true,
                    status: true,
                    remark: true,
                    id: true,
                    total: true
                }
            });
        } catch (err) {
            set.status = 500;
            return { error: err };
        }
    },
    forgotPassword: async ({ body, jwt }: {
        body: {
            email: string
        },
        jwt: any // สำหรับการสร้าง JWT token
    }) => {
        try {
            const { email } = body;

            // 1. ค้นหาผู้ใช้จาก email
            const member = await prisma.member.findUnique({
                where: { email: email }
            });

            if (!member) {
                // ควรใช้ข้อความทั่วไปเพื่อป้องกันการคาดเดาอีเมล
                return { success: false, message: 'ไม่พบผู้ใช้ด้วยอีเมลนี้' };
            }

            // 2. สร้าง JWT token ที่มี id ของ member และวันหมดอายุ 1 ชั่วโมง
            // token นี้จะถูกใช้ในการตรวจสอบสิทธิ์เพื่อรีเซ็ตรหัสผ่าน
            const token = await jwt.sign({ id: member.id }, { exp: '10m' });

            // 3. สร้างลิงก์สำหรับรีเซ็ตรหัสผ่าน
            // *** โปรดเปลี่ยน 'http://localhost:3000' เป็น URL หน้าบ้านของคุณ ***
            const resetLink = `https://l2-p-store.vercel.app/web/member/reset-password?token=${token}`;// หรือใช้ Environment Variable ตามคำแนะนำ

            // 4. กำหนดรายละเอียดอีเมลที่จะส่ง
            const mailOptions = {
                from: 'aekamorn.b@ku.th', // อีเมลผู้ส่ง
                to: email, // อีเมลผู้รับ
                subject: 'รีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ',
                html: `
                    <h1>รีเซ็ตรหัสผ่าน</h1>
                    <p>คุณได้รับการร้องขอเพื่อรีเซ็ตรหัสผ่าน กรุณาคลิกที่ลิงก์ด้านล่างเพื่อดำเนินการต่อ:</p>
                    <a href="${resetLink}">ตั้งรหัสผ่านใหม่</a>
                    <p>ลิงก์นี้จะหมดอายุใน 10 นาที</p>
                    <p>หากคุณไม่ได้เป็นคนร้องขอ กรุณาละเลยอีเมลฉบับนี้</p>
                `
            };

            // 5. ส่งอีเมล
            await transporter.sendMail(mailOptions);

            return {
                success: true,
                message: 'ลิงก์รีเซ็ตรหัสผ่านถูกส่งไปยังอีเมลของคุณแล้ว'
            };

        } catch (error) {
            console.error('Error in forgot-password:', error);
            return {
                success: false,
                message: 'เกิดข้อผิดพลาดในการส่งอีเมล'
            };
        }
    },
    
    // -------------------------------------------------------------
    // ฟังก์ชันสำหรับรีเซ็ตรหัสผ่าน (หลังผู้ใช้คลิกลิงก์)
    // -------------------------------------------------------------
    resetPassword: async ({ body, jwt }: {
        body: {
            token: string,
            newPassword: string
        },
        jwt: any
    }) => {
        try {
            const { token, newPassword } = body;

            // 1. ตรวจสอบความถูกต้องของ Token และวันหมดอายุ
            const payload = await jwt.verify(token);
            if (!payload || !payload.id) {
                return { success: false, message: 'Invalid or expired token.' };
            }

            const memberId = payload.id;

            // 2. แฮชรหัสผ่านใหม่
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            // 3. อัปเดตรหัสผ่านในฐานข้อมูล
            await prisma.member.update({
                where: { id: memberId },
                data: {
                    password: hashedPassword
                }
            });

            return { success: true, message: 'รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว' };

        } catch (error) {
            console.error('Error in resetPassword:', error);
            return { success: false, message: 'ไม่สามารถรีเซ็ตรหัสผ่านได้ กรุณาลองอีกครั้ง' };
        }
    },
}