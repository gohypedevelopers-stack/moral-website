import SiteFooter from "@/components/SiteFooter";

export default function ContactPage() {
  return (
    <main className="editorial-page editorial-page--light contact-page">
      <section className="editorial-hero editorial-hero--split">
        <div>
          <span className="label">Get in Touch</span>
          <h1>We're here for you.</h1>
        </div>
        <div>
          <p className="contact-subtitle" style={{ margin: 0, paddingBottom: "1.5rem" }}>
            Have a question about an order, our products, or our philosophy? Reach out to us below.
          </p>
        </div>
      </section>
      
      <section className="contact-content">
        <div className="contact-info">
          <div className="contact-info-item">
            <span className="label">Customer Service</span>
            <p>support@moralnyc.com</p>
            <p>Mon-Fri, 10am-6pm EST</p>
          </div>
          <div className="contact-info-item">
            <span className="label">Press & Partnerships</span>
            <p>press@moralnyc.com</p>
          </div>
          <div className="contact-info-item">
            <span className="label">Studio</span>
            <p>New York, NY</p>
          </div>
        </div>

        <form className="contact-form" action="#">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your email address" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select id="subject" name="subject">
              <option value="order">Order Inquiry</option>
              <option value="product">Product Question</option>
              <option value="press">Press/Partnerships</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="How can we help you?" required></textarea>
          </div>
          <button type="submit" className="btn btn--solid contact-submit">Send Message</button>
        </form>
      </section>
      <SiteFooter />
    </main>
  );
}
