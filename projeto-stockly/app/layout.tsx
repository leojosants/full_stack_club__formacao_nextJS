import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import Sidebar from "./(dashboard)/_components/sidebar";
import "./globals.css";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const inter = Inter(
    {
        subsets: ['latin'],
        display: "auto",
    }
);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <div className="flex h-full">
                    <Sidebar />
                    {children}
                </div>
            </body>
        </html>
    );
}