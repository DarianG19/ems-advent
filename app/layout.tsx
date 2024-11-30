import type { Metadata } from "next";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import ClientLayout from "@/components/layouts/ClientLayout";

export const metadata: Metadata = {
    title: "Ems Advent",
    description: "Adventskalender für Ems",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="de">
        <body>
            <ClientLayout>
                {children}
            </ClientLayout>
        </body>
        </html>
    );
}
