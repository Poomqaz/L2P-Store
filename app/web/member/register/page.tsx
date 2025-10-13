'use client'
import { useState, ChangeEvent } from "react"
import { useRouter } from "next/navigation";
import { Config } from "@/app/config"
import axios from "axios"
import Swal from "sweetalert2"
import { ErrorInterface } from '@/app/interface/ErrorInterface';


export default function Register() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // เพิ่ม state สำหรับข้อผิดพลาด
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        phone: ''
    });

    // Function to validate email format
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to check for duplicate data on the server
    const checkDuplicate = async (field: 'username' | 'email' | 'phone', value: string) => {
        if (!value) {
            setErrors(prev => ({ ...prev, [field]: '' }));
            return;
        }

        try {
            const checkUrl = Config.apiUrl + '/api/member/check-duplicate';
            const checkPayload = { [field]: value };
            
            const response = await axios.post(checkUrl, checkPayload);
            const { isDuplicate } = response.data;
            
            if (isDuplicate) {
                let text = '';
                if (field === 'username') text = 'ชื่อผู้ใช้งานนี้ถูกใช้งานแล้ว';
                if (field === 'email') text = 'อีเมลนี้ถูกใช้งานแล้ว';
                if (field === 'phone') text = 'เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว';
                setErrors(prev => ({ ...prev, [field]: text }));
            } else {
                setErrors(prev => ({ ...prev, [field]: '' }));
            }
        } catch (err) {
            console.error(`Failed to check duplicate ${field}`, err);
            setErrors(prev => ({ ...prev, [field]: 'ไม่สามารถตรวจสอบข้อมูลได้' }));
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // ตรวจสอบข้อมูลก่อนส่ง (Final validation)
        if (password !== confirmPassword) {
            Swal.fire({
                title: 'ตรวจสอบรหัสผ่าน',
                text: 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน',
                icon: 'warning'
            });
            setLoading(false);
            return;
        }
        
        if (!isValidEmail(email)) {
            Swal.fire({
                title: 'อีเมลไม่ถูกต้อง',
                text: 'กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง',
                icon: 'warning'
            });
            setLoading(false);
            return;
        }

        // Check if there are any existing real-time errors
        if (Object.values(errors).some(error => error !== '')) {
            Swal.fire({
                title: 'ตรวจสอบข้อมูล',
                text: 'กรุณาแก้ไขข้อมูลที่ผิดพลาดก่อนดำเนินการต่อ',
                icon: 'warning'
            });
            setLoading(false);
            return;
        }
        
        try {
            const signUpUrl = Config.apiUrl + '/api/member/signup';
            const signUpPayload = {
                name: name,
                phone: phone,
                email: email,
                username: username,
                password: password
            };

            const response = await axios.post(signUpUrl, signUpPayload);

            if (response.status === 200) {
                Swal.fire({
                    title: 'บันทึกข้อมูล',
                    text: 'บันทึกข้อมูลสำเร็จ',
                    icon: 'success',
                    timer: 1500
                }).then(() => {
                    router.push('/web/member/sign-in');
                });
            }
        } catch (err: unknown) {
            // 1. แก้ไข: ใช้ 'const' และกำหนดค่า default ที่มี 'status'
            const defaultErrorData: ErrorInterface = {
                message: 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ',
                status: 500 // กำหนดค่า default 500 สำหรับข้อผิดพลาดที่ไม่ทราบสาเหตุ
            };
            
            let errorData: ErrorInterface = defaultErrorData; // ใช้ let สำหรับตัวแปรที่อาจถูกอัพเดต

            // 2. ตรวจสอบและอัพเดตข้อมูลเมื่อเป็น Axios Error
            if (axios.isAxiosError(err) && err.response) {
                
                // ใช้ Type Assertion เพื่อให้เข้าถึง response.data ได้อย่างปลอดภัย
                const serverData = err.response.data as Partial<ErrorInterface> & { error?: string };

                // อัพเดตข้อมูลจากเซิร์ฟเวอร์
                errorData = {
                    // ใช้ message ที่ส่งมาจากเซิร์ฟเวอร์ ถ้าไม่มี ใช้ 'error' ถ้าไม่มี ใช้ค่า default
                    message: serverData.message || serverData.error || defaultErrorData.message,
                    
                    // ใช้ HTTP Status Code จาก response หรือใช้ default 500
                    status: err.response.status || defaultErrorData.status
                };
                
            } else if (err instanceof Error) {
                // กรณีเป็น JavaScript Error มาตรฐาน
                errorData = {
                    message: err.message,
                    status: defaultErrorData.status // ใช้ status default
                };
            }
            
            // 3. แสดงผลด้วย SweetAlert
            Swal.fire({
                title: `ข้อผิดพลาด (${errorData.status})`,
                icon: 'error',
                text: errorData.message 
            });
            
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Header Card */}
                <div className="bg-white rounded-t-3xl shadow-lg border border-blue-100 p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fa fa-user-plus text-white text-2xl"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">สมัครสมาชิก</h1>
                    <p className="text-gray-600">กรุณากรอกข้อมูลเพื่อสร้างบัญชีใหม่</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-b-3xl shadow-lg border-x border-b border-blue-100 p-8">
                    <form onSubmit={handleSignUp} className="space-y-6">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <i className="fa fa-user mr-2 text-blue-500"></i>
                                ชื่อ-นามสกุล
                            </label>
                            <div className="relative">
                                <input 
                                    type="text"
                                    value={name}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white pl-12"
                                    placeholder="กรุณากรอกชื่อ-นามสกุล"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fa fa-user text-gray-400 text-sm"></i>
                                </div>
                            </div>
                        </div>
                        {/* Phone Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <i className="fa fa-phone mr-2 text-blue-500"></i>
                                เบอร์โทร
                            </label>
                            <div className="relative">
                                <input 
                                    type="tel"
                                    value={phone}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                                    onBlur={(e: ChangeEvent<HTMLInputElement>) => checkDuplicate('phone', e.target.value)} // เพิ่ม onBlur event
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white pl-12 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="กรุณากรอกเบอร์โทรศัพท์"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fa fa-phone text-gray-400 text-sm"></i>
                                </div>
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <i className="fa fa-envelope mr-2 text-green-500"></i>
                                อีเมลผู้ใช้งาน (Email)
                            </label>
                            <div className="relative">
                                <input 
                                    type="email"
                                    value={email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    onBlur={(e: ChangeEvent<HTMLInputElement>) => checkDuplicate('email', e.target.value)} // เพิ่ม onBlur event
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white pl-12 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="กรุณากรอกอีเมล"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fa fa-envelope text-gray-400 text-sm"></i>
                                </div>
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Username Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <i className="fa fa-user mr-2 text-green-500"></i>
                                ชื่อผู้ใช้งาน (Username)
                            </label>
                            <div className="relative">
                                <input 
                                    type="text"
                                    value={username}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                    onBlur={(e: ChangeEvent<HTMLInputElement>) => checkDuplicate('username', e.target.value)} // เพิ่ม onBlur event
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white pl-12 ${errors.username ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="กรุณากรอกชื่อผู้ใช้งาน"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fa fa-user text-gray-400 text-sm"></i>
                                </div>
                            </div>
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>

                        {/* *** Password Input (แสดงรหัสผ่าน) *** */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <i className="fa fa-lock mr-2 text-purple-500"></i>
                                รหัสผ่าน (Password)
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} // <--- แก้ไขตรงนี้
                                    value={password}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white pl-12 pr-12" // <--- เพิ่ม pr-12
                                    placeholder="กรุณากรอกรหัสผ่าน"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fa fa-lock text-gray-400 text-sm"></i>
                                </div>
                                {/* ปุ่มสำหรับสลับการแสดงรหัสผ่าน */}
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        {/* *** Confirm Password Input (สลับแสดงรหัสผ่าน) *** */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <i className="fa fa-shield-alt mr-2 text-indigo-500"></i>
                                ยืนยันรหัสผ่าน
                            </label>
                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'} // <--- แก้ไขตรงนี้
                                    value={confirmPassword}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white pl-12 pr-12" // <--- เพิ่ม pr-12
                                    placeholder="กรุณายืนยันรหัสผ่าน"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fa fa-shield-alt text-gray-400 text-sm"></i>
                                </div>
                                {/* ปุ่มสำหรับสลับการแสดงรหัสผ่าน */}
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                            {/* Password Match Indicator */}
                            {confirmPassword && (
                                <div className="flex items-center mt-2">
                                    {password === confirmPassword ? (
                                        <div className="flex items-center text-green-600 text-sm">
                                            <i className="fa fa-check-circle mr-1"></i>
                                            รหัสผ่านตรงกัน
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-red-600 text-sm">
                                            <i className="fa fa-times-circle mr-1"></i>
                                            รหัสผ่านไม่ตรงกัน
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                type="submit"
                                disabled={loading || Object.values(errors).some(error => error !== '')}
                                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group ${loading || Object.values(errors).some(error => error !== '') ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        <i className="fa fa-check group-hover:scale-110 transition-transform duration-300"></i>
                                        <span>สมัครสมาชิก</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="text-center pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                                มีบัญชีอยู่แล้ว? 
                                <a href="/web/member/sign-in" className="text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline">
                                    เข้าสู่ระบบ
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}