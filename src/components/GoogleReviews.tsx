import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export default function GoogleReviews() {
  return (
    <section className="google-reviews home-container" aria-labelledby="google-reviews-title">
      <Reveal>
        <h2 id="google-reviews-title">Your experience.<br /><span>In your words.</span></h2>
        <p>Ordered from ESCU? Share how it went on Google. Your honest feedback helps other businesses choose their supplier and helps us improve.</p>
      </Reveal>
      <div className="google-reviews-actions">
        <span className="google-reviews-mark" aria-hidden="true">Google</span>
        <h3>Tell us how your order went.</h3>
        <a className="review-primary" href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer">Write a Google review <span aria-hidden="true">↗</span></a>
        <p>Opens Google&apos;s review form. Sign in to your Google account if asked.</p>
      </div>
    </section>
  );
}
