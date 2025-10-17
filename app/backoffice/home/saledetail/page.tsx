// 'use client';

// import { useState, useEffect } from 'react';
// import { Calendar, User, Book, ShoppingCart } from 'lucide-react';
// import { Config } from "@/app/config";
// import { SaleDetailInterface } from '@/app/interface/SaleDetailInterface';


// interface GroupedSale {
//   saleId: string;
//   sale: SaleDetailInterface['sale'];
//   details: SaleDetailInterface[];
//   totalItems: number;
//   totalQuantity: number;
// }

// interface ApiResponse {
//   success: boolean;
//   data: SaleDetailInterface[];
//   message: string;
// }

// export default function SaleDetailsPage() {
//   const [loading, setLoading] = useState(true);
//   const [groupedSales, setGroupedSales] = useState<GroupedSale[]>([]);
//   const [selectedSale, setSelectedSale] = useState<GroupedSale | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   const groupSalesBySaleId = (details: SaleDetailInterface[]) => {
//     const grouped = details.reduce((groups, detail) => {
//       const saleId = detail.saleId;
//       if (!groups[saleId]) {
//         groups[saleId] = [];
//       }
//       groups[saleId].push(detail);
//       return groups;
//     }, {} as Record<string, SaleDetailInterface[]>);

//     const groupedArray: GroupedSale[] = Object.entries(grouped).map(([saleId, details]) => {
//       const totalQuantity = details.reduce((sum, detail) => sum + detail.qty, 0);
//       return {
//         saleId,
//         sale: details[0].sale,
//         details,
//         totalItems: details.length,
//         totalQuantity
//       };
//     });

//     // เรียงตามวันที่ล่าสุดก่อน
//     groupedArray.sort((a, b) => new Date(b.sale.createdAt).getTime() - new Date(a.sale.createdAt).getTime());
//     setGroupedSales(groupedArray);
//   };

//   useEffect(() => {
//     const fetchAllSaleDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(Config.apiUrl + '/api/sale-detail');
//         const result: ApiResponse = await response.json();
        
//         if (result.success) {
//           groupSalesBySaleId(result.data);
//         }
//       } catch (err) {
//         console.error('Error fetching sale details:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllSaleDetails();
//   }, []);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('th-TH', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('th-TH', {
//       style: 'currency',
//       currency: 'THB'
//     }).format(amount);
//   };
  
//   // ฟังก์ชันช่วยแปลวิธีการชำระเงิน
//   const translatePaymentMethod = (method: string) => {
//     switch(method.toLowerCase()) {
//       case 'cash':
//         return 'เงินสด';
//       case 'transfer':
//         return 'โอนเงิน';
//       default:
//         return method;
//     }
//   }

//   const openModal = (groupedSale: GroupedSale) => {
//     setSelectedSale(groupedSale);
//     setShowModal(true);
//   };
  
//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedSale(null);
//   };

//   /**
//    * สร้าง iframe ชั่วคราวเพื่อแทรกเนื้อหาใบเสร็จและ CSS สำหรับพิมพ์โดยเฉพาะ
//    */
//   const handlePrint = () => {
//     if (!selectedSale) return;

//     const paymentMethodTH = translatePaymentMethod(selectedSale.sale.paymentMethod);
//     const adminNameOnly = selectedSale.sale.admin.name; // แสดงเฉพาะชื่อ

//     // 1. สร้าง HTML Content สำหรับพิมพ์โดยใช้ Template Literal 
//     // โค้ดนี้ถูกสร้างใหม่และมีการแก้ไขให้เป็นไปตามเงื่อนไข: 
//     // - วิธีชำระเงินเป็นภาษาไทย
//     // - ชื่อพนักงานแสดงแค่ชื่อ ไม่แสดง (admin level)
//     const printHtmlContent = `
//         <div class="p-6">
//             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div class="space-y-3">
//                     <h3 class="font-semibold text-gray-800 flex items-center gap-2 print-only-text">
//                         <Calendar class="h-4 w-4 text-blue-600 print-hide" />
//                         ข้อมูลการขาย
//                     </h3>
//                     <div class="bg-gray-50 p-4 rounded-lg space-y-2 print-force-bg-white print-border-black">
//                         <div><span class="font-medium">วันที่:</span> ${formatDate(selectedSale.sale.createdAt)}</div>
//                         <div><span class="font-medium">พนักงาน:</span> ${adminNameOnly}</div> 
//                         <div><span class="font-medium">วิธีชำระเงิน:</span> ${paymentMethodTH}</div> 
//                     </div>
//                 </div>

