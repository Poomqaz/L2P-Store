'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Config } from "@/app/config";
import { ErrorInterface } from "@/app/interface/ErrorInterface";

export default function EditProfile() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setProfileImage] = useState<string>('');
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState<string>('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageError, setImageError] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const token = localStorage.getItem(Config.tokenMember);

            if (token != undefined) {
                const headers = {
                    'Authorization': 'Bearer ' + token
                }
                const url = Config.apiUrl + '/api/member/info'
                const response = await axios.get(url, { headers })

                if (response.status == 200) {
                    setName(response.data.name);
                    setPhone(response.data.phone);
                    setAddress(response.data.address);
                    setEmail(response.data.email)
                    // สร้าง URL เต็มสำหรับรูปภาพจากชื่อไฟล์ที่ได้รับ
                    if (response.data.profileImage) {
                        const imageUrl = `${Config.apiUrl}/public/uploadProfile/${response.data.profileImage}`;
                        setProfileImage(imageUrl);
                    }
                }
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message,
                icon: 'error'
            })
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // ตรวจสอบขนาดไฟล์
        if (file.size > 10 * 1024 * 1024) {
            Swal.fire({
                title: 'ขนาดไฟล์ใหญ่เกินไป',
                text: 'กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 10MB',
                icon: 'warning'
            });
            return;
        }

        // ตรวจสอบประเภทไฟล์
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            Swal.fire({
                title: 'ประเภทไฟล์ไม่ถูกต้อง',
                text: 'กรุณาเลือกไฟล์ JPG, PNG หรือ GIF เท่านั้น',
                icon: 'warning'
            });
            return;
        }

        // เก็บไฟล์และสร้าง preview
        setProfileImageFile(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            setProfileImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    // ฟังก์ชันลบรูป
    const handleRemoveImage = () => {
        setProfileImageFile(null);
        setProfileImagePreview('');
        setProfileImage('');
    };

    // ฟังก์ชัน handleSave ที่แก้ไข
    const handleSave = async () => {
        try {
            if (password && password !== confirmPassword) {
                Swal.fire({
                    title: "ตรวจสอบรหัสผ่าน และการยืนยัน",
                    text: "รหัสผ่านไม่ตรงกัน",
                    icon: 'warning'
                })
                return
            }

            const url = Config.apiUrl + '/api/member/update';
            
            // ใช้ FormData สำหรับส่งไฟล์
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('email',email);
            
            if (password && password.trim() !== '') {
                formData.append('password', password);
            }
            
            // เพิ่มรูปภาพถ้ามีการเลือกใหม่
            if (profileImageFile) {
                formData.append('profileImage', profileImageFile);
            }

            const headers = {
                'Authorization': 'Bearer ' + localStorage.getItem(Config.tokenMember)
            }
            
            const response = await axios.put(url, formData, {headers});

            if (response.status == 200) {
                Swal.fire({
                    title: 'บันทึกข้อมูล',
                    text: 'บันทึกข้อมูลสำเร็จ',
                    icon: 'success',
                    timer: 1000
                })
                
                // อัปเดตรูปปัจจุบันหลังบันทึกสำเร็จ
                if (response.data.profileImage) {
                    const imageUrl = `${Config.apiUrl}/public/uploadProfile/${response.data.profileImage}`;
                    setProfileImage(imageUrl);
                }
                
                setProfileImageFile(null);
                setProfileImagePreview('');
                
                fetchData();
            }
        } catch (err : unknown) {
            Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message,
                icon: 'error'
            })
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold mb-4">ข้อมูลส่วนตัว</h2>

        {/* รูปภาพโปรไฟล์ */}
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
            {profileImagePreview ? (
                <img
                src={profileImagePreview}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                />
            ) : profileImage && !imageError ? (
                <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                onError={() => setImageError(true)}
                />
            ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center border-4 border-gray-200">
                <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                </div>
            )}
            </div>

            <div className="flex space-x-2">
            <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                {profileImagePreview ? 'เปลี่ยนรูปอื่น' : 'เปลี่ยนรูปภาพ'}
                <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                />
            </label>

            {(profileImagePreview || profileImage) && (
                <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                ลบรูป
                </button>
            )}
            </div>

            <p className="text-xs text-gray-500 text-center">
            รองรับไฟล์ JPG, PNG, GIF ขนาดไม่เกิน 10MB
            </p>
        </div>

        {/* ฟอร์มข้อมูลส่วนตัว */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ชื่อ */}
            <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ-นามสกุล</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="กรอกชื่อ-นามสกุล"
            />
            </div>

            {/* เบอร์โทร */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
            <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="กรอกเบอร์โทรศัพท์"
            />
            </div>

            {/* อีเมล */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="กรอกอีเมล"
            />
            </div>

            {/* ที่อยู่ */}
            <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
            <textarea
                value={address || ''}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="กรอกที่อยู่"
            />
            </div>

            {/* รหัสผ่านใหม่ */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านใหม่ (ถ้าไม่ต้องการแก้ไข ไม่ต้องกรอก)</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="กรอกรหัสผ่านใหม่"
            />
            </div>

            {/* ยืนยันรหัสผ่านใหม่ */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ยืนยันรหัสผ่านใหม่</label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ยืนยันรหัสผ่านใหม่"
                disabled={!password}
            />
            {password && confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-sm text-red-600">รหัสผ่านไม่ตรงกัน</p>
            )}
            </div>
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
            บันทึกข้อมูล
            </button>
        </div>
        </div>

    );
}