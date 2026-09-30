import { TRUST_CATEGORIES } from "@/lib/content"

export function TrustStrip() {
  const items = [...TRUST_CATEGORIES, ...TRUST_CATEGORIES]
  return (
    <section className="border-y border-white/10 py-8">
      <div className="mx-auto w-full max-w-6xl px-5">
        <p className="text-center text-sm text-white">Works with the tools you already use.</p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-mist">
          Your PMS, channels, payments, locks, and team tools stay. Genie is the intelligence layer above them.
        </p>
      </div>
      <div className="marquee mt-6 overflow-hidden">
        <div className="marquee-track flex w-max gap-3 px-3">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#d5def3]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
