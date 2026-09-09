# Vserv Infosystems — Website

React rebuild of the Vserv Infosystems marketing site, structured from the
29 reference screenshots in [`Ui images/`](./Ui%20images).

**Stack:** Vite · React 18 (JS) · Tailwind CSS · React Router · Framer Motion · lucide-react

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the build
npm run lint
```

## Project structure

```
src/
├── components/
│   ├── layout/     Navbar, Footer, Layout shell, Logo, PageHero, ScrollToTop
│   ├── ui/         Primitives: Button, Card, Pill, Accordion, Marquee,
│   │               SectionBadge, SectionHeading, CheckItem, IconCircle, Container
│   ├── motion/     Reveal, WordReveal, shared Framer Motion variants
│   └── sections/   The 17 home-page sections, one file each (+ index.js barrel)
├── data/           All copy and content, separated from markup
├── pages/          One file per route
├── routes/         Route table (Home eager, everything else code-split)
├── hooks/          useScrolled, useMediaQuery
├── lib/            cn() classname helper, icon registry
└── styles/         Tailwind entry + component layer
```

**Content lives in `src/data/`, not in components.** Editing copy, adding a
service, or reordering case studies is a data change. The only exception is
section *order*, which is the JSX list in `src/pages/Home.jsx`.

## Section map

Home renders these in order — the right column is the screenshot each was
built from.

| # | Component | Screenshots |
|---|-----------|-------------|
| 1 | `Hero` | 1 |
| 2 | `AboutStatement` | 2 |
| 3 | `ClientArc` | 3 |
| 4 | `Capabilities` | 4, 5 |
| 5 | `Services` | 5–8 |
| 6 | `Portfolio` | 9–11 |
| 7 | `SupportCta` | 11–13 |
| 8 | `WhoWeAre` | 13–15 |
| 9 | `Integrations` | 15, 16 |
| 10 | `Stats` | 17, 18 |
| 11 | `Process` | 19, 20 |
| 12 | `StartJourney` | 21 |
| 13 | `Team` | 21, 22 |
| 14 | `WhyVserv` | 23 |
| 15 | `Testimonials` | 24, 25 |
| 16 | `Faq` | 26, 27 |
| 17 | `FinalCta` | 28 |
| — | `Footer` | 28, 29 |

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/services/:slug` | Service detail |
| `/industries` | Industries |
| `/portfolio` | Portfolio |
| `/resources` | Resources |
| `/vserv-ai` | VservAI |
| `/explore` | Explore Vserv IT |
| `/contact` | Contact (form) |
| `*` | 404 |

Only **Home** is built out from the screenshots. The other routes are wired and
render a shared `PageHero` plus reused sections — they are structural
placeholders waiting on their own designs.

## Design tokens

Sampled from the screenshots and defined in `tailwind.config.js`:

- **Surfaces** — `ink` (`#000`) page, `ink-900` section panels, `ink-850` cards,
  `ink-700` pills
- **Brand** — `brand-500` `#7C4DFF` for buttons, badges and icon circles
- **Text** — white headings, `muted` `#A0A0AB` body, `muted-soft` for the second
  (grey) line of every two-tone heading
- **Recurring treatments** — `.section-panel` (rounded panel + purple light
  shaft), `.card-surface` (hairline border + glowing purple top line),
  `bg-dot-grid` texture

**Font:** the original uses a licensed grotesk. Plus Jakarta Sans is loaded as
the closest free substitute — swap `fontFamily` in `tailwind.config.js` if the
original gets licensed.

## Content changed from the reference

The screenshots carry leftovers from the Framer template they were built on.
These were rewritten to fit an IT services company; each is commented at its
source, and the original wording is preserved in `capabilityCards[].templateCopy`.

- **"Nubien"** → Vserv (screenshots 4, 16)
- **"View About Reboot"** → "View All Integrations" (screenshot 16)
- **"AI-Speech Recognition"** capability card → "Continuous Monitoring" (screenshot 4)
- **"30-Days Money-back Guarantee" / "Email support"** on the stat cards →
  real capability points (screenshots 17, 18)
- Footer column titled **"Services"** but listing social profiles → retitled
  "Follow Us" (screenshot 29)

## Assets

All imagery in `public/images/` is a **generated placeholder**. Overwrite files
in place keeping the same name and extension — no code change needed. See
[`public/images/README.md`](./public/images/README.md) for the folder guide and
recommended dimensions.

The hero background video is the one real asset in the project:
`public/videos/hero-video.mp4`, referenced via `hero.media` in
`src/data/home.js` and rendered by `Hero.jsx`. It plays muted/looped over the
poster still (`hero.poster`); `prefers-reduced-motion` users get the poster
only, no video.

## Known gaps

- **Capability card illustrations** — the API-tree, tag-cloud and waveform art
  in screenshot 4 are rendered as labelled slots pending real SVGs.
- **Contact form** — client-side only. Wire `onSubmit` in `src/pages/Contact.jsx`
  to the CRM or mail endpoint.
- **Testimonial reels** — the Play Reel button is not yet bound to a video player.
- **Icon registry** — `src/lib/icons.js` imports icons explicitly to keep
  lucide-react tree-shakeable. Add new icon names there, or they fall back to `Zap`.
