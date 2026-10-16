import type { Metadata } from "next"
import { leadStoreIsEphemeral, listLeads } from "@/lib/lead-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Demo requests",
  robots: { index: false, follow: false },
}

export default function LeadInboxPage() {
  const leads = listLeads()
  const ephemeral = leadStoreIsEphemeral()

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <h1 className="font-display text-4xl text-ink">Demo requests</h1>
      <p className="mt-2 text-sm text-mist">
        {leads.length} saved {leads.length === 1 ? "request" : "requests"}. Newest first.
      </p>
      {ephemeral ? (
        <p className="mt-3 text-sm text-[#b8860b]">
          This server cannot keep a durable file, so these rows live in temporary storage and can disappear when the process restarts.
        </p>
      ) : null}
      {leads.length === 0 ? (
        <p className="mt-8 text-sm text-mist">No demo requests yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-[24px] border border-[#d4af37]/35">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-white/70 text-xs tracking-wide text-mist uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Portfolio</th>
                <th className="px-4 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-[#d4af37]/25 align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-mist">
                    {new Date(lead.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                  </td>
                  <td className="px-4 py-3 text-ink">
                    {lead.firstName} {lead.lastName}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-ink">{lead.company}</p>
                    <p className="text-mist">{lead.website}</p>
                    <p className="text-mist">{lead.country}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p>
                      <a className="text-ink underline-offset-4 hover:underline" href={`mailto:${lead.email}`}>
                        {lead.email}
                      </a>
                    </p>
                    <p>
                      <a className="text-ink underline-offset-4 hover:underline" href={`tel:${lead.phone}`}>
                        {lead.phone}
                      </a>
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-ink">{lead.listings} listings</p>
                    <p className="text-mist">{lead.pms}</p>
                    <p className="text-mist">{lead.automate.length ? lead.automate.join(", ") : "No focus selected"}</p>
                  </td>
                  <td className="max-w-xs px-4 py-3 whitespace-pre-wrap text-mist">{lead.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
