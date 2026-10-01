import { writeFile } from "node:fs/promises"
import path from "node:path"
import { execFile } from "node:child_process"
import { promisify } from "node:util"
import PptxGenJS from "pptxgenjs"
import { OUTREACH_BODY, OUTREACH_SUBJECT, PITCH_SLIDES } from "../lib/pitch.ts"

const execFileAsync = promisify(execFile)
const root = path.resolve(import.meta.dirname, "..")
const ink = "123848"
const mist = "3E6574"
const gold = "C9962E"
const sand = "E8C56A"
const paper = "F4FBFD"
const white = "FFFFFF"

function footer(slide: PptxGenJS.Slide, n: number, light: boolean) {
  slide.addText("TalkToGenie.ai", {
    x: 0.55,
    y: 7.05,
    w: 4,
    h: 0.28,
    fontFace: "Calibri",
    fontSize: 12,
    color: light ? "D5EEF6" : mist,
  })
  slide.addText(String(n).padStart(2, "0"), {
    x: 11.4,
    y: 7.05,
    w: 1.3,
    h: 0.28,
    align: "right",
    fontFace: "Calibri",
    fontSize: 12,
    color: light ? sand : gold,
  })
}

async function buildPptx() {
  const pptx = new PptxGenJS()
  pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 })
  pptx.layout = "WIDE"
  pptx.author = "Shervin Enayati"
  pptx.title = "TalkToGenie.ai — Investor briefing"
  pptx.subject = "The AI operating layer for hospitality"

  PITCH_SLIDES.forEach((item, index) => {
    const slide = pptx.addSlide()
    const dark = item.variant !== "content"
    slide.background = { color: dark ? ink : paper }
    if (!dark) {
      slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.12, h: 7.5, fill: { color: sand } })
    }
    slide.addText(item.kicker.toUpperCase(), {
      x: 0.6,
      y: 0.38,
      w: 12,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 12,
      bold: true,
      color: sand,
      charSpacing: 2.4,
    })
    slide.addText(item.title, {
      x: 0.6,
      y: 0.82,
      w: item.image ? 6.1 : 12,
      h: item.lede ? 1.35 : 1.15,
      fontFace: "Georgia",
      fontSize: item.variant === "cover" ? 40 : 30,
      bold: true,
      color: dark ? white : ink,
      margin: 0,
    })
    let cursor = item.variant === "cover" ? 2.5 : 2.15
    if (item.lede) {
      slide.addText(item.lede, {
        x: 0.6,
        y: cursor,
        w: item.image ? 6.1 : 11.8,
        h: item.variant === "cover" ? 1.5 : 0.95,
        fontFace: "Calibri",
        fontSize: 18,
        color: dark ? "D5EEF6" : mist,
      })
      cursor += item.variant === "cover" ? 1.7 : 1.05
    }
    if (item.bullets?.length) {
      slide.addText(
        item.bullets.map((text) => ({ text, options: { bullet: false, breakLine: true } })),
        {
          x: 0.6,
          y: cursor,
          w: item.image ? 6.1 : 11.8,
          h: item.image ? 3.2 : 3.4,
          fontFace: "Calibri",
          fontSize: item.bullets.length === 1 ? 16 : 18,
          color: dark ? "E7F6FB" : ink,
          paraSpaceAfter: 12,
        },
      )
    }
    if (item.image) {
      slide.addImage({
        path: path.join(root, "public", "unified-inbox.jpg"),
        x: 6.95,
        y: 1.55,
        w: 5.8,
        h: 3.26,
      })
    }
    if (item.note) {
      slide.addText(item.note, {
        x: 0.6,
        y: 6.15,
        w: 10.5,
        h: 0.8,
        fontFace: "Calibri",
        fontSize: 14,
        color: dark ? sand : mist,
      })
    }
    footer(slide, index + 1, dark)
  })

  const file = path.join(root, "public", "pitch-deck.pptx")
  await pptx.writeFile({ fileName: file })
  return file
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function buildHtml() {
  const slides = PITCH_SLIDES.map((item, index) => {
    const dark = item.variant !== "content"
    const bullets = (item.bullets ?? [])
      .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
      .join("")
    const image = item.image
      ? `<img src="../public/unified-inbox.jpg" alt="Unified inbox with every guest channel in one list." />`
      : ""
    return `<section class="${dark ? "dark" : "light"}">
      <p class="kicker">${escapeHtml(item.kicker)}</p>
      <h1>${escapeHtml(item.title)}</h1>
      ${item.lede ? `<p class="lede">${escapeHtml(item.lede)}</p>` : ""}
      <div class="body ${item.image ? "split" : ""}">
        ${bullets ? `<ul>${bullets}</ul>` : "<div></div>"}
        ${image}
      </div>
      ${item.note ? `<p class="note">${escapeHtml(item.note).replaceAll("\n", "<br />")}</p>` : ""}
      <footer><span>TalkToGenie.ai</span><span>${String(index + 1).padStart(2, "0")}</span></footer>
    </section>`
  }).join("\n")

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>TalkToGenie.ai — Investor briefing</title>
  <style>
    @page { size: 13.333in 7.5in; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    section {
      width: 13.333in;
      height: 7.5in;
      padding: 0.48in 0.62in 0.42in;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      font-family: Calibri, "Segoe UI", sans-serif;
    }
    section.light { background: #f4fbfd; color: #123848; border-left: 0.12in solid #e8c56a; }
    section.dark { background: #123848; color: #ffffff; }
    .kicker { margin: 0; letter-spacing: 0.18em; text-transform: uppercase; color: #c9962e; font-size: 13px; font-weight: 700; }
    h1 { margin: 0.16in 0 0; font-family: Georgia, serif; font-size: 36px; line-height: 1.05; max-width: 11.5in; }
    .lede { margin: 0.18in 0 0; max-width: 10.5in; font-size: 18px; line-height: 1.35; color: #3e6574; }
    section.dark .lede { color: #d5eef6; }
    .body { margin-top: 0.22in; }
    .split { display: grid; grid-template-columns: 1.05fr 1fr; gap: 0.28in; align-items: start; }
    ul { margin: 0; padding: 0; list-style: none; }
    li { margin: 0 0 0.12in; font-size: 18px; line-height: 1.3; }
    img { width: 100%; border-radius: 12px; }
    .note { position: absolute; left: 0.62in; right: 1.4in; bottom: 0.48in; margin: 0; color: #c9962e; font-size: 15px; line-height: 1.35; }
    section.light .note { color: #3e6574; }
    footer { position: absolute; left: 0.62in; right: 0.62in; bottom: 0.22in; display: flex; justify-content: space-between; font-size: 12px; color: #3e6574; }
    section.dark footer { color: #d5eef6; }
  </style>
</head>
<body>
${slides}
</body>
</html>`
}

async function buildPdf(htmlPath: string) {
  const pdf = path.join(root, "public", "pitch-deck.pdf")
  const chrome = process.env.CHROME_PATH || "google-chrome"
  await execFileAsync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--user-data-dir=/tmp/chrome-pitch-deck",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdf}`,
    `file://${htmlPath}`,
  ])
  return pdf
}

const pptxFile = await buildPptx()
const html = buildHtml()
const htmlPath = path.join(root, "scripts", "pitch-print.html")
await writeFile(htmlPath, html)
const pdfFile = await buildPdf(htmlPath)
await writeFile(
  path.join(root, "public", "outreach-email.txt"),
  `Subject: ${OUTREACH_SUBJECT}\n\n${OUTREACH_BODY}\n`,
)
console.log(pptxFile)
console.log(pdfFile)
