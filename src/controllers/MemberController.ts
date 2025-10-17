import type { MemberInterface } from "../interface/MemberInterface";
import { PrismaClient } from "../../generated/prisma";
import { exists, unlink, mkdir } from 'fs/promises';
import path from 'path';
import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
// 💡 แก้ไข: โปรดตรวจสอบว่าคุณติดตั้ง @types/nodemailer แล้ว: npm install @types/nodemailer --save-dev

// ----------------------------------------------------------------------
// ⭐️ Type Definitions ที่แก้ไขและปรับปรุง ⭐️
// ----------------------------------------------------------------------

// Type สำหรับพารามิเตอร์ 'request' ในบริบทที่ใช้ Headers/Response (เช่น Bun/Elysia)
interface RequestType {
    headers: {
        get(name: string): string | null;
    };
}

// Type สำหรับ JWT object ที่ต้องมีฟังก์ชัน sign และ verify
interface JwtPayload {
    id: string | number;
    username?: string;
    // ใช้ unknown เพื่อป้องกันการใช้ 'any' โดยตรง
    [key: string]: unknown;
}

interface JwtInterface {
    sign(payload: object, options?: { exp: string }): Promise<string>;
    verify(token: string): Promise<JwtPayload>;
}

// Type สำหรับ 'set' object ที่ใช้กำหนดสถานะการตอบกลับ
interface ResponseSet {
    status: number;
    headers?: Record<string, string>;
}

// Type สำหรับ File object ที่มาจาก Form Data ใน Bun/Elysia
interface UploadedFile {
    name: string;
    size: number;
    type: string;
    // 💡 แก้ไข: ใช้ unknown แทน any เพื่อให้ Type-safe ขึ้น
    [key: string]: unknown; 
}

// Type สำหรับ Body ในฟังก์ชัน update
interface UpdateBody {
    name?: string;
    phone?: string;
    address?: string;
    email?: string;
    password?: string;
    profileImage?: UploadedFile | string;
}

// 💡 Type สำหรับ Error object ที่เราคาดหวังในการจับ err
interface CustomError extends Error {
    message: string;
    status?: number;
}


const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aekamorn.b@ku.th',
        pass: 'udyq kkvr zhkh lloi'
    }
});

// ----------------------------------------------------------------------
// ⭐️ Helper Function: ดึง Member ID จาก Token ⭐️
// ----------------------------------------------------------------------
const getMemberIdByToken = async (request: RequestType, jwt: JwtInterface): Promise<string> => {
    const authorizationHeader = request.headers.get('Authorization');
    if (!authorizationHeader) {
        throw new Error("Authorization header missing");
    }
    const token = authorizationHeader.replace('Bearer ', '');
    const payload = await jwt.verify(token);
    
    // บังคับแปลง id เป็น string
    return String(payload.id);
}

