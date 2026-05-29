import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "HomeFlow Leads — Exclusive Home Service Leads Delivered Weekly",
  description:
    "HomeFlow Leads helps HVAC, plumbing, roofing, pest control, and home service companies receive qualified local customer opportunities without shared lead marketplaces.",
  openGraph: {
    title: "HomeFlow Leads — Exclusive Home Service Leads",
    description: "Qualified homeowner opportunities delivered weekly across the United States.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
