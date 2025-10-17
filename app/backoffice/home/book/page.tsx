// 'use client'

// import { Config } from "@/app/config"
// import type { BookInterface } from "@/app/interface/BookInterface"
// import axios, { AxiosResponse } from "axios"
// import { useEffect, useState, useCallback } from "react" 
// import Swal from "sweetalert2"
// import Modal from "../components/Modal"
// import { ImportToStockInterface } from "@/app/interface/ImportToStockInterface"
// import { ErrorInterface } from "@/app/interface/ErrorInterface"

// export default function Book() {
//     const [books, setBooks] = useState<BookInterface[]>([])
//     const [filteredBooks, setFilteredBooks] = useState<BookInterface[]>([])
//     const [id, setId] = useState('');
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState(0);
//     const [description, setDescription] = useState('');
//     const [isbn, setIsbn] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState(''); // สำหรับ <select>
//     const [customCategory, setCustomCategory] = useState('');  // สำหรับ <input>
//     const [qty, setQty] = useState(0);
//     const [showModal, setShowModal] = useState(false);
//     const [image, setImage] = useState<File | null>();
//     const [imageUrl, setImageUrl] = useState('');
//     const [viewMode, setViewMode] = useState('grid');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const itemsPerPage = 10;
//     const [isShowModalImportToStrock, setIsShowModalImportToStock] = useState(false);
//     const [bookForImportToStock, setBookForImportToStock] = useState<BookInterface | undefined>();
//     const [qtyForImportToStock, setQtyForImportToStock] = useState(0);
//     const [isShowModalHistoryImportToStock, setIsShowModalHistoryImportToStock] = useState(false);
//     const [bookForHistoryImportToStock, setBookForHistoryImportToStock] = useState<BookInterface | undefined>();
    
    
//     // State สำหรับจัดการหมวดหมู่
//     const [categories, setCategories] = useState<string[]>([]);

//     useEffect(() => {
//         fetchData();
//     }, [])
    
//     // FIX: ใช้ useCallback เพื่อทำให้ฟังก์ชัน filterBooks เป็น stable
//     const filterBooks = useCallback(() => {
//         if (searchTerm.trim() === '') {
//             setFilteredBooks(books);
//             setCurrentPage(1);
//             return;
//         }

//         const term = searchTerm.toLowerCase();
//         const filtered = books.filter(book => {
//             // ค้นหาชื่อสินค้า
//             const nameMatch = book.name?.toLowerCase().includes(term);
            
//             // ค้นหา ISBN
//             const isbnMatch = book.isbn?.toLowerCase().includes(term);
            
//             // ค้นหาในหมวดหมู่ (รองรับ comma-separated)
//             let categoryMatch = false;
//             if (book.category) {
//                 const bookCategories = book.category
//                     .split(',')
//                     .map(cat => cat.trim().toLowerCase())
//                     .filter(cat => cat !== '');
//                 categoryMatch = bookCategories.some(cat => cat.includes(term));
//             }
            
//             return nameMatch || isbnMatch || categoryMatch;
//         });
        
//         setFilteredBooks(filtered);
//         setCurrentPage(1);
//     }, [searchTerm, books]); 

//     // FIX: useEffect เรียกใช้ filterBooks โดยมี filterBooks เป็น dependency
//     useEffect(() => {
//         filterBooks();
//     }, [filterBooks]) 

//     // FIX: ใช้ useCallback เพื่อทำให้ฟังก์ชัน fetchCategories เป็น stable
//     const fetchCategories = useCallback(async () => {
//         try {
//             // ดึงหมวดหมู่ที่ไม่ซ้ำจาก books ที่โหลดแล้ว
//             const allCategories: string[] = [];
            
//             books.forEach(book => {
//                 if (book.category && book.category.trim() !== '') {
//                     // แยกหมวดหมู่ที่คั่นด้วย comma
//                     const bookCategories = book.category
//                         .split(',')
//                         .map(cat => cat.trim())
//                         .filter(cat => cat !== '');
                    
//                     allCategories.push(...bookCategories);
//                 }
//             });
            
//             // ลบหมวดหมู่ที่ซ้ำ
//             const uniqueCategories = Array.from(new Set(allCategories));
//             setCategories(uniqueCategories);
            
//         } catch (err: unknown) {
//            Swal.fire({
//                 title: 'error',
//                 text: (err as ErrorInterface).message,
//                 icon: 'error'
//             })
//             // Fallback ในกรณีที่เกิดข้อผิดพลาด
//             const uniqueCategories = Array.from(new Set(
//                 books.map(book => book.category).filter(cat => cat && cat.trim() !== '')
//             )) as string[];
//             setCategories(uniqueCategories);
//         }
//     }, [books]); 
    
//     // FIX: useEffect เรียกใช้ fetchCategories โดยมี fetchCategories เป็น dependency
//     useEffect(() => {
//         fetchCategories();
//     }, [fetchCategories])


//     const fetchData = async () => {
//         try {
//             const url = Config.apiUrl + '/api/book'
//             const response = await axios.get(url);

//             if (response.status == 200) {
//                 setBooks(response.data);
//                 setFilteredBooks(response.data);
//             }
//         } catch (err: unknown) {
//             Swal.fire({
//                 title: 'error',
//                 text: (err as ErrorInterface).message,
//                 icon: 'error'
//             })
//         }
//     }
    
//     const openModal = () => {
//         setShowModal(true)
//     }

//     const closeModal = () => {
//         setShowModal(false)
//         setId('');
//         setIsbn('');
//         setName('');
//         setPrice(0);
//         setDescription('');
//         setSelectedCategory('');
//         setCustomCategory('');
//         setQty(0);
//         setImageUrl('');
//         setImage(null);
//     }

//     const handleSave = async () => {

//         if (!isbn.trim()) {
//             Swal.fire({
//                 title: 'รหัสสินค้าหรือISBN ว่าง',
//                 text: 'กรุณากรอกรหัสสินค้าหรือISBN',
//                 icon: 'warning'
//             });
//             return;
//         }
//         if (!name.trim()) {
//             Swal.fire({
//                 title: 'ชื่อสินค้าไม่ครบ',
//                 text: 'กรุณากรอกชื่อสินค้า',
//                 icon: 'warning'
//             });
//             return;
//         }
//         if (price <= 0) {
//             Swal.fire({
//                 title: 'ราคาผิดพลาด',
//                 text: 'กรุณากรอกราคาให้มากกว่า 0',
//                 icon: 'warning'
//             });
//             return;
//         }
//         if (qty <= 0 && id == '') { // ตรวจสอบจำนวนเริ่มต้นเฉพาะตอนเพิ่มใหม่
//             Swal.fire({
//                 title: 'จำนวนสินค้าไม่ครบ',
//                 text: 'กรุณากรอกจำนวนสินค้าให้มากกว่า 0',
//                 icon: 'warning'
//             });
//             return;
//         }

//         try {
//             let response:  AxiosResponse<unknown>;
//             const data = new FormData();
            
//             // เวลา submit หรือบันทึก: ถ้า user พิมพ์เอง → ใช้ customCategory, ถ้าไม่พิมพ์ → ใช้ selectedCategory
//             const finalCategory = customCategory.trim() ? customCategory : selectedCategory;

//             // ตรวจสอบ image ก่อน append
//             if (image) {
//                  data.append("image", image as Blob);
//             }
           
