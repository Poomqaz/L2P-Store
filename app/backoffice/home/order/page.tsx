'use client'

import { Config } from "@/app/config";
import { OrderInterface } from "@/app/interface/OrderInterface"
import { ErrorInterface } from "@/app/interface/ErrorInterface";
import axios from "axios";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import Modal from "../components/Modal";

// --------------------------------------------------
// *** ค่าคงที่ค่าขนส่ง (Shipping Fee Constant) ***
const SHIPPING_FEE = 50; 
// --------------------------------------------------

export default function Order() {
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [order, setOrder] = useState<OrderInterface>();
    const [trackCode, setTrackCode] = useState(''); 
    const [express, setExpress] = useState('');
    const [remark, setRemark] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    // Helper: จัดรูปแบบสกุลเงิน
    const formatCurrency = (amount: number | undefined) => {
        if (amount === undefined || amount === null) return '฿0.00';
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    // Helper: คำนวณแต้มจากยอดซื้อ (100 บาท = 1 แต้ม)
    const calculatePoints = (amount: number): number => {
        // ใช้ยอดรวมที่รวมค่าขนส่งแล้วในการคำนวณแต้ม
        return Math.floor(amount / 100);
    }
    
    // Helper: คำนวณยอดชำระเงินจริงรวมค่าขนส่ง
    const calculateFinalTotal = (order: OrderInterface | undefined): number => {
        // ถ้าสถานะเป็น 'cancel' ให้ใช้ total เดิม หรือ 0
        if (!order || order.status === 'cancel') {
            return order?.total ?? 0;
        }
        // ยอดชำระเงินจริง = ยอดรวมสินค้าหลังส่วนลด (order.total จาก API) + ค่าขนส่ง
        return (order.total ?? 0) + SHIPPING_FEE;
    };

    const fetchData = async () => {
        try {
            const url = Config.apiUrl + '/api/order/list';
            const token = localStorage.getItem(Config.tokenName);
            const headers = {
                'Authorization': 'Bearer ' + token
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
                        const amount = orderDetail.amount ?? (qty * price); 

                        orderDetail.amount = amount;

                        sum += amount;
                    }

                    order.sum = sum; // ยอดรวมสินค้า (ก่อนส่วนลด/ค่าขนส่ง)

                    // แปลสถานะ
                    if (order.status === 'cancel') {
                        order.statusText = 'ยกเลิก';
                    } else if (order.status === 'paid') {
                        order.statusText = 'ได้รับเงินแล้ว';
                    }else if (order.status === 'send') {
                        order.statusText = 'จัดส่งสินค้าแล้ว';
                    }

                    rows.push(order);
                }

                setOrders(rows);
            }
        } catch (err: unknown) {
             Swal.fire({
                 title: 'error',
                 icon: 'error',
                 text: (err as ErrorInterface).message
             })
        }
    }

    const openModal = (order: OrderInterface) => {
        setShowModal(true);
        setOrder(order);
        // แก้ไข: เปลี่ยน traceCode เป็น trackCode 
        setTrackCode(order.trackCode || ''); 
        setExpress(order.express || '');
        setRemark(order.remark || '');
    }

    const closeModal = () => {
        setShowModal(false);
        setOrder(undefined);
    }
    
    // Helper: จัดรูปแบบวันที่สำหรับใบสั่งซื้อ (แก้ไขให้รับได้ทั้ง Date object และ string)
    const formatDate = (dateValue: Date | string) => {
        const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    /**
     * ฟังก์ชันสำหรับสร้างและสั่งพิมพ์ใบสั่งซื้อโดยใช้ Iframe
     */
    const handlePrint = () => {
        if (!order) return;

        // --- เตรียมข้อมูล ---
        const orderStatusText = order.statusText || 'ไม่ระบุ';
        const productTotal = order.sum || 0; // ยอดรวมสินค้า
        const productNetTotal = order.total || 0; // ยอดรวมสินค้าหลังส่วนลด (ก่อนค่าขนส่ง)
        
        // ส่วนลด/อื่นๆ: (ยอดรวมสินค้า) - (ยอดรวมสินค้าหลังส่วนลด)
        const discountAmount = productTotal - productNetTotal;
        
        // ค่าขนส่ง (จะแสดงเฉพาะเมื่อไม่ได้ยกเลิก)
        const shippingFeeToDisplay = order.status !== 'cancel' ? SHIPPING_FEE : 0;
        
        // ยอดชำระเงินจริง (รวมค่าขนส่งแล้ว)
        const finalPaidAmount = calculateFinalTotal(order);

        // --- 1. สร้าง HTML Content สำหรับพิมพ์ (ใช้ Template Literal) ---
        const printHtmlContent = `
            <div style="padding: 20px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
                <h2 style="text-align: center; font-size: 20px; margin-bottom: 20px; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 10px;">ใบสั่งซื้อ (Order Invoice) #${order.id}</h2>

                <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                    <div style="flex-basis: 48%; border-right: 1px solid #000; padding-right: 10px;">
                        <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">ข้อมูลการสั่งซื้อ</h3>
                        <div><strong>วันที่สั่ง:</strong> ${formatDate(order.createdAt)}</div>
                        <div><strong>รหัสสั่งซื้อ:</strong> ${order.id}</div>
                        <div><strong>สถานะ:</strong> ${orderStatusText}</div>
                    </div>
                    <div style="flex-basis: 48%; padding-left: 10px;">
                        <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">ข้อมูลผู้รับสินค้า</h3>
                        <div><strong>ชื่อผู้รับ:</strong> ${order.customerName}</div>
                        <div><strong>เบอร์โทร:</strong> ${order.customerPhone}</div>
                        <div><strong>ที่อยู่จัดส่ง:</strong> ${order.customerAddress}</div>
                    </div>
                </div>

                ${order.status === 'send' ? `
                    <div style="margin-bottom: 20px; border: 1px solid #000; padding: 10px;">
                        <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">ข้อมูลการจัดส่ง</h3>
                        <div><strong>บริษัทขนส่ง:</strong> ${order.express || 'ไม่ระบุ'}</div>
                        <div><strong>รหัสติดตามพัสดุ:</strong> ${order.trackCode || 'ไม่มี'}</div> </div>
                ` : ''}

                <h3 style="font-weight: bold; font-size: 14px; margin-top: 20px; margin-bottom: 10px;">รายการสินค้า (${order.OrderDetail.length} รายการ)</h3>
                <table class="table print-table" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="width: 20%;">รหัสสินค้า</th>
                            <th style="text-align: left;">ชื่อสินค้า</th>
                            <th style="width: 15%; text-align: right;">ราคา/หน่วย</th>
                            <th style="width: 10%; text-align: center;">จำนวน</th>
                            <th style="width: 15%; text-align: right;">ยอดรวม</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.OrderDetail.map(detail => `
                            <tr>
                                <td>${detail.Book.isbn || '-'}</td>
                                <td style="text-align: left;">${detail.Book.name}</td>
                                <td style="text-align: right;">${formatCurrency(detail.price)}</td>
                                <td style="text-align: center;">${detail.qty}</td>
                                <td style="text-align: right;">${formatCurrency(detail.amount)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
                    <div style="width: 300px; border: 2px solid #000; padding: 10px; font-size: 14px;">
                        <p style="display: flex; justify-content: space-between;"><span>ยอดรวมสินค้า:</span> <strong>${formatCurrency(productTotal)}</strong></p>
                        
                        ${shippingFeeToDisplay > 0 ? `
                            <p style="display: flex; justify-content: space-between;"><span>ค่าขนส่ง:</span> <strong>${formatCurrency(shippingFeeToDisplay)}</strong></p>
                        ` : ''}

                        <p style="display: flex; justify-content: space-between; border-top: 1px solid #000; padding-top: 5px; margin-top: 5px;"><span>ส่วนลด/อื่นๆ:</span> <strong>${formatCurrency(discountAmount)}</strong></p>
                        
                        <p style="display: flex; justify-content: space-between; font-size: 18px; border-top: 2px solid #000; padding-top: 8px; margin-top: 8px;"><span>ยอดชำระเงินจริง:</span> <strong style="font-size: 20px; color: #000;">${formatCurrency(finalPaidAmount)}</strong></p>
                    </div>
                </div>

                ${order.remark ? `
                    <div style="margin-top: 20px; border: 1px solid #000; padding: 10px; font-size: 12px;">
                        <strong>หมายเหตุ:</strong> ${order.remark}
                    </div>
                ` : ''}
                
                <p style="text-align: center; margin-top: 30px; font-size: 10px;">*** ขอบคุณที่อุดหนุน ***</p>
            </div>
        `;

        // --- 2. สร้าง iframe สำหรับพิมพ์ ---
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        const iframeWindow = iframe.contentWindow;

        if (!iframeWindow) {
            document.body.removeChild(iframe);
            console.error('ไม่สามารถเข้าถึง iframe window ได้');
            return;
        }

        // --- 3. แทรกเนื้อหาและ CSS ---
        const documentContents = `
        <!DOCTYPE html>
        <html>
            <head>
            <title>ใบสั่งซื้อ #${order.id}</title>
            <style>
                /* ------------------------------------------- */
                /* CSS สำหรับการพิมพ์โดยเฉพาะ (B&W, ซ่อน UI) */
                /* ------------------------------------------- */
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    color-adjust: exact !important;
                    -webkit-print-color-adjust: exact !important;
                    filter: grayscale(100%) !important; 
                    font-size: 12px;
                }
                
                /* บังคับขาวดำ/ซ่อนสี */
                * {
                    color: #000 !important;
                    background-color: white !important;
                    box-shadow: none !important;
                    text-shadow: none !important;
                    border-color: #000 !important;
                }

                /* ลบ UI ที่ไม่ต้องการ */
                .print-hide, .print-hide * { 
                    display: none !important; 
                    visibility: hidden !important; 
                }
                
                /* ปรับรูปแบบตาราง */
                .print-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .print-table th, .print-table td {
                    border: 1px solid #000 !important;
                    padding: 5px;
                    text-align: right; 
                }
                .print-table th:nth-child(2), .print-table td:nth-child(2) {
                    text-align: left; /* name is left */
                }

                /* ปรับขนาดตัวอักษรให้เหมาะสมกับการพิมพ์ */
                h2 { font-size: 18px !important; }
                h3 { font-size: 14px !important; }
            </style>
            </head>
            <body>
            ${printHtmlContent}
            </body>
        </html>
        `;

        iframeWindow.document.open();
        iframeWindow.document.write(documentContents);
        iframeWindow.document.close();

        // --- 4. สั่งพิมพ์ ---
        iframeWindow.focus();
        iframeWindow.print();

        // --- 5. ลบ iframe ออก ---
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    };

    const handleCancel = async () => {
        try {
            const button = await Swal.fire({
                title: 'ยืนยันการยกเลิก',
                icon: 'question',
                text: 'คุณต้องการยกเลิกรายการนี้หรือไม่ ?',
                showConfirmButton: true,
                showCancelButton: true,
            });

            if (button.isConfirmed) {
                const url = Config.apiUrl + '/api/order/cancel/' + order?.id;
                const token = localStorage.getItem(Config.tokenName);
                const headers = {
                    'Authorization': 'Bearer ' + token
                };
                const response = await axios.delete(url, { headers });

                if (response.status === 200) {
                    closeModal();
                    fetchData();
                }
            }

        } catch (err: unknown) {
             Swal.fire({
                 title: 'error',
                 icon: 'error',
                 text: (err as ErrorInterface).message
             })
        }
    }

    const handlePaid = async () => {
        try {
            const button = await Swal.fire({
                title: 'ยืนยันการชำระเงิน',
                icon: 'question',
                text: 'ตรวจสอบได้รับเงินแล้ว',
                showConfirmButton: true,
                showCancelButton: true,
            });

            if (button.isConfirmed) {
                const url = Config.apiUrl + '/api/order/paid/' + order?.id;
                const token = localStorage.getItem(Config.tokenName);
                const headers = {
                    'Authorization': 'Bearer ' + token
                };
                const response = await axios.put(url, {}, { headers });

                if (response.status === 200) {
                    Swal.fire({
                        title:'บันทึกสำเร็จ',
                        icon: 'success',
                        text: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                    })
                    closeModal();
                    fetchData();
                }
            }

        } catch (err: unknown) {
             Swal.fire({
                 title: 'error',
                 icon: 'error',
                 text: (err as ErrorInterface).message
             })
        }
    }

    const handleSend = async () => {
        try {
            // คำนวณยอดรวมสุดท้าย (รวมค่าขนส่งแล้ว)
            const finalTotal = calculateFinalTotal(order);
            // คำนวณแต้มที่จะได้รับจากยอดรวมสุดท้าย
            const earnedPoints = calculatePoints(finalTotal);
            
            // แสดงข้อความยืนยันพร้อมแสดงแต้มที่จะได้
            const confirmMessage = earnedPoints > 0 
                ? `บันทึกการจัดส่งและให้แต้มรางวัล ${earnedPoints} แต้ม (จากยอดชำระเงินจริง ${finalTotal.toLocaleString()} บาท)`
                : 'บันทึกการจัดส่งสินค้า';

            const button = await Swal.fire({
                title: 'ยืนยันการจัดส่ง',
                icon: 'question',
                html: `
                    <div style="text-align: left;">
                        <p style="margin-bottom: 10px;">${confirmMessage}</p>
                        
                        ${order?.status !== 'cancel' && SHIPPING_FEE > 0 ? `
                            <div style="background: #f0f9ff; padding: 10px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 10px;">
                                <strong style="color: #1e40af;">🚚 ค่าขนส่ง: ${formatCurrency(SHIPPING_FEE)}</strong><br>
                                <span style="color: #1e40af;">ยอดชำระทั้งหมด: ${formatCurrency(finalTotal)}</span>
                            </div>
                        ` : ''}

                        ${earnedPoints > 0 ? `
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <strong style="color: #92400e;">🌟 แต้มรางวัล</strong><br>
                                <span style="color: #92400e;">ลูกค้าจะได้รับ ${earnedPoints} แต้ม</span><br>
                                <small style="color: #78716c;">อัตราการให้แต้ม: 100 บาท = 1 แต้ม</small>
                            </div>
                        ` : ''}
                    </div>
                `,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'ยืนยันการจัดส่ง',
                cancelButtonText: 'ยกเลิก',
                confirmButtonColor: '#10b981',
                cancelButtonColor: '#6b7280'
            });

            if (button.isConfirmed) {
                const url = Config.apiUrl + '/api/order/send/';
                const payload = {
                    // แก้ไข: ใช้ trackCode แทน traceCode
                    trackCode: trackCode, 
                    express: express,
                    remark: remark,
                    orderId: order?.id,
                    earnedPoints: earnedPoints, 
                    // ส่งยอดรวมสุดท้าย (รวมค่าขนส่ง) กลับไป backend ด้วย
                    orderAmount: finalTotal 
                }
                const token = localStorage.getItem(Config.tokenName);
                const headers = {
                    'Authorization': 'Bearer ' + token
                };
                const response = await axios.put(url, payload, { headers});

                if (response.status === 200) {
                    // แสดงข้อความสำเร็จพร้อมแต้มที่ได้รับ
                    const successMessage = earnedPoints > 0 
                        ? `บันทึกการจัดส่งเรียบร้อย<br><strong style="color: #f59e0b;">✨ ลูกค้าได้รับ ${earnedPoints} แต้มรางวัล</strong>`
                        : 'บันทึกการจัดส่งเรียบร้อยแล้ว';

                    await Swal.fire({
                        title: 'สำเร็จ!',
                        html: successMessage,
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false
                    });

                    closeModal();
                    fetchData();
                }
            }
        } catch (err: unknown) {
             Swal.fire({
                 title: 'error',
                 icon: 'error',
                 text: (err as ErrorInterface).message
             })
        }
    }

    return (
        <div className="container">
            <div className="title">รายการสั่งซื้อ</div>
            <table className="table">
                <thead>
                    <tr>
                        <th>วันที่</th>
                        <th>ผู้รับสินค้า</th>
                        <th>ที่อยู่จัดส่ง</th>
                        <th>เบอร์โทรติดต่อ</th>
                        <th>ยอดรวม (รวมค่าส่ง)</th>
                        <th>แต้มที่จะได้รับ</th>
                        <th>สถานะ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            {/* แก้ไข: ส่ง Date object หรือ string เข้า formatDate */}
                            <td>{formatDate(order.createdAt)}</td> 
                            <td>{order.customerName}</td>
                            <td>{order.customerAddress}</td>
                            <td>{order.customerPhone}</td>
                            <td className="text-right font-semibold">
                                {/* ใช้ final total */}
                                {formatCurrency(calculateFinalTotal(order))} 
                            </td>
                            <td className="text-center">
                                {/* ใช้ final total ในการคำนวณแต้ม */}
                                {order.status === 'send' ? (
                                    <span className="text-green-600 font-semibold">
                                        <i className="fa fa-check-circle mr-1"></i>
                                        ให้แล้ว {calculatePoints(calculateFinalTotal(order))} แต้ม
                                    </span>
                                ) : (
                                    <span className="text-amber-600 font-semibold">
                                        <i className="fa fa-star mr-1"></i>
                                        {calculatePoints(calculateFinalTotal(order))} แต้ม
                                    </span>
                                )}
                            </td>
                            <td>
                                <span className="flex items-center">
                                    {order.status === 'cancel' && <i className="fa fa-times text-red-500 mr-2"></i>}
                                    {order.status === 'paid' && <i className="fa fa-check text-blue-800 mr-2"></i>}
                                    {order.status === 'send' && <i className="fa fa-truck text-green-600 mr-2"></i>}
                                    {order.statusText}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => openModal(order)}>
                                    <i className="fa fa-file mr-2"></i>
                                    ดูข้อมูล
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <Modal title="รายการสินค้า" onClose={closeModal} size="xl">
                    <div className="print-hide">
                        <label>รหัสติดตามพัสดุ</label>
                        {/* แก้ไข: ใช้ trackCode แทน traceCode */}
                        <input value={trackCode} onChange={(e) => setTrackCode(e.target.value) } /> 
                    </div>
                    <div className="print-hide">
                        <label>บริษัทขนส่ง</label>
                        <input value={express} onChange={(e) => setExpress(e.target.value)} />
                    </div>
                    
                    {/* ซ่อนรูปสลิปตอนพิมพ์ */}
                    <div className="mb-3 print-hide">
                        <label>เอกสารการโอนเงิน</label>
                        <img src={Config.apiUrl + '/public/upload/slip/' + order?.slipImage}
                            alt="Slip Image"
                            className="w-[350px] rounded-xl" width={350} height={350}       
                        />
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th style={{ textAlign: 'right' }}>ราคา</th>
                                <th style={{ textAlign: 'right' }}>จำนวน</th>
                                <th style={{ textAlign: 'right' }}>ยอดรวม</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.OrderDetail.map((orderDetail) => (
                                <tr key={orderDetail.id}>
                                    <td>{orderDetail.Book.isbn}</td>
                                    <td>{orderDetail.Book.name}</td>
                                    <td className="text-right">{formatCurrency(orderDetail.price)}</td>
                                    <td className="text-right">{orderDetail.qty}</td>
                                    <td className="text-right">{formatCurrency(orderDetail.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-gray-400 justify-center mt-3 text-xl flex gap-3">
                        <span>ยอดรวมสินค้า:</span>
                        <span className="text-amber-300">{formatCurrency(order?.sum)}</span>
                        <span>บาท</span>
                    </div>

                    {/* แสดงค่าขนส่ง */}
                    {order?.status !== 'cancel' && SHIPPING_FEE > 0 && (
                        <div className="text-gray-400 justify-center mt-1 text-xl flex gap-3">
                            <span>ค่าขนส่ง:</span>
                            <span className="text-gray-500">{formatCurrency(SHIPPING_FEE)}</span>
                            <span>บาท</span>
                        </div>
                    )}
                    

                    <div className="text-white justify-center mt-2 text-2xl flex gap-3 bg-green-600 p-3 rounded-lg">
                        <i className="fa fa-money-bill-wave"></i>
                        <span>ยอดชำระเงินจริง:</span>
                        {/* ใช้ final total */}
                        <span className="font-bold">{formatCurrency(calculateFinalTotal(order))}</span>
                        <span>บาท</span>
                    </div>

                    {/* ซ่อนส่วนแต้มรางวัลตอนพิมพ์ */}
                    <div className="print-hide bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-4 mt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <i className="fa fa-star text-yellow-500 text-xl mr-3"></i>
                                <div>
                                    <h4 className="font-semibold text-gray-800">แต้มรางวัล</h4>
                                    <p className="text-sm text-gray-600">อัตราการให้แต้ม: 100 บาท = 1 แต้ม</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-amber-600">
                                    {/* ใช้ final total ในการคำนวณแต้ม */}
                                    {calculatePoints(calculateFinalTotal(order))} แต้ม
                                </div>
                                <div className="text-sm text-gray-500">
                                    จากยอดชำระเงินจริง {formatCurrency(calculateFinalTotal(order))}
                                </div>
                            </div>
                        </div>
                        {order?.status === 'send' && (
                            <div className="mt-3 p-2 bg-green-100 rounded-md">
                                <i className="fa fa-check-circle text-green-600 mr-2"></i>
                                <span className="text-green-700 text-sm font-medium">
                                    ได้ให้แต้มรางวัลแล้ว
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="print-hide">
                        <label>หมายเหตุ</label>
                        <input value={remark} onChange={(e) => setRemark(e.target.value)} />
                    </div>

                    <div className="mt-5 flex justify-center gap-2 print-hide">
                        <button className="modal-btn-order-cancel" onClick={handleCancel}>
                            <i className="fa fa-times mr-2"></i>
                            ยกเลิก
                        </button>
                        <button className="modal-btn-get-money" onClick={handlePaid}>
                            <i className="fa fa-check mr-2"></i>
                            ได้รับเงินแล้ว
                        </button>
                        <button 
                            className="modal-btn-send" 
                            onClick={handleSend}
                            disabled={order?.status === 'send'}
                        >
                            <i className="fa fa-circle-check mr-2"></i>
                            {order?.status === 'send' 
                                ? 'จัดส่งแล้ว' 
                                // ใช้ final total ในการแสดงแต้ม
                                : `จัดส่ง & ให้แต้ม (${calculatePoints(calculateFinalTotal(order))} แต้ม)`
                            }
                        </button>
                         {/* ปุ่มพิมพ์ใบสั่งซื้อ */}
                        <button 
                            onClick={handlePrint}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <i className="fa fa-print"></i>
                            พิมพ์ใบสั่งซื้อ
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    )
}