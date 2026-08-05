# ESCU brand palette

One accent color, not three. Everything "colored" on the site — and
everything that should carry the brand on print (drum labels, letterhead,
delivery slips, signage) — is one of these swatches. Nothing else.

| Role | Name | Hex | RGB | CMYK* |
|---|---|---|---|---|
| Dark base | Ink | `#0B1B28` | 11, 27, 40 | 73, 33, 0, 84 |
| Dark base, raised panels | Ink Soft | `#12324A` | 18, 50, 74 | — |
| Light base | Paper | `#F4F1EA` | 244, 241, 234 | 0, 1, 4, 4 |
| Light base, cards on paper | Paper 2 | `#EBE5D9` | 235, 229, 217 | — |
| Light base, near-white | Cream | `#FBF9F4` | 251, 249, 244 | 0, 1, 3, 2 |
| **Accent (primary)** | **Amber** | **`#C8721A`** | 200, 114, 26 | 0, 43, 87, 22 |
| Accent, on dark backgrounds | Amber Bright | `#F0A84A` | 240, 168, 74 | 0, 30, 69, 6 |
| Body text | Ink Text | `#17211D` | 23, 33, 29 | — |
| Secondary text | Muted | `#67736C` | 103, 115, 108 | 10, 0, 6, 55 |
| Hairlines / borders | Line | `#DDD6C7` | 221, 214, 199 | 0, 3, 10, 13 |
| Destructive / hazard only | Hazard Red | `#B3401E` | 179, 64, 30 | 0, 64, 83, 30 |

\* CMYK values are a naive RGB conversion for a starting point only —
always confirm against an actual press proof before running labels,
since paper stock and printer profile shift these.

## The rule

**Amber is the only color.** Every other value on this list is a neutral
(ink, paper, or a gray in between). If a new element needs to draw the
eye — a CTA, a tag, a hazard mark, a stamp — it is amber. It is never a
second hue. This is what makes the works-order/spec-sheet system read as
one brand instead of a template: one signal color against two neutrals,
the way an actual chemical drum label, hazard tag, or engineering
drawing works.

Do not reintroduce a second accent (no blues, no greens) without
updating this file and re-deriving every page that currently assumes
"amber = the accent."

## Usage

- **CTAs / primary buttons** — solid Amber (`#C8721A`) fill, Cream text,
  the tag-punch notch corner. Hover to Amber Bright.
- **Tags, eyebrows, index numbers, active nav** — Amber on paper
  backgrounds, Amber Bright on ink backgrounds (it needs the lift for
  contrast on dark).
- **Body copy, structure, borders** — Ink / Muted / Line. Never colored.
- **Hazard Red** — reserved for genuine warnings or destructive actions
  only (e.g. a form error). Do not use it decoratively; it must stay
  rare enough to mean something when it appears, matching real hazard
  labeling conventions.
- **Print (drum labels, letterhead, delivery slips)** — Ink on Paper/
  Cream stock, Amber for the ESCU mark, product-family tag, or a
  hazard/handling icon. Keep the same one-accent rule: if the label
  needs a second color for a regulatory pictogram (e.g. GHS hazard
  diamonds), that pictogram uses its own mandated color and sits apart
  from the brand system — it is not "a second brand color."

## Where it lives in code

All of the above are CSS custom properties in
`src/app/globals.css` (`:root`), exposed as Tailwind utilities via the
`@theme inline` block — e.g. `bg-amber`, `text-amber-bright`,
`border-line`. Change a swatch once there and it propagates everywhere.

Note: the `--emerald` / `--emerald-bright` tokens still exist in that
file but are **not** a second brand color — they're intentionally
desaturated neutrals reserved for two low-key structural marks (the
scroll-progress track, the footer's top hairline) that need to sit
quietly below the amber accent, not compete with it.
