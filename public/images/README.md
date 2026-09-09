# Image assets

Every file in here is a **generated placeholder** (a flat-colour JPEG/PNG, or
a labelled SVG). They exist so the app renders without 404s before the real
artwork is supplied. Each JPEG is colour-matched to whatever it actually
sits against in its component (a card background, a panel background, etc.)
so an un-replaced placeholder reads as an empty dark tile rather than a
glaring white box — check the component if you need the exact target colour
for a given file.

To swap in a real asset, overwrite the file **keeping the same name and
extension** — no code change is needed. Paths are referenced from `src/data/*`
and resolved from the site root (e.g. `/images/services/cloud.jpg`).

| Folder          | What goes here                                        | Suggested size |
| --------------- | ----------------------------------------------------- | -------------- |
| `hero/`         | Hero background still (poster shown under the video) | 1920×1080      |
| `clients/`      | Client logos for the arc — transparent PNG on white   | 200×200        |
| `services/`     | Service card imagery                                   | 800×500        |
| `portfolio/`    | Case-study visuals, two per study                      | 800×600        |
| `deck/`         | The fanned card deck in the support CTA                | 300×380        |
| `team/`         | Leadership headshots, square crop                      | 400×400        |
| `testimonials/` | Video reel poster frames                               | 1200×800       |
| `integrations/` | Platform logo marks, monochrome SVG preferred          | 48×48          |
| `about/`        | Workspace + journey banner photography                 | 1200×900       |

The hero background video lives outside this folder, at
`public/videos/hero-video.mp4` — it isn't a placeholder, replace it directly
if a new reel is supplied.
