import Link from "next/link";

const drums = [
  { style: "water", category: "Water Treatment Chemicals", title: <>WATER<br />TREATMENT</>, detail: "Coagulants / Disinfectants" },
  { style: "pool", category: "Swimming Pool Chemicals", title: <>POOL<br />CARE</>, detail: "Sanitizers / pH control" },
  { style: "cleaning", category: "Housekeeping & Cleaning Chemicals", title: <>CLEANING<br />& HYGIENE</>, detail: "Everyday essentials" },
];

export default function ChemicalSupplyVisual() {
  return (
    <div className="chemical-stage">
      <div className="chemical-stage-heading"><span>ESCU / CHEMICAL SUPPLY</span><span>KATHMANDU, NP</span></div>
      <div className="chemical-stage-type" aria-hidden="true">Made for<br />the working<br /><em>world.</em></div>
      <div className="chemical-drums" aria-label="Explore our three chemical ranges">
        {drums.map((drum, i) => (
          <Link key={drum.style} href={`/products?category=${encodeURIComponent(drum.category)}`} className={`chemical-drum chemical-drum-${drum.style}`} aria-label={`Explore ${drum.category}`}>
            <span className="drum-lid" aria-hidden="true"><span /></span>
            <span className="drum-rib drum-rib-top" aria-hidden="true" />
            <span className="drum-label"><span className="drum-brand">ESCU <span>↗</span></span><span className="drum-range">{drum.title}</span><span className="drum-detail">{drum.detail}</span><span className="drum-label-bottom"><span>RANGE / 0{i + 1}</span><span className="drum-barcode" aria-hidden="true" /></span></span>
            <span className="drum-rib drum-rib-bottom" aria-hidden="true" />
          </Link>
        ))}
      </div>
      <div className="chemical-stage-caption"><span>Three ranges. One reliable source.</span><span>Explore a drum ↗</span></div>
    </div>
  );
}
