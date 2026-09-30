import type { Metadata } from "next"
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google"
import { SiteFooter } from "@/components/site/footer"
import { SiteHeader } from "@/components/site/header"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const display = Source_Serif_4({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "700",
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://talktogenie.ai"),
  title: {
    default: "TalkToGenie.ai — Hospitality. On Autopilot.",
    template: "%s · TalkToGenie.ai",
  },
  description:
    "Genie is the autonomous operating layer for hospitality. Connect the stack you already use, set your policies, and let Genie handle communication, operations, tasks, upsells, and reservation reconciliation.",
  openGraph: {
    title: "TalkToGenie.ai — Hospitality. On Autopilot.",
    description:
      "The AI operating system for hospitality. Policy-controlled autonomy across the stack you already run.",
    siteName: "TalkToGenie.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TalkToGenie.ai — Hospitality. On Autopilot.",
    description: "The autonomous operating layer for hospitality.",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#e7f6fb] text-foreground">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
        >
          Skip to content
        </a>
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[#e7f6fb]" />
          <div className="absolute -top-48 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,212,234,0.55),transparent_68%)]" />
          <div className="absolute top-[30%] -right-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(232,197,106,0.35),transparent_70%)]" />
        </div>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
