# ESCU SEO checklist — 13 September 2026

Website: https://www.everestsuperchemical.com.np/

## Google account checks

Checked directly in the signed-in Google account during this audit:

| Checklist item | Finding / action |
| --- | --- |
| 1. Search Console | Domain property is accessible. Overview shows 20 indexed pages and 15 not indexed; exclusions need individual interpretation. |
| 2. Submit sitemap | Already successful: 36 pages discovered. Submitted September 11; last read September 12. No redundant resubmission needed. |
| 3. Analytics | Google opens first-time account creation; no measurement ID is configured in this checkout. The website integration is prepared but inactive. |
| 4. Business Profile | Completed the remaining profile customization screens. Although an intermediate screen said “You're now verified,” the final management panel says Google is processing verification and may take up to five days. Treat verification as pending. Real storefront/business photos are still needed. |
| 5. Main keyword in title | Homepage now leads with “Chemical Supplier in Kathmandu, Nepal”; secondary titles are more focused. Product and category titles already name their chemical/range and Nepal. |
| 6. City | Kathmandu already appears in visible business details, contact information and LocalBusiness structured data; now also leads the homepage search title. |
| 7. Meta descriptions | Tightened page and product descriptions. Removed relative age and response-time promises from the changed metadata; About uses the confirmed 2048 BS founding year. |
| 8. Internal links | Catalogue, category, related-product, industry and navigation links already exist. Search Console reports 43 internal links; this is Google's sampled report, not a complete crawl. |
| 9. Compress images | Shared hero converted from 1,874,343-byte PNG to 1,304,172-byte lossless WebP: 30.4% smaller, with identical decoded pixels. Next/Image continues responsive resizing and delivery optimization. PNG master retained. This is a source-size reduction, not a measured Core Web Vitals improvement. |
| 10. Backlinks | Search Console currently reports 0 external links. No outreach sent and no listings created. See the plan below. |

## Product-snippet email correction

The September 12 Search Console email reports: `Either "offers", "review", or "aggregateRating" should be specified`. The product detail template previously emitted Product markup despite having no published price or product reviews. It now emits WebPage with an informational Thing subject instead, retaining the BreadcrumbList, page content, canonical URLs and internal links. It does not claim product rich-result eligibility.

Every production build now checks the generated HTML and fails if Product or ProductGroup markup returns under the current quote-only catalogue policy. The same check verifies that product pages retain WebPage and breadcrumb markup. Re-enable product snippets only after real qualifying data is visible on the pages and the policy/test is deliberately updated. This fixes the source of this warning; it cannot suppress already queued emails or guarantee that Google will never report another issue.

The Business Profile's pending HTTP website change was corrected and saved as `https://www.everestsuperchemical.com.np/`. Phone/description/location edits are already pending with Google; no duplicate edits were submitted.

## Finish Analytics setup

The account setup page has been left available for the owner. Create the Analytics account/property under the intended company-controlled Google account, review and accept Google's terms, and create a Web data stream for the canonical website above. Select Nepal reporting time and NPR currency where applicable.

Set this environment variable in the Vercel **Production** environment, then rebuild/deploy:

```dotenv
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR_REAL_MEASUREMENT_ID
```

Replace the placeholder with the actual G- measurement ID from Web stream details. This is a public identifier, not an API secret. Do not create a second installation through Tag Manager.

The component loads the Google tag after the page becomes interactive and only with a valid ID in production. It is disabled in local development and Vercel previews. The Content Security Policy allows the required Analytics endpoints only when the integration is enabled. Google signals and advertising personalization are disabled by the integration.

In the web stream's Enhanced measurement settings, keep Page views and its browser-history event option enabled so Next.js client navigation is measured. Review other automatic events, particularly form interactions, before activation. Do not send customer names, email addresses, phone numbers or quote message contents as event parameters or URL parameters.

After deployment, verify one initial page view and subsequent catalogue/product navigation in Realtime or DebugView. Confirm there is one event per navigation and no Content Security Policy errors. Live Analytics delivery cannot be verified until the real stream exists and the integration is deployed.

## Earn relevant backlinks

Prioritize existing relationships, using the public website URL and real business name:

1. Ask manufacturers/import partners that already work with ESCU whether their authorized distributor page can accurately list ESCU and link to the website.
2. Ask existing business customers with supplier/partner pages whether they want to list ESCU. Use their name or logo on ESCU's site only with permission.
3. If ESCU holds a chamber or industry-association membership, complete that existing member profile with the same name, address, phone and website.

Draft for an existing supplier contact (not sent):

> Hello [name], we are updating Everest Super Chemical Udhyog's company information. If your website lists distributors or supply partners and ESCU qualifies, could you include our correct company name and website: https://www.everestsuperchemical.com.np/? We are based on Banshidhar Marg, Kathmandu. Please let us know what information you need.

