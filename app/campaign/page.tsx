import SiteFooter from "@/components/SiteFooter";

export default function CampaignPage() {
  return (
    <main className="editorial-page">
      <section className="campaign-page-hero">
        <img src="/assets/3a79aa51-9037-4ef6-a02b-03d23e7bc7f1.jpg" alt="MORAL campaign" />
        <div>
          <span className="label">Campaign</span>
          <h1>SS26: The Archive of Now</h1>
          <p>Tailoring, utility, and essentials photographed as daily ritual.</p>
        </div>
      </section>
      <section className="editorial-band editorial-band--two">
        <article>
          <span>LOOK 01</span>
          <h2>Structured ease</h2>
          <p>Sharp lines, relaxed posture, and garments that keep their shape without demanding attention.</p>
        </article>
        <article>
          <span>LOOK 02</span>
          <h2>Quiet contrast</h2>
          <p>Black, white, wool, denim, cotton: a reduced palette built for repetition.</p>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
