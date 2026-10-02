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
            Your wish is my command. An on-demand concierge for every guest, granting wishes 24/7 with the same speed and the same consistency.
          </p>
          <p className="mt-4 text-sm text-mist">
            <a className="text-ink underline-offset-4 hover:underline" href="mailto:support@talktogenie.ai">
              <span aria-hidden="true">✉️ </span>
              support@talktogenie.ai
            </a>
          </p>
          <p className="mt-1 text-sm text-mist">
            <a className="text-ink underline-offset-4 hover:underline" href="tel:+12367077040">
              <span aria-hidden="true">📞 </span>
              +12367077040
            </a>
            {" "}
            to talk to Genie
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-mist hover:text-[#123848]">
              {item.label}
            </Link>
          ))}
          <Link href="/meet" className="text-mist hover:text-[#123848]">
            Request Demo
          </Link>
          <Link href="/superhost" className="text-mist hover:text-[#123848]">
            Superhost case study
          </Link>
        </div>
      </div>
    </footer>
  )
}