//                 <div class="space-y-3">
//                     <h3 class="font-semibold text-gray-800 flex items-center gap-2 print-only-text">
//                         <User class="h-4 w-4 text-green-600 print-hide" />
//                         ข้อมูลลูกค้า
//                     </h3>
//                     <div class="bg-gray-50 p-4 rounded-lg space-y-2 print-force-bg-white print-border-black">
//                         ${selectedSale.sale.member ? (
//                             `<div><span class="font-medium">ชื่อ:</span> ${selectedSale.sale.member.name || selectedSale.sale.member.username}</div>
//                              <div><span class="font-medium">เบอร์โทร:</span> ${selectedSale.sale.member.phone}</div>
//                              <div><span class="font-medium">แต้มคงเหลือ:</span> ${selectedSale.sale.member.points.toLocaleString()} แต้ม</div>`
//                         ) : (
//                             `<div class="text-gray-500">ลูกค้าทั่วไป</div>`
//                         )}
//                     </div>
//                 </div>
//             </div>

//             <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-blue-50 rounded-lg print-force-bg-white print-border-black">
//                 <div>
//                     <div class="text-sm text-blue-600 font-medium">เงินที่รับ</div>
//                     <div class="text-lg font-bold text-blue-800">${formatCurrency(selectedSale.sale.cashPaid)}</div>
//                 </div>
//                 <div>
//                     <div class="text-sm text-blue-600 font-medium">เงินทอน</div>
//                     <div class="text-lg font-bold text-blue-800">${formatCurrency(selectedSale.sale.change)}</div>
//                 </div>
//                 <div>
//                     <div class="text-sm text-blue-600 font-medium">แต้มที่ใช้</div>
//                     <div class="text-lg font-bold text-orange-600">${selectedSale.sale.pointUsed.toLocaleString()} แต้ม</div>
//                 </div>
//                 <div>
//                     <div class="text-sm text-green-600 font-medium">ยอดรวม</div>
//                     <div class="text-xl font-bold text-green-600">${formatCurrency(selectedSale.sale.total)}</div>
//                 </div>
//             </div>

//             <div class="space-y-4">
//                 <h4 class="font-semibold text-gray-800 flex items-center gap-2 print-only-text">
//                     <Book class="h-4 w-4 text-green-600 print-hide" />
//                     รายการสินค้า (${selectedSale.totalItems} รายการ, ${selectedSale.totalQuantity} ชิ้น)
//                 </h4>
                
//                 <table class="table">
//                     <thead>
//                         <tr>
//                             <th class="print-hide">รูปภาพ</th>
//                             <th>ชื่อหนังสือ</th>
//                             <th>รหัสสินค้าหรือISBN</th>
//                             <th>หมวดหมู่</th>
//                             <th style="text-align: right;">ราคา</th>
//                             <th style="text-align: right;">จำนวน</th>
//                             <th style="text-align: right;">ยอดรวม</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${selectedSale.details.map((detail) => (
//                             `<tr key="${detail.id}">
//                                 <td class="print-hide">
//                                     ${detail.book.image ? (
//                                         `<img src="${Config.apiUrl + '/public/uploads/' + detail.book.image}" alt="${detail.book.name}" class="w-12 h-16 object-cover rounded shadow-sm print-hide" />`
//                                     ) : ''}
//                                 </td>
//                                 <td>
//                                     <div class="font-medium">${detail.book.name}</div>
//                                     ${detail.book.description ? `<div class="text-sm text-gray-500 mt-1">${detail.book.description}</div>` : ''}
//                                 </td>
//                                 <td>${detail.book.isbn || '-'}</td>
//                                 <td>
//                                     ${detail.book.category ? (
//                                         `<span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">${detail.book.category}</span>`
//                                     ) : ''}
//                                 </td>
//                                 <td class="text-right">${formatCurrency(detail.price)}</td>
//                                 <td class="text-right">${detail.qty}</td>
//                                 <td class="text-right font-semibold">${formatCurrency(detail.qty * detail.price)}</td>
//                             </tr>`
//                         )).join('')}
//                     </tbody>
//                 </table>
//             </div>

//             ${selectedSale.sale.remark ? (
//                 `<div class="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg print-force-bg-white print-border-black">
//                     <div class="text-sm font-medium text-yellow-800">หมายเหตุ:</div>
//                     <div class="text-yellow-700 mt-1">${selectedSale.sale.remark}</div>
//                 </div>`
//             ) : ''}

//             <div class="mt-6 text-center">
//                 <div class="inline-block bg-green-100 border border-green-200 rounded-lg p-4 print-force-bg-white print-border-black">
//                     <div class="text-lg text-green-800">
//                         <span class="font-medium">ยอดรวมทั้งสิ้น:</span>
//                     </div>
//                     <div class="text-3xl font-bold text-green-600 mt-1">
//                         ${formatCurrency(selectedSale.sale.total)}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;


//     // 2. สร้าง iframe สำหรับพิมพ์
//     const iframe = document.createElement('iframe');
//     iframe.style.display = 'none'; // ซ่อน iframe
//     document.body.appendChild(iframe);
//     const iframeWindow = iframe.contentWindow;

//     if (!iframeWindow) {
//         document.body.removeChild(iframe);
//         console.error('ไม่สามารถเข้าถึง iframe window ได้');
//         return;
//     }
    
