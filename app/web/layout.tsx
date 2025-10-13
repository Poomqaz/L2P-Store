'use client'

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Config } from "../config";
import axios from "axios";
import { ErrorInterface } from './../interface/ErrorInterface';

export default function WebLayout({
    children
}: {
    children: React.ReactNode
}) {
    const [username, setUsername] = useState('');
    const [points, setPoints] = useState(0);
    const [profileImage, setProfileImage] = useState<string>('');
    const [imageError, setImageError] = useState(false); // เพิ่ม state สำหรับจัดการ error รูปภาพ

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
                    setUsername(response.data.username);
                    setPoints(response.data.points);
                    // สร้าง URL เต็มสำหรับรูปภาพจากชื่อไฟล์ที่ได้จาก API
                    if (response.data.profileImage) {
                        const imageUrl = `${Config.apiUrl}/public/uploadProfile/${response.data.profileImage}`;
                        setProfileImage(imageUrl);
                    } else {
                        setProfileImage(''); // ถ้าไม่มีรูป ก็ set เป็นค่าว่าง
                    }
                }
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message || 'ไม่สามารถดึงข้อมูลได้',
                icon: 'error'
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSignOut = async () => {
        const button = await Swal.fire({
            title: 'ออกจากระบบ',
            text: 'คุณต้องการออกจากระบบใช่ไหม ?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        })

        if (button.isConfirmed) {
            localStorage.removeItem(Config.tokenMember);
            window.location.href = '/web'
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
                <div className="px-6 py-6 text-black">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white bg-opacity-20 p-3 rounded-2xl backdrop-blur-sm">
                                <i className="fa fa-book-open text-2xl"></i>
                            </div>
                            <div>
                                <div className="text-3xl font-bold tracking-wide text-white">L2P</div>
                                <div className="text-lg opacity-90 font-medium text-white">เรียนและเล่นอย่างสนุก</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {username !== '' && (
                                <Link href="/web/member/edit-profile" passHref>
                                    <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm flex items-center space-x-2 cursor-pointer transition-transform transform hover:scale-105">
                                        <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full overflow-hidden flex items-center justify-center">
                                            {profileImage && !imageError ? (
                                                <img 
                                                    src={profileImage} 
                                                    alt="profile" 
                                                    className="w-full h-full object-cover" 
                                                    onError={() => setImageError(true)}
                                                />
                                            ) : (
                                                <i className="fa fa-user text-sm"></i>
                                            )}
                                        </div>
                                        <span className="font-medium">{username}</span>
                                        <span className="text-sm bg-white bg-opacity-10 px-2 py-1 rounded-full">
                                            {points} pts
                                        </span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Navigation Section */}
            <div className="bg-white shadow-md border-b border-gray-200">
                <div className="px-6 py-4">
                    <div className="flex flex-wrap items-center gap-6">
                        <Link 
                            href='/web'
                            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group"
                        >
                            <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                                <i className="fa fa-home text-blue-600 text-sm"></i>
                            </div>
                            <span>หน้าแรก</span>
                        </Link>
                        
                        {username === '' ? (
                            <>
                                <Link 
                                    href='/web/member/register'
                                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-300 font-medium group"
                                >
                                    <div className="w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                                        <i className="fa fa-user-plus text-green-600 text-sm"></i>
                                    </div>
                                    <span>สมัครสมาชิก</span>
                                </Link>
                                <Link 
                                    href='/web/member/sign-in'
                                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium group"
                                >
                                    <div className="w-8 h-8 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                                        <i className="fa fa-lock text-purple-600 text-sm"></i>
                                    </div>
                                    <span>เข้าสู่ระบบ</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    href='/web/member/history'
                                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium group"
                                >
                                    <div className="w-8 h-8 bg-indigo-100 group-hover:bg-indigo-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                                        <i className="fa fa-file-alt text-indigo-600 text-sm"></i>
                                    </div>
                                    <span>ติดตามสินค้า</span>
                                </Link>
                                <button 
                                    onClick={handleSignOut}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium group"
                                >
                                    <div className="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                                        <i className="fa fa-times text-red-600 text-sm"></i>
                                    </div>
                                    <span>ออกจากระบบ</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {children}
            </div>
        </div>
    )
}