import { Suspense } from 'react';
import ResetPasswordClient from './components/ResetPasswordClient';

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-xl">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <h1 className="text-xl font-bold text-gray-800">กำลังโหลด...</h1>
            <p className="text-gray-500 mt-2">กรุณารอสักครู่</p>
          </div>
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}