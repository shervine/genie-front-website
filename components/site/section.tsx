import { cn } from "@/lib/utils"

export function Section({
  id,
  children,
  className,
  width = "default",
}: {
  id?: string
  children: React.ReactNode
  className?: string
  width?: "default" | "wide"
}) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <div
        className={cn(
          "mx-auto w-full px-5",
          width === "wide" ? "max-w-7xl" : "max-w-6xl",
        )}
      >
        {children}
      </div>
    </section>
  )
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-[0.72rem] font-bold tracking-[0.22em] text-[#d4af37] uppercase">
      {children}
    </p>
  )
}

export function Display({
  as: Tag = "h2",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3"
  children: React.ReactNode
  className?: string
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full text-center font-display text-[3rem] leading-[0.98] font-bold tracking-[-0.035em] text-ink md:text-[clamp(1.92rem,4vw,3.52rem)]",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function Lede({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("mx-auto max-w-2xl text-center text-base leading-relaxed text-mist sm:text-lg", className)}>
      {children}
    </p>
  )
}

export function SampleNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs leading-relaxed text-mist", className)}>
      Harbor & Co. is a fictional portfolio used to show the interaction. It is not a customer, and these figures are not results.
    </p>
  )
}

export function SimBadge() {
  return (
    <span className="rounded-full border border-[#2eafd0]/30 bg-white/80 px-2 py-0.5 text-[10px] font-medium tracking-[0.16em] text-ink/70 uppercase">
      Simulation
    </span>
  )
}
