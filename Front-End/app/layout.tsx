import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "../lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Verve",
  description: "e-commerce web application",
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
