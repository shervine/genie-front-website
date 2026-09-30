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
    <p className="text-[0.72rem] font-medium tracking-[0.22em] text-glow uppercase">
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
        "font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] tracking-[-0.035em] text-white",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function Lede({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("max-w-2xl text-base leading-relaxed text-mist sm:text-lg", className)}>
      {children}
    </p>
  )
}

export function SampleNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs leading-relaxed text-[#8ea0c3]", className)}>
      Harbor & Co. is a fictional portfolio used to show the interaction. It is not a customer, and these figures are not results.
    </p>
  )
}

export function SimBadge() {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium tracking-[0.16em] text-white/70 uppercase">
      Simulation
    </span>
  )
}