//     // 3. แทรกเนื้อหาและ CSS ที่จำเป็น
//     const documentContents = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>ใบเสร็จ #${selectedSale.saleId.slice(-8)}</title>
//           <style>
//             /* ------------------------------------------- */
//             /* CSS สำหรับการพิมพ์โดยเฉพาะ (B&W, ซ่อน UI) */
//             /* ------------------------------------------- */
//             body {
//               font-family: Arial, sans-serif;
//               margin: 0;
//               padding: 0;
//               color-adjust: exact !important;
//               -webkit-print-color-adjust: exact !important;
//               filter: grayscale(100%) !important; 
//             }
            
//             /* ลบ UI ที่ไม่ต้องการ */
//             .print-hide, 
//             .print-hide *, 
//             svg, 
//             .w-12.h-16.object-cover.rounded.shadow-sm, 
//             .table th:first-child,
//             .table td:first-child { 
//               display: none !important; 
//               visibility: hidden !important; 
//             }

//             /* บังคับสีขาวดำและพื้นหลังให้ชัดเจน */
//             * {
//               color: #000 !important;
//               background-color: white !important;
//               box-shadow: none !important;
//               text-shadow: none !important;
//               border-color: #000 !important;
//             }
            
//             /* ปรับรูปแบบตาราง */
//             .table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-top: 15px;
//             }
//             .table th, .table td {
//               border: 1px solid #000 !important;
//               padding: 5px;
//               text-align: left;
//             }
//             .table th:nth-child(5), 
//             .table td:nth-child(5),
//             .table th:nth-child(6), 
//             .table td:nth-child(6),
//             .table th:nth-child(7), 
//             .table td:nth-child(7) {
//                 text-align: right !important; /* จัดชิดขวาสำหรับ ราคา/จำนวน/ยอดรวม */
//             }
            
//             /* ปรับขนาดตัวอักษรให้เหมาะสมกับการพิมพ์ */
//             body, .table td { font-size: 11px; }
//             h2, h3, .text-xl { font-size: 14px !important; }
//             .text-3xl { font-size: 18px !important; }
            
//             /* จัดรูปแบบ Layout ให้เหมาะสม */
//             .grid { display: flex; flex-wrap: wrap; gap: 20px; }
//             .grid > div { flex: 1; min-width: 45%; }
//             .mt-6 { margin-top: 20px; }
//             .mb-6 { margin-bottom: 20px; }
//             .p-6 { padding: 0 !important; } /* ลบ padding หลัก */
//             .p-4 { padding: 10px; }
//           </style>
//         </head>
//         <body>
//           <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
//             ${printHtmlContent}
//           </div>
//         </body>
//       </html>
//     `;

//     iframeWindow.document.open();
//     iframeWindow.document.write(documentContents);
//     iframeWindow.document.close();

//     // 4. สั่งพิมพ์
//     iframeWindow.focus();
//     iframeWindow.print();

//     // 5. ลบ iframe ออกเมื่อพิมพ์เสร็จ
//     setTimeout(() => {
//       document.body.removeChild(iframe);
//     }, 1000);
//   };
//   // ----------------------------------------------------------------------

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <div className="text-lg mt-4 text-gray-600">กำลังโหลดข้อมูล...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="title">รายการขายใบเสร็จทั้งหมด</div>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>วันที่</th>
//             <th>พนักงานขาย</th>
//             <th>ลูกค้า</th>
//             <th>วิธีชำระเงิน</th>
//             <th>รายการสินค้า</th>
//             <th>ยอดรวม</th>
//             <th>แต้มที่ใช้</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {groupedSales.map((groupedSale) => (
//             <tr key={groupedSale.saleId}>
//               <td>{formatDate(groupedSale.sale.createdAt)}</td>
//               <td>
//                 <div>
//                   <div className="font-medium">{groupedSale.sale.admin.name}</div>
//                   <div className="text-sm text-gray-500">({groupedSale.sale.admin.level})</div>
//                 </div>
//               </td>
//               <td>
//                 {groupedSale.sale.member ? (
//                   <div>
//                     <div className="font-medium">{groupedSale.sale.member.name || groupedSale.sale.member.username}</div>
//                     <div className="text-sm text-gray-500">{groupedSale.sale.member.phone}</div>
//                   </div>
//                 ) : (
//                   <span className="text-gray-400">ลูกค้าทั่วไป</span>
//                 )}
//               </td>
//               <td>
//                 <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                   {translatePaymentMethod(groupedSale.sale.paymentMethod)}
//                 </span>
//               </td>
//               <td className="text-center">
//                 <div>
//                   <span className="font-semibold">{groupedSale.totalItems}</span> รายการ
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   ({groupedSale.totalQuantity} ชิ้น)
//                 </div>
//               </td>
//               <td className="text-right font-semibold">
//                 {formatCurrency(groupedSale.sale.total)}
//               </td>
//               <td className="text-center">
//                 {groupedSale.sale.pointUsed > 0 ? (
//                   <span className="text-orange-600 font-semibold">
//                     <i className="fa fa-star mr-1"></i>
//                     {groupedSale.sale.pointUsed.toLocaleString()} แต้ม
//                   </span>
//                 ) : (
//                   <span className="text-gray-400">-</span>
//                 )}
//               </td>
//               <td>
//                 <button onClick={() => openModal(groupedSale)} className="text-blue-600 hover:text-blue-800">
//                   <i className="fa fa-eye mr-2"></i>
//                   ดูรายละเอียด
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal */}
//       {showModal && selectedSale && (
//         <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
//           {/* NOTE: ลบคลาสควบคุมการพิมพ์ที่ไม่จำเป็นออกจากองค์ประกอบนี้ */}
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto print-area"> 
            
