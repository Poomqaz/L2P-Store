// app/web/member/reset-password/page.tsx
// *** Server Component: ห้ามมี "use client" ***

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

// Page Component หลัก
export default function ResetPasswordPage() {
    return (
        // หุ้ม Client Component ด้วย Suspense เพื่อให้ Next.js ไม่พยายามดึง URL search params
        // ระหว่างการ Pre-render บน Server
        <Suspense fallback={<LoadingFallback />}>
            <ResetPasswordClient /> 
        </Suspense>
    );
}