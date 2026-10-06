import Reveal from "@/components/Reveal";

const profile = "https://www.google.com/maps?cid=6505991632698609845";

export default function GoogleReviews() {
  return (
    <section className="google-reviews home-container" aria-labelledby="google-reviews-title">
      <Reveal>
        <h2 id="google-reviews-title">Your experience.<br /><span>In your words.</span></h2>
        <p>Ordered from ESCU? Share how it went on Google. Your honest feedback helps other businesses choose their supplier and helps us improve.</p>
      </Reveal>
      <div className="google-reviews-actions">
        <span className="google-reviews-mark" aria-hidden="true">Google</span>
        <h3>Get to know us through our customers.</h3>
        <a className="review-primary" href={profile} target="_blank" rel="noopener noreferrer">Read reviews on Google <span aria-hidden="true">↗</span></a>
        <a className="review-secondary" href="https://g.page/r/CbUQqnLr7ElaEBM/review" target="_blank" rel="noopener noreferrer">Share your experience <span aria-hidden="true">↗</span></a>
        <p>Choose your rating and share your experience on Google.</p>
      </div>
    </section>
  );
}
