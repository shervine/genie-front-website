import type { Metadata } from "next"
import { SignInForm } from "@/components/site/sign-in-form"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Operator console access for TalkToGenie.ai is provisioned during onboarding.",
  robots: { index: false, follow: false },
}

export default function SignInPage() {
  return (
    <Section>
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow>Operator console</Eyebrow>
          <Display as="h1" className="mt-4">
            Sign in when your company is onboarded.
          </Display>
          <Lede className="mt-5">
            There is no public password check on this website. Access is issued for a work email after onboarding, so the console knows the portfolio and the person’s permissions.
          </Lede>
        </div>
        <SignInForm />
      </div>
    </Section>
  )
}
