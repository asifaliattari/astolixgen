# AstolixGen Website — Project Documentation

> Internal project docs. Last updated: 2026-10-08.
> This file is for the site owner/maintainer — it is NOT published on the website.

## 1. Overview

Company website for **AstolixGen** — "AI, Automation & Digital Solutions" (Karachi, Pakistan).
Dark-theme marketing site + interactive tools + team profiles + field-work showcase.

- **Live URL:** https://astolixgen.vercel.app (custom domain `astolixgen.com` in progress — see §8)
- **Source code:** https://github.com/asifaliattari/astolixgen (public, branch `main`)
- **Local project:** `~/workspace/astolixgen/`

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS, dark theme (near-black `ink`), cyan→violet accents |
| Charts | Hand-rolled SVG (no chart lib) |
| Excel parsing | `xlsx` (SheetJS) — client-side only |
| Hosting | Vercel (static export, 29 routes) |
| Repo | GitHub `asifaliattari/astolixgen` |

No database, no CMS, no backend. All content lives in `lib/data.ts`.

## 3. Project Structure

```
app/
  page.tsx                 Home
  about/page.tsx           About + co-founder cards → /team/*
  services/page.tsx        Services hub
  services/[slug]/page.tsx Service detail (+ InstantDashboard on data-analytics)
  projects/page.tsx        Projects hub
  projects/[slug]/page.tsx Case studies
  impact/page.tsx          Field-work stories (YouTube) + photo gallery
  team/[slug]/page.tsx     Individual team profiles
  blog/page.tsx, blog/[slug]/page.tsx
  contact/page.tsx         Contact details + WhatsApp + form (front-end only)
  sitemap.ts / robots.ts
components/
  Navbar.tsx, Footer.tsx (incl. Team column), Hero.tsx, ...
  VideoEmbed.tsx           Click-to-play YouTube embeds (thumbnail → iframe)
  InstantDashboard.tsx     CSV/Excel → auto dashboard tool
lib/data.ts                ALL site content (services, team, posts, projects, impact)
public/impact/             Field photos for the Impact gallery (currently empty)
```

## 4. Content Management (no code changes needed for most edits)

Everything is in **`lib/data.ts`**:

| To change… | Edit… |
|---|---|
| Services (names, descriptions, offerings) | `services` array |
| Team bios, roles, LinkedIn, highlights | `team` array |
| Team spotlight sections (Sharmeen research, Taha CoreEd) | `spotlight` field on the member |
| Blog posts | `posts` array |
| Projects / case studies | `projects` array |
| Impact videos | `impactStories` array (needs real YouTube IDs) |
| Impact photos | `impactPhotos` array + drop files in `public/impact/` |
| Phone, email, socials | `company` object |

After editing: `npm run build` → push to GitHub → deploy to Vercel (§5).

### Adding a field photo to the Impact gallery
1. Copy the real photo into `public/impact/` (JPG/PNG, ideally < 500 KB).
2. Add to `impactPhotos` in `lib/data.ts`:
   ```ts
   { src: "/impact/kpk-visit-1.jpg", alt: "Team with students in rural KPK" },
   ```
3. Rebuild + redeploy. Only real photos — never stock images presented as field work.