//             {/* ส่วนหัว Modal และปุ่มปิด: ซ่อนตอนพิมพ์ */}
//             <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center print-hide">
//               <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                 <ShoppingCart className="h-5 w-5 text-blue-600 print-hide" />
//                 รายละเอียดการขาย #{selectedSale.saleId.slice(-8)}
//               </h2>
//               <button 
//                 onClick={closeModal}
//                 className="text-gray-400 hover:text-gray-600 text-2xl print-hide"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="p-6">
//               {/* Sale Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div className="space-y-3">
//                   <h3 className="font-semibold text-gray-800 flex items-center gap-2">
//                     <Calendar className="h-4 w-4 text-blue-600" />
//                     ข้อมูลการขาย
//                   </h3>
//                   <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//                     <div><span className="font-medium">วันที่:</span> {formatDate(selectedSale.sale.createdAt)}</div>
//                     <div><span className="font-medium">พนักงาน:</span> {selectedSale.sale.admin.name} ({selectedSale.sale.admin.level})</div>
//                     <div><span className="font-medium">วิธีชำระเงิน:</span> {translatePaymentMethod(selectedSale.sale.paymentMethod)}</div>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <h3 className="font-semibold text-gray-800 flex items-center gap-2">
//                     <User className="h-4 w-4 text-green-600" />
//                     ข้อมูลลูกค้า
//                   </h3>
//                   <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//                     {selectedSale.sale.member ? (
//                       <>
//                         <div><span className="font-medium">ชื่อ:</span> {selectedSale.sale.member.name || selectedSale.sale.member.username}</div>
//                         <div><span className="font-medium">เบอร์โทร:</span> {selectedSale.sale.member.phone}</div>
//                         <div><span className="font-medium">แต้มคงเหลือ:</span> {selectedSale.sale.member.points.toLocaleString()} แต้ม</div>
//                       </>
//                     ) : (
//                       <div className="text-gray-500">ลูกค้าทั่วไป</div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Info */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
//                 <div>
//                   <div className="text-sm text-blue-600 font-medium">เงินที่รับ</div>
//                   <div className="text-lg font-bold text-blue-800">{formatCurrency(selectedSale.sale.cashPaid)}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-blue-600 font-medium">เงินทอน</div>
//                   <div className="text-lg font-bold text-blue-800">{formatCurrency(selectedSale.sale.change)}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-blue-600 font-medium">แต้มที่ใช้</div>
//                   <div className="text-lg font-bold text-orange-600">{selectedSale.sale.pointUsed.toLocaleString()} แต้ม</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-green-600 font-medium">ยอดรวม</div>
//                   <div className="text-xl font-bold text-green-600">{formatCurrency(selectedSale.sale.total)}</div>
//                 </div>
//               </div>

//               {/* Items List */}
//               <div className="space-y-4">
//                 <h4 className="font-semibold text-gray-800 flex items-center gap-2">
//                   <Book className="h-4 w-4 text-green-600" />
//                   รายการสินค้า ({selectedSale.totalItems} รายการ, {selectedSale.totalQuantity} ชิ้น)
//                 </h4>
                
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th className="print-hide">รูปภาพ</th>
//                       <th>ชื่อหนังสือ</th>
//                       <th>รหัสสินค้าหรือISBN</th>
//                       <th>หมวดหมู่</th>
//                       <th style={{ textAlign: 'right' }}>ราคา</th>
//                       <th style={{ textAlign: 'right' }}>จำนวน</th>
//                       <th style={{ textAlign: 'right' }}>ยอดรวม</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedSale.details.map((detail) => (
//                       <tr key={detail.id}>
//                         <td className="print-hide">
//                           {detail.book.image && (
//                             <img
//                               src={Config.apiUrl + '/public/uploads/' + detail.book.image}
//                               alt={detail.book.name}
//                               className="w-12 h-16 object-cover rounded shadow-sm print-hide"
//                             />
//                           )}
//                         </td>
//                         <td>
//                           <div className="font-medium">{detail.book.name}</div>
//                           {detail.book.description && (
//                             <div className="text-sm text-gray-500 mt-1">{detail.book.description}</div>
//                           )}
//                         </td>
//                         <td>{detail.book.isbn || '-'}</td>
//                         <td>
//                           {detail.book.category && (
//                             <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
//                               {detail.book.category}
//                             </span>
//                           )}
//                         </td>
//                         <td className="text-right">{formatCurrency(detail.price)}</td>
//                         <td className="text-right">{detail.qty}</td>
//                         <td className="text-right font-semibold">{formatCurrency(detail.qty * detail.price)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Remark */}
//               {selectedSale.sale.remark && (
//                 <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
//                   <div className="text-sm font-medium text-yellow-800">หมายเหตุ:</div>
//                   <div className="text-yellow-700 mt-1">{selectedSale.sale.remark}</div>
//                 </div>
//               )}

