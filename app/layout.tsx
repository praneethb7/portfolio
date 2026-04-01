import type { Metadata } from "next"
import { Bricolage_Grotesque, Inter, Didact_Gothic } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/common/Providers"
import Navbar from "@/components/common/Navbar"
import CustomCursor from "@/components/common/CustomCursor"
import CommandPalette from "@/components/common/CommandPalette"
import InteractiveBackground from "@/components/common/InteractiveBackground"
import dynamic from "next/dynamic"

const SearchHint = dynamic(() => import("@/components/common/SearchHint"), { ssr: false })

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const didact = Didact_Gothic({
  subsets: ["latin"],
  variable: "--font-didact",
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Praneeth Budati | Full Stack Developer",
  description:
    "Sophomore at Scaler School of Technology building full-stack products, crushing DSA contests, and shipping fast. Knight on LeetCode · Top 4% · Bronze Medalist.",
  keywords: [
    "Praneeth Budati",
    "Full Stack Developer",
    "Next.js",
    "React",
    "LeetCode Knight",
    "Scaler School of Technology",
    "SST",
    "Portfolio",
  ],
  authors: [{ name: "Praneeth Budati", url: "https://github.com/praneethb7" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Praneeth Budati | Full Stack Developer",
    description: "Sophomore at SST building full-stack products and shipping fast.",
    siteName: "Praneeth Budati Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Praneeth Budati | Full Stack Developer",
    description: "Sophomore at SST building full-stack products and shipping fast.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${didact.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased grain" style={{ background: 'var(--surface)', color: 'var(--text-primary)' }}>
        <Providers>
          <InteractiveBackground />
          <CustomCursor />
          <Navbar />
          <CommandPalette />
          <SearchHint />
          <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
