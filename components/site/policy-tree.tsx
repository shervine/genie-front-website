"use client"

import { useState } from "react"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"
import { cn } from "@/lib/utils"
import { usd } from "@/lib/pricing"

export function PolicyTree() {
  const [amount, setAmount] = useState(80)
  const [threshold, setThreshold] = useState(100)
  const auto = amount < threshold

  return (
    <Section id="policy">
      <Eyebrow>Policy-controlled autonomy</Eyebrow>
      <Display className="mt-4 max-w-3xl">Autonomous doesn’t mean uncontrolled.</Display>
      <Lede className="mt-5">
        Your business. Your policies. Genie executes them. AI should not invent company policy. Humans define the boundaries. Genie operates inside them. People remain on exceptions, approvals, and escalation.
      </Lede>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="panel rounded-[28px] p-6">
          <p className="text-sm text-ink">Sample refund request</p>
          <label className="mt-6 block text-xs tracking-[0.16em] text-glow uppercase" htmlFor="refund-amount">
            Guest asks for {usd(amount)}
          </label>
          <input
            id="refund-amount"
            type="range"
            min={20}
            max={400}
            step={10}
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            className="mt-3 w-full accent-[#e0b15a]"
          />
          <label className="mt-6 block text-xs tracking-[0.16em] text-glow uppercase" htmlFor="refund-threshold">
            Operator threshold {usd(threshold)}
          </label>
          <input
            id="refund-threshold"
            type="range"
            min={25}
            max={300}
            step={5}
            value={threshold}
            onChange={(event) => setThreshold(Number(event.target.value))}
            className="mt-3 w-full accent-[#b7a6ff]"
          />
          <p className="mt-6 text-sm leading-relaxed text-mist">
            In this sample the stay is inside the eligible window and the reason is on the approved list. Move either control. The branch should change. Genie does not pick the number.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#d4af37]/35 p-6">
          <ol className="space-y-3">
            <Node title="Guest requests a refund" body={`Sample request: ${usd(amount)}.`} />
            <Node title="Check reservation conditions" body="Sample stay is inside the eligible window." />
            <Node title="Check the reason" body="Sample reason is on the operator’s approved list." />
            <Node title="Check operator policy" body={`The line in this sample is ${usd(threshold)}.`} />
          </ol>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div
              className={cn(
                "rounded-2xl border p-4",
                auto ? "border-[#2eafd0] bg-[#e7f8ef]" : "border-[#d4af37]/35 opacity-50",
              )}
            >
              <p className="text-xs tracking-[0.16em] text-[#0f7a4a] uppercase">Under {usd(threshold)}</p>
              <p className="mt-2 text-lg text-ink">Automatically resolve</p>
              <p className="mt-2 text-sm text-mist">Genie completes the refund and writes the reason down.</p>
            </div>
            <div
              className={cn(
                "rounded-2xl border p-4",
                !auto ? "border-[#e0b15a] bg-[#fff6e4]" : "border-[#d4af37]/35 opacity-50",
              )}
            >
              <p className="text-xs tracking-[0.16em] text-[#b8860b] uppercase">{usd(threshold)} or more</p>
              <p className="mt-2 text-lg text-ink">Request manager approval</p>
              <p className="mt-2 text-sm text-mist">Genie prepares the case. A person decides.</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink">
            {auto
              ? `${usd(amount)} is under the line, so this sample resolves on its own.`
              : `${usd(amount)} is on or over the line, so this sample waits for a manager.`}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-mist">
            If the stay or the reason had failed the rule, the path would stop or escalate instead of paying. This control is illustrative. It is not connected to a live policy engine.
          </p>
        </div>
      </div>
    </Section>
  )
}

function Node({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-2xl border border-[#d4af37]/35 bg-white/70 px-4 py-3">
      <p className="text-sm text-ink">{title}</p>
      <p className="text-sm text-mist">{body}</p>
    </li>
  )
}
