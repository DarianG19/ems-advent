import type { Metadata } from "next";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import AuthProviderWrapper from "@/components/auth/AuthProviderWrapper";

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
                <AuthProviderWrapper>
                    {children}
                </AuthProviderWrapper>
            </body>
        </html>
  );
}
