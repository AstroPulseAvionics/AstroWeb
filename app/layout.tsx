import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import React from "react";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Analytics } from '@vercel/analytics/react';
import Footer from "@/components/footer";
import ScrollRestoration from "@/components/scroll-restoration";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AstroPulse",
  icons: {
    icon: "/images/LogoLetters.PNG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100 antialiased selection:bg-orange-500/30 selection:text-white`}>


      <ActiveSectionContextProvider>
          <ScrollRestoration />
          <Header/>
          {children}
          <Footer/>
      </ActiveSectionContextProvider>


      <Analytics/>
      </body>
      </html>
  );
}
