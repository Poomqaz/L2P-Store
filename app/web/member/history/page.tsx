'use client'

import { Config } from "@/app/config";
import { OrderInterface } from "@/app/interface/OrderInterface";
import axios from "axios";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { ErrorInterface } from "@/app/interface/ErrorInterface";

// *** ค่าคงที่ค่าจัดส่ง 50 บาท ***
const SHIPPING_FEE = 50; 

export default function History() {
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const url = Config.apiUrl + '/api/member/history';
            const headers = {
                'Authorization': 'Bearer ' + localStorage.getItem(Config.tokenMember)
            };
            const response = await axios.get(url, { headers });

            if (response.status === 200) {
                const rows = [];

                for (let i = 0; i < response.data.length; i++) {
                    const order = response.data[i];

                    let sum = 0;

                    for (let j = 0; j < order.OrderDetail.length; j++) {
                        const orderDetail = order.OrderDetail[j];
                        const price = orderDetail.price;
                        const qty = orderDetail.qty;
                        const amount = (qty * price);

                        orderDetail.amount = amount;

                        sum += amount;
                    }

                    order.sum = sum; // order.sum คือ ยอดรวมสินค้า (ไม่รวมค่าส่ง/ไม่รวมส่วนลด)

                    rows.push(order);
                }

                setOrders(rows);
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                icon: 'error',
                text: (err as ErrorInterface).message || 'ไม่สามารถโหลดข้อมูลได้',
                background: '#fff',
                confirmButtonColor: '#3b82f6'
            })
        } finally {
            setIsLoading(false);
        }
    }

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'fa-clock';
            case 'processing':
                return 'fa-cog fa-spin';
            case 'shipped':
                return 'fa-truck';
            case 'delivered':
                return 'fa-check-circle';
            case 'cancelled':
                return 'fa-times-circle';
            default:
                return 'fa-info-circle';
        }
    }

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    }

    const getStatus = (status: string) => { 
        switch (status?.toLowerCase()) {
            case 'cancel':
                return 'ยกเลิก';
            case 'paid':
                return 'ได้รับเงินแล้ว';
            case 'send':
                return 'จัดส่งสินค้าแล้ว';
            default: return 'รอดำเนินการ';
        }
    }

    const copyTrackingCode = (trackCode: string) => {
        navigator.clipboard.writeText(trackCode);
        Swal.fire({
            title: 'คัดลอกแล้ว!',
            text: 'คัดลอกรหัสติดตามสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            background: '#fff'
        });
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">กำลังโหลดข้อมูล...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full mr-4">
                            <i className="fa fa-history text-white text-2xl"></i>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ประวัติการสั่งซื้อ
                            </h1>
                            <p className="text-gray-600 mt-1">ติดตามสถานะและรายละเอียดคำสั่งซื้อของคุณ</p>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <i className="fa fa-shopping-bag text-gray-400 text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">ไม่พบประวัติการสั่งซื้อ</h3>
                        <p className="text-gray-500">คุณยังไม่เคยทำการสั่งซื้อสินค้า</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, orderIndex) => (
                            <div key={`order-${order.id}-${orderIndex}`} 
                                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                
                                {/* Order Header */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-100">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="flex items-center mb-4 md:mb-0">
                                            <div className="bg-white p-3 rounded-full shadow-md mr-4">
                                                <i className="fa fa-receipt text-blue-600 text-lg"></i>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    คำสั่งซื้อ #{order.id}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    <i className="fa fa-calendar mr-1"></i>
                                                    {formatDate(order.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-4">
                                            <div className={`px-4 py-2 rounded-full border text-sm font-semibold ${getStatusColor(order.status)}`}>
                                                <i className={`fa ${getStatusIcon(order.status)} mr-2`}></i>
                                                {getStatus(order.status)}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                    {/* ยอดรวมที่ลูกค้าชำระจริง (order.total คือ ยอดสินค้าหลังลด + SHIPPING_FEE) */}
                                                    ฿{(order.total + SHIPPING_FEE).toLocaleString()}
                                                </p>
                                                <p className="text-sm text-gray-500">ยอดชำระเงินจริง</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Info */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                        <div className="bg-blue-50 p-4 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <i className="fa fa-user text-blue-600 mr-2"></i>
                                                <span className="text-sm font-semibold text-gray-600">ผู้รับสินค้า</span>
                                            </div>
                                            <p className="font-medium text-gray-800">{order.customerName}</p>
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <i className="fa fa-phone text-green-600 mr-2"></i>
                                                <span className="text-sm font-semibold text-gray-600">เบอร์โทร</span>
                                            </div>
                                            <p className="font-medium text-gray-800">{order.customerPhone}</p>
                                        </div>

                                        <div className="bg-purple-50 p-4 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <i className="fa fa-truck text-purple-600 mr-2"></i>
                                                <span className="text-sm font-semibold text-gray-600">บริษัทขนส่ง</span>
                                            </div>
                                            <p className="font-medium text-gray-800">{order.express || 'ยังไม่ระบุ'}</p>
                                        </div>

                                        <div className="bg-orange-50 p-4 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <i className="fa fa-barcode text-orange-600 mr-2"></i>
                                                <span className="text-sm font-semibold text-gray-600">รหัสติดตาม</span>
                                            </div>
                                            {order.trackCode ? (
                                                <div className="flex items-center">
                                                    <p className="font-medium text-gray-800 mr-2">{order.trackCode}</p>
                                                    <button
                                                        onClick={() => copyTrackingCode(order.trackCode)}
                                                        className="text-orange-600 hover:text-orange-700 transition-colors"
                                                        title="คัดลอกรหัสติดตาม"
                                                    >
                                                        <i className="fa fa-copy"></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="font-medium text-gray-500">ยังไม่มีรหัสติดตาม</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Delivery Address */}
                                    <div className="bg-gray-50 p-4 rounded-xl mb-6">
                                        <div className="flex items-center mb-2">
                                            <i className="fa fa-map-marker-alt text-red-600 mr-2"></i>
                                            <span className="text-sm font-semibold text-gray-600">ที่อยู่จัดส่ง</span>
                                        </div>
                                        <p className="text-gray-800 leading-relaxed">{order.customerAddress}</p>
                                    </div>

                                    {/* Toggle Order Details Button */}
                                    <div className="flex justify-center mb-4">
                                        <button
                                            onClick={() => toggleOrderExpansion(order.id)}
                                            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                        >
                                            <i className={`fa ${expandedOrder === order.id ? 'fa-chevron-up' : 'fa-chevron-down'} mr-2`}></i>
                                            {expandedOrder === order.id ? 'ซ่อนรายละเอียดสินค้า' : 'ดูรายละเอียดสินค้า'}
                                        </button>
                                    </div>

                                    {/* Order Details Table */}
                                    {expandedOrder === order.id && (
                                        <div className="mt-6 animate-fadeIn">
                                            {/* NEW: คำนวณส่วนลด */}
                                            {(() => {
                                                // order.sum คือ ยอดรวมสินค้าก่อนลด
                                                // order.total คือ ยอดรวมสินค้าหลังลด (ไม่รวมค่าส่ง)
                                                const pointDiscount = (order.sum || 0) - (order.total || 0);
                                                
                                                return (
                                                    <>
                                                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-t-xl">
                                                            <h4 className="font-bold text-gray-800 flex items-center">
                                                                <i className="fa fa-list mr-2 text-blue-600"></i>
                                                                รายการสินค้า ({order.OrderDetail.length} รายการ)
                                                            </h4>
                                                        </div>
                                                        
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full bg-white">
                                                                <thead className="bg-gray-100">
                                                                    <tr>
                                                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">รหัสสินค้า</th>
                                                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ชื่อสินค้า</th>
                                                                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">ราคา</th>
                                                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">จำนวน</th>
                                                                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">ยอดรวม</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {order.OrderDetail.map((orderDetail, detailIndex) => (
                                                                        <tr key={`orderDetail-${order.id}-${orderDetail.id}-${detailIndex}`} 
                                                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                                            <td className="px-4 py-4">
                                                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
                                                                                    {orderDetail.Book.isbn}
                                                                                </span>
                                                                            </td>
                                                                            <td className="px-4 py-4">
                                                                                <div className="font-medium text-gray-800">
                                                                                    {orderDetail.Book.name}
                                                                                </div>
                                                                            </td>
                                                                            <td className="px-4 py-4 text-right">
                                                                                <span className="text-blue-600 font-semibold">
                                                                                    ฿{orderDetail.price.toLocaleString()}
                                                                                </span>
                                                                            </td>
                                                                            <td className="px-4 py-4 text-center">
                                                                                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-semibold">
                                                                                    {orderDetail.qty}
                                                                                </span>
                                                                            </td>
                                                                            <td className="px-4 py-4 text-right">
                                                                                <span className="text-purple-600 font-bold">
                                                                                    ฿{orderDetail.amount.toLocaleString()}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        
                                                        {/* *** ส่วนสรุปยอดรวม (Total Footer) *** */}
                                                        <div className="p-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
                                                            <div className="space-y-2">
                                                                {/* ยอดรวมสินค้า (Product Total) */}
                                                                <div className="flex justify-between items-center text-gray-700">
                                                                    <span className="text-lg font-medium">ยอดรวมสินค้า (ก่อนหักส่วนลด)</span>
                                                                    <span className="text-xl font-semibold">
                                                                        ฿{order.sum.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                
                                                                {/* NEW: ส่วนลดจากแต้ม (Points Discount) */}
                                                                {(pointDiscount > 0) && (
                                                                    <div className="flex justify-between items-center text-red-600">
                                                                        <span className="text-lg font-medium">ส่วนลดจากแต้ม</span>
                                                                        <span className="text-xl font-semibold">
                                                                            -฿{pointDiscount.toLocaleString()}
                                                                        </span>
                                                                    </div>
                                                                )}

                                                                {/* ค่าจัดส่ง (Shipping Fee) */}
                                                                <div className="flex justify-between items-center border-b pb-2 border-gray-200 text-gray-700">
                                                                    <span className="text-lg font-medium">ค่าจัดส่ง</span>
                                                                    <span className="text-xl font-semibold text-green-600">
                                                                        +฿{SHIPPING_FEE.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                
                                                                {/* ยอดชำระเงินจริง (Final Amount Paid) */}
                                                                <div className="flex justify-between items-center text-gray-800 pt-2">
                                                                    <span className="text-xl font-bold">ยอดชำระเงินจริง</span>
                                                                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                                                        {/* (order.total + SHIPPING_FEE) คือ ยอดชำระเงินจริง */}
                                                                        ฿{(order.total + SHIPPING_FEE).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    )
}