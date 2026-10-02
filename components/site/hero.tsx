import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { GenieGraph } from "@/components/site/app-store"

export function Hero() {
  return (
    <section className="relative">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10 lg:py-12">
        <div className="text-center">
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-glow uppercase">
            Your wish is my command
          </p>
          <h1 className="mt-5 font-display text-[4.125rem] leading-[0.9] font-bold tracking-[-0.045em] text-ink md:text-[clamp(3.3rem,7vw,6.1rem)]">
            Hospitality.
            <span className="text-shimmer mt-1 block italic">On Autopilot.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            Genie is the on-demand concierge. Each guest can ask three million wishes, and Genie grants them 24/7, with a high speed and consistency, across messages, tasks, and the money on every stay. Abrakadabra, and it’s done.
          </p>
          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-1 sm:gap-3">
            <a
              href="https://genie.tanin.ai/"
              className="inline-flex h-12 items-center justify-center rounded-full px-4 text-sm text-mist hover:text-ink"
            >
              Log in
            </a>
            <Link href="/meet" className={buttonVariants({ className: "h-12 rounded-full px-6 text-sm" })}>
              Request Demo
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-ink">
            {["Happier guests", "Higher ratings", "Higher income", "Operational excellence"].map((item) => (
              <span key={item} className="rounded-full border border-[#d4af37]/35 bg-white/80 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-mist">For professional operators managing multiple properties.</p>
        </div>

        <GenieGraph />
      </div>
    </section>
  )
}
