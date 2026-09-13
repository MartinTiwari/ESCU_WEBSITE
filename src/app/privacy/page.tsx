import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Website Privacy Notice", description: "How ESCU handles website enquiries, optional Google Analytics cookies and your analytics preferences. Contact our Kathmandu team with privacy questions.", path: "/privacy" });

export default function PrivacyPage() {
  return <>
    <PageHeader eyebrow="Your information" title="Website privacy" sub="Updated 13 September 2026" />
    <div className="mx-auto max-w-3xl px-5 py-14 space-y-8 text-ink/80 leading-relaxed">
      <section><h2 className="text-2xl text-ink mb-3">Enquiries</h2><p>When you request a quote, we use the contact details and message you provide to respond to your enquiry. The website uses Vercel for hosting and Resend for enquiry email delivery. Avoid including sensitive personal information in your message.</p></section>
      <section><h2 className="text-2xl text-ink mb-3">Optional analytics</h2><p>With your permission, Google Analytics uses cookies to measure visits, pages viewed, referral sources and interactions such as scrolling and outbound links. Analytics stays off until you select Allow analytics. We do not send quote form contents to Analytics, and advertising personalization and Google signals are disabled.</p><p className="mt-3">Google processes this information through its service. Read <a className="underline" href="https://policies.google.com/technologies/partner-sites">how Google uses information from sites that use its services</a>.</p></section>
      <section><h2 className="text-2xl text-ink mb-3">Your choices</h2><p>Select No thanks to browse without Analytics. You can change your choice using Analytics preferences at the bottom of any page. Withdrawing permission stops future tracking and removes the Analytics cookies available to this website; it does not erase previously collected reports. Your preference is stored in your browser. Clearing browser storage will reset it.</p></section>
      <section><h2 className="text-2xl text-ink mb-3">Questions and requests</h2><p>For questions about information you have provided, or to request its correction or deletion, contact Everest Super Chemical Udhyog at <a className="underline break-all" href={`mailto:${site.email}`}>{site.email}</a>.</p></section>
    </div>
  </>;
}
