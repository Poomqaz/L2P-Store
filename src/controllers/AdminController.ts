import { PrismaClient } from "../../generated/prisma";
import { AdminInterface } from "../interface/AdminInterface";
import * as bcrypt from 'bcrypt';

// ----------------------------------------------------
// 1. กำหนด Type สำหรับ JWT Service และ Request
// ----------------------------------------------------

/** * JWT Interface: ใช้ในการกำหนด Type ให้กับ JWT Utility ที่ถูกส่งเข้ามา 
 * (เนื่องจากเราไม่ทราบว่าคุณใช้ไลบรารีใด เช่น @tsndr/cloudflare-worker-jwt หรืออื่นๆ)
 */
interface JWTService {
    sign: (payload: { id: string; name: string; level: string }) => Promise<string>;
    verify: (token: string) => Promise<{ id: string; name: string; level: string } | null>;
}

/**
 * Request Interface: ใช้สำหรับ Type ของ request object ที่ถูกส่งเข้ามา 
 * (สมมติว่าเป็น Request object มาตรฐาน เช่นจาก Next.js/Fetch API)
 */
interface CustomRequest {
    headers: {
        get: (name: string) => string | null;
    };
    // เพิ่มคุณสมบัติอื่น ๆ ที่คุณอาจใช้งาน
    // body?: any; 
}


const prisma = new PrismaClient();

// ----------------------------------------------------
// แก้ไข: กำหนด Type ที่ชัดเจนแทน 'any' และแก้ไข ESLint Warning
// ----------------------------------------------------
const getAdminIdByToken = async (request: CustomRequest, jwt: JWTService) => {
    // ⚠️ Note: ตรวจสอบให้แน่ใจว่า request.headers.get('Authorization') มีค่าก่อน replace
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
        throw new Error('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    const payload = await jwt.verify(token);

    if (!payload || !payload.id) {
        throw new Error('Invalid or expired token');
    }

    // 2. แก้ไข: 'jwt' ไม่ถูกใช้ในฟังก์ชันนี้โดยตรง แต่ถูกส่งเข้ามาใช้งานแล้ว
    return payload.id;
}


export const AdminController = {
    // ------------------- create -------------------
    create: async ({ body }: {
        body: AdminInterface
    }) => {
        try {
            // Check if password exists
            if (!body.password) {
                return { error: 'Password is required' };
            }

            // Hash the password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.password, salt);
            
            const admin = await prisma.admin.create({
                data: {
                    ...body,
                    password: hashedPassword // Use the hashed password
                }
            });
            return { message: 'success', admin };
        } catch (err) {
            // แก้ไข: ใช้ err เป็น 'unknown' แล้วแปลงเป็น Error
            console.error('Error creating admin:', err);
            return { error: 'Failed to create admin' };
        }
    },

    // ------------------- signin -------------------
    signin: async ({ body, jwt }: {
        body: {
            username: string
            password: string
        },
        // 3. แก้ไข: ใช้ JWTService แทน 'any'
        jwt: JWTService 
    }) => {
        try {
            const admin = await prisma.admin.findUnique({
                where: {
                    username: body.username,
                    status: 'active'
                }
            });

            if (!admin) {
                return new Response("User not found", { status: 401 });
            }

            // Compare the password with the hashed password in the database
            const isMatch = await bcrypt.compare(body.password, admin.password);

            if (!isMatch) {
                return new Response("Invalid credentials", { status: 401 });
            }
            
            const token = await jwt.sign({
                id: admin.id,
                name: admin.name,
                level: admin.level
            });
            
            return { token: token, level: admin.level };
        } catch (err) {
            console.error('Error during signin:', err);
            return new Response("An error occurred", { status: 500 });
        }
    },

    // ------------------- info -------------------
    info: async ({ request, jwt }: {
        // 4. แก้ไข: ใช้ CustomRequest แทน 'any'
        request: CustomRequest, 
        // 5. แก้ไข: ใช้ JWTService แทน 'any'
        jwt: JWTService
    }) => {
        try {
            const authHeader = request.headers.get('Authorization');
            if (!authHeader) {
                return { error: 'Authorization header missing' };
            }

            const token = authHeader.replace('Bearer ', '');
            // 6. แก้ไข: ตรวจสอบ payload ก่อนนำไปใช้
            const payload = await jwt.verify(token);
            if (!payload || !payload.id) {
                return { error: 'Invalid token' };
            }

            const admin = await prisma.admin.findUnique({
                where: {
                    id: payload.id
                },
                select: {
                    name: true,
                    level: true,
                    username: true
                }
            })

            return admin;
        } catch (err) {
            console.error('Error fetching admin info:', err);
            return { error: 'Failed to fetch info' };
        }
    },

    // ------------------- update -------------------
    update: async ({ body, jwt, request }: {
        body: AdminInterface,
        // 7. แก้ไข: ใช้ JWTService แทน 'any'
        jwt: JWTService, 
        // 8. แก้ไข: ใช้ CustomRequest แทน 'any'
        request: CustomRequest 
    }) => {
        try {
            const adminId = await getAdminIdByToken(request, jwt);
            const oldAdmin = await prisma.admin.findUnique({
                where: {
                    id: adminId
                }
            });

            if (!oldAdmin) {
                return { error: 'Admin not found' };
            }

            // Prepare updated password
            let updatedPassword = oldAdmin.password;
            if (body.password) {
                const salt = await bcrypt.genSalt(10);
                updatedPassword = await bcrypt.hash(body.password, salt);
            }

            await prisma.admin.update({
                data: {
                    name: body.name,
                    username: body.username,
                    password: updatedPassword // Use the hashed password
                },
                where: {
                    id: adminId
                }
            });
            return { message: 'success' };
        } catch (err) {
            console.error('Error updating admin:', err);
            return { error: 'Failed to update admin' };
        }
    },

    // ------------------- list -------------------
    list: async () => {
        try {
            const admins = await prisma.admin.findMany({
                select: {
                    id: true,
                    name: true,
                    username: true,
                    level: true
                },
                orderBy: {
                    name: 'asc'
                },
                where: {
                    status: 'active'
                }
            })
            return admins;
        } catch (error) {
            console.error('Error listing admins:', error);
            return { error: 'Failed to list admins' };
        }
    },

    // ------------------- updateData -------------------
    updateData: async ({ params, body }: {
        params: {
            id: string
        },
        body: AdminInterface
    }) => {
        try {
            const admin = await prisma.admin.findUnique({
                where: {
                    id: params.id
                }
            });

            if (!admin) {
                return { error: 'Admin not found' };
            }

            // Prepare updated password
            let updatedPassword = admin.password;
            if (body.password) {
                const salt = await bcrypt.genSalt(10);
                updatedPassword = await bcrypt.hash(body.password, salt);
            }

            await prisma.admin.update({
                data: {
                    name: body.name,
                    username: body.username,
                    password: updatedPassword, // Use the hashed password
                    level: body.level
                },
                where: {
                    id: params.id
                }
            });
            return { message: 'success' };
        } catch (error) {
            console.error('Error updating admin data:', error);
            return { error: 'Failed to update admin data' };
        }
    },

    // ------------------- remove -------------------
    remove: async ({ params }: {
        params: {
            id: string
        }
    }) => {
        try {
            await prisma.admin.update({
                data: {
                    status: 'inactive'
                },
                where: {
                    id: params.id
                }
            });
            return { message: 'success' };
        } catch (err) {
            console.error('Error removing admin:', err);
            return { error: 'Failed to remove admin' };
        }
    },
}