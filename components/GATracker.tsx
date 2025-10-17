'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// ⚠️ สำคัญ: แทนที่ 'YOUR_GA_MEASUREMENT_ID' ด้วย ID การวัดผล GA4 ของคุณ (เช่น G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = 'YOUR_GA_MEASUREMENT_ID';

// ----------------------------------------------------
// ประกาศ Type ชั่วคราว (Temporal Type Declaration)
// เพื่อให้ TypeScript รู้จัก gtag และ dataLayer บน window ในไฟล์นี้
// ----------------------------------------------------
interface CustomWindow extends Window {
  // ใช้ IArguments[] เพื่อให้สอดคล้องกับสิ่งที่ gtag push เข้าไป
  dataLayer: IArguments[]; 
  
  // ใช้ Rest Parameters แทน 'arguments' และระบุ Type เป็น 'unknown[]' หรือ 'any[]'
  gtag: (...args: unknown[]) => void; 
}

// กำหนด Type Casting โดยแปลงเป็น 'unknown' ก่อน ตามคำแนะนำของ TS (ts(2352))
const customWindow = typeof window !== 'undefined' 
  ? (window as unknown as CustomWindow) 
  : ({} as CustomWindow);

/**
 * Component สำหรับติดตั้ง Google Analytics 4 (GA4) 
 * และติดตามการเปลี่ยนหน้า (route changes) ใน Next.js App Router
 */
export default function GATracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
      return;
    }
    
    // โหลดสคริปต์ GTM/GA และตั้งค่าเริ่มต้น
    if (!customWindow.gtag) {
      // 1. สร้างสคริปต์
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // 2. ตั้งค่า Data Layer และฟังก์ชัน gtag
      customWindow.dataLayer = customWindow.dataLayer || [];
      
      if (!customWindow.gtag) {
        // แก้ไข: ใช้ Rest Parameters (...args) แทน 'arguments'
        customWindow.gtag = function(...args: unknown[]) {
            // push 'args' เข้าไปใน dataLayer (dataLayer คาดหวัง IArguments)
            customWindow.dataLayer.push(args as unknown as IArguments); 
        };
      }
      
      // 3. เรียกใช้งาน Config
      customWindow.gtag('js', new Date());
      customWindow.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false 
      });
    }
  }, []);

  useEffect(() => {
    // ติดตามการเปลี่ยนหน้า (Route Change)
    if (pathname && customWindow.gtag) {
      const url = pathname + searchParams.toString();
      
      // ส่ง event 'page_view' ไปยัง GA4
      customWindow.gtag('event', 'page_view', {
        page_path: url,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  return null;
}