export const LAMP_PRICE = 85

export const PRICING_BANDS = [
  {
    id: "starter",
    label: "Up to 20 listings",
    range: "1–20",
    price: 25,
    detail: "For a focused portfolio finding its operating rhythm.",
  },
  {
    id: "growth",
    label: "21–100 listings",
    range: "21–100",
    price: 20,
    detail: "For multi-market teams past the point of manual follow-up.",
  },
  {
    id: "scale",
    label: "101+ listings",
    range: "101+",
    price: 18,
    detail: "For professional operators running a real stack.",
  },
] as const

export function rateForListings(listings: number): number | null {
  if (!Number.isFinite(listings) || listings < 1) return null
  const count = Math.floor(listings)
  if (count <= 20) return 25
  if (count <= 100) return 20
  return 18
}

export function bandForListings(listings: number) {
  const rate = rateForListings(listings)
  if (rate === 25) return PRICING_BANDS[0]
  if (rate === 20) return PRICING_BANDS[1]
  if (rate === 18) return PRICING_BANDS[2]
  return null
}

export function usd(amount: number, cents = false) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents ? 2 : 0,
    minimumFractionDigits: cents ? 2 : 0,
  }).format(amount)
}