//             data.append("isbn", isbn);
//             data.append("name", name);
//             data.append("price", price.toString());
//             data.append("description", description);
//             data.append("category", finalCategory);
//             // ส่ง qty เฉพาะตอน insert ใหม่เท่านั้น
//             if (id === '') {
//                  data.append("qty", qty.toString());
//             }

//             if (id == '') {
//                 //insert
//                 const url = Config.apiUrl + '/api/book';
//                 response = await axios.post(url, data);
//             } else {
//                 // update
//                 const url = Config.apiUrl + '/api/book/' + id;
//                 response = await axios.put(url, data);
//             }

//             if (response.status == 200) {
//                 Swal.fire({
//                     title: 'บันทึกข้อมูล',
//                     text: 'บันทึกข้อมูลสำเร็จ',
//                     icon: 'success',
//                     timer: 1000
//                 })
//                 fetchData();
//                 closeModal();
//             }
//         } catch (err: unknown) {
//             Swal.fire({
//                 title: 'error',
//                 text: (err as ErrorInterface).message,
//                 icon: 'error'
//             })
//         }
//     }

//     const handleEdit = (book: BookInterface) => {
//         setId(book.id);
//         setIsbn(book.isbn ?? '');
//         setName(book.name);
//         setPrice(book.price);
//         setDescription(book.description ?? '');
        
        
//         // ตรวจสอบว่าหมวดหมู่ของ book อยู่ในรายการ categories หรือไม่
//         const bookCategory = book.category ?? '';
//         if (categories.includes(bookCategory)) {
//             setSelectedCategory(bookCategory);
//             setCustomCategory('');
//         } else {
//             setSelectedCategory('');
//             setCustomCategory(bookCategory);
//         }
        
//         setQty(book.qty ?? 0);
//         // ตรวจสอบให้แน่ใจว่า book.image เป็น string ก่อนกำหนดให้กับ setImageUrl
//         if (typeof book.image === 'string') {
//             setImageUrl(book.image);
//         } else {
//              setImageUrl('');
//         }
//         setImage(null); // ล้าง File state เมื่อเปิดแก้ไข

//         openModal();
//     }

//     const handleDelete = async (book: BookInterface) => {
//         const button = await Swal.fire({
//             title: 'ลบข้อมูล',
//             text: 'ยืนยันการลบสินค้า ' + book.name,
//             icon: 'question',
//             showCancelButton: true,
//             showConfirmButton: true
//         })

//         if (button.isConfirmed) {
//             const url = Config.apiUrl + '/api/book/' + book.id;
//             const response = await axios.delete(url);

//             if (response.status == 200) {
//                 Swal.fire({
//                     title: 'ลบข้อมุล',
//                     text: 'ลบข้อมูลสำเร็จ',
//                     icon: 'success',
//                     timer: 1000
//                 })

//                 fetchData();
//             }
//         }
//     }

//     const chooseFile = (files: FileList) => {
//         if (files.length > 0) {
//             const file: File = files[0];
//             setImage(file);
//             // สร้าง URL ชั่วคราวสำหรับพรีวิว
//             const tempUrl = URL.createObjectURL(file);
//             setImageUrl(tempUrl);
//         }
//     }

//     const openModalImportToStock = (book: BookInterface) => {
//         setBookForImportToStock(book);
//         setIsShowModalImportToStock(true);
//         setQtyForImportToStock(1); // กำหนดค่าเริ่มต้นเป็น 1
//     }

//     const closeModalImportToStock = () => {
//         setIsShowModalImportToStock(false);
//         setBookForImportToStock(undefined);
//         setQtyForImportToStock(0);
//     }
    

//     const handleImportToStock = async () => {
//         if (!bookForImportToStock?.id || qtyForImportToStock <= 0) {
//              Swal.fire({
//                 title: 'ข้อมูลไม่ถูกต้อง',
//                 text: 'กรุณากรอกจำนวนสินค้าให้มากกว่า 0',
//                 icon: 'warning'
//             });
//             return;
//         }

//         try {
//             const url = Config.apiUrl + '/api/book/importToStock';
//             const payload = {
//                 bookId: bookForImportToStock.id,
//                 qty: qtyForImportToStock
//             }
//             const response = await axios.post(url, payload);
            
//             if (response.status == 200) {
//                 Swal.fire({
//                     title: 'รับสินค้าเข้าสินค้าคงคลัง',
//                     text: 'รับสินค้าเข้าสินค้าคงคลังสำเร็จ',
//                     icon: 'success',
//                     timer: 1000
//                 })
//                 fetchData();
//                 closeModalImportToStock();
//             }
//         } catch (err: unknown) {
//             Swal.fire({
//                 title: 'error',
//                 text: (err as ErrorInterface).message || 'เกิดข้อผิดพลาดในการนำเข้าสินค้า',
//                 icon: 'error'
//             })
//         }
//     }

//     // 💡 REMOVED: handleBarcodeScan ถูกลบออก

//     const openModalHistoryImportToStock = (book: BookInterface) => {
//         setBookForHistoryImportToStock(book);
//         setIsShowModalHistoryImportToStock(true);
//     }

//     const closeModalHistoryImportToStock = () => {
//         setIsShowModalHistoryImportToStock(false);
//         setBookForHistoryImportToStock(undefined);
//     }

//     // ฟังก์ชันสำหรับจัดการการเลือกจาก dropdown
//     const handleCategorySelect = (value: string) => {
//         setSelectedCategory(value);
//         // ถ้าเลือกจาก dropdown ให้ล้าง custom input
//         if (value !== '') {
//             setCustomCategory('');
//         }
//     }

//     // ฟังก์ชันสำหรับจัดการการพิมพ์ custom category
//     const handleCustomCategoryChange = (value: string) => {
//         setCustomCategory(value);
//         // ถ้าพิมพ์ custom ให้ล้าง dropdown selection
//         if (value.trim() !== '') {
//             setSelectedCategory('');
//         }
//     }

//     const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//     const renderPagination = () => {
//         const pages = [];
//         const pageLimit = 5;
//         let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
//         let endPage = Math.min(totalPages, startPage + pageLimit - 1);
        
//         if (endPage - startPage + 1 < pageLimit) {
//             startPage = Math.max(1, endPage - pageLimit + 1);
//             endPage = Math.min(totalPages, startPage + pageLimit - 1); 
//         }
        
//         for (let i = startPage; i <= endPage; i++) {
//             pages.push(
//                 <button 
//                     key={i} 
//                     className={`px-3 py-1 mx-1 rounded ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
//                     onClick={() => paginate(i)}
//                 >
//                     {i}
//                 </button>
//             );
//         }
        
//         return (
//             <div className="flex justify-center mt-4">
//                 <button 
//                     className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
//                     onClick={() => currentPage > 1 && paginate(currentPage - 1)}
//                     disabled={currentPage === 1}
//                 >
//                     &lt;
//                 </button>
//                 {pages}
//                 <button 
//                     className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
//                     onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                 >
//                     &gt;
//                 </button>
//             </div>
//         );
//     };

//     return (
//         <>
//             <div className="container">
//                 <div className="title mb-6">สินค้าคงคลัง</div>

//                 <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//                     <div className="flex flex-wrap gap-2">
//                         <button onClick={openModal} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
//                             <i className="fa fa-plus mr-2"></i>
//                             เพิ่มสินค้า
//                         </button>
//                     </div>
                    
//                     <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        
//                         {/* 💡 REMOVED: Barcode Scan Input ถูกลบออก */}
                        
