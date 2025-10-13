// app/web/member/reset-password/page.tsx
// *** ไม่มี "use client" ที่นี่ ***

import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient'; // นำเข้า Client Component

// Loading Component (Fallback UI)
const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังโหลดฟอร์มรีเซ็ตรหัสผ่าน...</p>
        </div>
    </div>
);

// Page Component หลัก (Server Component)
export default function ResetPasswordPage() {
    return (
        // หุ้ม ResetPasswordClient ด้วย Suspense
        // เพื่อให้ useSearchParams() รันเฉพาะบน Client-side เท่านั้น
        <Suspense fallback={<LoadingFallback />}>
            <ResetPasswordClient /> 
        </Suspense>
    );
}