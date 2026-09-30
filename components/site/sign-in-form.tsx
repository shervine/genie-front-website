"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignInForm() {
  const [notice, setNotice] = useState("")

  return (
    <form
      className="panel rounded-[28px] p-6 sm:p-8"
      method="post"
      action="/sign-in"
      onSubmit={async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const email = String(data.get("email") || "")
        data.delete("password")
        let emailed = false
        try {
          const response = await fetch("/api/access", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          })
          const data = (await response.json()) as { emailed?: boolean }
          emailed = Boolean(data.emailed)
        } catch {
          emailed = false
        }
        setNotice(
          emailed
            ? "This page does not check a password. Your work email was sent to support@superhost.management."
            : "This page does not check a password. Email delivery is not configured on this server yet, so write support@superhost.management directly. The password was not sent.",
        )
      }}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="sign-in-email">Work email</Label>
          <Input id="sign-in-email" name="email" type="email" autoComplete="username" required className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sign-in-password">Password</Label>
          <Input id="sign-in-password" name="password" type="password" autoComplete="current-password" required className="h-11" />
        </div>
      </div>
      <Button type="submit" className="mt-6 h-11 rounded-full px-5">
        Sign in
      </Button>
      {notice ? <p className="mt-4 text-sm leading-relaxed text-mist">{notice}</p> : null}
      <p className="mt-4 text-sm text-mist">
        New operator?{" "}
        <Link href="/meet" className="text-white underline-offset-4 hover:underline">
          Meet Genie
        </Link>
      </p>
    </form>
  )
}
