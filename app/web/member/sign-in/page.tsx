'use client'

import { useState } from "react"
import { Config } from "@/app/config"
import axios from "axios"
import Swal from "sweetalert2"
import Link from 'next/link';
import { ErrorInterface } from "@/app/interface/ErrorInterface"

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = {
                username: username,
                password: password
            }
            const url = Config.apiUrl + '/api/member/signin'
            const response = await axios.post(url, payload);

            if (response.status == 200) {
                localStorage.setItem(Config.tokenMember, response.data.token)
                window.location.href = '/web'
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง ' + (err as ErrorInterface).message,
                icon: 'warning',
                timer: 3000
            })
        }
    }

    return (
        <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pt-16">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">เข้าสู่ระบบ</h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={(e) => handleSignIn(e)} className="space-y-4">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                <i className="fa fa-user mr-2 text-green-500"></i>
                                ชื่อผู้ใช้งาน
                            </label>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                <i className="fa fa-lock mr-2 text-purple-500"></i>
                                รหัสผ่าน
                            </label>
                            <div className="relative"> {/* เพิ่ม div relative เพื่อวางปุ่ม */}
                                <input 
                                    type={showPassword ? 'text' : 'password'} // <--- แก้ไข type ให้สลับได้
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white pr-10" // <--- เพิ่ม pr-10 เพื่อเว้นที่
                                />
                                {/* NEW: ปุ่มสำหรับสลับการแสดงรหัสผ่าน */}
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right text-sm">
                            <Link 
                                href="/web/member/forgot-password" 
                                className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            >
                                ลืมรหัสผ่าน?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button 
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <i className="fa fa-lock mr-3"></i>
                                เข้าสู่ระบบ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}