import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient'; 

const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังโหลดฟอร์มรีเซ็ตรหัสผ่าน...</p>
        </div>
    </div>
);

// This component is the one that gets prerendered first
export default function ResetPasswordPage() {
    return (
        // The Suspense boundary prevents the build from crashing while waiting 
        // for the client component (which uses useSearchParams) to load.
        <Suspense fallback={<LoadingFallback />}>
            <ResetPasswordClient /> 
        </Suspense>
    );
}