//                         {/* Existing Search Input */}
//                         <div className="relative w-full md:w-96">
//                             <input
//                                 type="text"
//                                 placeholder="ค้นหาชื่อ,รหัสสินค้าหรือISBNและหมวดหมู่..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 // 💡 แก้ไข autoFocus ให้โฟกัสเมื่อไม่มี Modal เปิดอยู่
//                                 autoFocus={!showModal && !isShowModalImportToStrock && !isShowModalHistoryImportToStock} 
//                             />
//                             <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
//                         </div>
                        
//                         <div className="flex items-center gap-2">
//                             <span className="text-gray-700">มุมมอง:</span>
//                             <div className="flex rounded overflow-hidden">
//                                 <button 
//                                     className={`px-3 py-2 transition duration-200 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
//                                     onClick={() => setViewMode('list')}
//                                     title="มุมมองตาราง"
//                                 >
//                                     <i className="fa fa-list"></i>
//                                 </button>
//                                 <button 
//                                     className={`px-3 py-2 transition duration-200 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
//                                     onClick={() => setViewMode('grid')}
//                                     title="มุมมองกริด"
//                                 >
//                                     <i className="fa fa-th"></i>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {filteredBooks.length === 0 ? (
//                     <div className="text-center py-8">
//                         <i className="fa fa-search text-5xl text-gray-300 mb-3"></i>
//                         <p className="text-gray-500">ไม่พบข้อมูลสินค้า</p>
//                     </div>
//                 ) : viewMode === 'list' ? (
//                     <div className="overflow-x-auto">
//                         <table className="w-full border-collapse">
//                             <thead>
//                                 <tr className="bg-gray-100">
//                                     <th className="border p-3">รูปภาพ</th>
//                                     <th className="border p-3">รหัสสินค้าหรือISBN</th>
//                                     <th className="border p-3">ชื่อสินค้า</th>
//                                     <th className="border p-3 text-right">ราคาสินค้า</th>
//                                     <th className="border p-3 text-center">จำนวนสินค้าคงคลัง</th>
//                                     <th className="border p-3">หมวดหมู่สินค้า</th>
//                                     <th className="border p-3">รายละเอียดสินค้า</th>
//                                     <th className="border p-3 w-[150px]">จัดการสินค้า</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentItems.map((book: BookInterface) => (
//                                     <tr key={book.id} className="hover:bg-gray-50">
//                                         <td className="border p-3 text-center">
//                                             {book.image != null && typeof book.image === 'string' ?
//                                                 <img src={Config.apiUrl + '/public/uploads/' + book.image}
//                                                     className="w-[100px] h-[100px] object-contain mx-auto rounded-lg shadow-sm"
//                                                     alt={book.name}
//                                                 />
//                                                 : <i className="fa fa-image text-4xl text-gray-400"></i>
//                                             }
//                                         </td>
//                                         <td className="border p-3 text-center font-medium text-blue-600">{book.isbn || '-'}</td>
//                                         <td className="border p-3">{book.name}</td>
//                                         <td className="border p-3 text-right font-bold">{book.price.toLocaleString()} บาท</td>
//                                         <td className="border p-3 text-center">
//                                             <a href="#" onClick={(e) => {e.preventDefault(); openModalHistoryImportToStock(book);}}>
//                                                 <span
//                                                     className={`px-2 py-1 rounded text-sm font-medium ${
//                                                         (book.qty ?? 0) > 10
//                                                             ? "bg-green-100 text-green-800"
//                                                             : (book.qty ?? 0) > 0
//                                                             ? "bg-yellow-100 text-yellow-800"
//                                                             : "bg-red-100 text-red-800"
//                                                         }`}
//                                                 >
//                                                     {(book.qty ?? 0)}
//                                                 </span>
//                                             </a>
//                                             <div className="mt-1 text-xs">
//                                                 {(book.qty ?? 0) > 0 && (book.qty ?? 0) <= 10 && (<span className="text-yellow-800">สินค้าใกล้หมด</span>)}
//                                                 {(book.qty ?? 0) === 0 && (<span className="text-red-800">สินค้าหมด</span>)}
//                                             </div>
//                                         </td>
//                                         <td className="border p-3 text-center">
//                                             {book.category ? (
//                                                 <div className="flex flex-wrap gap-1 justify-center">
//                                                     {book.category.split(',').map((cat: string, index: number) => (
//                                                         <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
//                                                             {cat.trim()}
//                                                         </span>
//                                                     ))}
//                                                 </div>
//                                             ) : (
//                                                 <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-sm">
//                                                     ไม่มีหมวดหมู่
//                                                 </span>
//                                             )}
//                                         </td>
//                                         <td className="border p-3 text-sm max-w-[200px] truncate" title={book.description || 'ไม่มีคำอธิบาย'}>
//                                             {book.description ? book.description : 
//                                             <span className="text-gray-400 italic">ไม่มีคำอธิบาย</span>}
//                                         </td>
//                                         <td className="border p-2">
//                                             <div className="flex gap-2 justify-center">
//                                                 <button className="btn-action bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition" onClick={() => openModalImportToStock(book)} title="รับสินค้าเข้า">
//                                                     <i className="fa fa-plus text-sm"></i>
//                                                 </button>
//                                                 <button 
//                                                     className="btn-action bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition"
//                                                     onClick={() => handleEdit(book)}
//                                                     title="แก้ไข"
//                                                 >
//                                                     <i className="fa fa-edit text-sm"></i>
//                                                 </button>
//                                                 <button 
//                                                     className="btn-action bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
//                                                     onClick={() => handleDelete(book)}
//                                                     title="ลบ"
//                                                 >
//                                                     <i className="fa fa-trash text-sm"></i>
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//                         {currentItems.map((book: BookInterface) => (
//                             <div key={book.id} className="border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-200">
//                                 <div className="p-4 flex justify-center items-center h-48 bg-gray-50">
//                                     {book.image != null && typeof book.image === 'string' ?
//                                         <img 
//                                             src={Config.apiUrl + '/public/uploads/' + book.image}
//                                             className="max-h-full max-w-full object-contain rounded-md"
//                                             alt={book.name}
//                                         />
//                                         : <i className="fa fa-image text-5xl text-gray-400"></i>
//                                     }
//                                 </div>
//                                 <div className="p-4">
//                                     <h3 className="font-bold text-lg truncate" title={book.name}>{book.name}</h3>
//                                     <p className="text-blue-600 text-sm font-medium">{book.isbn || '-'}</p>
                                    
//                                     <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
//                                         <div className="flex flex-wrap gap-1">
//                                             {book.category ? (
//                                                 book.category.split(',').slice(0, 2).map((cat: string, index: number) => (
//                                                     <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
//                                                         {cat.trim()}
//                                                     </span>
//                                                 ))
//                                             ) : (
//                                                 <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
//                                                     ไม่มีหมวดหมู่
//                                                 </span>
//                                             )}
//                                             {book.category && book.category.split(',').length > 2 && (
//                                                 <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
//                                                     +{book.category.split(',').length - 2}
//                                                 </span>
//                                             )}
//                                         </div>
//                                         <a href="#" onClick={(e) => {e.preventDefault(); openModalHistoryImportToStock(book);}}>
//                                             <span
//                                                 className={`px-2 py-1 rounded text-sm font-medium ${
//                                                     (book.qty ?? 0) > 10
//                                                         ? "bg-green-100 text-green-800"
//                                                         : (book.qty ?? 0) > 0
//                                                         ? "bg-yellow-100 text-yellow-800"
//                                                         : "bg-red-100 text-red-800"
//                                                     }`}
//                                             >
//                                                 {(book.qty ?? 0)}
//                                             </span>
//                                         </a>
                                        
