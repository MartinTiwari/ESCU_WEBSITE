# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are hotels, resorts, hospitals, restaurants/cafes, commercial buildings, industrial plants, water treatment plants, and engineering projects across Nepal that need a reliable, ongoing supply of water treatment, swimming pool, and housekeeping/cleaning chemicals.

The person actually placing the order or filling out the quote form is usually not the owner directly — owners delegate this to an agent or staff officer they've assigned to handle purchasing. Copy and flows should work for that delegated buyer (someone acting on someone else's authority and budget, who needs to relay clear info back), not assume a hands-on owner-operator.

## Product Purpose

Everest Super Chemical Udhyog (ESCU) manufactures and supplies the chemicals these operations run on day to day: water treatment chemicals (coagulants, disinfectants, pH control), swimming pool chemicals, and housekeeping/cleaning products, plus allied supplies. Success is a repeat B2B customer with a standing or long-term supply relationship, not a one-off sale.

## Positioning

ESCU makes part of what it sells in its own factory and imports the rest directly, so it controls the grade a customer receives rather than passing along whatever a middleman had in stock — and that's why bulk pricing stays consistent order to order rather than drifting. It is also a single supplier across three otherwise-separate categories (water treatment, pool, housekeeping) that a customer would normally have to source from three different vendors.

## Operating Context

- One warehouse/dispatch point in Kathmandu (Banshidhar Marg); orders are picked up there or delivered by truck nationwide.
- Pricing is quote-based (wholesale/bulk), not shown publicly — customers request a quote by phone, WhatsApp, email, or the site's quote form.
- Most orders still start with a phone call or WhatsApp message; the website's quote form and product catalogue exist to support and speed up that conversation, not replace it.
- 35+ years in operation (founded BS 2058).

## Capabilities and Constraints

- ~28 products across 3 categories (Water Treatment, Swimming Pool, Housekeeping & Cleaning Chemicals), each tagged to the industries it serves.
- No cart/checkout/payment — this is a lead-generation and information site, not a storefront. The quote request is the primary conversion point.
- SDS (Safety Data Sheet) / spec sheets are not yet digitized for any product; the product page already handles this as "on request via quote form or WhatsApp" rather than a broken download link. Do not imply SDS files exist until they're actually supplied.
- Stack: Next.js (App Router) + Tailwind CSS, hosted on Vercel. Quote form emails via Resend, with server-side rate limiting, a honeypot, a timing check, and optional Cloudflare Turnstile verification already implemented.
- No language switcher yet (English only), despite the original brief calling for EN/NP bilingual — not yet built.

## Brand Commitments

- Legal/trading name: Everest Super Chemical Udhyog, shown publicly as "ESCU".
- Voice: direct and plain-spoken, not corporate-sounding — short sentences, concrete claims, no hard-sell language. Recently simplified across the site specifically to read easier, not more advanced/formal.
- Visual identity: a deliberately single-accent "works-order" system (deep ink + warm paper neutrals, one amber accent, no competing hues) — see `docs/BRAND-PALETTE.md`. This was a considered decision after an earlier multi-hue version was flagged as not cohesive; do not reintroduce a second accent color without updating that doc.
- Mountain/summit visual motif ties to the "Everest" name (see the Contours component on the homepage hero).

## Evidence on Hand

None. No certifications, licenses, government tender/Bolpatra history, client list, or testimonials are available to show publicly right now. Future design or copy work must not invent, imply, or placeholder any of these — no fake client logos, no fabricated testimonials, no "trusted by [named company]" claims, no tender-experience claims. If real evidence becomes available later, it should be added deliberately, not assumed.

## Product Principles

1. The phone call/WhatsApp message is still the real transaction; the website's job is to make that conversation faster and better-informed, not to replace it with self-serve checkout.
2. Write for the delegated buyer (an agent or officer acting on an owner's behalf), not an owner-operator — copy should be easy to relay accurately to someone else, not just persuasive in the moment.
3. Never claim more than is true: no invented certifications, tender history, testimonials, or SDS availability. Absence is stated plainly rather than papered over.
4. One supplier, three categories — the cross-category breadth (water treatment + pool + housekeeping) is a real, defensible differentiator and should stay visible in how the catalogue and homepage are structured, not buried.
5. Plain language over impressive-sounding language, site-wide — this was an explicit correction from the client, not a style preference to be revisited casually.

## Accessibility & Inclusion

No formal compliance requirement (e.g. not currently pursuing government tender eligibility that would mandate it). Follow general WCAG AA-level good practice as a baseline.
