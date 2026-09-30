"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { NAV } from "@/lib/content"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070b14]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium tracking-tight text-white" onClick={() => setOpen(false)}>
          <span className="text-lg leading-none" aria-hidden="true">🧞‍♂️</span>
          <span>TalkToGenie.ai</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm text-mist transition-colors hover:bg-white/5 hover:text-white",
                  active && "bg-white/8 text-white",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="hidden rounded-full px-3 py-1.5 text-sm text-mist hover:text-white sm:inline"
          >
            Sign In
          </Link>
          <Link
            href="/meet"
            className={buttonVariants({
              className: "h-10 rounded-full px-4 text-sm",
            })}
          >
            Meet Genie
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-[#070b14] lg:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-5 py-3" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-2 py-3 text-base text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/sign-in" className="rounded-xl px-2 py-3 text-base text-mist" onClick={() => setOpen(false)}>
              Sign In
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