The actual contact list and authorization to send outreach are still needed. Avoid paid ranking links, invented affiliations and keyword-stuffed business names.

## Expanded technical checklist

- **Indexing:** public sitemap pages allow indexing; Vercel previews now explicitly emit noindex/nofollow as well as their existing robots exclusion.
- **Titles, descriptions, canonical URLs:** all 36 sitemap entries have distinct metadata and self-canonical URLs. Established, readable lowercase/hyphenated product slugs were retained to preserve incoming links. The three existing category query URLs intentionally have distinct content and self-canonicals.
- **Headings:** one H1 per page. Contact methods and product information sections now have actual H2/H3 headings; industry disclosures have H2 headings. No skipped levels in the checked pages.
- **Images:** informative imagery has alt text; stock imagery is identified as illustrative. Purely decorative backgrounds and redundant thumbnails intentionally retain empty alt text. Logos have descriptive alt text and properly sized image requests.
- **Compression:** generated smaller WebP versions of all eight raster assets in public/: 5,746,701 bytes of originals versus 2,275,316 bytes of variants (60.4% less). All PNG conversions preserve identical pixels; the two photographic JPEG conversions use quality 85. Originals remain available. Active hero and logo references use WebP; remote photos continue through Next/Image responsive compression. The small PNG browser icons remain in their required format.
- **Sharing:** generated a branded 1200×630 Open Graph image at /opengraph-image, shared across page metadata and Twitter cards, with image dimensions and alt text.
- **Performance:** removed the homepage's 3.45-second blocking splash. Page headers render immediately; remaining reveal content is visible before JavaScript and respects reduced motion. The header logo formerly requested a 3840px variant in the inspected browser; it now requests an appropriately sized variant (64px at DPR 1). These are measured implementation improvements, not a claimed Lighthouse score or field CWV pass. Search Console currently has no Core Web Vitals data.
- **Mobile:** fixed intrinsic-width overflow on the contact page. Six representative page types were checked at requested 320px, 390px and 768px viewports, with no page-level horizontal overflow and one visible H1. The mobile menu opens, navigates and closes correctly. Existing mobile layout and desktop appearance were preserved.
- **Links:** 71 unique internal link targets, including fragments and quote prefill URLs, pass checks. Sitemap/robots routes are generated by Next.js at /sitemap.xml and /robots.txt. Unknown product slugs return 404.

## Backlink execution plan

| Week | Work | Evidence to record |
| --- | --- | --- |
| 1 | Assemble a list of up to five existing suppliers and five existing customers with relevant partner/supplier pages; verify any association memberships. | Relationship, contact, relevant page and why ESCU belongs there. |
| 2 | After outreach is authorized, send tailored requests using the draft above. | Date sent, destination and response; no mass submissions. |
| 3 | Complete eligible member/distributor profiles and provide real company details or photos where requested. | Live listing URL, linked destination and correct business details. |
| 4 | Follow up once where appropriate and review Search Console Links and referral traffic if Analytics is active. | New referring domains and useful referrals; Google's reporting can lag. |

Prioritize relevance and real relationships over link volume. These are proposed targets, not claimed relationships or completed outreach.

## Release checks

The public website is served by `milans-projects-44d07115/escu-site` on Vercel, connected to the GitHub repository's `main` branch. The local CLI is linked to a different project under Martin's account; its successful deployment does not update the public domain. Publish through the confirmed Git integration. The live project's existing quote-email variables are present and must be preserved. The existing production sitemap submission remains valid. After release, inspect the homepage and relevant product pages in Search Console; Google decides whether and when to recrawl/index them.

Local checks:

Production build and focused lint passed. The local production server passed all 36 sitemap URL checks: unique titles/descriptions, self-canonical URLs, one H1, parseable JSON-LD, incoming internal links and no noindex. Robots/sitemap declarations, the WebP asset and an unknown-product 404 also passed. The homepage was inspected in Chrome; the design detector reported no findings on the changed components. No real Analytics traffic was sent.

```sh
npm run build
npm run lint -- src/app src/components/GoogleAnalytics.tsx src/components/PageHeader.tsx next.config.ts
npm run start -- --port 3100
node scripts/verify-seo.cjs http://localhost:3100
```

Source-image compression can be reproduced with `node scripts/compress-hero.cjs` using the project's installed Sharp package.

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Set up Google Analytics](https://support.google.com/analytics/answer/14183469)
- [Enhanced measurement events](https://support.google.com/analytics/answer/9216061)
- [Google tag Content Security Policy requirements](https://developers.google.com/tag-platform/security/guides/csp)
- [Improve local ranking](https://support.google.com/business/answer/7091)
