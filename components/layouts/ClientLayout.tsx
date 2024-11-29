"use client"; // Dies macht die Komponente zur Client-Komponente

import { usePathname } from 'next/navigation';
import NavigationBar from "@/components/Navigation";
import {useAuth} from "@/components/auth/AuthContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth();
    const pathname = usePathname();

    // Seiten, auf denen die NavBar nicht angezeigt werden soll
    const noNavBarPages = ['/login'];

    const isNoNavBarPage = noNavBarPages.includes(pathname);


    console.log(loading);
    if (loading && pathname !== '/login') {
        /*console.log("In Client Layout if")*/
        return "";
    }

    return (
        <>
            {!isNoNavBarPage && <NavigationBar />}
            {children}
        </>
    );
}
