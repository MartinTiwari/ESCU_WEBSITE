# ESCU SEO and AI-search implementation checklist

Implementation date: 27 October 2026. Owner: Everest Super Chemical Udhyog.

Follow-up: the owner requested removal of the entry animation. The homepage now opens directly; historical before/after measurements below describe the earlier SEO release and are not a new performance measurement after removal.

## Follow-up audit — 28 October 2026

- Live crawl passed all 44 sitemap pages, 80 internal link targets and eight page-image targets. No missing metadata, canonical, H1, image alt attribute, broken internal target or indexing tag blocker was found by these checks.
- Verified permanent redirects from HTTP to HTTPS and the apex host to the canonical www host.
- Fixed a content assembly bug that omitted prepared price/suitability FAQs on seven product pages. These answers now feed the visible accordions, matching FAQ schema and full public AI export; each affected page has six unique answers.
- Made fallback product descriptions identify the existing product use case instead of repeating the same generic document/enquiry wording. Prices, grades and packaging still require enquiry.
- Updated sitemap modification dates only for changed product pages and added a rendered-output regression check against losing the tailored FAQs again.
- No new ranking, Search Console, GA4 account or real-user performance measurement is implied by this code/live-crawl audit. The performance figures below remain the 27 October measurements.

## Release verification — 27 October 2026

- Deployed commits: `bc57ffe`, `e01f3f4`, `0d6dc68`, `16d0505`.
- Production build and TypeScript passed. Structured-data checks passed for 47 rendered pages, including 27 semantic Product entities and visible FAQs; invented offers and ratings are blocked.
- Source lint passed. All 52 mocked quote API cases passed, with no real enquiry emails sent.
- Live audit passed all 44 sitemap pages and 80 internal link targets. Unique metadata, canonical URLs, one H1, heading hierarchy, alt attributes, OG images, JSON-LD, robots and expected missing-product 404s passed.
- Phone preview passed at 390px with no horizontal overflow. PAC quote prefill and progression to the contact step passed without submitting a live enquiry.
- All five cited public guidance URLs returned HTTP 200 after redirects.
- Search Console accepted the sitemap submission on 27 October and reported Success, last read 27 October and 44 discovered pages. Discovered does not mean indexed.

| Mobile Lighthouse, same public homepage | Before | After |
|---|---:|---:|
| Performance | 95 | 97 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 2.9 s | 2.6 s |
| CLS | 0 | 0 |
| Total blocking time | 40 ms | 30 ms |
| First contentful paint | 1.1 s | 0.9 s |

These are single-run laboratory measurements, subject to network variability. LCP remains slightly above the 2.5-second good threshold in this run. No passing real-user INP claim is made. Before/after JSON reports are kept locally in `output/`.

## Measurement rules

- Track the same Nepal-filtered queries and equivalent 28-day windows in Search Console; split mobile and desktop. Record clicks, impressions, CTR, average position and the actual landing URL. Average position is not a fixed ranking for every person.
- Baseline mobile Lighthouse: performance 95, accessibility 100, best practices 100, SEO 100; LCP 2.9 seconds, CLS 0, TBT 40 ms. These lab values do not measure real-user INP. Record after-deployment results separately, including date/device/consent state.
- Preserve GA4 consent. `contact_click` measures contact intent, `quote_open` an opening, `generate_lead` a successful website submission. None proves a completed sale. Separate staff/test visits from business reporting where possible.
- Do not equate llms exports, bot access, valid JSON-LD or a Lighthouse score with guaranteed rankings or AI citations.

## Technical release

- [ ] Confirm production redirects HTTP/apex to the canonical HTTPS www host.
- [ ] Validate all sitemap URLs, page titles/descriptions, one H1, breadcrumbs, image alt attributes, canonical URLs and incoming links.
- [ ] Verify the homepage opens directly with no entry animation, opaque overlay or scroll lock, including without JavaScript.
- [ ] Run source lint, TypeScript/production build, structured-data regression checks and the mocked quote API cases.
- [ ] Verify quote prefill, WhatsApp enquiry, consent withdrawal and client-side page views after deployment. Never submit a fabricated customer enquiry to test live delivery without identifying it as a test.
- [ ] Confirm generated `/llms.txt` and `/llms-full.txt` reflect public canonical content, with no customer data or internal TODOs.
- [ ] Check actual CDN/WAF logs for verified search crawlers. User-agent spoof tests alone cannot prove crawler access. Preserve security controls rather than disabling the firewall.

## Google Search Console

