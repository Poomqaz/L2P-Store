'use client'

import { Config } from "@/app/config"
import axios from "axios"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from 'next/navigation'
import Swal from "sweetalert2"
import { BookInterface } from "@/app/interface/BookInterface"
import { MemberInterface } from "@/app/interface/MemberInterface"
import { CartItemInterface } from "@/app/interface/CartItemInterface"

// -------------------------------------------------------------------------
type MemberSearchInfo = Pick<
    MemberInterface, 
    'id' | 'name' | 'email' | 'phone' | 'points'
>;

// -------------------------------------------------------------------------
// *** เพิ่ม Type Interface เพื่อแก้ไข ts(7022) ***
// -------------------------------------------------------------------------
interface CalculatedTotals {
    subtotal: number;
    discount: number;
    total: number;
    maxRedeemablePoints: number;
}


export default function POSSystem() {
    const router = useRouter()
    
    // ---- State Management ----
    const [selectedMember, setSelectedMember] = useState<MemberSearchInfo | null>(null)
    const [memberSearch, setMemberSearch] = useState('')
    const [bookSearch, setBookSearch] = useState('')
    const [books, setBooks] = useState<BookInterface[]>([])
    const [cart, setCart] = useState<CartItemInterface[]>([]) 
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>('cash')
    const [pointsToRedeem, setPointsToRedeem] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [cashPaid, setCashPaid] = useState<number | ''>('') 

    // ---- Authentication Functions ----
    const createAuthenticatedAxios = () => {
        const token = localStorage.getItem(Config.tokenName);
        
        if (!token) {
            throw new Error('ไม่พบ token การเข้าสู่ระบบ กรุณาเข้าสู่ระบบใหม่');
        }
        
        return axios.create({
            baseURL: Config.apiUrl,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    };
    
    // 🔥 handleAuthError ถูกห่อหุ้มแล้ว (จากขั้นตอนก่อนหน้า)
    const handleAuthError = useCallback((err: unknown): boolean => { 
        if (axios.isAxiosError(err) && err.response) { 
            if (err.response.status === 401) {
                localStorage.removeItem(Config.tokenName);
                Swal.fire({
                    title: 'เซสชันหมดอายุ',
                    text: 'กรุณาเข้าสู่ระบบใหม่',
                    icon: 'warning',
                    confirmButtonText: 'ไปหน้าเข้าสู่ระบบ'
                }).then(() => {
                    router.push('/signin'); 
                });
                return true;
            }
        }
        return false;
    }, [router]);

    // ---- Utility Functions (แก้ไข: ห่อหุ้มด้วย useCallback) ----
    // แก้ไข Error 6, 7
    const showError = useCallback((message: string) => {
        setError(message)
        setSuccess('')
    }, [setError, setSuccess])
    
    const showSuccess = useCallback((message: string) => {
        setSuccess(message)
        setError('')
    }, [setSuccess, setError])

    const clearMessages = useCallback(() => {
        setError('')
        setSuccess('')
    }, [setError, setSuccess])
    
    // คำนวณยอดรวมสินค้า - ใช้ useCallback และกำหนด Return Type ชัดเจน (แก้ไข Error 1, 5)
    const calculateTotal = useCallback((): CalculatedTotals => {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
        
        const memberPoints = selectedMember?.points ?? 0;
        // ใช้แต้มได้สูงสุดเท่ากับยอดรวม (subtotal) หรือแต้มที่มี
        const maxPointsToRedeem = Math.min(memberPoints, subtotal)
        // ใช้แต้มที่ขอใช้ได้ไม่เกินแต้มสูงสุดที่ redeem ได้
        const actualPointsToRedeem = Math.min(pointsToRedeem, maxPointsToRedeem) 
        
        const discount = actualPointsToRedeem // ส่วนลดเป็นจำนวนเงิน
        const total = subtotal - discount
        
        return {
            subtotal,
            discount,
            total: Math.max(0, total), 
            maxRedeemablePoints: maxPointsToRedeem
        }
    }, [cart, pointsToRedeem, selectedMember]) // Dependencies (Error 2, 3, 4) ถูกรวมไว้แล้ว

    const { subtotal, discount, total, maxRedeemablePoints } = calculateTotal()
    
    // คำนวณเงินทอน
    const change = typeof cashPaid === 'number' && total > 0 && cashPaid >= total
        ? cashPaid - total
        : 0

    // ---- Effects ----
    useEffect(() => {
        // ตรวจสอบ token เมื่อ component โหลด
        const token = localStorage.getItem(Config.tokenName);
        if (!token) {
            Swal.fire({
                title: 'ต้องเข้าสู่ระบบ',
                text: 'กรุณาเข้าสู่ระบบเพื่อใช้งานระบบ POS',
                icon: 'warning',
                confirmButtonText: 'ไปหน้าเข้าสู่ระบบ'
            }).then(() => {
                router.push('/signin');
            });
        }
    }, [router]);

    useEffect(() => {
        // หาก pointsToRedeem เกินขีดจำกัด ให้ปรับลงมา
        if (pointsToRedeem > maxRedeemablePoints) {
            if (pointsToRedeem > 0) {
                 setPointsToRedeem(0)
                 // showError ตอนนี้เป็น stable function แล้ว
                 if(cart.length > 0) showError('การใช้แต้มถูกยกเลิก เนื่องจากยอดซื้อไม่เพียงพอหรือแต้มหมด') 
            }
        }
        // Dependencies ถูกเพิ่มอย่างถูกต้อง รวมถึง showError ที่ตอนนี้ Stable แล้ว
    }, [cart.length, selectedMember, pointsToRedeem, maxRedeemablePoints, showError]) 

    useEffect(() => {
        // ปรับ cashPaid เมื่อเปลี่ยนวิธีการจ่ายเงิน
        if (paymentMethod === 'transfer') {
            setCashPaid(total);
        } else if (paymentMethod === 'cash' && typeof cashPaid === 'number' && cashPaid < total) { 
            setCashPaid(''); 
        }
    }, [paymentMethod, total, cashPaid]); 
    

    // ---- API Functions ----

    const searchMember = async (query: string) => {
        const trimmedQuery = query.trim()
        if (!trimmedQuery) {
            showError('กรุณากรอกเบอร์โทรศัพท์หรืออีเมล')
            return
        }

        setLoading(true)
        clearMessages() // Stable function
        setSelectedMember(null) 

        try {
            const url = Config.apiUrl + `/api/sale/search/member?q=${encodeURIComponent(trimmedQuery)}`
            const response = await axios.get(url)

            if (response.status === 200 && response.data?.id) {
                const memberData = response.data as MemberSearchInfo 

                setSelectedMember({
                    id: memberData.id,
                    name: memberData.name || 'ไม่ระบุชื่อ',
                    email: memberData.email,
                    phone: memberData.phone,
                    points: memberData.points || 0
                })
                showSuccess(`พบข้อมูลสมาชิก: ${memberData.name || memberData.phone}`) // Stable function
            } else {
                showError('ไม่พบสมาชิก') // Stable function
                setSelectedMember(null)
            }
        } catch (err: unknown) { 
            if (handleAuthError(err)) return; 
            
            let displayMessage: string;
            const defaultError = 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ';

            if (axios.isAxiosError(err)) {
                
                const serverData = err.response?.data as { message?: string, error?: string };
                
                displayMessage = serverData?.message 
                    || serverData?.error 
                    || err.message 
                    || defaultError;

            } else if (err instanceof Error) {
                displayMessage = err.message;
            } else {
                displayMessage = defaultError;
            }
        
            showError(`ไม่สามารถค้นหาสมาชิกได้: ${displayMessage}`); // Stable function
            setSelectedMember(null);
        } finally {
            setLoading(false)
        }
    }

    const searchBooks = useCallback(async (query: string) => {
        const trimmedQuery = query.trim()
        if (!trimmedQuery) {
            setBooks([])
            return
        }

        setLoading(true)
        clearMessages() // Stable function

        try {
            const url = Config.apiUrl + `/api/sale/search/book?q=${encodeURIComponent(trimmedQuery)}`
            const response = await axios.get(url)

            const activeBooks = Array.isArray(response.data)
                ? response.data.filter((book: BookInterface) => book.status === 'active' && book.qty > 0)
                : []

            setBooks(activeBooks)

            if (activeBooks.length === 0) {
                if (trimmedQuery) {
                    showError('ไม่พบหนังสือที่ค้นหา หรือหนังสือหมด') // Stable function
                }
            }
        } catch (err: unknown) { 
            if (handleAuthError(err)) return; 
            
            let displayMessage: string;
            const defaultError = 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ';

            if (axios.isAxiosError(err)) {
                
                const serverData = err.response?.data as { message?: string, error?: string };
                
                displayMessage = serverData?.message 
                    || serverData?.error 
                    || err.message 
                    || defaultError;

            } else if (err instanceof Error) {
                displayMessage = err.message;
            } else {
                displayMessage = defaultError;
            }
            
            showError(`ไม่สามารถค้นหาหนังสือได้: ${displayMessage}`); // Stable function
            setBooks([]);
        } finally {
            setLoading(false)
        }
    }, [handleAuthError, clearMessages, showError]); // Dependencies ถูกต้องแล้ว

    /**
      * ฟังก์ชัน Process Sale ที่แก้ไขให้ส่ง Authorization Header
      */
    const processSale = async () => {
        if (cart.length === 0) {
            showError('กรุณาเพิ่มสินค้าในตะกร้า')
            return
        }
        
        if (total <= 0) {
            showError('ยอดรวมสุทธิเป็น 0 กรุณาตรวจสอบรายการ')
            return
        }

        if (paymentMethod === 'cash' && (typeof cashPaid !== 'number' || cashPaid < total)) {
            showError(`กรุณากรอกเงินสดรับ ไม่น้อยกว่า ฿${total.toFixed(2)}`)
            return
        }

        const saleData = {
            memberId: selectedMember?.id || null,
            paymentMethod,
            items: cart.map(item => ({
                bookId: item.bookId,
                qty: item.qty,
            })),
            pointsToRedeem: pointsToRedeem,
            cashPaid: paymentMethod === 'cash' && typeof cashPaid === 'number' ? cashPaid : total 
        }

        setLoading(true)
        clearMessages() // Stable function

        try {
            const authenticatedAxios = createAuthenticatedAxios();
            const response = await authenticatedAxios.post('/api/sale/create', saleData);

            if (response.status === 201 || response.status === 200) {
                const saleResult = response.data.data
                
                const finalChange = paymentMethod === 'cash' && typeof cashPaid === 'number' && cashPaid > total
                    ? cashPaid - total
                    : 0;

                Swal.fire({
                    title: 'ขายสำเร็จ!',
                    html: `
                        <p>เลขที่บิล: <strong>${saleResult.id || 'N/A'}</strong></p>
                        <p>ยอดรวมสุทธิ: <strong>฿${saleResult.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></p>
                        ${saleResult.earnedPoints > 0 ? `<p class="text-green-600">ได้รับแต้มเพิ่ม: +${saleResult.earnedPoints.toLocaleString()} แต้ม</p>` : ''}
                        ${saleResult.newPoints !== undefined ? `<p class="text-blue-600">แต้มสะสมใหม่: ${saleResult.newPoints.toLocaleString()} แต้ม</p>` : ''}
                        ${paymentMethod === 'cash' && finalChange > 0 ? `<p class="text-xl text-green-700 font-bold mt-2">เงินทอน: ฿${finalChange.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>` : ''}
                    `,
                    icon: 'success',
                    confirmButtonText: 'ตกลง'
                })

                
                if (selectedMember && saleResult?.newPoints !== undefined) {
                    setSelectedMember({
                        ...selectedMember,
                        points: saleResult.newPoints
                    } as MemberSearchInfo) 
                }
                
                resetForm()
            }
        } catch (err: unknown) { 
            if (handleAuthError(err)) return;
                
            let errorMessage = 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ';

            if (axios.isAxiosError(err)) { 

                if (err.message === 'ไม่พบ token การเข้าสู่ระบบ กรุณาเข้าสู่ระบบใหม่') {
                    router.push('/signin');
                    return;
                }

                if (err.response?.data?.message) {
                    errorMessage = err.response.data.message; 
                } else if (err.message) {
                    errorMessage = err.message;
                }

            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: `ไม่สามารถทำการขายได้: ${errorMessage}`,
                icon: 'error'
            });
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setCart([])
        setPointsToRedeem(0)
        setBooks([])
        setBookSearch('')
        setMemberSearch('')
        setPaymentMethod('cash')
        setCashPaid('')
        clearMessages() // Stable function
    }

    // ---- Cart and Points Logic ----

    /**
      * เพิ่มสินค้าลงในตะกร้า
      */
    const addToCart = (book: BookInterface) => { 
        if (book.qty <= 0) {
            showError('สินค้าหมด') // Stable function
            return
        }

        const existingItem = cart.find(item => item.bookId === book.id)

        if (existingItem) {
            const newQty = existingItem.qty + 1
            if (newQty <= book.qty) {
                setCart(cart.map(item =>
                    item.bookId === book.id
                        ? { ...item, qty: newQty }
                        : item
                ))
                showSuccess(`เพิ่ม ${book.name} ในตะกร้าแล้ว (${newQty} เล่ม)`) // Stable function
            } else {
                showError(`สินค้าไม่เพียงพอ (คงเหลือ ${book.qty} เล่ม)`) // Stable function
            }
        } else {
            const newItem: CartItemInterface = { 
                bookId: book.id,
                name: book.name,
                price: book.price,
                qty: 1,
                maxQty: book.qty,
            }
            setCart([...cart, newItem])
            showSuccess(`เพิ่ม ${book.name} ในตะกร้าแล้ว`) // Stable function
        }
    }

    /**
      * อัพเดตจำนวนสินค้าในตะกร้า
      */
    const updateCartQty = (bookId: string, newQty: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.bookId === bookId) {
                    const validQty = Math.max(0, Math.min(newQty, item.maxQty))
                    
                    if (validQty < newQty && newQty > 0) {
                        showError(`จำนวนเกินที่มีในคลัง (คงเหลือ ${item.maxQty} เล่ม)`) // Stable function
                    }
                    
                    return { ...item, qty: validQty }
                }
                return item
            }).filter(item => item.qty > 0) 

            const removedItem = prevCart.find(item => item.bookId === bookId && newQty <= 0)
            if (removedItem && removedItem.qty > 0) {
                showSuccess(`ลบ ${removedItem.name} ออกจากตะกร้าแล้ว`) // Stable function
            }
            
            return updatedCart
        })
    }
    
    const removeFromCart = (bookId: string) => {
        const item = cart.find(item => item.bookId === bookId)
        setCart(cart.filter(item => item.bookId !== bookId))
        if (item) {
            showSuccess(`ลบ ${item.name} ออกจากตะกร้าแล้ว`) // Stable function
        }
    }

    const handlePointsChange = (points: string) => {
        if (!selectedMember) {
            showError('กรุณาเลือกสมาชิกก่อน') // Stable function
            setPointsToRedeem(0)
            return
        }

        const numPoints = Math.max(0, parseInt(points) || 0)
        
        if (numPoints > maxRedeemablePoints) {
            showError(`ใช้แต้มได้สูงสุด ${maxRedeemablePoints.toLocaleString()} แต้ม`) // Stable function
            setPointsToRedeem(maxRedeemablePoints)
            return
        }
        
        if (numPoints > (selectedMember?.points ?? 0)) {
            showError(`แต้มสะสมไม่พอ (มี ${selectedMember?.points?.toLocaleString() ?? 0} แต้ม)`) // Stable function
            setPointsToRedeem(selectedMember?.points ?? 0)
            return
        }

        setPointsToRedeem(numPoints)
        if (numPoints === 0 && pointsToRedeem !== 0) {
            showSuccess('ล้างการใช้แต้มแล้ว') // Stable function
        }
    }

    const useAllPoints = () => {
        if (!selectedMember) {
            showError('กรุณาเลือกสมาชิกก่อน') // Stable function
            return
        }
        
        if (maxRedeemablePoints > 0) {
            setPointsToRedeem(maxRedeemablePoints)
            showSuccess(`ใช้แต้มทั้งหมด ${maxRedeemablePoints.toLocaleString()} แต้ม`) // Stable function
        } else {
            showError('ไม่สามารถใช้แต้มได้ (ยอดซื้อเป็น 0 หรือแต้มหมด)') // Stable function
        }
    }

    // ---- Effects for Auto Search & Auto Clear Messages ----
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (bookSearch.trim()) {
                searchBooks(bookSearch)
            } else {
                setBooks([])
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [bookSearch, searchBooks]) 

    useEffect(() => {
        if (success || error) {
            const timeoutId = setTimeout(clearMessages, 4000) // Stable function
            return () => clearTimeout(timeoutId)
        }
    }, [success, error, clearMessages]) // clearMessages ถูกเพิ่มเป็น dependency
    
    // ---- JSX Component Return ----
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        ระบบขายหน้าร้าน (POS)
                    </h1>
                    <p className="text-gray-600">Point of Sale System</p>
                </div>

                {/* Alert Messages */}
                {(error || success) && (
                    <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 shadow-lg ${
                        error
                            ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200'
                            : 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200'
                    }`}>
                        <i className={`fa ${error ? 'fa-exclamation-triangle' : 'fa-check-circle'} flex-shrink-0`}></i>
                        <span className="flex-1 font-medium">{error || success}</span>
                        <button
                            onClick={clearMessages} // Stable function
                            className="text-2xl hover:bg-white hover:bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 text-gray-500"
                        >
                            &times;
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel - Search */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Member Search */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4">
                                    <i className="fa fa-user text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    ข้อมูลสมาชิก
                                </h2>
                            </div>
                            
                            <div className="flex gap-3 mb-6">
                                <input
                                    type="text"
                                    placeholder="ค้นหาด้วยเบอร์โทรหรืออีเมล..."
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                                    value={memberSearch}
                                    onChange={(e) => setMemberSearch(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && searchMember(memberSearch)}
                                />
                                <button
                                    onClick={() => searchMember(memberSearch)}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 flex items-center gap-2 disabled:opacity-50 transition-all duration-200"
                                    disabled={loading || !memberSearch.trim()}
                                >
                                    <i className="fa fa-search"></i>
                                    {loading && memberSearch.trim() ? 'ค้นหา...' : 'ค้นหา'}
                                </button>
                            </div>

                            {selectedMember && (
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-blue-800">{selectedMember.name}</h3>
                                            <p className="text-blue-600">
                                                <i className="fa fa-phone mr-2"></i>
                                                {selectedMember.phone}
                                            </p>
                                            {selectedMember.email && (
                                                <p className="text-blue-600">
                                                    <i className="fa fa-envelope mr-2"></i>
                                                    {selectedMember.email}
                                                </p>
                                            )}
                                            <div className="inline-flex items-center text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg font-medium">
                                                <i className="fa fa-star mr-2"></i>
                                                <span className="font-bold">{selectedMember.points.toLocaleString()} แต้ม</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedMember(null)
                                                setMemberSearch('')
                                                setPointsToRedeem(0)
                                                showSuccess('ยกเลิกการเลือกสมาชิกแล้ว') // Stable function
                                            }}
                                            className="text-xl text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                                            title="ยกเลิกการเลือกสมาชิก"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Book Search */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full mr-4">
                                    <i className="fa fa-search text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                    ค้นหาหนังสือ
                                </h2>
                            </div>
                            
                            <input
                                type="text"
                                placeholder="ค้นหาด้วยชื่อหนังสือ, รหัสสินค้าหรือISBN..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white mb-6"
                                value={bookSearch}
                                onChange={(e) => setBookSearch(e.target.value)}
                            />

                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {loading && bookSearch.trim() && (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
                                        <p className="text-gray-500 mt-2">กำลังค้นหา...</p>
                                    </div>
                                )}
                                
                                {books.length === 0 && bookSearch.trim() && !loading && (
                                    <div className="text-center py-12">
                                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                            <i className="fa fa-book text-4xl text-gray-400"></i>
                                        </div>
                                        <p className="text-gray-500 text-lg">ไม่พบสินค้าที่ค้นหา</p>
                                    </div>
                                )}
                                
                                {books.map((book) => (
                                    <div key={book.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                                            {book.image ? (
                                                <img 
                                                    src={Config.apiUrl + '/public/uploads/' + book.image} 
                                                    alt={book.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <i className="fa fa-book text-gray-400"></i>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-gray-800">{book.name}</h4>
                                            <p className="text-blue-600 font-semibold text-lg">
                                                ฿{book.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                คงเหลือ: {book.qty.toLocaleString()} ชิ้นหรือเล่ม
                                            </p>
                                            {book.isbn && (
                                                <p className="text-xs text-gray-500">รหัสสินค้าหรือISBN: {book.isbn}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => addToCart(book)}
                                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 flex items-center gap-2 disabled:bg-gray-400 transition-all duration-200"
                                            disabled={book.qty <= 0}
                                        >
                                            <i className="fa fa-plus-circle"></i>
                                            เพิ่ม
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Cart & Payment */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-to-r from-purple-500 to-red-600 p-3 rounded-full mr-4">
                                    <i className="fa fa-shopping-cart text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                                    ตะกร้าสินค้า ({cart.length})
                                </h2>
                            </div>
                            
                            {/* Cart List */}
                            <div className={`space-y-4 ${cart.length > 0 ? 'mb-6 max-h-72 overflow-y-auto pr-2' : ''}`}>
                                {cart.length === 0 ? (
                                    <div className="text-center py-10 text-gray-500 italic bg-gray-50 rounded-xl">
                                        <i className="fa fa-info-circle mr-2"></i>
                                        ยังไม่มีสินค้าในตะกร้า
                                    </div>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.bookId} className="flex items-center gap-3 border-b border-gray-100 pb-3">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                                                <p className="text-sm text-blue-600">
                                                    ฿{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                            <div className="flex items-center border border-gray-300 rounded-lg">
                                                <button
                                                    onClick={() => updateCartQty(item.bookId, item.qty - 1)}
                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.qty}
                                                    onChange={(e) => updateCartQty(item.bookId, parseInt(e.target.value) || 0)}
                                                    className="w-12 text-center border-x border-gray-300 focus:outline-none"
                                                    min="1"
                                                    max={item.maxQty}
                                                    onFocus={(e) => e.target.select()}
                                                />
                                                <button
                                                    onClick={() => updateCartQty(item.bookId, item.qty + 1)}
                                                    disabled={item.qty >= item.maxQty}
                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-50"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="font-semibold text-gray-700 text-lg w-20 text-right">
                                                ฿{(item.price * item.qty).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </p>
                                            <button
                                                onClick={() => removeFromCart(item.bookId)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                                title="ลบออกจากตะกร้า"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Redemption Section */}
                            {selectedMember && cart.length > 0 && (
                                <div className="mb-6 pt-4 border-t border-gray-100">
                                    <h4 className="font-bold text-gray-700 mb-3 flex items-center justify-between">
                                        <span className="flex items-center">
                                            <i className="fa fa-gift text-yellow-500 mr-2"></i>
                                            ใช้แต้มสะสม
                                        </span>
                                        <span className="text-sm font-normal text-gray-500">
                                            (มี: {selectedMember.points.toLocaleString()} แต้ม)
                                        </span>
                                    </h4>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder={`สูงสุด ${maxRedeemablePoints.toLocaleString()}`}
                                            className="flex-1 px-4 py-3 border border-yellow-300 rounded-xl focus:border-yellow-500 focus:outline-none bg-yellow-50 text-yellow-800 font-semibold"
                                            value={pointsToRedeem > 0 ? pointsToRedeem.toString() : ''}
                                            onChange={(e) => handlePointsChange(e.target.value)}
                                            min="0"
                                            max={maxRedeemablePoints}
                                        />
                                        <button
                                            onClick={useAllPoints}
                                            className="px-4 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 disabled:opacity-50 transition-all duration-200 text-sm"
                                            disabled={maxRedeemablePoints === 0}
                                        >
                                            ใช้ทั้งหมด
                                        </button>
                                    </div>
                                    {discount > 0 && (
                                        <p className="text-sm text-green-600 mt-2 font-medium">
                                            ส่วนลดแต้ม: ฿{discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </p>
                                    )}
                                </div>
                            )}


                            {/* Summary Totals */}
                            <div className="space-y-2 border-t pt-4 border-gray-200">
                                <div className="flex justify-between text-lg text-gray-600">
                                    <span>ยอดรวมสินค้า (Subtotal)</span>
                                    <span className="font-medium">฿{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-lg text-red-500">
                                        <span>ส่วนลด (Redeem Points)</span>
                                        <span className="font-medium">- ฿{discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-2xl font-bold pt-2 border-t border-gray-200">
                                    <span className="text-gray-800">ยอดรวมสุทธิ (Net Total)</span>
                                    <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                                        ฿{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h4 className="font-bold text-gray-700 mb-3">วิธีการชำระเงิน</h4>
                                <div className="flex gap-4 mb-4">
                                    <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                                        paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cash"
                                            checked={paymentMethod === 'cash'}
                                            onChange={() => setPaymentMethod('cash')}
                                            className="hidden"
                                        />
                                        <i className="fa fa-money-bill-wave mr-2"></i> เงินสด
                                    </label>
                                    <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                                        paymentMethod === 'transfer' ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="transfer"
                                            checked={paymentMethod === 'transfer'}
                                            onChange={() => setPaymentMethod('transfer')}
                                            className="hidden"
                                        />
                                        <i className="fa fa-qrcode mr-2"></i> โอนเงิน
                                    </label>
                                </div>

                                {paymentMethod === 'cash' && total > 0 && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">เงินสดรับ (Cash Paid)</label>
                                        <input
                                            type="number"
                                            placeholder={`ต้องจ่ายอย่างน้อย ฿${total.toFixed(2)}`}
                                            className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:outline-none text-xl font-bold text-green-700"
                                            value={cashPaid}
                                            onChange={(e) => setCashPaid(parseFloat(e.target.value) || '')}
                                            min={total}
                                            onFocus={(e) => e.target.select()}
                                        />
                                        <div className="flex justify-end mt-2">
                                            <button 
                                                onClick={() => setCashPaid(total)}
                                                className="text-sm text-blue-500 hover:text-blue-700"
                                                title="กรอกพอดี"
                                            >
                                                จ่ายพอดี
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                {paymentMethod === 'cash' && change > 0 && (
                                    <div className="flex justify-between text-2xl font-bold text-green-600 bg-green-50 p-3 rounded-xl mb-4">
                                        <span>เงินทอน</span>
                                        <span>฿{change.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                )}
                            </div>

                            {/* Process Sale Button */}
                            <button
                                onClick={processSale}
                                className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xl font-bold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-red-300/50 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-3"
                                disabled={loading || cart.length === 0 || (paymentMethod === 'cash' && (typeof cashPaid !== 'number' || cashPaid < total))}
                            >
                                <i className="fa fa-cash-register"></i>
                                {loading ? 'กำลังดำเนินการ...' : `ชำระเงิน ฿${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}