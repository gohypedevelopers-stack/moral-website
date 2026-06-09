import SiteFooter from "@/components/SiteFooter";

const posts = [
  ["Notes on permanence", "Why the best garment is the one that keeps earning its place."],
  ["The trouser as architecture", "Pressed creases, dry wool, and the discipline of a clean line."],
  ["Care as ownership", "Small habits that extend the life and character of daily clothing."],
];

export default function JournalPage() {
  return (
    <main className="editorial-page editorial-page--light">
      <section className="editorial-hero">
        <span className="label">Journal</span>
        <h1>Field notes for considered dress.</h1>
      </section>
      <section className="journal-list">
        {posts.map(([title, text]) => (
          <article key={title}>
            <span className="label">MORAL Journal</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
