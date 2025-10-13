"use client"; // ถ้าใช้ Next.js App Router

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/web/member/history");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="text-2xl text-green-700 flex justify-center items-center">
      <i className="fa fa-check mr-2"></i>
      ระบบได้บันทึกข้อมูลคุณแล้ว ขอบคุณที่ใช้บริการ
    </div>
  );
}