- [x] Resubmit the updated sitemap once after release and confirm Success and discovered URL count (44, 27 October 2026).
- [ ] Inspect priority pages: PAC Powder, TCCA, Bleaching Powder and pool category. Request indexing where eligible; do not repeatedly submit unchanged pages.
- [ ] Follow up discovered/not-indexed URLs. The last audit showed nine; exclusions for redirect URLs are expected. Check current data before reporting a new count.
- [ ] Check manual actions, security issues, HTTPS and real-user Core Web Vitals. Improve only confirmed issues; do not treat insufficient field data as a passing result.

## Bing Webmaster Tools

- [ ] Verify the canonical property, import the existing sitemap if the owner authorizes account linkage, and inspect priority pages.
- [ ] Review indexing and crawler reports; ensure Bingbot is not challenged by CDN rules.
- [ ] Consider IndexNow for genuine URL updates only after configuring the ownership key and reviewing the workflow. It is not a Google indexing API.

## Google Business Profile and identity

- [ ] Keep the customer location **Banshidhar Marg, Kathmandu 44600, Nepal**, phone **01-4543654**, website and hours consistent across verified listings.
- [ ] Keep **Gokarneshor-06, Kathmandu** separately labeled as the registered address. Do not create duplicate location profiles for an office that does not receive customers.
- [ ] Confirm the most accurate business category, products and service areas. Add original packaging, dispatch and team photos with permission.
- [ ] Ask actual customers for honest reviews using the existing Google review link. Do not preselect stars, offer rewards or gate negative feedback.
- [ ] Add the website and contact details to legitimate Nepal business/industry directories with accurate information; review each listing before submission.

## Relevant links and original evidence

- [ ] Ask real manufacturers/import partners, associations and customers with appropriate public supplier pages for factual mentions or links. Obtain permission before sending outreach.
- [ ] Publish real product/label photos, documented grades and useful source-reviewed guidance. Do not buy links, fabricate customers or create repeated city doorway pages.
- [ ] Keep Everest Beverage labeled as a sister company, not an alternative identity of ESCU.

## Content and documentation TODO register

The owner confirmed SDS and related product documents are shared after an enquiry. This is a confirmed workflow, not a public document download library.

- TODO: verify product labels/specifications for every listed product before publishing numerical concentration, purity, physical properties or dosage. In particular, confirm the meaning of the existing TCCA 90% product name. No PAC 30% grade should be inferred from a search alias.
- TODO: confirm packaging units, net contents, minimum order quantities, origin/manufacturer, price validity and current stock per product. Do not infer any from a generic chemical name.
- TODO: supply original product and packaging photos with usage rights. The shared hero is illustrative, not evidence of ESCU stock.
- TODO: identify a real, qualified technical reviewer before publishing quantitative treatment or pool-dosing calculations. Company editorial attribution is not a chemical qualification.
- TODO: obtain and review true equivalent Nepali translations before adding `/ne/...`, reciprocal hreflang and a language selector. Do not relabel English pages or use partial translations as equivalents.
- TODO: publish only genuine certifications, approvals, reviews and customer examples, with permission. No placeholders should appear in public copy or schema.

## Structured-data policy

- A single organization/local-business identity, a WebSite entity, page/breadcrumb entities, visible FAQs and semantic Product identities describe the real catalogue.
- The catalogue is quotation-based. Product schema does not claim Google product-rich-result eligibility. No fake offers, zero prices, ratings, brand/manufacturer, GTIN or stock status may be added to satisfy a test.
- FAQPage describes visible answers; Google retired FAQ rich results in May 2026. Validate schema vocabulary and visible-content consistency separately from Google feature eligibility.
- Use Schema.org validation for semantic Product entities; use Google's Rich Results Test only for supported features. An ineligible rich result is not the same as invalid JSON-LD.

## 90-day plan

### Days 1–14: establish accurate coverage

Release in small commits, verify all routes/flows, submit sitemap, establish query/landing-page baselines and confirm GA4 events. Review labels/documents for PAC, TCCA and bleaching powder first. Record exact AI-search prompts, date, language, country context, answer and citations across ChatGPT Search, Claude web search, Perplexity and Gemini; do not infer broad absence from one answer.

### Days 15–45: deepen first-party information

Add verified packaging and specification information, real photos and reviewed answers to the highest-impression pages. Improve guides based on actual enquiries. Complete Bing verification and legitimate profile consistency. Seek a small number of relevant real-world mentions. Compare equal 28-day periods; avoid rewriting every page weekly because rankings fluctuate.

### Days 46–90: measure and refine

Review Nepal organic leads, quote outcomes, contact intent, indexed coverage and target-query landing pages. Improve titles/content where query intent is mismatched. Assess guide usefulness and internal links. Publish reviewed Nepali equivalents when ready. Repeat the same AI-citation prompt set and record results without guaranteeing citation or page-one placement.
