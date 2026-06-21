import { site } from "@/lib/site";

export const metadata = { title: "About Us | Everest Super Chemical Udhyog" };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-bold text-navy mb-6">About {site.shortName}</h1>

      <div className="space-y-5 text-foreground leading-relaxed mb-10">
        <p>
          Everest Super Chemical Udhyog (ESCU) is a Kathmandu-based supplier of water
          treatment chemicals, swimming pool solutions, housekeeping products, and catering
          fuel, serving hotels, resorts, hospitals, and industries across Nepal.
        </p>
        <p>
          With {site.yearsInOperation}+ years in operation, we have built long-term supply
          relationships with hotels, resorts, and engineering projects across the country,
          backed by wholesale pricing, technical support, and reliable nationwide delivery.
        </p>
      </div>

      <h2 className="text-xl font-bold text-navy mb-4">Why Choose Us</h2>
      <ul className="grid sm:grid-cols-2 gap-3 mb-10">
        {site.whyChooseUs.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-teal mt-0.5">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="bg-grey-50 rounded-lg p-6">
        <h2 className="text-lg font-bold text-navy mb-2">Get in Touch</h2>
        <p className="text-grey-700 text-sm leading-relaxed">
          Reach out for pricing, bulk orders, or technical enquiries. We offer customized
          supply solutions and long-term agreements for businesses across Nepal.
        </p>
      </div>
    </div>
  );
}
