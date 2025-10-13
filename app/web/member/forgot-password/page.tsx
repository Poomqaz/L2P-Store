'use client'
import { useState } from "react"
import { Config } from "@/app/config"
import axios from "axios"
import Swal from "sweetalert2"
import Link from 'next/link';
import { ErrorInterface } from "@/app/interface/ErrorInterface"

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                email: email
            }
            const url = Config.apiUrl + '/api/member/forgot-password'
            const response = await axios.post(url, payload);

            // Back-end ของเราส่ง { success: true, message: '...' }
            if (response.status === 200 && response.data.success) {
                Swal.fire({
                    title: 'สำเร็จ!',
                    text: response.data.message || 'ลิงก์รีเซ็ตรหัสผ่านถูกส่งไปยังอีเมลของคุณแล้ว',
                    icon: 'success'
                });
                setEmail(''); // เคลียร์ฟอร์ม
            } else {
                // สำหรับกรณีที่ API ตอบกลับ 200 แต่ success เป็น false
                 Swal.fire({
                    title: 'ผิดพลาด',
                    text: response.data.message || 'ไม่สามารถดำเนินการได้',
                    icon: 'error'
                });
            }
        } catch (err: unknown) {
            let displayMessage: string;
            if (axios.isAxiosError(err)) {
                // ใช้ Optional Chaining และ Type Assertion ภายใน เพื่อดึง message อย่างปลอดภัย
                const serverData = err.response?.data as Partial<ErrorInterface> & { message?: string, error?: string };
                
                // ดึง message
                displayMessage = serverData.message || serverData.error || 'ข้อผิดพลาดในการเชื่อมต่อกับ API';
            } else if (err instanceof Error) {
                displayMessage = err.message;
            } else {
                displayMessage = 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ';
            }
            
            Swal.fire({
                title: 'ผิดพลาด',
                text: displayMessage,
                icon: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pt-16">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fa fa-envelope text-white text-xl"></i>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">ลืมรหัสผ่าน</h1>
                        <p className="text-gray-500 text-sm">กรุณากรอกอีเมลเพื่อรับลิงก์รีเซ็ต</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                <i className="fa fa-envelope mr-2 text-green-500"></i>
                                อีเมล
                            </label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fa fa-spinner fa-spin mr-3"></i>
                                        กำลังส่ง...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa fa-paper-plane mr-3"></i>
                                        ส่งลิงก์รีเซ็ต
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer Link */}
                    <div className="text-center">
                        <Link href="/web/member/sign-in" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                            &larr; กลับไปหน้าเข้าสู่ระบบ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}