//                                     </div>
//                                     <div className="text-xs mt-1 text-right">
//                                         {(book.qty ?? 0) > 0 && (book.qty ?? 0) <= 10 && (<span className="text-yellow-800">สินค้าใกล้หมด</span>)}
//                                         {(book.qty ?? 0) === 0 && (<span className="text-red-800">สินค้าหมด</span>)}
//                                     </div>
                                    
//                                     <div className="flex justify-between items-center mt-3">
//                                         <span className="text-lg font-bold text-gray-800">
//                                             {book.price.toLocaleString()} บาท
//                                         </span>
//                                         <div className="flex gap-1">
//                                             <button 
//                                                 className="btn-action bg-green-500 text-white w-8 h-8 text-xs p-1 flex items-center justify-center rounded-full hover:bg-green-600 transition"
//                                                 onClick={() => openModalImportToStock(book)}
//                                                 title="เพิ่มสินค้า"
//                                             >
//                                                 <i className="fa fa-plus"></i>
//                                             </button>
//                                             <button 
//                                                 className="btn-action bg-yellow-500 text-white w-8 h-8 text-xs p-1 flex items-center justify-center rounded-full hover:bg-yellow-600 transition"
//                                                 onClick={() => handleEdit(book)}
//                                                 title="แก้ไข"
//                                             >
//                                                 <i className="fa fa-edit"></i>
//                                             </button>
//                                             <button 
//                                                 className="btn-action bg-red-500 text-white w-8 h-8 text-xs p-1 flex items-center justify-center rounded-full hover:bg-red-600 transition"
//                                                 onClick={() => handleDelete(book)}
//                                                 title="ลบ"
//                                             >
//                                                 <i className="fa fa-trash"></i>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
                
//                 <div className="mt-6">
//                     {filteredBooks.length > itemsPerPage && totalPages > 1 && renderPagination()}
//                 </div>
//             </div>

//             {/* Modal เพิ่ม/แก้ไขสินค้า */}
//             {showModal &&
//                 <Modal onClose={closeModal} title={id ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่"}>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="mb-4">
//                             <label className="block text-gray-700 mb-2">รหัสสินค้าหรือISBN*</label>
//                             <input 
//                                 value={isbn} 
//                                 onChange={(e) => setIsbn(e.target.value)}
//                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 mb-2">ชื่อสินค้า*</label>
//                             <input 
//                                 value={name} 
//                                 onChange={(e) => setName(e.target.value)}
//                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 mb-2">ราคา (บาท)*</label>
//                             <input 
//                                 type="number" 
//                                 value={price}
//                                 onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
//                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 mb-2">จำนวนสินค้าคงคลัง*</label>
//                             <input 
//                                 type="number" 
//                                 value={qty}
//                                 onChange={(e) => setQty(parseInt(e.target.value) || 0)}
//                                 // แก้ไข: ปิดการแก้ไขจำนวนเมื่อเป็นการแก้ไขสินค้า (เพราะควรใช้ฟังก์ชัน ImportToStock แทน)
//                                 disabled={id !== ''} 
//                                 className={`w-full px-3 py-2 border rounded focus:outline-none ${id ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-2 focus:ring-blue-500'}`}
//                             />
//                             {id && <p className="text-xs text-gray-500 mt-1">ใช้รับสินค้าเข้า เพื่อเพิ่มจำนวนสินค้าคงคลัง</p>}
//                         </div>

//                         <div className="mb-4 md:col-span-2">
//                             <label className="block text-gray-700 mb-2">หมวดหมู่สินค้า</label>
//                             <div className="flex gap-2 mb-2">
//                                 <select
//                                     value={selectedCategory}
//                                     onChange={(e) => handleCategorySelect(e.target.value)}
//                                     className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     disabled={customCategory.trim() !== ''} // ปิดเมื่อมีการพิมพ์เอง
//                                 >
//                                     <option value="">-- เลือกจากหมวดหมู่ที่มี --</option>
//                                     {categories.map((cat, index) => (
//                                         <option key={index} value={cat}>
//                                             {cat}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <input 
//                                     type="text"
//                                     placeholder="หรือพิมพ์หมวดหมู่ใหม่เอง"
//                                     value={customCategory}
//                                     onChange={(e) => handleCustomCategoryChange(e.target.value)}
//                                     className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     disabled={selectedCategory.trim() !== ''} // ปิดเมื่อมีการเลือกจาก dropdown
//                                 />
//                             </div>
//                             <p className="text-xs text-gray-500 mt-1">สามารถพิมพ์หลายหมวดหมู่โดยคั่นด้วยเครื่องหมาย , (เช่น นิยาย,ผจญภัย)</p>
//                         </div>
                        
//                         <div className="mb-4 md:col-span-2">
//                             <label className="block text-gray-700 mb-2">รายละเอียดสินค้า</label>
//                             <textarea
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 rows={3}
//                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             ></textarea>
//                         </div>

//                         <div className="mb-4 md:col-span-2">
//                             <label className="block text-gray-700 mb-2">รูปภาพสินค้า</label>
//                             <input 
//                                 type="file" 
//                                 onChange={(e) => {
//                                     if (e.target.files) {
//                                         chooseFile(e.target.files);
//                                     }
//                                 }} 
//                                 className="w-full text-gray-700"
//                                 accept="image/*"
//                             />
//                             {imageUrl && (
//                                 <div className="mt-3 w-32 h-32 border rounded-lg p-1">
//                                     <img src={imageUrl.startsWith('blob:') ? imageUrl : Config.apiUrl + '/public/uploads/' + imageUrl} 
//                                          alt="Preview" 
//                                          className="w-full h-full object-contain rounded-md"
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="mt-6 flex justify-end gap-3">
//                         <button 
//                             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
//                             onClick={closeModal}
//                         >
//                             ยกเลิก
//                         </button>
//                         <button 
//                             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                             onClick={handleSave}
//                         >
//                             <i className="fa fa-save mr-2"></i> บันทึกข้อมูล
//                         </button>
//                     </div>
//                 </Modal>
//             }

//             {/* Modal รับสินค้าเข้า (Import To Stock) */}
//             {isShowModalImportToStrock && bookForImportToStock && (
//                 <Modal onClose={closeModalImportToStock} title={`รับสินค้าเข้า: ${bookForImportToStock.name}`}>
//                     <div className="mb-4">
//                         <p className="text-lg font-medium mb-2">สินค้า: {bookForImportToStock.name} (ISBN: {bookForImportToStock.isbn})</p>
//                         <p className="text-gray-600 mb-4">จำนวนคงคลังปัจจุบัน: <span className="font-bold text-xl text-green-700">{bookForImportToStock.qty}</span></p>
                        
//                         <label className="block text-gray-700 mb-2">จำนวนที่ต้องการนำเข้า*</label>
                        
//                         {/* ช่องกรอกจำนวนสินค้า */}
//                         <input
//                             type="number"
//                             value={qtyForImportToStock}
//                             onChange={(e) => setQtyForImportToStock(parseInt(e.target.value) || 0)}
//                             min="1"
//                             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//                             autoFocus 
//                         />
                        
