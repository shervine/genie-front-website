import Link from "next/link"
import { NAV } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d4af37]/35">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-ink">
            <span aria-hidden="true">🧞‍♂️</span>
            TalkToGenie.ai
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">
            The AI operating layer for hospitality. Communication, tasks, and reservation money, aimed at higher ratings and higher income.
          </p>
          <p className="mt-4 text-sm text-mist">
            <a className="text-ink underline-offset-4 hover:underline" href="mailto:support@talktogenie.ai">
              support@talktogenie.ai
            </a>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-mist hover:text-[#123848]">
              {item.label}
            </Link>
          ))}
          <Link href="/pitch" className="text-mist hover:text-[#123848]">
            For investors
          </Link>
          <Link href="/meet" className="text-mist hover:text-[#123848]">
            Meet Genie
          </Link>
          <Link href="/sign-in" className="text-mist hover:text-[#123848]">
            Sign In
          </Link>
        </div>
      </div>
      <div className="border-t border-[#d4af37]/35">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-xs leading-relaxed text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TalkToGenie.ai</p>
          <p className="max-w-xl sm:text-right">
            Screens on this site are simulations of the operating model. They are not a live portfolio, a partner list, or a claim that every workflow is in production.
          </p>
        </div>
      </div>
    </footer>
  )
}
