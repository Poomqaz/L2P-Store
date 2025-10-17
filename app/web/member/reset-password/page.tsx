'use client'
import { useState, useEffect } from "react"
import { Config } from "@/app/config"
import axios from "axios"
import Swal from "sweetalert2"
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ErrorInterface } from "@/app/interface/ErrorInterface"

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); // ดึง token จาก URL
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // แจ้งเตือนหากไม่พบ Token
    useEffect(() => {
        if (!token) {
            Swal.fire({
                title: 'ผิดพลาด',
                text: 'ไม่พบ Token สำหรับรีเซ็ตรหัสผ่าน กรุณาใช้ลิงก์จากอีเมลล่าสุด',
                icon: 'warning'
            }).then(() => {
                 router.push('/web/member/forgot-password'); 
            });
        }
    }, [token, router]);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!token) return; // ไม่ดำเนินการต่อถ้าไม่มี token
        
        if (newPassword !== confirmPassword) {
            Swal.fire({ title: 'ผิดพลาด', text: 'รหัสผ่านใหม่ไม่ตรงกัน', icon: 'error' });
            return;
        }

        if (newPassword.length < 6) {
            Swal.fire({ title: 'ผิดพลาด', text: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร', icon: 'error' });
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                token: token,
                newPassword: newPassword
            }
            const url = Config.apiUrl + '/api/member/reset-password'
            const response = await axios.post(url, payload);

            if (response.status === 200 && response.data.success) {
                Swal.fire({
                    title: 'สำเร็จ!',
                    text: response.data.message || 'รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว',
                    icon: 'success'
                }).then(() => {
                    router.push('/web/member/sign-in'); // นำทางไปหน้าเข้าสู่ระบบหลังรีเซ็ตสำเร็จ
                });
            } else {
                 Swal.fire({
                    title: 'ผิดพลาด',
                    text: response.data.message || 'ไม่สามารถรีเซ็ตรหัสผ่านได้ Token อาจหมดอายุ',
                    icon: 'error'
                });
            }
        } catch (err: unknown) {
            const errorMessage = err as ErrorInterface;
            Swal.fire({
                title: 'ผิดพลาด',
                text: errorMessage.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
                icon: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    }

    // ซ่อนฟอร์มถ้าไม่มี Token
    if (!token) {
        return (
             <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pt-16">
                 <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-xl">
                    <h1 className="text-2xl font-bold text-gray-800">กำลังตรวจสอบ...</h1>
                    <p className="text-gray-500 mt-2">กรุณารอสักครู่หรือตรวจสอบอีเมลของคุณ</p>
                 </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pt-16">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fa fa-key text-white text-xl"></i>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">ตั้งรหัสผ่านใหม่</h1>
                        <p className="text-gray-500 text-sm">Token ถูกต้อง กรุณากรอกรหัสผ่านใหม่</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        
                        {/* *** New Password Input (พร้อมปุ่มแสดงรหัส) *** */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                <i className="fa fa-lock mr-2 text-purple-500"></i>
                                รหัสผ่านใหม่
                            </label>
                            <div className="relative">
                                <input 
                                    // สลับ type ระหว่าง 'text' กับ 'password'
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    // เพิ่ม pr-12 เพื่อเว้นที่สำหรับปุ่ม
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white pr-12"
                                    placeholder="รหัสผ่านใหม่ (อย่างน้อย 6 ตัว)"
                                    required
                                    minLength={6}
                                />
                                {/* ปุ่มสำหรับสลับการแสดงรหัสผ่าน */}
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {/* สลับไอคอน fa-eye / fa-eye-slash */}
                                    <i className={`fa ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        {/* *** Confirm Password Input (พร้อมปุ่มแสดงรหัส) *** */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                <i className="fa fa-lock mr-2 text-purple-500"></i>
                                ยืนยันรหัสผ่านใหม่
                            </label>
                            <div className="relative">
                                <input 
                                    // สลับ type ระหว่าง 'text' กับ 'password'
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    // เพิ่ม pr-12 เพื่อเว้นที่สำหรับปุ่ม
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white pr-12"
                                    placeholder="ยืนยันรหัสผ่านใหม่"
                                    required
                                />
                                {/* ปุ่มสำหรับสลับการแสดงรหัสผ่าน */}
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {/* สลับไอคอน fa-eye / fa-eye-slash */}
                                    <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                             {/* Password Match Indicator */}
                            {confirmPassword && (
                                <div className="flex items-center mt-2">
                                    {newPassword === confirmPassword && newPassword.length >= 6 ? (
                                        <div className="flex items-center text-green-600 text-sm">
                                            <i className="fa fa-check-circle mr-1"></i>
                                            รหัสผ่านตรงกันและมีความยาวเหมาะสม
                                        </div>
                                    ) : (
                                        <div className={`flex items-center text-sm ${newPassword === confirmPassword ? 'text-orange-500' : 'text-red-600'}`}>
                                            <i className="fa fa-times-circle mr-1"></i>
                                            รหัสผ่านไม่ตรงกัน หรือยังไม่ถึง 6 ตัว
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button 
                                type="submit"
                                disabled={isLoading || newPassword !== confirmPassword || newPassword.length < 6}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fa fa-spinner fa-spin mr-3"></i>
                                        กำลังรีเซ็ต...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa fa-sync-alt mr-3"></i>
                                        ยืนยันรหัสผ่านใหม่
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