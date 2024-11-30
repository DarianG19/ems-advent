"use client";

import { usePathname } from 'next/navigation';
import NavigationBar from "@/components/Navigation";
import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Seiten, auf denen die NavBar nicht angezeigt werden soll
    const noNavBarPages = ['/login'];
    const isNoNavBarPage = noNavBarPages.includes(pathname);

    return (
        <>
            {!isNoNavBarPage && <NavigationBar />}
            {children}
        </>
    );
}
