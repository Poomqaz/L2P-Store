'use client'

import axios from "axios"
import Swal from "sweetalert2"
import { Config } from "@/app/config"
import { CartInterface } from "@/app/interface/CartInterface"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ErrorInterface } from "@/app/interface/ErrorInterface"

// --------------------------------------------------
// *** ค่าคงที่ค่าขนส่ง ***
const SHIPPING_FEE = 50; 
// --------------------------------------------------

export default function Cart() {
    const [carts, setCarts] = useState<CartInterface[]>([]);
    const [memberId, setMemberId] = useState('');
    // totalAmount คือ ยอดรวมสินค้า + ค่าขนส่ง (ก่อนหักแต้ม)
    const [totalAmount, setTotalAmount] = useState(0); 
    const [qrImage, setQrImage] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [myFile, setMyFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // State สำหรับแต้มและยอดสุดท้าย
    const [memberPoints, setMemberPoints] = useState<number>(0);
    const [points, setPoints] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);

    const router = useRouter();


    // 1. ฟังก์ชันดึงข้อมูลตะกร้าสินค้า (fetchData)
    const fetchData = useCallback(async () => {
        try {
            const url = Config.apiUrl + '/api/cart/list/' + memberId
            const response = await axios.get(url);

            if (response.status === 200) {
                setCarts(response.data);
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: (err as ErrorInterface).message,
                icon: 'error',
                background: '#fff',
                confirmButtonColor: '#3b82f6'
            })
        }
    }, [memberId]) // Dependency: memberId

    // 2. ฟังก์ชันคำนวณยอดรวม (computeTotalAmount) *** แก้ไขส่วนนี้ ***
    const computeTotalAmount = useCallback(() => {
        let sum = 0;

        for (let i = 0; i < carts.length; i++) {
            const item = carts[i];
            sum += item.qty * item.book.price;
        }

        // *** เพิ่มค่าขนส่ง 50 บาท ในยอดรวมสินค้า ***
        const grandTotal = sum + SHIPPING_FEE; 
        setTotalAmount(grandTotal);
    }, [carts]) // Dependency: carts

    // 3. ฟังก์ชันคำนวณยอดสุดท้ายหลังหักแต้ม (computeFinalAmount) 
    const computeFinalAmount = useCallback(() => {
    // คำนวณยอดสูงสุดที่อนุญาตให้ใช้แต้มได้ (50% ของยอดรวม)
    const maxDiscountByPercentage = totalAmount * 0.50;

    // หาแต้มสูงสุดที่สามารถใช้ได้จริง: 
    // ต้องไม่เกินแต้มที่ลูกค้ามี AND ไม่เกิน 50% ของยอดรวม AND ไม่เกินยอดรวมทั้งหมด
    const maxUsablePoints = Math.min(
        memberPoints,             // ไม่เกินแต้มที่ลูกค้ามี
        maxDiscountByPercentage,  // ไม่เกิน 50% ของยอดรวม (เงื่อนไขใหม่)
        totalAmount               // ไม่เกินยอดรวมทั้งหมด (ป้องกันยอดติดลบเมื่อแต้มเยอะ)
    );
    
    // คำนวณยอดสุดท้าย
    // Note: ควรใช้ Math.floor(points) หรือ Math.floor(maxUsablePoints) 
    // ใน computeFinalAmount ขึ้นอยู่กับว่าคุณต้องการคำนวณส่วนลดจากแต้มที่ลูกค้ากรอก
    // หรือแต้มที่ระบบอนุญาต
    // จากโค้ดเดิมใช้ `points` state ใน Dependency Array แต่ไม่ได้ใช้ในการคำนวณโดยตรง
    // ในที่นี้จะปรับให้ใช้ `points` state ที่ลูกค้ากรอก แต่จำกัดไม่ให้เกิน `maxUsablePoints`
    
    // ใช้ Math.min เพื่อให้แต้มที่ลูกค้ากรอกไม่เกินขีดจำกัดที่คำนวณได้
    const discountAmount = Math.floor(Math.min(points, maxUsablePoints)); 
    setFinalAmount(totalAmount - discountAmount);

    }, [points, totalAmount, memberPoints]) // Dependencies: points, totalAmount, memberPoints

    // 4. ฟังก์ชันดึง QR Code (fetchQrImage)
    const fetchQrImage = useCallback(async () => {
        try {
            const amount = finalAmount; 

            if (amount <= 0) { 
                 setQrImage(''); 
                 return;
            }
            const url = 'https://www.pp-qr.com/api/0960815507/' + amount; 
            const response = await axios.get(url);

            if (response.status === 200) {
                setQrImage(response.data.qrImage);
            }
        } catch (e: unknown) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาดในการสร้าง QR',
                text: (e as ErrorInterface).message,
                icon: 'error',
                background: '#fff',
                confirmButtonColor: '#3b82f6'
            })
        }
    }, [finalAmount]) // Dependency: finalAmount


    // แก้ไขปัญหา 1: เพิ่ม fetchData ใน Dependency Array
    useEffect(() => {
        fetchDataMember()

        if (memberId !== '') {
            fetchData();
        }
    }, [memberId, fetchData]);

    // แก้ไขปัญหา 2: เพิ่ม computeTotalAmount ใน Dependency Array
    useEffect(() => {
        computeTotalAmount();
    }, [carts, computeTotalAmount])

    // แก้ไขปัญหา 3, 4: เพิ่ม computeFinalAmount และ fetchQrImage ใน Dependency Array
    useEffect(() => {
        // ต้องเรียก computeFinalAmount ก่อนเสมอ เพราะ fetchQrImage ใช้ finalAmount
        computeFinalAmount();
        
        // เรียก fetchQrImage เมื่อ finalAmount เปลี่ยน และ finalAmount มากกว่า 0
        if (finalAmount > 0) {
            fetchQrImage();
        } else {
            setQrImage('');
        }
    }, [finalAmount, computeFinalAmount, fetchQrImage])

    
    const fetchDataMember = async () => {
        try {
            const url = Config.apiUrl + '/api/member/info'
            const headers = {
                'Authorization': 'Bearer ' + localStorage.getItem(Config.tokenMember)
            }
            const response = await axios.get(url, { headers })

            if (response.status === 200) {
                setMemberId(response.data.id)
                setMemberPoints(response.data.points || 0);
                setName(response.data.name || '');
                setAddress(response.data.address || '');
                setPhone(response.data.phone || '');
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: (err as ErrorInterface).message,
                icon: 'error',
                background: '#fff',
                confirmButtonColor: '#3b82f6'
            })
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const cart = carts.find(item => item.id === id);
            const button = await Swal.fire({
                title: 'ลบรายการ',
                text: 'ยืนยันการลบ ' + cart?.book.name,
                icon: 'question',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'ลบ',
                cancelButtonText: 'ยกเลิก',
                background: '#fff'
            })

            if (button.isConfirmed) {
                const url = Config.apiUrl + '/api/cart/delete/' + id;
                const response = await axios.delete(url);

                if (response.status === 200) {
                    fetchData(); 
                }
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: (err as ErrorInterface).message,
                icon: 'error',
                background: '#fff',
                confirmButtonColor: '#3b82f6'
            })
        }
    }

    const upQty = async (id: string) => {
        try {
            const url = Config.apiUrl + '/api/cart/upQty/' + id;
            const response = await axios.put(url);

            if (response.status === 200) {
                fetchData(); 
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: (err as ErrorInterface).message,
                icon: 'error',
                background: '#fff',
                confirmButtonColor: '#3b82f6'
            })
        }
    }

    const downQty = async (id: string) => {
        try {
            const url = Config.apiUrl + '/api/cart/downQty/' + id;
            const response = await axios.put(url);

            if (response.status === 200) {
                fetchData(); 
            }
        } catch (err: unknown) {
            const error = err as ErrorInterface;
            if (error.status === 400) {
                Swal.fire({
                    text: 'สินค้าควรมีอย่างน้อย 1 รายการ',
                    title: 'ตรวจสอบรายการ',
                    icon: 'warning',
                    background: '#fff',
                    confirmButtonColor: '#f59e0b'
                })
            } else {
                Swal.fire({
                    title: 'เกิดข้อผิดพลาด',
                    text: error.message,
                    icon: 'error',
                    background: '#fff',
                    confirmButtonColor: '#3b82f6'
                })
            }
        }
    }

    // *** ส่วนที่ถูกแก้ไข: ฟังก์ชั่นจัดการการใช้แต้ม (handlepoints) 
    const handlepoints = (newPoints: number) => {
        // 1. คำนวณขีดจำกัดสูงสุด 50% ของยอดรวม (ปัดลง)
        const max50Percent = Math.floor(totalAmount * 0.50);
        // 2. คำนวณแต้มสูงสุดที่ใช้ได้จริงตามเงื่อนไขทั้งหมด
        const maxAllowedPoints = Math.floor(Math.min(memberPoints, max50Percent, totalAmount)); 

        let actualNewPoints = newPoints;
        if (newPoints < 0) {
            actualNewPoints = 0;
        }

        if (actualNewPoints > maxAllowedPoints) {
            // แจ้งเตือนเมื่อแต้มที่กรอกเกินขีดจำกัดสูงสุด
            let textMessage = `ยอดสั่งซื้อ ฿${totalAmount.toLocaleString()} ใช้แต้มได้สูงสุด ${maxAllowedPoints.toLocaleString()} แต้ม`;
            
            if (actualNewPoints > memberPoints && memberPoints < max50Percent) {
                 textMessage = `คุณมีแต้ม ${memberPoints.toLocaleString()} แต้ม ใช้ได้สูงสุด ${maxAllowedPoints.toLocaleString()} แต้ม`;
            } else if (actualNewPoints > max50Percent) {
                textMessage = `ใช้แต้มได้สูงสุดไม่เกิน 50% ของยอดรวม (คือ ${max50Percent.toLocaleString()} แต้ม)`;
            }

            Swal.fire({
                title: 'ใช้แต้มเกินขีดจำกัด',
                text: textMessage,
                icon: 'warning',
                background: '#fff',
                confirmButtonColor: '#f59e0b'
            });
            setPoints(maxAllowedPoints); // ตั้งค่าแต้มเป็นค่าสูงสุดที่อนุญาต
            return;
        }

        // ถ้าค่าที่กรอกถูกต้องตามเงื่อนไข
        setPoints(actualNewPoints);
    }

    // *** ส่วนที่ถูกแก้ไข: ฟังก์ชั่นใช้แต้มทั้งหมด (useAllPoints) 
    const useAllPoints = () => {
        // คำนวณแต้มสูงสุดที่ใช้ได้จริงตามเงื่อนไขทั้งหมด
        const max50Percent = Math.floor(totalAmount * 0.50);
        const maxUsablePoints = Math.floor(Math.min(memberPoints, max50Percent, totalAmount));
        setPoints(maxUsablePoints);
    }

    // ฟังก์ชั่นเคลียร์แต้ม
    const clearPoints = () => {
        setPoints(0);
    }

    const handleSave = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            await handleUpdateMember();
            
            // ตรวจสอบว่าต้องอัปโหลดไฟล์หรือไม่
            if (finalAmount > 0 && !myFile) {
                Swal.fire({
                    title: 'ข้อผิดพลาด',
                    text: 'กรุณาอัปโหลดหลักฐานการโอนเงิน',
                    icon: 'error',
                    background: '#fff',
                    confirmButtonColor: '#ef4444'
                });
                return;
            }

            if (finalAmount > 0) {
                await handleUploadFile();
            }
            
            await handleSaveOrder();

            router.push('/web/member/cart/success');
        } catch (err: unknown) {
           Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: (err as ErrorInterface).message,
                icon: 'error',
                background: '#fff',
                confirmButtonColor: '#3b82f6'
            })
        } finally {
            setIsLoading(false);
        }
    }

    const handleUpdateMember = async () => {
        const url = Config.apiUrl + '/api/cart/confirm';
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem(Config.tokenMember)
        }
        const payload = {
            name: name,
            address: address,
            phone: phone
        }
        await axios.post(url, payload, { headers });
    }

    const handleChooseFile = (files: unknown) => {
        const chooseFiles: FileList = files as FileList;

        if (chooseFiles.length > 0) {
            const file = chooseFiles[0];
            setMyFile(file);
        }
    }

    const handleUploadFile = async () => {
        const form = new FormData();
        // ตรวจสอบ myFile ก่อนเรียกใช้
        if (myFile) {
            form.append('myFile', myFile);
        } else {
            // ถ้าถึงจุดนี้ แสดงว่า finalAmount > 0 แต่ไม่มีไฟล์ ควรจัดการข้อผิดพลาด
            throw new Error("ไม่พบไฟล์หลักฐานการโอนเงิน");
        }


        const url = Config.apiUrl + '/api/cart/uploadSlip';
        await axios.post(url, form);
    }

    // *** ส่วนที่ได้รับการแก้ไข: handleSaveOrder ***
    const handleSaveOrder = async () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem(Config.tokenMember)
        }
        const payload = {
            slipName: myFile ? myFile.name : null,
            points: points, 
            finalAmount: finalAmount,
            // *** ส่วนที่เพิ่ม: ส่งยอดรวมและค่าจัดส่งไปด้วย ***
            totalAmountBeforeDiscount: totalAmount, // ยอดรวมสินค้า + ค่าจัดส่ง (ก่อนหักแต้ม)
            shippingFee: SHIPPING_FEE               // ค่าจัดส่ง
        }
        const url = Config.apiUrl + '/api/cart/confirmOrder';
        const response = await axios.post(url, payload, { headers })

        if (response.status === 200) {
            // Order confirmed successfully
        }
    }
    // *** สิ้นสุดส่วนที่ได้รับการแก้ไข: handleSaveOrder ***

    // คำนวณเพดานส่วนลด 50% ของยอดรวม (ปัดลงให้เป็นเลขเต็ม)
    const max50PercentLimit = Math.floor(totalAmount * 0.50);

    // คำนวณแต้มสูงสุดที่ลูกค้าใช้ได้จริง (ไม่เกินแต้มที่มี AND ไม่เกิน 50% Limit AND ไม่เกินยอดรวม)
    const calculatedMaxLimit = Math.floor(Math.min(memberPoints, max50PercentLimit, totalAmount));


    const uiCart = () => {
        // คำนวณส่วนลดที่ถูกใช้จริง (ตามตรรกะใน computeFinalAmount)
        const actualDiscount = totalAmount - finalAmount;
        
        // คำนวณยอดรวมสินค้าจริง (ไม่รวมค่าขนส่ง)
        const productTotal = totalAmount - SHIPPING_FEE; 
        
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4">
                        <i className="fa fa-shopping-cart text-white text-xl"></i>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        สินค้าในตะกร้า
                    </h1>
                </div>
                
                {carts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <i className="fa fa-shopping-cart text-gray-400 text-3xl"></i>
                        </div>
                        <p className="text-gray-500 text-lg">ตะกร้าสินค้าของคุณว่างเปล่า</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-100">
                                        <th className="text-left py-4 px-2 font-semibold text-gray-700">สินค้า</th>
                                        <th className="text-left py-4 px-2 font-semibold text-gray-700">รายละเอียด</th>
                                        <th className="text-right py-4 px-2 font-semibold text-gray-700">ราคา</th>
                                        <th className="text-center py-4 px-2 font-semibold text-gray-700">จำนวน</th>
                                        <th className="text-right py-4 px-2 font-semibold text-gray-700">ยอดรวม</th>
                                        <th className="py-4 px-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts.map((cart: CartInterface, index) => (
                                        <tr key={cart.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                            <td className="py-4 px-2">
                                                <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md">
                                                    <img 
                                                        src={Config.apiUrl + '/public/uploads/' + cart.book.image} 
                                                        alt={cart.book.name}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <div className="font-medium text-gray-800 text-lg">
                                                    {cart.book.name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <span className="text-blue-600 font-semibold text-lg">
                                                    ฿{cart.book.price.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button 
                                                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors duration-200 hover:scale-110"
                                                        onClick={() => downQty(cart.id)}
                                                    >
                                                        <i className="fa fa-minus text-sm"></i>
                                                    </button>
                                                    <span className="font-semibold text-lg min-w-[2rem] text-center bg-gray-100 px-3 py-1 rounded-lg">
                                                        {cart.qty}
                                                    </span>
                                                    <button 
                                                        className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition-colors duration-200 hover:scale-110"
                                                        onClick={() => upQty(cart.id)}
                                                    >
                                                        <i className="fa fa-plus text-sm"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <span className="text-purple-600 font-bold text-lg">
                                                    ฿{(cart.qty * cart.book.price).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2">
                                                <button 
                                                    onClick={() => handleDelete(cart.id)}
                                                    className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-500 text-red-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                                                >
                                                    <i className="fa fa-trash text-sm"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ส่วนของแต้มและยอดรวม */}
                        <div className="mt-8 space-y-6">
                            {/* ส่วนใช้แต้ม */}
                            <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                                <div className="flex items-center mb-4">
                                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-full mr-3">
                                        <i className="fa fa-star text-white text-sm"></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-700">ใช้แต้มสะสม</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="bg-white p-4 rounded-xl">
                                        <p className="text-sm text-gray-600">แต้มที่มีทั้งหมด</p>
                                        <p className="text-2xl font-bold text-yellow-600">{memberPoints.toLocaleString()} แต้ม</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl">
                                        <p className="text-sm text-gray-600">แต้มที่ใช้</p>
                                        <p className="text-2xl font-bold text-orange-600">{points.toLocaleString()} แต้ม</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 mb-4">
                                    <input 
                                        type="number" 
                                        min="0" 
                                        // *** แก้ไข: ใช้ calculatedMaxLimit ที่จำกัด 50% แล้ว ***
                                        max={calculatedMaxLimit}
                                        value={points > 0 ? points.toString() : ''}
                                        onChange={(e) => handlepoints(parseInt(e.target.value) || 0)}
                                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none"
                                        // *** แก้ไข: อัปเดต Placeholder ***
                                        placeholder={`จำนวนแต้ม (สูงสุด ${calculatedMaxLimit.toLocaleString()} แต้ม)`}
                                    />
                                    <button 
                                        onClick={useAllPoints}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors whitespace-nowrap"
                                        // *** แก้ไข: ปิดปุ่มถ้าขีดจำกัดใหม่เป็น 0 ***
                                        disabled={calculatedMaxLimit === 0}
                                    >
                                        ใช้ทั้งหมด
                                    </button>
                                    <button 
                                        onClick={clearPoints}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                                    >
                                        เคลียร์
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600">
                                    <i className="fa fa-info-circle mr-2 text-blue-500"></i>
                                    1 แต้ม = ส่วนลด 1 บาท. **(ใช้ได้สูงสุด {calculatedMaxLimit.toLocaleString()} แต้ม)** <span className="font-semibold text-red-600 ml-1">
                                        (จำกัดไม่เกิน 50% ของยอดรวม หรือ {max50PercentLimit.toLocaleString()} บาท)
                                    </span>
                                </p>
                            </div>

                            {/* ยอดรวมทั้งหมด */}
                            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                                <div className="space-y-3">
                                    {/* ยอดรวมสินค้า (ไม่รวมค่าขนส่ง) */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-medium text-gray-700">ยอดรวมสินค้า (ไม่รวมส่ง)</span>
                                        <span className="text-xl font-semibold text-gray-700">
                                            ฿{productTotal.toLocaleString()}
                                        </span>
                                    </div>
                                    
                                    {/* *** แก้ไข/เพิ่ม: ค่าขนส่ง *** */}
                                    <div className="flex justify-between items-center text-gray-700">
                                        <span className="text-lg font-medium">ค่าจัดส่ง</span>
                                        <span className="text-xl font-semibold">
                                            +฿{SHIPPING_FEE.toLocaleString()}
                                        </span>
                                    </div>
                                    
                                    {actualDiscount > 0 && (
                                        <div className="flex justify-between items-center text-red-600">
                                            {/* แสดงแต้มที่ถูกใช้จริง (actualDiscount คือแต้มที่ถูกนำมาหักจริงๆ) */}
                                            <span className="text-lg font-medium">ส่วนลดจากแต้ม ({actualDiscount.toLocaleString()} แต้ม)</span>
                                            <span className="text-xl font-semibold">
                                                -฿{actualDiscount.toLocaleString()} 
                                            </span>
                                        </div>
                                    )}
                                    
                                    <hr className="border-gray-300" />
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-semibold text-gray-700">ยอดที่ต้องชำระ</span>
                                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            ฿{finalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        )
    }

    const uiPay = () => {
        // คำนวณส่วนลดที่ถูกใช้จริง
        const actualDiscount = totalAmount - finalAmount;

        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full mr-4">
                        <i className="fa fa-credit-card text-white text-xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        การชำระเงิน
                    </h2>
                </div>

                {/* แสดง QR Code */}
                {qrImage && finalAmount > 0 && (
                    <div className="mb-8 text-center">
                        <div className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-2xl shadow-lg inline-block">
                            <img 
                                src={qrImage} 
                                alt="QR Code Payment" 
                                className="w-64 h-64 object-contain rounded-xl shadow-md mx-auto"
                            />
                            <p className="text-gray-600 mt-4 text-sm">สแกน QR Code เพื่อชำระเงิน</p>
                            <p className="text-blue-600 font-bold text-lg mt-2">
                                ฿{finalAmount.toLocaleString()}
                            </p>
                            {actualDiscount > 0 && (
                                <p className="text-green-600 text-sm mt-1">
                                    (ได้รับส่วนลด {actualDiscount.toLocaleString()} บาท จากแต้ม)
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* ชำระด้วยแต้มครบแล้ว */}
                {finalAmount === 0 && totalAmount > 0 && actualDiscount > 0 && (
                    <div className="mb-8 text-center">
                        <div className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200">
                            <i className="fa fa-gift text-green-600 text-4xl mb-4"></i>
                            <p className="text-green-800 font-bold text-xl mb-2">ชำระด้วยแต้มครบแล้ว!</p>
                            <p className="text-green-600 text-sm">ใช้แต้ม {actualDiscount.toLocaleString()} แต้ม</p>
                        </div>
                    </div>
                )}
                
                {/* ปุ่มและฟอร์มการชำระเงิน */}
                <form onSubmit={(e) => handleSave(e)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <i className="fa fa-user mr-2 text-blue-500"></i>
                            ชื่อผู้รับสินค้า
                        </label>
                        <input 
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="กรุณากรอกชื่อผู้รับสินค้า"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <i className="fa fa-map-marker-alt mr-2 text-red-500"></i>
                            ที่อยู่ในการจัดส่ง
                        </label>
                        <textarea 
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl h-24 resize-none focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                            placeholder="กรุณากรอกที่อยู่สำหรับจัดส่งสินค้า"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <i className="fa fa-phone mr-2 text-green-500"></i>
                            เบอร์โทรศัพท์
                        </label>
                        <input 
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white" 
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            placeholder="กรุณากรอกเบอร์โทรศัพท์"
                            required
                        />
                    </div>

                    {/* อัปโหลดสลิปเฉพาะเมื่อ finalAmount > 0 เท่านั้น */}
                    {finalAmount > 0 && (
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <i className="fa fa-upload mr-2 text-purple-500"></i>
                                หลักฐานการโอนเงิน
                            </label>
                            <div className="relative">
                                <input 
                                    type="file" 
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                                    onChange={(e) => handleChooseFile(e.target.files)}
                                    accept="image/*"
                                    required={finalAmount > 0}
                                />
                            </div>
                            {myFile && (
                                <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                                    <i className="fa fa-check mr-2"></i>
                                    เลือกไฟล์: {myFile.name}
                                </p>
                            )}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading || (finalAmount > 0 && !myFile)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                                กำลังดำเนินการ...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <i className="fa fa-check mr-3"></i>
                                ยืนยันการสั่งซื้อ
                            </div>
                        )}
                    </button>
                </form>
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {uiCart()}
                    </div>
                    <div className="lg:col-span-1">
                        {carts.length > 0 && uiPay()}
                    </div>
                </div>
            </div>
        </div>
    )
}