import Reveal from "@/components/Reveal";

const profile = "https://www.google.com/maps?cid=15578687259318146645";

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
        <a className="review-secondary" href={profile} target="_blank" rel="noopener noreferrer">Share your experience <span aria-hidden="true">↗</span></a>
        <p>Open our Google profile, then choose “Write a review”.</p>
      </div>
    </section>
  );
}
