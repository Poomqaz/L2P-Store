"use client"

import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Config } from '@/app/config';
import { useRouter } from 'next/navigation';
import { ErrorInterface } from '@/app/interface/ErrorInterface';

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    
    const router = useRouter();


    const handleSignIn = async () => {
        
        if (!username.trim()) {
            Swal.fire({
                title: 'ชื่อผู้ใช้ว่าง',
                text: 'กรุณากรอกชื่อผู้ใช้',
                icon: 'warning'
            });
            return;
        }

        if (!password.trim()) {
            Swal.fire({
                title: 'รหัสผ่านว่าง',
                text: 'กรุณากรอกรหัสผ่าน',
                icon: 'warning'
            });
            return;
        }
        
        try{
            const url = Config.apiUrl + '/api/admin/signin';
            const payload = {
                username: username,
                password: password
            }
            const result = await axios.post(url, payload);

            if (result.data.token != null) {
                localStorage.setItem(Config.tokenName, result.data.token);
                
                const level = result.data.level;

                if (level === 'admin'){
                    router.push('/backoffice/home/dashboard');
                } else if (level === 'user'){
                    router.push('/backoffice/home/order');
                }
            }

        } catch (err: unknown){
            Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message||'เกิดข้อผิดพลาดบางอย่าง ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
                icon: 'error'
            })
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fa fa-user-shield text-white text-2xl"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Sign in to L2P-BackOffice</h1>
                </div>

                {/* Username Input (Styled) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                        <i className="fa fa-user mr-2 text-blue-500"></i>
                        Username
                    </label>
                    <div className="relative">
                        <input 
                            type="text"
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12"
                            placeholder="กรุณากรอกชื่อผู้ใช้"
                        />
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fa fa-user text-gray-400 text-sm"></i>
                        </div>
                    </div>
                </div>

                {/* Password Input (Styled with Toggle) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                        <i className="fa fa-lock mr-2 text-purple-500"></i>
                        Password
                    </label>
                    <div className="relative">
                        <input 
                            // สลับ type ระหว่าง 'text' กับ 'password'
                            type={showPassword ? 'text' : 'password'}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-12 pr-12"
                            placeholder="กรุณากรอกรหัสผ่าน"
                        />
                        {/* ไอคอนรหัสผ่านด้านซ้าย */}
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fa fa-lock text-gray-400 text-sm"></i>
                        </div>
                        {/* ปุ่มสำหรับสลับการแสดงรหัสผ่านด้านขวา */}
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {/* สลับไอคอน fa-eye / fa-eye-slash */}
                            <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                    </div>
                </div>

                {/* Submit Button (Styled) */}
                <div className="pt-4">
                    <button 
                        type="submit" 
                        onClick={handleSignIn}
                        className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        <div className="flex items-center justify-center">
                            <i className="fa fa-sign-in-alt mr-3"></i>
                            SIGN IN
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}