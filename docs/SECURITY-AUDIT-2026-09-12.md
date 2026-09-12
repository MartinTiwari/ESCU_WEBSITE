# Security audit — 12 September 2026

Scope: the public ESCU Next.js website, its quote API, deployed HTTP behavior, repository contents and installed dependencies.

## Fixed

- Updated Next.js from 16.3.0 to 16.3.3 to address the critical advisories reported by `npm audit`.
- Updated vulnerable transitive dependencies. The final full and production-only dependency audits report zero known vulnerabilities.
- Added a Content Security Policy covering application scripts, styles, images, Cloudflare Turnstile and the Google Maps embed. It blocks plugins, unauthorized framing, foreign form targets and mixed HTTP content.
- Changed clickjacking protection from same-origin framing to `DENY`, disabled browser DNS prefetch, kept MIME sniffing and referrer restrictions, and enabled cross-origin opener isolation.
- Disabled the framework identification header and disabled caching for API responses.
- Hardened `/api/quote` with same-origin browser enforcement, JSON-only requests, a 16 KiB request limit, parsing/type validation and a five-second Turnstile verification timeout.
- Added a named Turnstile action and server-side action validation.
- Treat Resend API-level errors as failures instead of returning a false success.
- Changed the map to its direct embed URL so it remains functional under the Content Security Policy.

## Verified

- HTTPS is enforced and the apex domain redirects to the canonical `www` hostname.
- HSTS is present on HTTPS responses.
- `.env`, `.git/config`, `next.config.ts` and `package.json` are not publicly served.
- No committed API key or private-key value was found in tracked source or matching Git history.
- The production build and focused lint pass.
- Local endpoint checks return 403 for a foreign browser origin, 415 for a non-JSON request, 400 for malformed JSON and 413 for an oversized body. API responses use `Cache-Control: no-store`.

## Operational follow-through

The deployed quote page did not expose a Turnstile widget at audit time, which means `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is absent from that production deployment. The endpoint now has independent protections, but Turnstile should also be configured in the Vercel project together with its matching secret. For hard rate-limit guarantees across multiple serverless instances, add a Vercel Firewall rate-limit rule or replace the in-memory limiter with a shared store.

This is a point-in-time review, not a guarantee that no vulnerability exists. Repeat dependency scans and framework updates regularly.
