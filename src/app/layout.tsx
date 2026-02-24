import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"
import { Toaster } from "./_components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FSW Barber",
  description: "SaaS Profissional para Barbearias",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className="dark">
      <body className={`${inter.className}`}>
        <AuthProvider>
          <div className="flex h-full flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster/>
      </body>
    </html>
  )
}
