"use client"

import { useState, type ReactNode } from "react"

export function OrbitStage({ children }: { children: ReactNode }) {
  const [spinning, setSpinning] = useState(false)
  return (
    <div
      className="orbit-stage relative mx-auto mt-6 aspect-square w-full max-w-[820px]"
      data-spinning={spinning ? "true" : "false"}
    >
      <div
        aria-hidden="true"
        className="genie-halo pointer-events-none absolute top-1/2 left-1/2 z-[8] aspect-square w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full sm:w-[20%]"
      />
      <button
        type="button"
        onClick={() => setSpinning((value) => !value)}
        aria-pressed={spinning}
        title={spinning ? "Click Genie to stop the apps" : "Click Genie to spin the apps"}
        className="absolute top-1/2 left-[calc(50%+6px)] z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center rounded-full bg-transparent p-0 outline-none select-none focus-visible:ring-2 focus-visible:ring-[#e0b15a] focus-visible:ring-offset-2 sm:left-[calc(50%+18px)]"
      >
        <span className="text-[4.5rem] leading-none drop-shadow-[0_0_28px_rgba(143,215,255,0.45)] sm:text-[6.5rem]" aria-hidden="true">
          🧞‍♂️
        </span>
        <span className="sr-only">
          {spinning ? "Genie, at the center of the apps. Stop the apps spinning." : "Genie, at the center of the apps. Spin the apps."}
        </span>
      </button>
      {children}
    </div>
  )
}
