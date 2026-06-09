import SiteFooter from "@/components/SiteFooter";

export default function NewsletterPage() {
  return (
    <main className="editorial-page">
      <section className="newsletter-page">
        <span className="label">Newsletter</span>
        <h1>The Inner Circle</h1>
        <p>Early access to numbered drops, private previews, and the stories behind every collection.</p>
        <form className="news__form">
          <input type="email" placeholder="Your email address" required aria-label="Email address" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
      <SiteFooter />
    </main>
  );
}
