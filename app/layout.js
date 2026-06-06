import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "GitFolio — GitHub Portfolio Generator",
  description: "Generate a beautiful developer portfolio from any GitHub username",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ backgroundColor: "#0d1117", color: "#e6edf3" }}
      >
        {children}
      </body>
    </html>
  )
}