//                     </div>
//                     {/* ปุ่มยืนยัน */}
//                     <div className="mt-6 flex justify-end gap-3">
//                         <button 
//                             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
//                             onClick={closeModalImportToStock}
//                         >
//                             ยกเลิก
//                         </button>
//                         <button 
//                             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
//                             onClick={handleImportToStock}
//                             disabled={qtyForImportToStock <= 0} 
//                         >
//                             <i className="fa fa-arrow-down-to-square mr-2"></i> ยืนยันรับเข้า
//                         </button>
//                     </div>
//                 </Modal>
//             )}

//             {/* Modal ประวัติการรับเข้า (History Import To Stock) */}
//             {isShowModalHistoryImportToStock && bookForHistoryImportToStock && (
//                 <Modal 
//                     onClose={closeModalHistoryImportToStock} 
//                     title={`ประวัติการรับเข้า: ${bookForHistoryImportToStock.name}`} 
//                     size="xl" 
//                 >
//                     <p className="text-lg font-medium mb-4">สินค้า: {bookForHistoryImportToStock.name} (คงคลัง: {bookForHistoryImportToStock.qty})</p>
                    
//                     <div className="max-h-96 overflow-y-auto border rounded-lg">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50 sticky top-0">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         วันที่รับเข้า
//                                     </th>
//                                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         จำนวน
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {bookForHistoryImportToStock.ImportToStock && 
//                                  // กรองเพื่อเลือกเฉพาะรายการที่มี qty > 0 (รายการรับเข้า)
//                                  bookForHistoryImportToStock.ImportToStock.filter(item => item.qty > 0).length > 0 ? (
                                    
//                                     // จัดเรียงตามวันที่ล่าสุดก่อน
//                                     [...bookForHistoryImportToStock.ImportToStock]
//                                         .filter(item => item.qty > 0)
//                                         .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//                                         .map((item: ImportToStockInterface) => (
//                                         <tr key={item.id}>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                 {new Date(item.createdAt).toLocaleString('th-TH', { 
//                                                     year: 'numeric', month: 'numeric', day: 'numeric', 
//                                                     hour: '2-digit', minute: '2-digit' 
//                                                 })}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-600">
//                                                 +{item.qty.toLocaleString()}
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         {/* ใช้ colSpan = 2 */}
//                                         <td colSpan={2} className="px-6 py-4 text-center text-gray-500 italic">
//                                             ยังไม่มีประวัติการรับเข้า
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="mt-6 flex justify-end">
//                         <button 
//                             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
//                             onClick={closeModalHistoryImportToStock}
//                         >
//                             ปิด
//                         </button>
//                     </div>
//                 </Modal>
//             )}
//         </>
//     )
// }

'use client'

import { Config } from "@/app/config"
import type { BookInterface } from "@/app/interface/BookInterface"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState, useCallback } from "react" 
import Swal from "sweetalert2"
import Modal from "../components/Modal"
import { ImportToStockInterface } from "@/app/interface/ImportToStockInterface"
import { ErrorInterface } from "@/app/interface/ErrorInterface"

