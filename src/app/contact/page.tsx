import { site, whatsappLink } from "@/lib/site";

export const metadata = { title: "Contact | Everest Super Chemical Udhyog" };

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-bold text-navy mb-2">Get in Touch</h1>
      <p className="text-grey-400 mb-10 max-w-xl">
        Reach out for pricing, bulk orders, or technical enquiries. We offer customized
        supply solutions and long-term agreements for businesses across Nepal.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-teal-light font-semibold mb-1">Phone</div>
            <a href={`tel:${site.phone}`} className="text-navy font-medium hover:underline">{site.phone}</a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-teal-light font-semibold mb-1">WhatsApp</div>
            <a
              href={whatsappLink("Hi ESCU, I'd like to ask about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy font-medium hover:underline"
            >
              {site.whatsappDisplay}
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-teal-light font-semibold mb-1">Email</div>
            <a href={`mailto:${site.email}`} className="text-navy font-medium hover:underline">{site.email}</a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-teal-light font-semibold mb-1">Location</div>
            <p className="text-navy font-medium">{site.address}</p>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-grey-100 h-72 md:h-auto">
          <iframe
            title="ESCU location map"
            className="w-full h-full min-h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
          />
        </div>
      </div>
    </div>
  );
}