### Adding a YouTube video
Use the real 11-character video ID (from the video's URL). Thumbnails load automatically
from `i.ytimg.com`; clicking swaps in the embedded player.

## 5. Deployment Workflow

### GitHub (source of truth)
Push via the GitHub connector (`push_files`). Limits learned the hard way:
- The connector **cannot create repos** (403) — create empty repos manually first.
- Keep each `push_files` call **under ~128 KB** (one CLI arg limit) — batch large pushes.
- The `xlsx` dependency means `package.json` + `package-lock.json` must stay in sync.

### Vercel (hosting)
Project: `astolixgen` (`prj_DDTuQH82G6oPXWZwT30rEYUkGQo6`), scope `asifs-projects-268a795c`.
Connected via the Vercel MCP connector (OAuth as `asifaliattari`).

⚠️ **Important:** `create_deployment` with `deploymentId` redeploys the **old file snapshot** —
it does NOT pick up new code. To deploy current code:
1. For every source file: SHA1 it, base64 it, `upload_file` (returns empty on success; the SHA you computed is the reference).
2. `create_deployment` with `requestBody.files = [{file, sha, size}, …]`, `target: "production"`, `forceNew: "1"`.
3. Poll `get_deployment` until `readyState` is `READY`, then curl the URLs.

Files to include: everything except `node_modules/`, `.next/`, `.git/` (≈35 files).
Vercel runs `npm install` + `next build` itself — `package.json` must list all deps.

### Recommended future improvement
Connect the GitHub repo in Vercel Dashboard → Project → Settings → Git → Connect Git Repository.
Then every push to `main` auto-deploys and the manual upload flow becomes unnecessary.

## 6. Interactive Features

### Instant Dashboard (`/services/data-analytics`)
- Accepts `.csv`, `.xlsx`, `.xls` via drag-drop, file picker, or built-in sample data.
- Parses **entirely in the browser** (SheetJS) — files never leave the visitor's device.
- Auto-detects numeric vs categorical columns; renders KPI cards (total/avg/min/max),
  a gradient bar chart (top 12 groups), and a data-table preview.
- Group-by / measure dropdowns let visitors re-slice the chart.
- Ends with a CTA linking to the contact page (lead generation).

### Video embeds
`VideoEmbed` shows the YouTube thumbnail first and loads the iframe only on click —
keeps pages fast and avoids third-party cookies until the visitor opts in.

## 7. Team Pages

Routes: `/team/asif-ali`, `/team/taha-siddiqui`, `/team/sharmeen-asif`, `/team/ishtiaq-khan`.
Each has: bio, highlights, LinkedIn button, optional WhatsApp button, optional `spotlight`
section (rich sub-sections + videos + CTA), and cross-links to other members.
Linked from: About page co-founder cards, footer **Team** column (all pages), sitemap.

Current facts (2026-10-08):
- **Asif Ali** — Founder & CEO. 22+ yrs IT/ops (Pakistan Navy), Tamgha-i-Khidmat, hackathon winner.
- **Taha Ahmed** (aka Taha Siddiqui — same person) — Co-founder; founder of BlackInkMotion;
  runs the CoreEd YouTube education platform; WhatsApp +1 (214) 896-8568.
- **Sharmeen Asif** — Co-founder; MS AI at Bahria University Karachi; research/publications.
  Page includes a full "Research desk" guide. Her personal publication list is pending.
- **Ishtiaq Khan** — Co-founder · HR Manager; Thalassemia awareness volunteer.

## 8. Domain & DNS (astolixgen.com)

- Registrar: Hostinger. Nameservers: `ns1/ns2.dns-parking.com` (Hostinger).
- DNS verified live (2026-10-08): `A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`,
  both `_vercel` TXT verification values present.
- Vercel domain verification was still **pending** as of last check — an automated
  watcher (cron `astolixgen-domain-verification-watch`, every 30 min) will report when
  `astolixgen.com` + `www.astolixgen.com` verify and serve the site. It removes itself after.
- **Email stays on the old hosting:** `A mail → 209.145.50.90`, `MX @ → mail.astolixgen.com`.
  Never point `mail` at Vercel or email breaks. SPF record from old DNS was not copied —
  consider re-adding `v=spf1 +a +mx +ip4:209.145.50.90 ~all` as a TXT if mail deliverability dips.

## 9. Integrations & Accounts

| Service | Account / URL | Notes |
|---|---|---|
| Vercel | `asif.alimusharaf@gmail.com` (OAuth) | Disconnect when done: `vercel disconnect`, or Vercel → Account → Applications |
| GitHub | `asifaliattari` (OAuth + App, all repos) | App can't create repos; push only |
| YouTube (AstolixGen) | https://youtube.com/@astolixgen | Field-work videos embedded on /impact |
| YouTube (CoreEd) | https://www.youtube.com/@CoreEd-qp2jh | Taha's edu platform, on his team page |
| BlackInkMotion | https://blackinkmotion.com | Taha's studio; featured on /impact |
| LinkedIn | 4 team profiles (see §7) | Buttons on team pages |

## 10. Maintenance Checklist

- [ ] When Vercel verifies `astolixgen.com`, confirm https://astolixgen.com + https://www.astolixgen.com load (watcher cron handles this).
- [ ] Add real field photos to `public/impact/` + `impactPhotos` when Asif sends them.
- [ ] Add Sharmeen's actual publication list when available (replace the placeholder note).
- [ ] Consider connecting GitHub → Vercel for auto-deploys (§5).
- [ ] Disconnect Vercel/GitHub OAuth apps when the project handoff is complete (user asked about revoking access).
- [ ] Optional: re-add SPF TXT in Hostinger DNS if email deliverability becomes an issue.
- [ ] Keep `xlsx` updated; it's the only non-framework runtime dependency.