export default function Book() {
    const [books, setBooks] = useState<BookInterface[]>([])
    const [filteredBooks, setFilteredBooks] = useState<BookInterface[]>([])
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [isbn, setIsbn] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); // สำหรับ <select>
    const [customCategory, setCustomCategory] = useState('');  // สำหรับ <input>
    const [qty, setQty] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState<File | null>();
    const [imageUrl, setImageUrl] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;
    const [isShowModalImportToStrock, setIsShowModalImportToStock] = useState(false);
    const [bookForImportToStock, setBookForImportToStock] = useState<BookInterface | undefined>();
    const [qtyForImportToStock, setQtyForImportToStock] = useState(0);
    const [isShowModalHistoryImportToStock, setIsShowModalHistoryImportToStock] = useState(false);
    const [bookForHistoryImportToStock, setBookForHistoryImportToStock] = useState<BookInterface | undefined>();
    
    
    // State สำหรับจัดการหมวดหมู่
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetchData();
    }, [])
    
    // FIX: ใช้ useCallback เพื่อทำให้ฟังก์ชัน filterBooks เป็น stable
    const filterBooks = useCallback(() => {
        if (searchTerm.trim() === '') {
            setFilteredBooks(books);
            setCurrentPage(1);
            return;
        }

        const term = searchTerm.toLowerCase();
        const filtered = books.filter(book => {
            // ค้นหาชื่อสินค้า
            const nameMatch = book.name?.toLowerCase().includes(term);
            
            // ค้นหา ISBN
            const isbnMatch = book.isbn?.toLowerCase().includes(term);
            
            // ค้นหาในหมวดหมู่ (รองรับ comma-separated)
            let categoryMatch = false;
            if (book.category) {
                const bookCategories = book.category
                    .split(',')
                    .map(cat => cat.trim().toLowerCase())
                    .filter(cat => cat !== '');
                categoryMatch = bookCategories.some(cat => cat.includes(term));
            }
            
            return nameMatch || isbnMatch || categoryMatch;
        });
        
        setFilteredBooks(filtered);
        setCurrentPage(1);
    }, [searchTerm, books]); 

    // FIX: useEffect เรียกใช้ filterBooks โดยมี filterBooks เป็น dependency
    useEffect(() => {
        filterBooks();
    }, [filterBooks]) 

    // FIX: ใช้ useCallback เพื่อทำให้ฟังก์ชัน fetchCategories เป็น stable
    const fetchCategories = useCallback(async () => {
        try {
            // ดึงหมวดหมู่ที่ไม่ซ้ำจาก books ที่โหลดแล้ว
            const allCategories: string[] = [];
            
            books.forEach(book => {
                if (book.category && book.category.trim() !== '') {
                    // แยกหมวดหมู่ที่คั่นด้วย comma
                    const bookCategories = book.category
                        .split(',')
                        .map(cat => cat.trim())
                        .filter(cat => cat !== '');
                    
                    allCategories.push(...bookCategories);
                }
            });
            
            // ลบหมวดหมู่ที่ซ้ำ
            const uniqueCategories = Array.from(new Set(allCategories));
            setCategories(uniqueCategories);
            
        } catch (err: unknown) {
           Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message,
                icon: 'error'
            })
            // Fallback ในกรณีที่เกิดข้อผิดพลาด
            const uniqueCategories = Array.from(new Set(
                books.map(book => book.category).filter(cat => cat && cat.trim() !== '')
            )) as string[];
            setCategories(uniqueCategories);
        }
    }, [books]); 
    
    // FIX: useEffect เรียกใช้ fetchCategories โดยมี fetchCategories เป็น dependency
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories])


    const fetchData = async () => {
        try {
            const url = Config.apiUrl + '/api/book'
            const response = await axios.get(url);

            if (response.status == 200) {
                setBooks(response.data);
                setFilteredBooks(response.data);
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message,
                icon: 'error'
            })
        }
    }
    
    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setId('');
        setIsbn('');
        setName('');
        setPrice(0);
        setDescription('');
        setSelectedCategory('');
        setCustomCategory('');
        setQty(0);
        setImageUrl('');
        setImage(null);
    }

    const handleSave = async () => {

        if (!isbn.trim()) {
            Swal.fire({
                title: 'รหัสสินค้าหรือISBN ว่าง',
                text: 'กรุณากรอกรหัสสินค้าหรือISBN',
                icon: 'warning'
            });
            return;
        }
        if (!name.trim()) {
            Swal.fire({
                title: 'ชื่อสินค้าไม่ครบ',
                text: 'กรุณากรอกชื่อสินค้า',
                icon: 'warning'
            });
            return;
        }
        if (price <= 0) {
            Swal.fire({
                title: 'ราคาผิดพลาด',
                text: 'กรุณากรอกราคาให้มากกว่า 0',
                icon: 'warning'
            });
            return;
        }
        // ตรวจสอบจำนวนเริ่มต้น (Qty) สำหรับสินค้าใหม่เท่านั้น หรือเมื่อทำการแก้ไข
        if (qty <= 0 && id == '') { 
            Swal.fire({
                title: 'จำนวนสินค้าไม่ครบ',
                text: 'กรุณากรอกจำนวนสินค้าให้มากกว่า 0',
                icon: 'warning'
            });
            return;
        }

        try {
            let response:  AxiosResponse<unknown>;
            const data = new FormData();
            
            // เวลา submit หรือบันทึก: ถ้า user พิมพ์เอง → ใช้ customCategory, ถ้าไม่พิมพ์ → ใช้ selectedCategory
            const finalCategory = customCategory.trim() ? customCategory : selectedCategory;

            // ตรวจสอบ image ก่อน append
            if (image) {
                 data.append("image", image as Blob);
            }
           
            data.append("isbn", isbn);
            data.append("name", name);
            data.append("price", price.toString());
            data.append("description", description);
            data.append("category", finalCategory);
            
            // ส่ง qty ไป Backend เสมอ (ทั้ง Insert และ Update)
            // การแก้ไขค่าในช่อง Qty จะเป็นการเขียนทับค่าเก่า
            data.append("qty", qty.toString()); 
            

            if (id == '') {
                //insert
                const url = Config.apiUrl + '/api/book';
                response = await axios.post(url, data);
            } else {
                // update
                const url = Config.apiUrl + '/api/book/' + id;
                response = await axios.put(url, data);
            }

            if (response.status == 200) {
                Swal.fire({
                    title: 'บันทึกข้อมูล',
                    text: 'บันทึกข้อมูลสำเร็จ',
                    icon: 'success',
                    timer: 1000
                })
                fetchData();
                closeModal();
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message,
                icon: 'error'
            })
        }
    }

    const handleEdit = (book: BookInterface) => {
        setId(book.id);
        setIsbn(book.isbn ?? '');
        setName(book.name);
        setPrice(book.price);
        setDescription(book.description ?? '');
        
        
        // ตรวจสอบว่าหมวดหมู่ของ book อยู่ในรายการ categories หรือไม่
        const bookCategory = book.category ?? '';
        if (categories.includes(bookCategory)) {
            setSelectedCategory(bookCategory);
            setCustomCategory('');
        } else {
            setSelectedCategory('');
            setCustomCategory(bookCategory);
        }
        
        setQty(book.qty ?? 0);
        // ตรวจสอบให้แน่ใจว่า book.image เป็น string ก่อนกำหนดให้กับ setImageUrl
        if (typeof book.image === 'string') {
            setImageUrl(book.image);
        } else {
             setImageUrl('');
        }
        setImage(null); // ล้าง File state เมื่อเปิดแก้ไข

        openModal();
    }

    const handleDelete = async (book: BookInterface) => {
        const button = await Swal.fire({
            title: 'ลบข้อมูล',
            text: 'ยืนยันการลบสินค้า ' + book.name,
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        })

        if (button.isConfirmed) {
            const url = Config.apiUrl + '/api/book/' + book.id;
            const response = await axios.delete(url);

            if (response.status == 200) {
                Swal.fire({
                    title: 'ลบข้อมุล',
                    text: 'ลบข้อมูลสำเร็จ',
                    icon: 'success',
                    timer: 1000
                })

                fetchData();
            }
        }
    }

    const chooseFile = (files: FileList) => {
        if (files.length > 0) {
            const file: File = files[0];
            setImage(file);
            // สร้าง URL ชั่วคราวสำหรับพรีวิว
            const tempUrl = URL.createObjectURL(file);
            setImageUrl(tempUrl);
        }
    }

    const openModalImportToStock = (book: BookInterface) => {
        setBookForImportToStock(book);
        setIsShowModalImportToStock(true);
        setQtyForImportToStock(1); // กำหนดค่าเริ่มต้นเป็น 1
    }

    const closeModalImportToStock = () => {
        setIsShowModalImportToStock(false);
        setBookForImportToStock(undefined);
        setQtyForImportToStock(0);
    }
    

    const handleImportToStock = async () => {
        if (!bookForImportToStock?.id || qtyForImportToStock <= 0) {
             Swal.fire({
                title: 'ข้อมูลไม่ถูกต้อง',
                text: 'กรุณากรอกจำนวนสินค้าให้มากกว่า 0',
                icon: 'warning'
            });
            return;
        }

        try {
            const url = Config.apiUrl + '/api/book/importToStock';
            const payload = {
                bookId: bookForImportToStock.id,
                qty: qtyForImportToStock
            }
            const response = await axios.post(url, payload);
            
            if (response.status == 200) {
                Swal.fire({
                    title: 'รับสินค้าเข้าสินค้าคงคลัง',
                    text: 'รับสินค้าเข้าสินค้าคงคลังสำเร็จ',
                    icon: 'success',
                    timer: 1000
                })
                fetchData();
                closeModalImportToStock();
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message || 'เกิดข้อผิดพลาดในการนำเข้าสินค้า',
                icon: 'error'
            })
        }
    }

    const openModalHistoryImportToStock = (book: BookInterface) => {
        setBookForHistoryImportToStock(book);
        setIsShowModalHistoryImportToStock(true);
    }

    const closeModalHistoryImportToStock = () => {
        setIsShowModalHistoryImportToStock(false);
        setBookForHistoryImportToStock(undefined);
    }

    // ฟังก์ชันสำหรับจัดการการเลือกจาก dropdown
    const handleCategorySelect = (value: string) => {
        setSelectedCategory(value);
        // ถ้าเลือกจาก dropdown ให้ล้าง custom input
        if (value !== '') {
            setCustomCategory('');
        }
    }

    // ฟังก์ชันสำหรับจัดการการพิมพ์ custom category
    const handleCustomCategoryChange = (value: string) => {
        setCustomCategory(value);
        // ถ้าพิมพ์ custom ให้ล้าง dropdown selection
        if (value.trim() !== '') {
            setSelectedCategory('');
        }
    }

    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const renderPagination = () => {
        const pages = [];
        const pageLimit = 5;
        let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
        let endPage = Math.min(totalPages, startPage + pageLimit - 1);
        
        if (endPage - startPage + 1 < pageLimit) {
            startPage = Math.max(1, endPage - pageLimit + 1);
            endPage = Math.min(totalPages, startPage + pageLimit - 1); 
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button 
                    key={i} 
                    className={`px-3 py-1 mx-1 rounded ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => paginate(i)}
                >
                    {i}
                </button>
            );
        }
        
        return (
            <div className="flex justify-center mt-4">
                <button 
                    className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {pages}
                <button 
                    className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        );
    };

    return (
        <>
            <div className="container">
                <div className="title mb-6">สินค้าคงคลัง</div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex flex-wrap gap-2">
                        <button onClick={openModal} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
                            <i className="fa fa-plus mr-2"></i>
                            เพิ่มสินค้า
                        </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        
                        {/* Existing Search Input */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="ค้นหาชื่อ,รหัสสินค้าหรือISBNและหมวดหมู่..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                // 💡 แก้ไข autoFocus ให้โฟกัสเมื่อไม่มี Modal เปิดอยู่
                                autoFocus={!showModal && !isShowModalImportToStrock && !isShowModalHistoryImportToStock} 
                            />
                            <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700">มุมมอง:</span>
                            <div className="flex rounded overflow-hidden">
                                <button 
                                    className={`px-3 py-2 transition duration-200 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                    onClick={() => setViewMode('list')}
                                    title="มุมมองตาราง"
                                >
                                    <i className="fa fa-list"></i>
                                </button>
                                <button 
                                    className={`px-3 py-2 transition duration-200 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                    onClick={() => setViewMode('grid')}
                                    title="มุมมองกริด"
                                >
                                    <i className="fa fa-th"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {filteredBooks.length === 0 ? (
                    <div className="text-center py-8">
                        <i className="fa fa-search text-5xl text-gray-300 mb-3"></i>
                        <p className="text-gray-500">ไม่พบข้อมูลสินค้า</p>
                    </div>
                ) : viewMode === 'list' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-3">รูปภาพ</th>
                                    <th className="border p-3">รหัสสินค้าหรือISBN</th>
                                    <th className="border p-3">ชื่อสินค้า</th>
                                    <th className="border p-3 text-right">ราคาสินค้า</th>
                                    <th className="border p-3 text-center">จำนวนสินค้าคงคลัง</th>
                                    <th className="border p-3">หมวดหมู่สินค้า</th>
                                    <th className="border p-3">รายละเอียดสินค้า</th>
                                    <th className="border p-3 w-[150px]">จัดการสินค้า</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((book: BookInterface) => (
                                    <tr key={book.id} className="hover:bg-gray-50">
                                        <td className="border p-3 text-center">
                                            {book.image != null && typeof book.image === 'string' ?
                                                <img src={Config.apiUrl + '/public/uploads/' + book.image}
                                                    className="w-[100px] h-[100px] object-contain mx-auto rounded-lg shadow-sm"
                                                    alt={book.name}
                                                />
                                                : <i className="fa fa-image text-4xl text-gray-400"></i>
                                            }
                                        </td>
                                        <td className="border p-3 text-center font-medium text-blue-600">{book.isbn || '-'}</td>
                                        <td className="border p-3">{book.name}</td>
                                        <td className="border p-3 text-right font-bold">{book.price.toLocaleString()} บาท</td>
                                        <td className="border p-3 text-center">
                                            <a href="#" onClick={(e) => {e.preventDefault(); openModalHistoryImportToStock(book);}}>
                                                <span
                                                    className={`px-2 py-1 rounded text-sm font-medium ${
                                                        (book.qty ?? 0) > 10
                                                            ? "bg-green-100 text-green-800"
                                                            : (book.qty ?? 0) > 0
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-red-100 text-red-800"
                                                        }`}
                                                >
                                                    {(book.qty ?? 0)}
                                                </span>
                                            </a>
                                            <div className="mt-1 text-xs">
                                                {(book.qty ?? 0) > 0 && (book.qty ?? 0) <= 10 && (<span className="text-yellow-800">สินค้าใกล้หมด</span>)}
                                                {(book.qty ?? 0) === 0 && (<span className="text-red-800">สินค้าหมด</span>)}
                                            </div>
                                        </td>
                                        <td className="border p-3 text-center">
                                            {book.category ? (
                                                <div className="flex flex-wrap gap-1 justify-center">
                                                    {book.category.split(',').map((cat: string, index: number) => (
                                                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                                            {cat.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-sm">
                                                    ไม่มีหมวดหมู่
                                                </span>
                                            )}
                                        </td>
                                        <td className="border p-3 text-sm max-w-[200px] truncate" title={book.description || 'ไม่มีคำอธิบาย'}>
                                            {book.description ? book.description : 
                                            <span className="text-gray-400 italic">ไม่มีคำอธิบาย</span>}
                                        </td>
                                        <td className="border p-2">
                                            <div className="flex gap-2 justify-center">
                                                <button className="btn-action bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition" onClick={() => openModalImportToStock(book)} title="รับสินค้าเข้า">
                                                    <i className="fa fa-plus text-sm"></i>
                                                </button>
                                                <button 
                                                    className="btn-action bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition"
                                                    onClick={() => handleEdit(book)}
                                                    title="แก้ไข"
                                                >
                                                    <i className="fa fa-edit text-sm"></i>
                                                </button>
                                                <button 
                                                    className="btn-action bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                                    onClick={() => handleDelete(book)}
                                                    title="ลบ"
                                                >
                                                    <i className="fa fa-trash text-sm"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {currentItems.map((book: BookInterface) => (
                            <div key={book.id} className="border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-200">
                                <div className="p-4 flex justify-center items-center h-48 bg-gray-50">
                                    {book.image != null && typeof book.image === 'string' ?
                                        <img 
                                            src={Config.apiUrl + '/public/uploads/' + book.image}
                                            className="max-h-full max-w-full object-contain rounded-md"
                                            alt={book.name}
                                        />
                                        : <i className="fa fa-image text-5xl text-gray-400"></i>
                                    }
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg truncate" title={book.name}>{book.name}</h3>
                                    <p className="text-blue-600 text-sm font-medium">{book.isbn || '-'}</p>
                                    
                                    <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
                                        <div className="flex flex-wrap gap-1">
                                            {book.category ? (
                                                book.category.split(',').slice(0, 2).map((cat: string, index: number) => (
                                                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                        {cat.trim()}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                                                    ไม่มีหมวดหมู่
                                                </span>
                                            )}
                                            {book.category && book.category.split(',').length > 2 && (
                                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                                    +{book.category.split(',').length - 2}
                                                </span>
                                            )}
                                        </div>
                                        <a href="#" onClick={(e) => {e.preventDefault(); openModalHistoryImportToStock(book);}}>
                                            <span
                                                className={`px-2 py-1 rounded text-sm font-medium ${
                                                    (book.qty ?? 0) > 10
                                                        ? "bg-green-100 text-green-800"
                                                        : (book.qty ?? 0) > 0
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {(book.qty ?? 0)}
                                            </span>
                                        </a>
                                        
                                    </div>
                                    <div className="text-xs mt-1 text-right">
                                        {(book.qty ?? 0) > 0 && (book.qty ?? 0) <= 10 && (<span className="text-yellow-800">สินค้าใกล้หมด</span>)}
                                        {(book.qty ?? 0) === 0 && (<span className="text-red-800">สินค้าหมด</span>)}
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-lg font-bold text-gray-800">
                                            {book.price.toLocaleString()} บาท
                                        </span>
                                        <div className="flex gap-1">
                                            <button 
                                                className="btn-action bg-green-500 text-white w-8 h-8 text-xs p-1 flex items-center justify-center rounded-full hover:bg-green-600 transition"
                                                onClick={() => openModalImportToStock(book)}
                                                title="เพิ่มสินค้า"
                                            >
                                                <i className="fa fa-plus"></i>
                                            </button>
                                            <button 
                                                className="btn-action bg-yellow-500 text-white w-8 h-8 text-xs p-1 flex items-center justify-center rounded-full hover:bg-yellow-600 transition"
                                                onClick={() => handleEdit(book)}
                                                title="แก้ไข"
                                            >
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button 
                                                className="btn-action bg-red-500 text-white w-8 h-8 text-xs p-1 flex items-center justify-center rounded-full hover:bg-red-600 transition"
                                                onClick={() => handleDelete(book)}
                                                title="ลบ"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="mt-6">
                    {filteredBooks.length > itemsPerPage && totalPages > 1 && renderPagination()}
                </div>
            </div>

            {/* Modal เพิ่ม/แก้ไขสินค้า */}
            {showModal &&
                <Modal onClose={closeModal} title={id ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่"}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">รหัสสินค้าหรือISBN*</label>
                            <input 
                                value={isbn} 
                                onChange={(e) => setIsbn(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">ชื่อสินค้า*</label>
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    
                    {/* ✅ แก้ไข Qty UI ให้กลับมาเป็น Editable และมี warning */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">ราคา (บาท)*</label>
                            <input 
                                type="number" 
                                value={price}
                                onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">จำนวนสินค้าคงคลัง*</label>
                            <input 
                                type="number" 
                                value={qty}
                                onChange={(e) => setQty(parseInt(e.target.value) || 0)}
                                // ✅ ลบ disabled={id !== ''} ออก เพื่อให้แก้ไขได้
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* ✅ เพิ่มข้อความเตือนกลับมา */}
                            {id && <p className="text-xs text-yellow-600 mt-1">การแก้ไขจำนวนตรงนี้จะ **เขียนทับ** ค่าคงคลังปัจจุบัน</p>}
                        </div>
                    </div>
                    {/* ❌ สิ้นสุดส่วน Qty ที่แก้ไข */}

                    <div className="mb-4 md:col-span-2">
                        <label className="block text-gray-700 mb-2">รายละเอียดสินค้า</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div className="mb-4 md:col-span-2">
                        <label className="block text-gray-700 mb-2">หมวดหมู่สินค้า</label>
                        <div className="flex gap-2 mb-2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => handleCategorySelect(e.target.value)}
                                className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={customCategory.trim() !== ''} // ปิดเมื่อมีการพิมพ์เอง
                            >
                                <option value="">-- เลือกจากหมวดหมู่ที่มี --</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <input 
                                type="text"
                                placeholder="หรือพิมพ์หมวดหมู่ใหม่เอง"
                                value={customCategory}
                                onChange={(e) => handleCustomCategoryChange(e.target.value)}
                                className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={selectedCategory.trim() !== ''} // ปิดเมื่อมีการเลือกจาก dropdown
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">สามารถพิมพ์หลายหมวดหมู่โดยคั่นด้วยเครื่องหมาย , (เช่น นิยาย,ผจญภัย)</p>
                    </div>
                    

                    <div className="mb-4 md:col-span-2">
                        <label className="block text-gray-700 mb-2">รูปภาพสินค้า</label>
                        <input 
                            type="file" 
                            onChange={(e) => {
                                if (e.target.files) {
                                    chooseFile(e.target.files);
                                }
                            }} 
                            className="w-full text-gray-700"
                            accept="image/*"
                        />
                        {imageUrl && (
                            <div className="mt-3 w-32 h-32 border rounded-lg p-1">
                                <img src={imageUrl.startsWith('blob:') ? imageUrl : Config.apiUrl + '/public/uploads/' + imageUrl} 
                                        alt="Preview" 
                                        className="w-full h-full object-contain rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button 
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                            onClick={closeModal}
                        >
                            ยกเลิก
                        </button>
                        <button 
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            onClick={handleSave}
                        >
                            <i className="fa fa-save mr-2"></i> บันทึกข้อมูล
                        </button>
                    </div>
                </Modal>
            }

            {/* Modal รับสินค้าเข้า (Import To Stock) */}
            {isShowModalImportToStrock && bookForImportToStock && (
                <Modal onClose={closeModalImportToStock} title={`รับสินค้าเข้า: ${bookForImportToStock.name}`}>
                    <div className="mb-4">
                        <p className="text-lg font-medium mb-2">
                             สินค้า: {bookForImportToStock.name} (ISBN: {bookForImportToStock.isbn})
                        </p>
                        <p className="text-gray-600 mb-4">
                            จำนวนคงคลังปัจจุบัน: <span className="font-bold text-xl text-green-700">{bookForImportToStock.qty}</span>
                        </p>
                        
                        <label className="block text-gray-700 mb-2">จำนวนที่ต้องการนำเข้า*</label>
                        
                        {/* ช่องกรอกจำนวนสินค้า */}
                        <input
                            type="number"
                            value={qtyForImportToStock}
                            onChange={(e) => setQtyForImportToStock(parseInt(e.target.value) || 0)}
                            min="1"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            autoFocus 
                        />
                        
                    </div>
                    {/* ปุ่มยืนยัน */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button 
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                            onClick={closeModalImportToStock}
                        >
                            ยกเลิก
                        </button>
                        <button 
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                            onClick={handleImportToStock}
                            disabled={qtyForImportToStock <= 0} 
                        >
                            <i className="fa fa-check mr-2"></i> ยืนยันรับเข้า
                        </button>
                    </div>
                </Modal>
            )}

            {/* Modal ประวัติการรับเข้า (History Import To Stock) */}
            {isShowModalHistoryImportToStock && bookForHistoryImportToStock && (
                <Modal 
                    onClose={closeModalHistoryImportToStock} 
                    title={`ประวัติการรับเข้า: ${bookForHistoryImportToStock.name}`} 
                    size="xl" 
                >
                    {/* ส่ง onClose prop ให้ ImportToStockHistory โดยตรง */}
                    <ImportToStockHistory 
                        bookId={bookForHistoryImportToStock.id} 
                        onClose={closeModalHistoryImportToStock}
                    />
                </Modal>
            )}
        </>
    )
}


// Component แยกสำหรับประวัติการรับเข้า (เพื่อลดความซับซ้อน)
interface ImportToStockHistoryProps {
    bookId: string;
    onClose: () => void; 
}

function ImportToStockHistory({ bookId, onClose }: ImportToStockHistoryProps) {
    const [history, setHistory] = useState<ImportToStockInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // URL ที่ถูกต้องสำหรับดึงประวัติการรับเข้า
                const url = `${Config.apiUrl}/api/book/importToStock/history/${bookId}`;
                const response = await axios.get(url);
                
                if (response.status === 200) {
                    // กรองเฉพาะรายการที่ qty > 0 (รายการรับเข้า) 
                    const filteredHistory = response.data.filter((item: ImportToStockInterface) => item.qty > 0);
                    // จัดเรียงตามวันที่ล่าสุด
                    const sortedHistory = filteredHistory.sort((a: ImportToStockInterface, b: ImportToStockInterface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    setHistory(sortedHistory);
                }
            } catch (err: unknown) {
                 Swal.fire({
                    title: 'error',
                    text: (err as ErrorInterface).message || 'เกิดข้อผิดพลาดในการดึงประวัติ',
                    icon: 'error'
                })
            } finally {
                setIsLoading(false);
            }
        }
        fetchHistory();
    }, [bookId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-blue-600">กำลังโหลดประวัติ...</span>
            </div>
        );
    }
    

    return (
        <div className="mt-4">
            <h4 className="text-lg font-semibold mb-3">ประวัติการปรับปรุงสต็อก</h4>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg max-h-[400px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                วันที่/เวลา
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                จำนวนที่รับเข้า (QTY)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {history.length > 0 ? (
                            history.map((item: ImportToStockInterface) => (
                                <tr key={item.id} className="hover:bg-green-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(item.createdAt || '').toLocaleString('th-TH', { 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric', 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-600">
                                        +{item.qty.toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="px-6 py-4 text-center text-gray-500 italic">
                                    ยังไม่มีประวัติการรับเข้า
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-end">
                <button 
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                    onClick={onClose} 
                >
                    ปิด
                </button>
            </div>
        </div>
    )
}