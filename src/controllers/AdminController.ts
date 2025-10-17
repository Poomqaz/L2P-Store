// import jwt from "@elysiajs/jwt";
// import { PrismaClient } from "../../generated/prisma";
// import { AdminInterface } from "../interface/AdminInterface";
// const prisma = new PrismaClient();

// const getAdminIdByToken = async (request: any, jwt: any) => {
//     const token = request.headers.get('Authorization').replace('Bearer ', '');
//     const payload = await jwt.verify(token);

//     return payload.id;
// }

// export const AdminController = {
//     create: async ({ body }: {
//         body: AdminInterface
//     }) => {
//         try {
//             const admin = await prisma.admin.create({
//                 data: body
//             })
//             return admin
//         } catch (err) {
//             return err;
//         }
//     },
//     signin: async ({ body, jwt }: {
//         body: {
//             username: string
//             password: string
//         },
//         jwt: any
//     }) => {
//         try {
//             const admin = await prisma.admin.findUnique({
//                 where: {
//                     username: body.username,
//                     password: body.password,
//                     status: 'active'
//                 },
//                 select: {
//                     id: true,
//                     name: true,
//                     level: true
//                 }
//             })

//             if (!admin) {
//                 return new Response("user not found", { status: 401 });
//             }

//             const token = await jwt.sign(admin)
//             return { token: token, level: admin.level }
//         } catch (err) {
//             return err;
//         }
//     },
//     info: async ({ request, jwt }: {
//         request: {
//             headers: any
//         },
//         jwt: any
//     }) => {
//         try {
//             const token = request.headers.get('Authorization').replace('Bearer ', '');
//             const payload = await jwt.verify(token);
//             const admin = await prisma.admin.findUnique({
//                 where: {
//                     id: payload.id
//                 },
//                 select: {
//                     name: true,
//                     level: true,
//                     username: true
//                 }
//             })

//             return admin
//         } catch (err) {
//             return err
//         }
//     },
//     update: async ({ body, jwt, request }: {
//         body: AdminInterface,
//         jwt: any,
//         request: any
//     }) => {
//         try {
//             const adminId = await getAdminIdByToken(request, jwt);
//             const oldAdmin = await prisma.admin.findUnique({
//                 where: {
//                     id: adminId
//                 }
//             })
//             await prisma.admin.update({
//                 data: {
//                     name: body.name,
//                     username: body.username,
//                     password: body.password ?? oldAdmin?.password
//                 },
//                 where: {
//                     id: adminId
//                 }
//             })
//             return { message: 'success' }
//         } catch (err) {
//             return err
//         }
//     },
//     list: async () => {
//         try {
//             const admins = await prisma.admin.findMany({
//                 select: {
//                     id: true,
//                     name: true,
//                     username: true,
//                     level: true
//                 },
//                 orderBy: {
//                     name: 'asc'
//                 },
//                 where: {
//                     status: 'active'
//                 }
//             })
//             return admins;
//         } catch (error) {
//             return error
//         }
//     },
//     updateData: async ({ params, body }: {
//         params: {
//             id: string
//         },
//         body: AdminInterface
//     }) => {
//         try {
//             const admin = await prisma.admin.findUnique({
//                 where: {
//                     id: params.id
//                 }
//             })

//             await prisma.admin.update({
//                 data: {
//                     name: body.name,
//                     username: body.username,
//                     password: body.password ?? admin?.password,
//                     level: body.level
//                 },
//                 where: {
//                     id: params.id
//                 }
//             })
//         } catch (error) {
//             return error
//         }
//     },
//     remove: async ({ params }: {
//         params: {
//             id: string
//         }
//     }) => {
//         try {
//             await prisma.admin.update({
//                 data: {
//                     status: 'inactive'
//                 },
//                 where: {
//                     id: params.id
//                 }
//             })
//         } catch (err) {
//             return err
//         }
//     }
// }

// โค้ดใหม่
import jwt from "@elysiajs/jwt";
import { PrismaClient } from "../../generated/prisma";
import { AdminInterface } from "../interface/AdminInterface";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const getAdminIdByToken = async (request: any, jwt: any) => {
    const token = request.headers.get('Authorization').replace('Bearer ', '');
    const payload = await jwt.verify(token);

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
        jwt: any
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
        request: {
            headers: any
        },
        jwt: any
    }) => {
        try {
            const token = request.headers.get('Authorization').replace('Bearer ', '');
            const payload = await jwt.verify(token);
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
        jwt: any,
        request: any
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