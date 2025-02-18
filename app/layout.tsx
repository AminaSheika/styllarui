import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "../components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Styllar - AI Body Measurement",
  description: "Get accurate body measurements using AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar />
        <main className="container mx-auto p-4 mt-8">{children}</main>
      </body>
    </html>
  )
}

