'use client'

import { Config } from "@/app/config";
import { useEffect, useState, useCallback } from "react"; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Book {
    id: number;
    image: string | null;
    name: string;
    category: string;
    price: number;
    totalSold: number;
    totalRevenue: number;
}

interface MonthlyIncomeData {
    month: string;
    onlineIncome: number;
    saleIncome: number;
    income: number;
}

// ** Interface ใหม่สำหรับข้อมูล Dashboard ทั้งหมดที่จะส่งไปวิเคราะห์ **
interface DashboardData {
    totalOrder: number;
    totalIncome: number;
    totalSaleCount: number;
    totalSaleIncome: number;
    totalAllIncome: number;
    totalMember: number;
    monthlyIncome: MonthlyIncomeData[];
    topProducts: Book[]; 
    categories: string[];
}

export default function Dashboard() {
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalSaleCount, setTotalSaleCount] = useState(0);
    const [totalSaleIncome, setTotalSaleIncome] = useState(0);
    const [totalAllIncome, setTotalAllIncome] = useState(0);
    const [totalMember, setTotalMember] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState<MonthlyIncomeData[]>([]);
    const [topBooks, setTopBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // State สำหรับผู้ช่วยวิเคราะห์
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
    
    // Filter states
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedCategory, setSelectedCategory] = useState('');

    // สร้าง arrays สำหรับ dropdown options
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
    
    const months = [
        { value: '1', label: 'มกราคม' },
        { value: '2', label: 'กุมภาพันธ์' },
        { value: '3', label: 'มีนาคม' },
        { value: '4', label: 'เมษายน' },
        { value: '5', label: 'พฤษภาคม' },
        { value: '6', label: 'มิถุนายน' },
        { value: '7', label: 'กรกฎาคม' },
        { value: '8', label: 'สิงหาคม' },
        { value: '9', label: 'กันยายน' },
        { value: '10', label: 'ตุลาคม' },
        { value: '11', label: 'พฤศจิกายน' },
        { value: '12', label: 'ธันวาคม' }
    ];

    const formatCurrency = (value: number) => {
        if (typeof value !== 'number') return 'N/A';
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB'
        }).format(value);
    };

    // ฟังก์ชัน: ดึงข้อมูลการวิเคราะห์จาก Gemini API (ผ่าน Backend)
    const fetchAnalysis = useCallback(async (dashboardData: DashboardData) => {
        if (isAnalysisLoading) return; 
        setIsAnalysisLoading(true);
        setAnalysisResult(null); 

        try {
            // สมมติว่ามี API Endpoint ที่ Backend จัดการการเรียก Gemini API
            const url = Config.apiUrl + '/api/dashboard/analyze'; 
            const token = localStorage.getItem(Config.tokenName);

            if (!token) {
                // หากไม่มี token อาจจะไม่ต้อง Throw Error แต่ตั้งค่าให้แสดงข้อความเตือนแทนก็ได้
                setAnalysisResult('ไม่สามารถวิเคราะห์ได้: ไม่พบ token การยืนยันตัวตน');
                return;
            }

            const headers = {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            };
            
            // ส่งข้อมูลสรุป Dashboard ไปให้ Backend เพื่อวิเคราะห์
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dashboardData)
            });

            if (response.ok) {
                const data = await response.json();
                // สมมติว่า Backend ส่งข้อความวิเคราะห์กลับมาในฟิลด์ 'analysis'
                setAnalysisResult(data.analysis || 'ไม่สามารถสร้างการวิเคราะห์ได้');
            } else {
                // หากสถานะไม่ OK แต่ Backend อาจมีรายละเอียดข้อผิดพลาด
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || `เกิดข้อผิดพลาดในการวิเคราะห์ (${response.status})`;
                throw new Error(errorMessage);
            }
        } catch (err) {
            console.error('Error fetching analysis data:', err);
            setAnalysisResult(`เกิดข้อผิดพลาดในการเชื่อมต่อ: ${err instanceof Error ? err.message : 'ไม่ทราบสาเหตุ'}`);
        } finally {
            setIsAnalysisLoading(false);
        }
    }, [isAnalysisLoading]); 

    // ฟังก์ชัน: ดึงข้อมูล Dashboard หลัก
    const fetchData = useCallback(async (month = selectedMonth, year = selectedYear, category = selectedCategory) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const url = Config.apiUrl + '/api/dashboard/list';
            const token = localStorage.getItem(Config.tokenName);
            
            if (!token) {
                throw new Error('ไม่พบ token การยืนยันตัวตน');
            }
            
            const params = new URLSearchParams();
            if (month) params.append('month', month);
            if (year) params.append('year', year);
            if (category) params.append('category', category);
            
            const urlWithParams = `${url}${params.toString() ? '?' + params.toString() : ''}`;
            
            const headers = {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            };

            const response = await fetch(urlWithParams, {
                method: 'GET',
                headers: headers
            });

            if (response.ok) {
                // TypeScript จะรู้ว่า data นี้ควรมีโครงสร้างตาม DashboardData
                const data: DashboardData = await response.json(); 
                
                setTotalOrder(data.totalOrder || 0);
                setTotalIncome(data.totalIncome || 0);
                setTotalSaleCount(data.totalSaleCount || 0);
                setTotalSaleIncome(data.totalSaleIncome || 0);
                setTotalAllIncome(data.totalAllIncome || 0);
                setTotalMember(data.totalMember || 0);
                setMonthlyIncome(data.monthlyIncome || []);
                setTopBooks(data.topProducts || []); // ใช้ topProducts
                setCategories(data.categories || []);
                
                // เรียกใช้ฟังก์ชันวิเคราะห์หลังดึงข้อมูลหลักสำเร็จ
                fetchAnalysis(data); 
            } else if (response.status === 401) {
                throw new Error('ไม่มีสิทธิ์เข้าถึงข้อมูล กรุณาเข้าสู่ระบบใหม่');
            } else {
                throw new Error(`เกิดข้อผิดพลาดในการดึงข้อมูล (${response.status})`);
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการดึงข้อมูล');
            
            // เคลียร์ข้อมูลและผลวิเคราะห์หากดึงข้อมูลหลักล้มเหลว
            setTotalOrder(0);
            setTotalIncome(0);
            setTotalSaleCount(0);
            setTotalSaleIncome(0);
            setTotalAllIncome(0);
            setTotalMember(0);
            setMonthlyIncome([]);
            setTopBooks([]);
            setCategories([]);
            setAnalysisResult(null); 
        } finally {
            setIsLoading(false);
        }
    }, [selectedMonth, selectedYear, selectedCategory, fetchAnalysis]) 

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    const handleFilterChange = (filterType: 'year' | 'month' | 'category', value: string) => {
        let newMonth = selectedMonth;
        let newYear = selectedYear;
        let newCategory = selectedCategory;

        if (filterType === 'year') {
            setSelectedYear(value);
            newYear = value;
        } else if (filterType === 'month') {
            setSelectedMonth(value);
            newMonth = value;
        } else if (filterType === 'category') {
            setSelectedCategory(value);
            newCategory = value;
        }
        
        fetchData(newMonth, newYear, newCategory);
    };

    const resetFilters = () => {
        setSelectedMonth('');
        setSelectedYear(new Date().getFullYear().toString());
        setSelectedCategory('');
        fetchData('', new Date().getFullYear().toString(), '');
    };
    
    return (
        <div className="p-5 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
            
            {isLoading && (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">กำลังโหลดข้อมูล...</span>
                </div>
            )}

            {error && !isLoading && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <div className="flex items-center">
                        <i className="fa fa-exclamation-triangle mr-2"></i>
                        <span>{error}</span>
                    </div>
                    <button 
                        onClick={() => fetchData(selectedMonth, selectedYear, selectedCategory)}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                    >
                        ลองใหม่อีกครั้ง
                    </button>
                </div>
            )}

            {!isLoading && !error && (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                         <div className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-medium opacity-90">รายการสั่งซื้อ</div>
                                    <div className="text-3xl font-bold">{totalOrder.toLocaleString()}</div>
                                </div>
                                <i className="fa fa-shopping-cart text-3xl opacity-80"></i>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-medium opacity-90">รายได้ออนไลน์</div>
                                    <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
                                </div>
                                <i className="fa fa-globe text-3xl opacity-80"></i>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-medium opacity-90">ขายหน้าร้าน</div>
                                    <div className="text-xl font-bold">{totalSaleCount.toLocaleString()} รายการ</div>
                                    <div className="text-2xl font-bold">{formatCurrency(totalSaleIncome)}</div>
                                </div>
                                <i className="fa fa-store text-3xl opacity-80"></i>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-medium opacity-90">รายได้รวมทั้งหมด</div>
                                    <div className="text-2xl font-bold">{formatCurrency(totalAllIncome)}</div>
                                </div>
                                <i className="fa fa-dollar-sign text-3xl opacity-80"></i>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-medium opacity-90">สมาชิก</div>
                                    <div className="text-3xl font-bold">{totalMember.toLocaleString()}</div>
                                </div>
                                <i className="fa fa-user text-3xl opacity-80"></i>
                            </div>
                        </div>
                    </div>

                    {/* ส่วน: ผู้ช่วยวิเคราะห์ Gemini */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                            <i className="fa fa-magic text-blue-500 mr-3"></i>
                            ผู้ช่วยวิเคราะห์ (โดย Gemini)
                        </h2>
                        {isAnalysisLoading ? (
                             <div className="flex items-center text-blue-600">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3"></div>
                                <span className="text-gray-600">กำลังประมวลผลการวิเคราะห์...</span>
                            </div>
                        ) : analysisResult ? (
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{analysisResult}</p>
                        ) : (
                            <div className="text-gray-500">
                                กดปุ่มรีเฟรชข้อมูล หรือเปลี่ยน Filter เพื่อรับการวิเคราะห์จาก AI
                            </div>
                        )}
                    </div>
                    {/* สิ้นสุดส่วนผู้ช่วยวิเคราะห์ */}

                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                            <h2 className="text-2xl font-bold text-gray-800">กราฟรายได้</h2>
                            
                            <div className="flex flex-wrap gap-3">
                                <select 
                                    value={selectedYear}
                                    onChange={(e) => handleFilterChange('year', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>

                                <select 
                                    value={selectedMonth}
                                    onChange={(e) => handleFilterChange('month', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">ทั้งปี</option>
                                    {months.map(month => (
                                        <option key={month.value} value={month.value}>
                                            {month.label}
                                        </option>
                                    ))}
                                </select>

                                <select 
                                    value={selectedCategory}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">ทุกหมวดหมู่</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>

                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setChartType('line')}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                                            chartType === 'line' 
                                                ? 'bg-blue-500 text-white' 
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        กราฟเส้น
                                    </button>
                                    <button 
                                        onClick={() => setChartType('bar')}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                                            chartType === 'bar' 
                                                ? 'bg-blue-500 text-white' 
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        แผนภูมิแท่ง
                                    </button>
                                </div>

                                <button 
                                    onClick={resetFilters}
                                    className="px-4 py-2 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-sm"
                                >
                                    <i className="fa fa-undo mr-2"></i>รีเซ็ต
                                </button>
                                <button 
                                    onClick={() => fetchData(selectedMonth, selectedYear, selectedCategory)}
                                    className="px-4 py-2 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-sm"
                                >
                                    <i className="fa fa-refresh mr-2"></i>รีเฟรช
                                </button>
                            </div>
                        </div>

                        <div className="mb-4 text-sm text-gray-600">
                            <span className="font-medium">กำลังแสดง:</span>
                            <span className="ml-2">
                                {selectedYear}
                                {selectedMonth && ` - ${months.find(m => m.value === selectedMonth)?.label}`}
                                {selectedCategory && ` - หมวด ${selectedCategory}`}
                            </span>
                        </div>

                        {monthlyIncome.length > 0 ? (
                            <div className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    {chartType === 'line' ? (
                                        <LineChart data={monthlyIncome} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                                            <YAxis stroke="#666" style={{ fontSize: '12px' }} tickFormatter={(value) => `฿${value.toLocaleString()}`} />
                                            <Tooltip 
                                                formatter={(value, name) => [formatCurrency(value as number), name]} 
                                                labelStyle={{ color: '#333' }} 
                                                contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }} 
                                            />
                                            <Legend />
                                            <Line type="monotone" dataKey="onlineIncome" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, stroke: '#22c55e', strokeWidth: 2 }} name="รายได้ออนไลน์ (บาท)" />
                                            <Line type="monotone" dataKey="saleIncome" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2 }} name="รายได้หน้าร้าน (บาท)" />
                                            <Line type="monotone" dataKey="income" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, stroke: '#f59e0b', strokeWidth: 2 }} name="รายได้รวม (บาท)" />
                                        </LineChart>
                                    ) : (
                                        <BarChart data={monthlyIncome} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                                            <YAxis stroke="#666" style={{ fontSize: '12px' }} tickFormatter={(value) => `฿${value.toLocaleString()}`} />
                                            <Tooltip 
                                                formatter={(value, name) => [formatCurrency(value as number), name]} 
                                                labelStyle={{ color: '#333' }} 
                                                contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }} 
                                            />
                                            <Legend />
                                            <Bar dataKey="onlineIncome" fill="#22c55e" name="รายได้ออนไลน์ (บาท)" radius={[2, 2, 0, 0]} />
                                            <Bar dataKey="saleIncome" fill="#8b5cf6" name="รายได้หน้าร้าน (บาท)" radius={[2, 2, 0, 0]} />
                                        </BarChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
                                <div className="text-center">
                                    <i className="fa fa-chart-line text-4xl text-gray-400 mb-4"></i>
                                    <p className="text-gray-500">ไม่มีข้อมูลกราฟ</p>
                                    <button onClick={() => fetchData()} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                        โหลดข้อมูล
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                
                    {/* สรุปรายได้แยกตามช่องทาง */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i className="fa fa-globe text-green-500 mr-3"></i>
                                สรุปรายได้ออนไลน์
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span className="text-gray-600">จำนวนออเดอร์:</span>
                                    <span className="font-bold text-green-600">{totalOrder.toLocaleString()} รายการ</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span className="text-gray-600">รายได้รวม:</span>
                                    <span className="font-bold text-green-600 text-lg">{formatCurrency(totalIncome)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span className="text-gray-600">ค่าเฉลี่ยต่อออเดอร์:</span>
                                    <span className="font-bold text-green-600">
                                        {totalOrder > 0 ? formatCurrency(totalIncome / totalOrder) : '฿0.00'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i className="fa fa-store text-purple-500 mr-3"></i>
                                สรุปรายได้หน้าร้าน
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                    <span className="text-gray-600">จำนวนรายการ:</span>
                                    <span className="font-bold text-purple-600">{totalSaleCount.toLocaleString()} รายการ</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                    <span className="text-gray-600">รายได้รวม:</span>
                                    <span className="font-bold text-purple-600 text-lg">{formatCurrency(totalSaleIncome)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                    <span className="text-gray-600">ค่าเฉลี่ยต่อรายการ:</span>
                                    <span className="font-bold text-purple-600">
                                        {totalSaleCount > 0 ? formatCurrency(totalSaleIncome / totalSaleCount) : '฿0.00'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* สินค้าขายดี 5 อันดับ */}
                    {topBooks.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">สินค้าขายดี 5 อันดับ (รวมทุกช่องทาง)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {topBooks.map((book, index) => (
                                    <div key={book.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center mb-3">
                                            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                                                {index + 1}
                                            </div>
                                            <div className="text-sm font-medium text-gray-600">อันดับ {index + 1}</div>
                                        </div>
                                        {book.image != null ?
                                                <img src={Config.apiUrl + '/public/uploads/' + book.image}
                                                    className="w-[120px] h-[120px] object-contain mx-auto rounded-lg shadow-sm mb-3" />
                                                : <div className="w-[120px] h-[120px] flex items-center justify-center mx-auto rounded-lg bg-gray-200 mb-3">
                                                    <i className="fa fa-image text-4xl text-gray-400"></i>
                                                  </div>
                                        }
                                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{book.name}</h3>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <div>หมวด: {book.category || 'ไม่มี'}</div>
                                            <div>ราคา: {formatCurrency(book.price)}</div>
                                            <div className="font-semibold text-green-600">ขายได้: {book.totalSold} ชิ้น</div>
                                            <div className="font-semibold text-blue-600">รายได้: {formatCurrency(book.totalRevenue)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}