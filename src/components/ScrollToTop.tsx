 'use client';
 
 import { useEffect } from 'react';
 import { usePathname } from 'next/navigation';
 
 export default function ScrollToTop() {
   const pathname = usePathname();
 
   useEffect(() => {
     const scrollToTop = () => {
       window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
     };
 
     const frameId = window.requestAnimationFrame(scrollToTop);
     return () => window.cancelAnimationFrame(frameId);
   }, [pathname]);
 
   return null;
 }
