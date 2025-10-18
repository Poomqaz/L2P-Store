'use client'

import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Config } from "../config";
import { BookInterface } from "../interface/BookInterface";
import { CartInterface } from "../interface/CartInterface";
import Link from "next/link";
import { ErrorInterface } from '@/app/interface/ErrorInterface';
import { ReviewInterface } from "../interface/ReviewInterface";

export default function Home() {
    const [books, setBooks] = useState<BookInterface[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<BookInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [token, setToken] = useState('');
    const [carts, setCarts] = useState<CartInterface[]>([]);
    const [memberId, setMemberId] = useState('');
    const [qtyInCart, setQtyInCart] = useState(0);

    // *** 💡 1. State สำหรับเก็บรายการแนะนำหนังสือ ***
    const [recommendations, setRecommendations] = useState<BookInterface[]>([]);

    // *** State สำหรับดูรายละเอียดสินค้า ***
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [currentDetailBook, setCurrentDetailBook] = useState<BookInterface | null>(null);

    // Function to get stock status
    const getStockInfo = (book: BookInterface) => {
        const totalStock = (book.qty ?? 0) + (book.sumImportToStock ?? 0);
        if (totalStock <= 0) {
            return {
                stock: 0,
                status: 'out-of-stock',
                message: 'สินค้าหมด',
                className: 'bg-red-100 text-red-800 border-red-200'
            };
        } else if (totalStock <= 10) {
            return {
                stock: totalStock,
                status: 'low-stock',
                message: 'สินค้าใกล้หมด',
                className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
           
         };
        } else {
            return {
                stock: totalStock,
                status: 'in-stock',
                message: 'พร้อมจำหน่าย',
                className: 'bg-green-100 text-green-800 border-green-200'
            };
        }
    };


    // *** 1. ห่อหุ้ม fetchData ด้วย useCallback ***
    const fetchData = useCallback(async () => {
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
    }, []) // Dependency array ว่างเปล่า 


    const readToken = async () => {
        const token = localStorage.getItem(Config.tokenMember) ??
        ''
        setToken(token);

        if (!token) return;
        try {
            const url = Config.apiUrl + '/api/member/info'
            const headers = {
                'Authorization': 'Bearer ' + token
            }
            const response = await axios.get(url, { headers })

            if (response.status == 200) 
            {
                setMemberId(response.data.id)
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message,
            
         icon: 'error'
            })
        }
    }
    
    // *** 2. ห่อหุ้ม fetchDataCart ด้วย useCallback ***
    const fetchDataCart = useCallback(async () => {
        try {
            if (token != '' && memberId != '') { 
                const url = Config.apiUrl + '/api/cart/list/' + memberId
             
                const response = await axios.get(url)

                if (response.status == 200) {
                    setCarts(response.data);
                    let sum = 0;

                    for (let i = 0; i < response.data.length; i++) {
                        const item = response.data[i];
                        sum += item.qty;
                    }

                    setQtyInCart(sum);
                }
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message,
                icon: 'error'
           
         })
        }
    }, [memberId, token]) // Dependency: memberId และ token
    
    // *** 3. ห่อหุ้ม handleAddToCart ด้วย useCallback ***
    const handleAddToCart = useCallback(async (bookId: string, availableStock: number) => {
        if (memberId === '') {
            Swal.fire({
                title: 'เข้าสู่ระบบ',
                text: 'กรุณาเข้าสู่ระบบก่อนจึงจะสามารถเพิ่มสินค้าลงในตะกร้าได้',
                icon: 'warning',
                confirmButtonText: 'ตกลง'
            });
            return;
        }

        if (availableStock <= 0) {
            Swal.fire({
                title: 'สินค้าหมดแล้ว!',
                text: 'สินค้าชิ้นนี้หมดจากสต็อกแล้ว',
                
                icon: 'warning',
                confirmButtonText: 'ตกลง'
            });
            return;
        }

        try {
            const url = Config.apiUrl + '/api/cart/add'
            const payload = {
                memberId: memberId,
                bookId: bookId
            }
            
            const response = await axios.post(url, payload);

            if (response.status == 200) {
                // ** เรียก fetchDataCart โดยตรง **
                await fetchDataCart(); 
                Swal.fire({
                    title: 'สำเร็จ!',
                    text: 'เพิ่มลงในตะกร้าแล้ว',
                    icon: 'success',
                    timer: 2000,
                
             showConfirmButton: false
                });
            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'error',
                text: (err as ErrorInterface).message,
                icon: 'error'
            })
        }
   // ** Dependency: memberId และ fetchDataCart **
    }, [memberId, fetchDataCart])
    
    
    // *** 💡 2. ฟังก์ชันเรียก API หนังสือแนะนำ ***
    const fetchRecommendations = useCallback(async (bookId: string) => {
        setRecommendations([]); // ล้างรายการเก่าก่อน

        try {
            const url = Config.apiUrl + `/api/book/${bookId}/recommendations`;
            const response = await axios.get(url);

            if (response.status === 200) {
                setRecommendations(response.data as BookInterface[]);
            }
        } catch (err: unknown) {
            console.error('Error fetching recommendations:', err);
            // ไม่ต้องแสดง Swal error เพราะเป็นเพียงฟังก์ชันเสริม
            setRecommendations([]);
        }
    }, []); // Dependency array ว่างเปล่า
    
    // *** ฟังก์ชันสำหรับสร้าง HTML รายการรีวิวและฟิลเตอร์ ***
    const generateReviewHtml = useCallback((reviewsList: ReviewInterface[], currentFilter: number | 'all', bookName: string) => {
        
        const filtered = currentFilter === 'all'
            ? reviewsList
            : reviewsList.filter(review => review.rating === currentFilter);

        const ratingCounts: { [key: number]: number } = { 5: 0, 4: 0, 
            3: 0, 2: 0, 1: 0 };
        reviewsList.forEach(review => {
            if (review.rating >= 1 && review.rating <= 5) {
                ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
            }
        });

        const filterButtons = `
           
             <div id="review-filter-buttons" class="flex flex-wrap justify-start gap-2 mb-4 p-2 bg-gray-50 border-b border-gray-200 rounded-lg">
                <button 
                    class="filter-btn text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${currentFilter === 'all' ?
                        'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}"
                    data-rating="all"
                >
                    ทั้งหมด (${reviewsList.length})
                </button>
                ${[5, 4, 3, 
                2, 1].map(r => `
                    <button 
                        class="filter-btn text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${currentFilter === r ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'} ${ratingCounts[r] === 0 ? 'opacity-70 cursor-not-allowed' : ''}"
                        data-rating="${r}"
 
                        ${ratingCounts[r] === 0 ? 'disabled' : ''}
                    >
                        ${r} ดาว (${ratingCounts[r]})
                    </button>
     
                `).join('')}
            </div>
        `;

        const reviewListHtml = filtered.length > 0 ?
            `
            <div class="swal2-review-list-container text-left max-h-[50vh] overflow-y-auto p-1 pr-3">
                ${filtered.map(review => `
       
                     <div class="border-b border-gray-200 py-4 last:border-b-0">
                        <div class="flex items-center justify-between mb-1">
                            <span class="font-bold text-base text-gray-800">${review.memberName ??
                                'สมาชิกท่านหนึ่ง'}</span>
                            <span class="text-gray-400 text-xs">${new Date(review.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div class="flex items-center mb-2">
          
                            ${[1, 2, 3, 4, 5].map(star => `
                                <i 
                                    class="fa ${star <= review.rating ? 'fa-star' : 
                                        'fa-star-o'} text-lg" 
                                    style="color: ${star <= review.rating ? '#ffc107' : '#d1d5db'};"
                                ></i>
                       
                        `).join('')}
                        </div>
                        <p class="text-gray-700 text-sm mb-0.5 whitespace-pre-wrap">${review.comment ||
                            '*ไม่มีความคิดเห็นเพิ่มเติม*'}</p>
                    </div>
                `).join('')}
            </div>
            `
            :
            `<div class="text-center py-6 bg-gray-50 rounded-lg border border-gray-200 mt-4">
         
                <p class="text-gray-500 font-medium text-lg">
                    <i class="fa fa-frown-o mr-2"></i>
                    ไม่พบรีวิวสำหรับ ${currentFilter === 'all' ?
                        `หนังสือ ${bookName}` : `ระดับ ${currentFilter} ดาว`}
                </p>
             </div>`;
            return `
            ${filterButtons}
            ${reviewListHtml}
        `;
    }, []) // Dependency array ว่างเปล่า 
    
    
    // *** ฟังก์ชันสำหรับแสดง Modal ดูรีวิว ***
    const displayReviewModal = useCallback((book: BookInterface, reviewsData: ReviewInterface[], filter: number | 'all', updateFilter: (rating: number | 'all') => void) => {
        Swal.fire({
            title: `<span class="text-xl font-bold text-gray-800">รีวิวทั้งหมดของ ${book.name}</span>`,
            customClass: {
                container: 'swal2-review-modal-container',
                popup: 'swal2-detail-modal w-[195vw] lg:w-[190vw] max-w-7xl rounded-2xl shadow-2xl', 
      
                title: 'pb-0',
                htmlContainer: 'pt-0',
            },
            width: '80%', 
            html: generateReviewHtml(reviewsData, filter, book.name),
            showConfirmButton: true,
            confirmButtonText: 'ปิด',
     
            showCloseButton: true,
            confirmButtonColor: '#4c51bf', 
            didOpen: () => {
                const container = Swal.getHtmlContainer();
                if (container) {
                    container.querySelectorAll('.filter-btn').forEach(button => {
    
                        button.addEventListener('click', (event) => {
                            const target = event.currentTarget as HTMLButtonElement;
                            const rating = target.dataset.rating ??
                            'all'; 
                            
                            // ใช้ updateFilter ที่ส่งมาเพื่อเปลี่ยน filter และอัปเดต Modal
                            updateFilter(rating === 'all' ? 'all' : parseInt(rating, 10));
                        });
                    });
                }
            },
            didClose: () => {
                // ...
            }
        });
    }, [generateReviewHtml]) // Dependency: generateReviewHtml

    
    // *** 4. ห่อหุ้ม handleViewReviews ด้วย useCallback ***
    const handleViewReviews = useCallback(async (book: BookInterface) => {
        
        try {
            const url = Config.apiUrl + '/api/review/list/' + book.id;
            const response = await axios.get(url);

            if (response.status === 200) {
                const reviewsData: ReviewInterface[] = response.data;
                
                // *** แก้ไข: แสดง Modal ที่นี่หลังจากได้ข้อมูลรีวิวแล้ว ***
                let currentFilter: number | 'all' = 'all';

                // สร้างฟังก์ชันที่จะอัปเดตสถานะ filter และเนื้อหา Modal
                const updateFilter = (rating: number | 'all') => {
                    currentFilter = rating;
                    
                    // Force re-render of modal content
                    Swal.update({
                        html: generateReviewHtml(reviewsData, currentFilter, book.name)
                    });
                    
                    // ผูก Event Listener ใหม่ทุกครั้งที่ update
                    const container = Swal.getHtmlContainer();
                    if (container) {
                        container.querySelectorAll('.filter-btn').forEach(button => {
                            button.addEventListener('click', (event) => {
                                const target = event.currentTarget as HTMLButtonElement;
                                const newRating = target.dataset.rating ?? 'all'; 
                                updateFilter(newRating === 'all' ? 'all' : parseInt(newRating, 10));
                            });
                        });
                    }
                };

                // แสดง Modal ด้วยข้อมูลรีวิวที่เพิ่งดึงมา
                displayReviewModal(book, reviewsData, currentFilter, updateFilter);

            }
        } catch (err: unknown) {
            Swal.fire({
                title: 'ข้อผิดพลาด',
                text: (err as ErrorInterface)?.message || 'ไม่สามารถดึงรายการรีวิวได้',
                icon: 'error'
            });
        }
    }, [displayReviewModal, generateReviewHtml])
    
    // *** ฟังก์ชันสำหรับแสดง Modal และส่ง Review ***
    const handleReview = useCallback(async (book: BookInterface) => {
        if (memberId === '') {
            Swal.fire({
                title: 'เข้าสู่ระบบ',
                text: 'กรุณาเข้าสู่ระบบก่อนจึงจะสามารถเขียนรีวิวได้',
                icon: 'warning',
                confirmButtonText: 'ตกลง'
            });
            return;
        }

        const { value: formValues } = await Swal.fire<[number, string]>({
            title: `<span class="text-xl font-bold text-gray-800">รีวิวหนังสือ: ${book.name}</span>`,
            html: `
                <style>
                    /* CSS สำหรับ Star Rating ที่สวยงามและมีขนาดใหญ่ขึ้น */
                    #rating-container input:checked ~ label {
                        color: #ffc107; 
                    }
                    #rating-container:not(:hover) input:checked ~ label:hover,
                    #rating-container input:checked + label:hover,
                    #rating-container input:checked ~ label:hover ~ label,
                    #rating-container label:hover ~ input:checked ~ label {
                        color: #ffc107;
                    }
                    #rating-container label:hover,
                    #rating-container label:hover ~ label {
                        color: #ffc107;
                    }
         
                    #rating-container {
                        direction: rtl;
                    }
                    #rating-container label {
                        float: none;
                        font-size: 3rem; 
                        padding: 0 5px;
                        margin: 0;
                        transition: color 0.2s;
                    }
                </style>
                <div id="rating-container" class="flex justify-center my-4">
                    ${[5, 4, 3, 2, 1].map(star => `
                        <input 
                            type="radio" 
                            id="star${star}" 
                            name="rating" 
                            value="${star}" 
                            class="hidden star-input"
                        >
                        <label 
                            for="star${star}" 
                            class="text-4xl text-gray-300 cursor-pointer transition-colors duration-200"
                            title="${star} ดาว"
                        >
                            ★
                        </label>
                    `).join('')}
                </div>
                <textarea 
                    id="swal-input-comment" 
                    class="swal2-textarea" 
                    placeholder="เขียนความคิดเห็นเพิ่มเติมของคุณที่นี่..."
                    style="min-height: 350px; border-radius: 0.75rem;" 
                ></textarea>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: '<i class="fa fa-send mr-2"></i> ส่งรีวิว',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#4c51bf', 
            cancelButtonColor: '#6b7280', 
            
            width: '80%', 
            customClass: {
                popup: 'swal2-review-input-modal max-w-4xl rounded-xl shadow-lg',
                title: 'pt-5 pb-0',
                htmlContainer: 'pt-0',
            },
            
            preConfirm: () => {
                const ratingInput = document.querySelector('input[name="rating"]:checked') as HTMLInputElement;
                const commentInput = document.getElementById('swal-input-comment') as HTMLTextAreaElement;

                const rating = ratingInput ? parseInt(ratingInput.value, 10) : 0;
                const comment = commentInput ? commentInput.value.trim() : '';

                if (rating === 0) {
                    Swal.showValidationMessage('กรุณาให้คะแนนดาว');
                    return false;
                }
     
                return [rating, comment];
            },
        });
        if (formValues) {
            const [rating, comment] = formValues;
            const payload: ReviewInterface = {
                bookId: book.id,
                memberId: memberId,
                rating: rating,
                comment: comment === '' ?
                    null : comment, 
            } as ReviewInterface;
            try {
                const url = Config.apiUrl + '/api/review/submit'
                const response = await axios.post(url, payload);
                if (response.status === 200) {
                    // fetchData ถูกใช้ในฟังก์ชันนี้
                    fetchData(); 
                    Swal.fire({
                        title: 'รีวิวสำเร็จ!',
                        text: response.data.message || 'ขอบคุณสำหรับรีวิวของคุณ',
                        icon: 'success',
                        timer: 2500,
                        showConfirmButton: false
                    });
                }
            } catch (err: unknown) {
                Swal.fire({
                    title: 'ข้อผิดพลาดในการส่งรีวิว',
                    text: (err as ErrorInterface)?.message || 'ไม่สามารถส่งรีวิวได้',
                    icon: 'error'
                });
            }
        }
    }, [memberId, fetchData]);


    // *** ฟังก์ชันสำหรับเปิด Modal ดูรายละเอียดสินค้า (ห่อหุ้มด้วย useCallback) ***
    const handleViewDetail = useCallback((book: BookInterface) => {
        setCurrentDetailBook(book);
        setIsDetailModalOpen(true);
        // *** 💡 เรียกฟังก์ชันดึงรายการแนะนำทันทีที่เปิด Modal ***
        fetchRecommendations(book.id); 
    }, [fetchRecommendations]); // Dependency: fetchRecommendations เท่านั้น เพราะ state setters มีความเสถียร

    // ฟังก์ชันสำหรับแสดง Modal รายละเอียดสินค้า 
    // *** 💡 3. ปรับปรุง displayDetailModal เพื่อรับ recommendations ***
    const displayDetailModal = useCallback((book: BookInterface, recommendedBooks: BookInterface[]) => {
        const stockInfo = getStockInfo(book);
        const averageRating = book.averageRating ? parseFloat(book.averageRating.toFixed(1)) : 0;
        const isLoggedIn = token !== '';
        
        // สร้างดาว
        const starIcons = [1, 2, 3, 4, 5].map(star => `
            <i 
                class="fa ${star <= Math.round(averageRating) ? 'fa-star' : 'fa-star-o'} text-lg" 
                style="color: ${star <= Math.round(averageRating) ? '#ffc107' : '#d1d5db'};"
            ></i>
        `).join('');
        
        // *** 💡 4. HTML สำหรับส่วนรายการแนะนำหนังสือ (ลบ recStockInfo ที่ไม่ได้ใช้ออกไปแล้ว) ***
        const recommendationHtml = recommendedBooks.length > 0 ? `
            <div class="mt-6 pt-6 border-t border-gray-200">
                <h4 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fa fa-thumbs-up text-blue-500 mr-2"></i> สินค้าที่คุณอาจสนใจ
                </h4>
                <div class="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                    ${recommendedBooks.map(recBook => {
                        // *** ลบ: const recStockInfo = getStockInfo(recBook); ***
                        return `
                            <div 
                                id="rec-book-${recBook.id}"
                                class="flex-shrink-0 w-36 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden group"
                                data-book-id="${recBook.id}"
                            >
                                <div class="h-28 flex justify-center items-center p-2 bg-gray-50">
                                    <img 
                                        src="${Config.apiUrl + '/public/uploads/' + recBook.image}" 
                                        alt="${recBook.name}" 
                                        class="max-h-full object-contain w-full rounded-md"
                                    />
                                </div>
                                <div class="p-3 text-center">
                                    <h5 class="text-sm font-semibold line-clamp-2 mb-1 text-gray-700 group-hover:text-blue-600">${recBook.name}</h5>
                                    <span class="text-xs font-bold text-red-600">
                                        ฿${recBook.price.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        ` : `
            <div class="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500">
                <i class="fa fa-info-circle mr-2"></i> 
                ไม่มีสินค้าแนะนำที่เกี่ยวข้อง
            </div>
        `;


        Swal.fire({
            // ปรับ Title ให้น่าสนใจขึ้น
            title: `<span class="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3 block">รายละเอียดสินค้า</span>`,
            html: `
                <div class="text-left p-2">
                    <div class="flex flex-col md:flex-row gap-8">
                        
                        <div class="w-full md:w-5/12 flex flex-col items-center">
                            <img 
                                src="${Config.apiUrl + '/public/uploads/' + book.image}" 
                                alt="${book.name}" 
                                class="rounded-xl shadow-lg max-h-80 object-contain w-full mb-4 border border-gray-100"
                            />
                            
                            <div class="flex space-x-3 w-full">
                                <button 
                                    id="swal-add-to-cart-btn"
                                    class="flex-1 px-4 py-2 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 font-medium 
                                    ${!isLoggedIn || stockInfo.status === 'out-of-stock' 
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50' 
                                        : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                                    }"
                                    ${!isLoggedIn || stockInfo.status === 'out-of-stock' ? 'disabled' : ''}
                                >
                                    <i class="fa fa-shopping-cart"></i>
                                    <span>${!isLoggedIn ? 'เข้าสู่ระบบก่อน' : stockInfo.status === 'out-of-stock' ? 'หมดแล้ว' : 'เพิ่มลงตะกร้า'}</span>
                                </button>
                                ${isLoggedIn ? `
                                    <button 
                                        id="swal-review-btn"
                                        class="w-1/3 px-4 py-2 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 font-medium bg-purple-100 hover:bg-purple-200 text-purple-700 hover:shadow-lg"
                                    >
                                        <i class="fa fa-pencil"></i>
                                        <span>รีวิว</span>
                                    </button>
                                ` : ''}
                            </div>
                        </div>

                        <div class="w-full md:w-7/12">
                            <h2 class="text-2xl font-bold text-gray-900 mb-2">${book.name}</h2>
                            
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="text-sm text-gray-500 font-medium">รหัสสินค้า (ISBN):</span>
                                <span class="text-sm text-gray-700">${book.isbn || '-'}</span>
                            </div>

                            <div class="flex items-center space-x-2 border-b border-gray-200 pb-3 mb-3">
                                <div class="flex items-center text-yellow-500">${starIcons}</div>
                                <span class="ml-1 text-gray-700 font-semibold">${averageRating.toFixed(1)}</span>
                                <span class="text-gray-400 text-sm">(${book.reviewCount ?? 0} รีวิว)</span>
                                ${book.reviewCount > 0 ? `
                                    <button id="swal-view-reviews-btn" class="ml-3 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-200 border border-purple-200 px-2 py-0.5 rounded-full">
                                        <i class="fa fa-eye mr-1"></i> ดูรีวิวทั้งหมด
                                    </button>
                                ` : ''}
                            </div>

                            <div class="p-4 mb-4 rounded-lg bg-gray-50 border border-gray-200 space-y-3">
                                
                                <div class="flex items-center justify-between">
                                    <span class="text-lg font-semibold text-gray-600">ราคา:</span>
                                    <span class="text-3xl font-extrabold text-red-600">
                                        ฿${book.price.toLocaleString()}
                                    </span>
                                </div>
                                
                                <div class="flex items-center justify-between pt-2 border-t border-gray-200">
                                    <span class="text-base text-gray-600 font-medium">หมวดหมู่:</span>
                                    <span class="text-base text-gray-800 font-semibold">${book.category || 'N/A'}</span>
                                </div>
                                
                                <div class="flex items-center justify-between pt-2 border-t border-gray-200">
                                    <span class="text-base text-gray-600 font-medium">สถานะสต็อก:</span>
                                    <span class="px-3 py-1 rounded-full text-xs font-semibold border ${stockInfo.className}">
                                        ${stockInfo.message} (${stockInfo.stock})
                                    </span>
                                </div>
                            </div>

                            <h4 class="text-lg font-semibold text-gray-800 border-b pb-1 mb-2 mt-4">คำอธิบายสินค้า</h4>
                            <p class="text-gray-700 text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">${book.description || 'ไม่มีคำอธิบายสำหรับสินค้านี้'}</p>
                        </div>
                    </div>
                    ${recommendationHtml} </div>
            `,
            customClass: {
                // *** ปรับปรุง: เพิ่มความกว้างของ Modal ***
                popup: 'swal2-detail-modal w-[195vw] lg:w-[190vw] max-w-7xl rounded-2xl shadow-2xl',
                container: 'swal2-detail-container',
                title: 'pt-5 pb-0',
                htmlContainer: 'pt-0',
            },
            backdrop: 'swal2-backdrop-custom bg-black/40', 
            width: '80%',
            showConfirmButton: true,
            confirmButtonText: 'ปิด',
            showCloseButton: true,
            confirmButtonColor: '#6b7280', 
            didOpen: () => {
                // ผูก Event Listeners สำหรับปุ่ม
                const addToCartBtn = document.getElementById('swal-add-to-cart-btn');
                const reviewBtn = document.getElementById('swal-review-btn');
                const viewReviewsBtn = document.getElementById('swal-view-reviews-btn');
                const container = Swal.getHtmlContainer();

                if (addToCartBtn) {
                    addToCartBtn.onclick = () => {
                        // ปิด Modal ก่อนเรียกฟังก์ชัน
                        Swal.close();
                        handleAddToCart(book.id, stockInfo.stock);
                    };
                }

                if (reviewBtn) {
                    reviewBtn.onclick = () => {
                        // ปิด Modal ก่อนเรียกฟังก์ชัน
                        Swal.close();
                        handleReview(book);
                    };
                }
                
                if (viewReviewsBtn) {
                    viewReviewsBtn.onclick = () => {
                        // ปิด Modal ก่อนเรียกฟังก์ชัน
                        Swal.close();
                        handleViewReviews(book);
                    };
                }
                
                // 💡 ผูก Event Listener สำหรับรายการแนะนำหนังสือ
                if (container) {
                    recommendedBooks.forEach(recBook => {
                        const recElement = container.querySelector(`#rec-book-${recBook.id}`);
                        if (recElement) {
                            recElement.addEventListener('click', () => {
                                // 1. หาข้อมูล BookInterface ของหนังสือที่ถูกแนะนำจาก state books
                                const targetBook = books.find(b => b.id === recBook.id);
                                if (targetBook) {
                                    // 2. ปิด Modal เก่า
                                    Swal.close();
                                    // 3. เปิด Modal ใหม่สำหรับหนังสือที่ถูกแนะนำ
                                    handleViewDetail(targetBook); 
                                }
                            });
                        }
                    });
                }
            },
            // จัดการเมื่อ Modal ถูกปิด
            didClose: () => {
                setIsDetailModalOpen(false);
                setCurrentDetailBook(null);
                setRecommendations([]); // ล้างรายการแนะนำเมื่อปิด Modal
            }
        });
    }, [token, handleAddToCart, handleReview, handleViewReviews, books, handleViewDetail]); // Dependency: handleViewDetail ถูกเพิ่มเข้าไปแล้ว

    
    // *** 5. ปรับปรุง useEffect หลัก ให้มี fetchDataCart ใน Dependency ***
    useEffect(() => {
        readToken();
        // ** ใช้ fetchData ที่ห่อหุ้มด้วย useCallback **
        fetchData(); 

        if (memberId != '') {
            fetchDataCart();
        }
    }, [memberId, fetchData, fetchDataCart]) // Dependency: memberId, fetchData, fetchDataCart

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredBooks(books);
      
        } else {
            const filtered = books.filter(book =>
                book.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    }, [books, searchTerm])
    
    // *** useEffect สำหรับแสดง/อัปเดต Modal ดูรายละเอียดสินค้า ***
    useEffect(() => {
        // *** 💡 แก้ไข: ส่ง recommendations เข้าไปใน displayDetailModal ด้วย ***
        if (isDetailModalOpen && currentDetailBook) {
            displayDetailModal(currentDetailBook, recommendations);
        }
    }, [isDetailModalOpen, currentDetailBook, recommendations, displayDetailModal]); // Dependency: recommendations ถูกเพิ่มเข้ามาด้วย
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            
            {/* Header Section (คงเดิม) */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
                <div className="flex flex-col lg:flex-row justify-between items-start 
                    lg:items-center space-y-4 lg:space-y-0">
                    <h1 className="text-3xl font-bold text-gray-800">
                        <span className="text-blue-600">สินค้า</span>ในร้านเรา
                    </h1>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full 
                        lg:w-auto">
                        
                        {/* Search Bar (คงเดิม) */}
                        <div className="relative w-full sm:w-80">
                     
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fa fa-search text-gray-400"></i>
                            </div>
                       
                            <input
                                type="text"
                                value={searchTerm}
                               
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="ค้นหาชื่อสินค้า..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                   
                            />
                            {searchTerm && (
                                <button
                             
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                
                                    <i className="fa fa-times"></i>
                                </button>
                            )}
                  
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
              
                                <div className="text-gray-600 text-sm">สินค้าในตะกร้า</div>
                                <div className="flex items-center space-x-2">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold text-sm">
  
                                        {carts.length} รายการ
                                    </span>
                         
                                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold text-sm">
                                        {qtyInCart} ชิ้น
                                    </span>
     
                                </div>
                            </div>
                            <Link 
                
                                href="/web/member/cart" 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                            >
        
                                <i className="fa fa-shopping-cart"></i>
                                <span>ตะกร้าของฉัน</span>
                            </Link>
              
                        </div>
                    </div>
                </div>
                
                {/* Search Results Info (คงเดิม) */}
                {searchTerm 
                    && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                            <span className="text-blue-800">
                 
                                <i className="fa fa-info-circle mr-2"></i>
                                ผลการค้นหา <span className="font-semibold">{searchTerm}</span>: 
                                <span className="font-bold ml-1">{filteredBooks.length}</span> รายการ
            
                            </span>
                            {filteredBooks.length === 0 && (
                                <span className="text-red-600 text-sm">
                  
                                    <i className="fa fa-exclamation-triangle mr-1"></i>
                                    ไม่พบสินค้าที่ตรงกับคำค้นหา
                                </span>
           
                            )}
                        </div>
                    </div>
                )}
            </div>

           
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredBooks.map((book: BookInterface) => {
                    const stockInfo = getStockInfo(book);
                    // คำนวณดาวเฉลี่ย
                    const averageRating = book.averageRating ?
                        parseFloat(book.averageRating.toFixed(1)) : 0;
                    
                    return (
                        <div 
                            key={book.id} 
                            // *** แก้ไข: เพิ่ม onClick และ cursor-pointer เพื่อเปิด Modal รายละเอียด ***
                            onClick={() => handleViewDetail(book)}
                            className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border overflow-hidden group hover:-translate-y-2 cursor-pointer ${
    
                                stockInfo.status === 'out-of-stock' 
                                    ? 'border-red-200 opacity-75' 
                              
                                    : stockInfo.status === 'low-stock'
                                    ? 'border-yellow-200'
                                    : 'border-blue-100'
                 
                            }`}
                        >
                            {/* Stock Status Badge */}
                            <div className="relative">
   
                                <div className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-semibold border ${stockInfo.className}`}>
                                    <div className="flex items-center space-x-1">
                     
                                        <i className={`fa ${
                                            stockInfo.status === 'out-of-stock' ?
                                                'fa-times-circle' :
                                            stockInfo.status === 'low-stock' ?
                                                'fa-exclamation-triangle' :
                                                'fa-check-circle'
                                            }`}></i>
           
                                        <span>คงเหลือ {stockInfo.stock}</span>
                                    </div>
                                </div>
  
                            </div>

                            {/* Image Section */}
                            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-4">
         
                                <div className="flex justify-center items-center h-48">
                                    <img 
                                    
                                        src={Config.apiUrl + '/public/uploads/' + book.image} 
                                        // *** แก้ไข: ลบ className ที่ทำให้เป็น grayscale ออก เพื่อให้ภาพเป็นสี ***
                                        className={`rounded-xl max-h-full object-contain shadow-md transition-transform duration-300 ${
                                            // stockInfo.status === 'out-of-stock' ? 'grayscale' : 
                                            'group-hover:scale-105'
                                            }`} 
     
                                        alt={book.name}
                                    />
                             
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5">
         
                                <h3 className={`text-lg font-semibold mb-1 line-clamp-2 transition-colors duration-300 ${
                                    stockInfo.status === 'out-of-stock' 
                               
                                        ?
                                        'text-gray-500' 
                                        : 'text-gray-800 group-hover:text-blue-600'
                                    }`}>
                     
                                    {book.name}
                                </h3>
                                
                     
                                {/* ส่วนแสดงดาวและปุ่มรีวิว */}
                                <div className="flex items-center mb-3 justify-between">
                                    <div className="flex items-center space-x-1 text-yellow-500">
           
                                        {/* แสดงดาวเฉลี่ย */}
                                        {[1, 2, 3, 4, 5].map((star) => (
                       
                                            <i 
                                                key={star} 
                             
                                                className={`fa ${star <= Math.round(averageRating) ? 'fa-star' : 'fa-star-o'} text-sm`}
                                            ></i>
                             
                                        ))}
                                        <span className="ml-1 text-gray-600 text-sm font-semibold">
                                            {averageRating.toFixed(1)}
 
                                        </span>
                                        <span className="text-gray-400 text-sm">
                   
                                            ({book.reviewCount ??
                                                0})
                                        </span>
                                    </div>

                        
                                    <div className="flex items-center space-x-2">
                                        {/* ปุ่มสำหรับดูรีวิว */}
                                        {book.reviewCount > 0 
                                            && (
                                            <button
                                                // ** ป้องกัน Modal รายละเอียดเปิดซ้อน **
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewReviews(book);
                                                }}
                                                className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-200 border border-purple-200 px-2 py-0.5 rounded-full"
                                            >
   
                                                <i className="fa fa-eye mr-1"></i> ดูรีวิว
                                            </button>
       
                                        )}
                                        {/* ปุ่มสำหรับให้รีวิว (แสดงเมื่อเข้าสู่ระบบแล้วเท่านั้น) */}
                        
                                        {token !== '' && (
                                            <button
                                    
                                                // ** ป้องกัน Modal รายละเอียดเปิดซ้อน **
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleReview(book);
                                                }}
                                                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                 
                                            >
                                                <i className="fa fa-pencil mr-1"></i> รีวิว
                                     
                                            </button>
                                        )}
                                    </div>
                           
                                </div>
                                
                                {/* Stock Status Message (คงเดิม) */}
                
                                {stockInfo.status !== 'in-stock' && (
                                    <div className={`mb-3 px-2 py-1 rounded-lg text-xs font-medium ${
                                     
                                        stockInfo.status === 'out-of-stock' 
                                            ?
                                            'bg-red-50 text-red-700 border border-red-200' 
                                            : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                        }`}>
        
                                        <i className={`fa ${
                                            stockInfo.status === 'out-of-stock' ?
                                                'fa-times-circle' : 'fa-exclamation-triangle'
                                            } mr-1`}></i>
                                        {stockInfo.message}
             
                                    </div>
                                )}
                                
             
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-right">
                                        
                                        <div className={`text-2xl font-bold bg-gradient-to-r bg-clip-text transition-all duration-300 ${
                                            stockInfo.status === 'out-of-stock'
                                               
                                                ? 'from-gray-400 to-gray-500 text-transparent'
                                                : 'from-blue-600 to-purple-600 text-transparent'
                                            }`}>
 
                                            ฿{book.price.toLocaleString()}
                                        </div>
                 
                                        <div className={`text-sm ${
                                            stockInfo.status === 'out-of-stock' ?
                                                'text-gray-400' : 'text-gray-500'
                                            }`}>
                                            บาท
          
                                        </div>
                                    </div>
                                  
                                    <div className="flex space-x-2">
                                        {/* ปุ่ม "หยิบลงตะกร้า" */}
                                        {token !== '' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // **สำคัญ: ป้องกันไม่ให้ Modal รายละเอียดเปิดเมื่อกดปุ่มนี้**
                                                    handleAddToCart(book.id, stockInfo.stock);
                                                }}
                                                disabled={stockInfo.status === 'out-of-stock'}
                                                className={`px-3 py-2 rounded-xl shadow-md transition-all duration-300 flex items-center space-x-2 text-sm font-medium ${
      
                                                    stockInfo.status === 'out-of-stock'
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                                                        : stockInfo.status === 'low-stock'
                                             
                                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-lg group-hover:scale-105'
                                                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:shadow-lg group-hover:scale-105'
                         
                                                }`} 
                                            >
                                     
                                                <i className={`fa ${
                                                    stockInfo.status === 'out-of-stock' 
                                        
                                                    ?
                                                    'fa-ban' 
                                                        : 'fa-shopping-cart'
                                              
                                                    } text-sm`}></i>
                                                <span>
                                                    {stockInfo.status 
                                                        === 'out-of-stock' 
                                                        ?
                                                        'หมดแล้ว' 
                                                        : stockInfo.status === 'low-stock'
                                            
                                                        ? 'รีบหยิบ!'
                                                        : 'หยิบลงตะกร้า'
                                                        }
                                                </span>
                                            </button>
                                        )}
                                    </div>
                           
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State (คงเดิม) */}
            {filteredBooks.length === 0 && books.length > 0 && searchTerm && (
                <div className="text-center py-16">
                    <div className="text-6xl text-gray-300 mb-4">🔍</div>
         
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">ไม่พบสินค้าที่ค้นหา</h3>
                    <p className="text-gray-400 mb-4">ลองเปลี่ยนคำค้นหาหรือลบคำค้นหาเพื่อดูสินค้าทั้งหมด</p>
                    <button 
                        onClick={() => setSearchTerm('')}
                
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-xl transition-all duration-300"
                    >
                        ดูสินค้าทั้งหมด
                    </button>
                </div>
  
            )}

            {/* No Products State (คงเดิม) */}
            {books.length === 0 && (
                <div className="text-center py-16">
                    <div className="text-6xl text-gray-300 mb-4">📚</div>
                
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">ไม่มีสินค้าในขณะนี้</h3>
                    <p className="text-gray-400">กรุณาลองใหม่อีกครั้งในภายหลัง</p>
                </div>
            )}
        </div>
    );
}