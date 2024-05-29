import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'
import SearchBar from "@/components/SearchBar";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Misukq.gg",
  description: "League of legend tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-800"}>
        <Providers>
          <Navbar/>
          <div>
            <SearchBar/>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
