import SiteFooter from "@/components/SiteFooter";

export default function AboutPage() {
  return (
    <main className="editorial-page">
      <section className="editorial-hero editorial-hero--split">
        <div>
          <span className="label">About</span>
          <h1>Founded on a single conviction.</h1>
        </div>
        <p>
          MORAL is a study in restraint: fewer pieces, better choices, and garments that remain useful
          long after the season moves on.
        </p>
      </section>
      <section className="editorial-band">
        <article>
          <span>01</span>
          <h2>Integrity</h2>
          <p>Every release is small, considered, and accountable to the people who make it.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Craft</h2>
          <p>Materials, construction, and fit are treated as the design language.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Permanence</h2>
          <p>We design pieces to age with the wearer rather than expire with the market.</p>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
