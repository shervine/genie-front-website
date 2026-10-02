import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Display } from "@/components/site/section"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-5 py-24">
      <p className="text-[0.72rem] font-medium tracking-[0.22em] text-glow uppercase">404</p>
      <Display as="h1" className="mt-4">
        This page isn’t on the map.
      </Display>
      <p className="mt-4 text-mist">The operating layer is still here. The address is not.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={buttonVariants({ className: "h-11 rounded-full px-5" })}>
          Back home
        </Link>
        <Link
          href="/meet"
          className={buttonVariants({
            variant: "outline",
            className: "h-11 rounded-full border-[#2eafd0]/30 px-5 text-ink hover:bg-[#fff4d6] hover:text-[#123848]",
          })}
        >
          Request Demo
        </Link>
      </div>
    </div>
  )
}