//               {/* Total Summary */}
//               <div className="mt-6 text-center">
//                 <div className="inline-block bg-green-100 border border-green-200 rounded-lg p-4">
//                   <div className="text-lg text-green-800">
//                     <span className="font-medium">ยอดรวมทั้งสิ้น:</span>
//                   </div>
//                   <div className="text-3xl font-bold text-green-600 mt-1">
//                     {formatCurrency(selectedSale.sale.total)}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ส่วนท้าย Modal และปุ่มพิมพ์: ซ่อนตอนพิมพ์ */}
//             <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 print-hide">
//               <div className="flex justify-center gap-4">
//                 <button 
//                   onClick={handlePrint}
//                   className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//                 >
//                  <i className="fa fa-print"></i>
//                    พิมพ์ใบเสร็จ
//                 </button>
//                 <button 
//                   onClick={closeModal}
//                   className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//                 >
//                   ปิด
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, Book, ShoppingCart } from 'lucide-react';
import { Config } from "@/app/config";
import { SaleDetailInterface } from '@/app/interface/SaleDetailInterface';


interface GroupedSale {
  saleId: string;
  sale: SaleDetailInterface['sale'];
  details: SaleDetailInterface[];
  totalItems: number;
  totalQuantity: number;
}

interface ApiResponse {
  success: boolean;
  data: SaleDetailInterface[];
  message: string;
}