export const MemberController = {
    signup: async ({ body }: { body: MemberInterface }) => {
        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(body.password, salt);

            const existingMember = await prisma.member.findFirst({
                where: {
                    OR: [
                        { email: body.email },
                        { username: body.username }
                    ]
                }
            });

            if (existingMember) {
                return { error: 'Username or email already exists.' };
            }

            const newMember = await prisma.member.create({
                data: {
                    phone: body.phone,
                    username: body.username,
                    password: hashedPassword,
                    name: body.name,
                    email: body.email
                }
            });

            return newMember;
        } catch (err) {
            console.error(err);
            return { error: 'An unexpected error occurred.' };
        }
    },
    
    signin: async ({
        body, jwt
    }: {
        body: {
            username: string,
            password: string
        },
        jwt: JwtInterface
    }) => {
        try {
            const member = await prisma.member.findUnique({
                where: {
                    username: body.username,
                }
            });

            if (!member) {
                // สมมติว่า New Response คือ Response ของ Web Framework (เช่น Bun/Elysia)
                return new Response("Invalid username or password", { status: 401 });
            }

            const isPasswordValid = await bcrypt.compare(body.password, member.password);

            if (!isPasswordValid || member.status !== 'active') {
                return new Response("Invalid username or password", { status: 401 });
            }

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
        request: RequestType,
        jwt: JwtInterface
    }) => {
        try {
            const MemberId = await getMemberIdByToken(request, jwt);
            
            const member = await prisma.member.findUnique({
                where: {
                    id: MemberId
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
            return { error: (err as CustomError).message || 'Failed to fetch member info.' };
        }
    },

    update: async ({ body, jwt, request }: {
        body: UpdateBody,
        jwt: JwtInterface,
        request: RequestType
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

            const data = body;
            const isFile = data.profileImage && typeof data.profileImage !== "string";

            // Type Guard: ถ้าเป็นไฟล์จริง ให้ใช้ as UploadedFile
            const profileImageFile = isFile
                ? data.profileImage as UploadedFile
                : null;
            
            const profileImagename = isFile
                ? profileImageFile!.name
                : oldMember.profileImage || '';


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
                
                // 🎯 แก้ไข Type Assertion: แปลงเป็น 'unknown' ก่อนแปลงเป็น 'Blob'
                // เพื่อหลีกเลี่ยงข้อผิดพลาด Conversion overlap
                await Bun.write(newFilePath, profileImageFile as unknown as Blob); 
            }

            // ใช้ Record<string, unknown> เพื่อให้ Type-safe และรองรับการส่งข้อมูลที่หลากหลาย
            const updateData: Record<string, unknown> = {
                name: data.name,
                phone: data.phone,
                address: data.address,
                email: data.email,
            };

            if (data.password) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(data.password, saltRounds);
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
        } catch (err) {
            console.error(err);
            return { error: (err as CustomError).message || "An unexpected error occurred during update." };
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

        const isDuplicate = !!existingMember;

        return { isDuplicate: isDuplicate };
        } catch (err) {
        console.error(err);
        return { error: 'Failed to check for duplicates' };
        }
    },

    history: async ({ request, jwt, set }: {
        request: RequestType,
        jwt: JwtInterface,
        set: ResponseSet
    }) => {
        try {
            const MemberId = await getMemberIdByToken(request, jwt);

            return await prisma.order.findMany({
                where: {
                    memberId: MemberId,
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
            return { error: (err as CustomError).message || 'Failed to fetch order history.' };
        }
    },
    
    forgotPassword: async ({ body, jwt }: {
        body: {
            email: string
        },
        jwt: JwtInterface
    }) => {
        try {
            const { email } = body;

            const member = await prisma.member.findUnique({
                where: { email: email }
            });

            if (!member) {
                return { success: false, message: 'ไม่พบผู้ใช้ด้วยอีเมลนี้' };
            }

            const token = await jwt.sign({ id: member.id }, { exp: '10m' });

            const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
            const resetLink = `${FRONTEND_URL}/web/member/reset-password?token=${token}`; 

            const mailOptions = {
                from: 'aekamorn.b@ku.th',
                to: email,
                subject: 'รีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ',
                html: `
                    <h1>รีเซ็ตรหัสผ่าน</h1>
                    <p>คุณได้รับการร้องขอเพื่อรีเซ็ตรหัสผ่าน กรุณาคลิกที่ลิงก์ด้านล่างเพื่อดำเนินการต่อ:</p>
                    <a href="${resetLink}">ตั้งรหัสผ่านใหม่</a>
                    <p>ลิงก์นี้จะหมดอายุใน 10 นาที</p>
                    <p>หากคุณไม่ได้เป็นคนร้องขอ กรุณาละเลยอีเมลฉบับนี้</p>
                `
            };

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
    
    resetPassword: async ({ body, jwt }: {
        body: {
            token: string,
            newPassword: string
        },
        jwt: JwtInterface
    }) => {
        try {
            const { token, newPassword } = body;

            const payload = await jwt.verify(token);
            if (!payload || !payload.id) {
                return { success: false, message: 'Invalid or expired token.' };
            }

            const memberId = String(payload.id);

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            await prisma.member.update({
                where: { id: memberId },
                data: {
                    password: hashedPassword
                }
            });

            return { success: true, message: 'รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว' };

        } catch (error) {
            console.error('Error in resetPassword:', error); 
            return { success: false, message: (error as CustomError).message || 'ไม่สามารถรีเซ็ตรหัสผ่านได้ หรือลิงก์หมดอายุแล้ว' };
        }
    },
}