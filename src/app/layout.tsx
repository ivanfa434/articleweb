import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import NuqsProvider from "@/providers/NuqsProvider";
import TokenProvider from "@/providers/TokenProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap", // Add this
});

// Metadata
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable}`}
    >
      <body className="antialiased">
        <ReactQueryProvider>
          <NuqsProvider>
            <NextAuthProvider>
              <TokenProvider>{children}</TokenProvider>
            </NextAuthProvider>
          </NuqsProvider>
        </ReactQueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