export default function SaleDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [groupedSales, setGroupedSales] = useState<GroupedSale[]>([]);
  const [selectedSale, setSelectedSale] = useState<GroupedSale | null>(null);
  const [showModal, setShowModal] = useState(false);

  const groupSalesBySaleId = (details: SaleDetailInterface[]) => {
    const grouped = details.reduce((groups, detail) => {
      const saleId = detail.saleId;
      if (!groups[saleId]) {
        groups[saleId] = [];
      }
      groups[saleId].push(detail);
      return groups;
    }, {} as Record<string, SaleDetailInterface[]>);

    const groupedArray: GroupedSale[] = Object.entries(grouped).map(([saleId, details]) => {
      const totalQuantity = details.reduce((sum, detail) => sum + detail.qty, 0);
      return {
        saleId,
        sale: details[0].sale,
        details,
        totalItems: details.length,
        totalQuantity
      };
    });

    // เรียงตามวันที่ล่าสุดก่อน
    groupedArray.sort((a, b) => new Date(b.sale.createdAt).getTime() - new Date(a.sale.createdAt).getTime());
    setGroupedSales(groupedArray);
  };

  useEffect(() => {
    const fetchAllSaleDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(Config.apiUrl + '/api/sale-detail');
        const result: ApiResponse = await response.json();
        
        if (result.success) {
          groupSalesBySaleId(result.data);
        }
      } catch (err) {
        console.error('Error fetching sale details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSaleDetails();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };
  
  // ฟังก์ชันช่วยแปลวิธีการชำระเงิน
  const translatePaymentMethod = (method: string) => {
    switch(method.toLowerCase()) {
      case 'cash':
        return 'เงินสด';
      case 'transfer':
        return 'โอนเงิน';
      default:
        return method;
    }
  }

  const openModal = (groupedSale: GroupedSale) => {
    setSelectedSale(groupedSale);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedSale(null);
  };

  /**
   * สร้าง iframe ชั่วคราวเพื่อแทรกเนื้อหาใบเสร็จและ CSS สำหรับพิมพ์โดยเฉพาะ
   */
  const handlePrint = () => {
    if (!selectedSale) return;

    const paymentMethodTH = translatePaymentMethod(selectedSale.sale.paymentMethod);
    const adminNameOnly = selectedSale.sale.admin.name; // แสดงเฉพาะชื่อ

    // 1. สร้าง HTML Content สำหรับพิมพ์โดยใช้ Template Literal 
    // โค้ดนี้ถูกสร้างใหม่และมีการแก้ไขให้เป็นไปตามเงื่อนไข: 
    // - วิธีชำระเงินเป็นภาษาไทย
    // - ชื่อพนักงานแสดงแค่ชื่อ ไม่แสดง (admin level)
    // - ลบ description ออกจากตารางสินค้า
    const printHtmlContent = `
        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div class="space-y-3">
                    <h3 class="font-semibold text-gray-800 flex items-center gap-2 print-only-text">
                        <Calendar class="h-4 w-4 text-blue-600 print-hide" />
                        ข้อมูลการขาย
                    </h3>
                    <div class="bg-gray-50 p-4 rounded-lg space-y-2 print-force-bg-white print-border-black">
                        <div><span class="font-medium">วันที่:</span> ${formatDate(selectedSale.sale.createdAt)}</div>
                        <div><span class="font-medium">พนักงาน:</span> ${adminNameOnly}</div> 
                        <div><span class="font-medium">วิธีชำระเงิน:</span> ${paymentMethodTH}</div> 
                    </div>
                </div>

                <div class="space-y-3">
                    <h3 class="font-semibold text-gray-800 flex items-center gap-2 print-only-text">
                        <User class="h-4 w-4 text-green-600 print-hide" />
                        ข้อมูลลูกค้า
                    </h3>
                    <div class="bg-gray-50 p-4 rounded-lg space-y-2 print-force-bg-white print-border-black">
                        ${selectedSale.sale.member ? (
                            `<div><span class="font-medium">ชื่อ:</span> ${selectedSale.sale.member.name || selectedSale.sale.member.username}</div>
                             <div><span class="font-medium">เบอร์โทร:</span> ${selectedSale.sale.member.phone}</div>
                             <div><span class="font-medium">แต้มคงเหลือ:</span> ${selectedSale.sale.member.points.toLocaleString()} แต้ม</div>`
                        ) : (
                            `<div class="text-gray-500">ลูกค้าทั่วไป</div>`
                        )}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-blue-50 rounded-lg print-force-bg-white print-border-black">
                <div>
                    <div class="text-sm text-blue-600 font-medium">เงินที่รับ</div>
                    <div class="text-lg font-bold text-blue-800">${formatCurrency(selectedSale.sale.cashPaid)}</div>
                </div>
                <div>
                    <div class="text-sm text-blue-600 font-medium">เงินทอน</div>
                    <div class="text-lg font-bold text-blue-800">${formatCurrency(selectedSale.sale.change)}</div>
                </div>
                <div>
                    <div class="text-sm text-blue-600 font-medium">แต้มที่ใช้</div>
                    <div class="text-lg font-bold text-orange-600">${selectedSale.sale.pointUsed.toLocaleString()} แต้ม</div>
                </div>
                <div>
                    <div class="text-sm text-green-600 font-medium">ยอดรวม</div>
                    <div class="text-xl font-bold text-green-600">${formatCurrency(selectedSale.sale.total)}</div>
                </div>
            </div>

            <div class="space-y-4">
                <h4 class="font-semibold text-gray-800 flex items-center gap-2 print-only-text">
                    <Book class="h-4 w-4 text-green-600 print-hide" />
                    รายการสินค้า (${selectedSale.totalItems} รายการ, ${selectedSale.totalQuantity} ชิ้น)
                </h4>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th class="print-hide">รูปภาพ</th>
                            <th>ชื่อหนังสือ</th>
                            <th>รหัสสินค้าหรือISBN</th>
                            <th>หมวดหมู่</th>
                            <th style="text-align: right;">ราคา</th>
                            <th style="text-align: right;">จำนวน</th>
                            <th style="text-align: right;">ยอดรวม</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${selectedSale.details.map((detail) => (
                            `<tr key="${detail.id}">
                                <td class="print-hide">
                                    ${detail.book.image ? (
                                        `<img src="${Config.apiUrl + '/public/uploads/' + detail.book.image}" alt="${detail.book.name}" class="w-12 h-16 object-cover rounded shadow-sm print-hide" />`
                                    ) : ''}
                                </td>
                                <td>
                                    <div class="font-medium">${detail.book.name}</div>
                                </td>
                                <td>${detail.book.isbn || '-'}</td>
                                <td>
                                    ${detail.book.category ? (
                                        `<span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">${detail.book.category}</span>`
                                    ) : ''}
                                </td>
                                <td class="text-right">${formatCurrency(detail.price)}</td>
                                <td class="text-right">${detail.qty}</td>
                                <td class="text-right font-semibold">${formatCurrency(detail.qty * detail.price)}</td>
                            </tr>`
                        )).join('')}
                    </tbody>
                </table>
            </div>

            ${selectedSale.sale.remark ? (
                `<div class="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg print-force-bg-white print-border-black">
                    <div class="text-sm font-medium text-yellow-800">หมายเหตุ:</div>
                    <div class="text-yellow-700 mt-1">${selectedSale.sale.remark}</div>
                </div>`
            ) : ''}

            <div class="mt-6 text-center">
                <div class="inline-block bg-green-100 border border-green-200 rounded-lg p-4 print-force-bg-white print-border-black">
                    <div class="text-lg text-green-800">
                        <span class="font-medium">ยอดรวมทั้งสิ้น:</span>
                    </div>
                    <div class="text-3xl font-bold text-green-600 mt-1">
                        ${formatCurrency(selectedSale.sale.total)}
                    </div>
                </div>
            </div>
        </div>
    `;


    // 2. สร้าง iframe สำหรับพิมพ์
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // ซ่อน iframe
    document.body.appendChild(iframe);
    const iframeWindow = iframe.contentWindow;

    if (!iframeWindow) {
        document.body.removeChild(iframe);
        console.error('ไม่สามารถเข้าถึง iframe window ได้');
        return;
    }
    
    // 3. แทรกเนื้อหาและ CSS ที่จำเป็น
    const documentContents = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>ใบเสร็จ #${selectedSale.saleId.slice(-8)}</title>
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
            }
            
            /* ลบ UI ที่ไม่ต้องการ */
            .print-hide, 
            .print-hide *, 
            svg, 
            .w-12.h-16.object-cover.rounded.shadow-sm, 
            .table th:first-child,
            .table td:first-child { 
              display: none !important; 
              visibility: hidden !important; 
            }

            /* บังคับสีขาวดำและพื้นหลังให้ชัดเจน */
            * {
              color: #000 !important;
              background-color: white !important;
              box-shadow: none !important;
              text-shadow: none !important;
              border-color: #000 !important;
            }
            
            /* ปรับรูปแบบตาราง */
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            }
            .table th, .table td {
              border: 1px solid #000 !important;
              padding: 5px;
              text-align: left;
            }
            .table th:nth-child(5), 
            .table td:nth-child(5),
            .table th:nth-child(6), 
            .table td:nth-child(6),
            .table th:nth-child(7), 
            .table td:nth-child(7) {
                text-align: right !important; /* จัดชิดขวาสำหรับ ราคา/จำนวน/ยอดรวม */
            }
            
            /* ปรับขนาดตัวอักษรให้เหมาะสมกับการพิมพ์ */
            body, .table td { font-size: 11px; }
            h2, h3, .text-xl { font-size: 14px !important; }
            .text-3xl { font-size: 18px !important; }
            
            /* จัดรูปแบบ Layout ให้เหมาะสม */
            .grid { display: flex; flex-wrap: wrap; gap: 20px; }
            .grid > div { flex: 1; min-width: 45%; }
            .mt-6 { margin-top: 20px; }
            .mb-6 { margin-bottom: 20px; }
            .p-6 { padding: 0 !important; } /* ลบ padding หลัก */
            .p-4 { padding: 10px; }
          </style>
        </head>
        <body>
          <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
            ${printHtmlContent}
          </div>
        </body>
      </html>
    `;

    iframeWindow.document.open();
    iframeWindow.document.write(documentContents);
    iframeWindow.document.close();

    // 4. สั่งพิมพ์
    iframeWindow.focus();
    iframeWindow.print();

    // 5. ลบ iframe ออกเมื่อพิมพ์เสร็จ
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
  // ----------------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <div className="text-lg mt-4 text-gray-600">กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="title">รายการขายใบเสร็จทั้งหมด</div>
      <table className="table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>พนักงานขาย</th>
            <th>ลูกค้า</th>
            <th>วิธีชำระเงิน</th>
            <th>รายการสินค้า</th>
            <th>ยอดรวม</th>
            <th>แต้มที่ใช้</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {groupedSales.map((groupedSale) => (
            <tr key={groupedSale.saleId}>
              <td>{formatDate(groupedSale.sale.createdAt)}</td>
              <td>
                <div>
                  <div className="font-medium">{groupedSale.sale.admin.name}</div>
                  <div className="text-sm text-gray-500">({groupedSale.sale.admin.level})</div>
                </div>
              </td>
              <td>
                {groupedSale.sale.member ? (
                  <div>
                    <div className="font-medium">{groupedSale.sale.member.name || groupedSale.sale.member.username}</div>
                    <div className="text-sm text-gray-500">{groupedSale.sale.member.phone}</div>
                  </div>
                ) : (
                  <span className="text-gray-400">ลูกค้าทั่วไป</span>
                )}
              </td>
              <td>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {translatePaymentMethod(groupedSale.sale.paymentMethod)}
                </span>
              </td>
              <td className="text-center">
                <div>
                  <span className="font-semibold">{groupedSale.totalItems}</span> รายการ
                </div>
                <div className="text-sm text-gray-500">
                  ({groupedSale.totalQuantity} ชิ้น)
                </div>
              </td>
              <td className="text-right font-semibold">
                {formatCurrency(groupedSale.sale.total)}
              </td>
              <td className="text-center">
                {groupedSale.sale.pointUsed > 0 ? (
                  <span className="text-orange-600 font-semibold">
                    <i className="fa fa-star mr-1"></i>
                    {groupedSale.sale.pointUsed.toLocaleString()} แต้ม
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td>
                <button onClick={() => openModal(groupedSale)} className="text-blue-600 hover:text-blue-800">
                  <i className="fa fa-eye mr-2"></i>
                  ดูรายละเอียด
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedSale && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          {/* NOTE: ลบคลาสควบคุมการพิมพ์ที่ไม่จำเป็นออกจากองค์ประกอบนี้ */}
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto print-area"> 
            
            {/* ส่วนหัว Modal และปุ่มปิด: ซ่อนตอนพิมพ์ */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center print-hide">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-600 print-hide" />
                รายละเอียดการขาย #{selectedSale.saleId.slice(-8)}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl print-hide"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {/* Sale Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    ข้อมูลการขาย
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div><span className="font-medium">วันที่:</span> {formatDate(selectedSale.sale.createdAt)}</div>
                    <div><span className="font-medium">พนักงาน:</span> {selectedSale.sale.admin.name} ({selectedSale.sale.admin.level})</div>
                    <div><span className="font-medium">วิธีชำระเงิน:</span> {translatePaymentMethod(selectedSale.sale.paymentMethod)}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <User className="h-4 w-4 text-green-600" />
                    ข้อมูลลูกค้า
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    {selectedSale.sale.member ? (
                      <>
                        <div><span className="font-medium">ชื่อ:</span> {selectedSale.sale.member.name || selectedSale.sale.member.username}</div>
                        <div><span className="font-medium">เบอร์โทร:</span> {selectedSale.sale.member.phone}</div>
                        <div><span className="font-medium">แต้มคงเหลือ:</span> {selectedSale.sale.member.points.toLocaleString()} แต้ม</div>
                      </>
                    ) : (
                      <div className="text-gray-500">ลูกค้าทั่วไป</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="text-sm text-blue-600 font-medium">เงินที่รับ</div>
                  <div className="text-lg font-bold text-blue-800">{formatCurrency(selectedSale.sale.cashPaid)}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-medium">เงินทอน</div>
                  <div className="text-lg font-bold text-blue-800">{formatCurrency(selectedSale.sale.change)}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-medium">แต้มที่ใช้</div>
                  <div className="text-lg font-bold text-orange-600">{selectedSale.sale.pointUsed.toLocaleString()} แต้ม</div>
                </div>
                <div>
                  <div className="text-sm text-green-600 font-medium">ยอดรวม</div>
                  <div className="text-xl font-bold text-green-600">{formatCurrency(selectedSale.sale.total)}</div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Book className="h-4 w-4 text-green-600" />
                  รายการสินค้า ({selectedSale.totalItems} รายการ, {selectedSale.totalQuantity} ชิ้น)
                </h4>
                
                <table className="table">
                  <thead>
                    <tr>
                      <th className="print-hide">รูปภาพ</th>
                      <th>ชื่อหนังสือ</th>
                      <th>รหัสสินค้าหรือISBN</th>
                      <th>หมวดหมู่</th>
                      <th style={{ textAlign: 'right' }}>ราคา</th>
                      <th style={{ textAlign: 'right' }}>จำนวน</th>
                      <th style={{ textAlign: 'right' }}>ยอดรวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSale.details.map((detail) => (
                      <tr key={detail.id}>
                        <td className="print-hide">
                          {detail.book.image && (
                            <img
                              src={Config.apiUrl + '/public/uploads/' + detail.book.image}
                              alt={detail.book.name}
                              className="w-12 h-16 object-cover rounded shadow-sm print-hide"
                            />
                          )}
                        </td>
                        <td>
                          <div className="font-medium">{detail.book.name}</div>
                          {/* NOTE: ลบ description ออกจาก Modal รายละเอียด แต่คงไว้ใน Modal */}
                          {/* {detail.book.description && (
                            <div className="text-sm text-gray-500 mt-1">{detail.book.description}</div>
                          )} */}
                        </td>
                        <td>{detail.book.isbn || '-'}</td>
                        <td>
                          {detail.book.category && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {detail.book.category}
                            </span>
                          )}
                        </td>
                        <td className="text-right">{formatCurrency(detail.price)}</td>
                        <td className="text-right">{detail.qty}</td>
                        <td className="text-right font-semibold">{formatCurrency(detail.qty * detail.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Remark */}
              {selectedSale.sale.remark && (
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <div className="text-sm font-medium text-yellow-800">หมายเหตุ:</div>
                  <div className="text-yellow-700 mt-1">{selectedSale.sale.remark}</div>
                </div>
              )}

              {/* Total Summary */}
              <div className="mt-6 text-center">
                <div className="inline-block bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="text-lg text-green-800">
                    <span className="font-medium">ยอดรวมทั้งสิ้น:</span>
                  </div>
                  <div className="text-3xl font-bold text-green-600 mt-1">
                    {formatCurrency(selectedSale.sale.total)}
                  </div>
                </div>
              </div>
            </div>

            {/* ส่วนท้าย Modal และปุ่มพิมพ์: ซ่อนตอนพิมพ์ */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 print-hide">
              <div className="flex justify-center gap-4">
                <button 
                  onClick={handlePrint}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                 <i className="fa fa-print"></i>
                   พิมพ์ใบเสร็จ
                </button>
                <button 
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}