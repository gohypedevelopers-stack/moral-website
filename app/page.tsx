"use client";

import { useEffect, useRef, useState } from "react";

const products = [
  {
    id: "prod-1",
    tag: "New",
    title: "The Atelier Coat",
    sub: "Outerwear",
    price: "$680",
    src: "https://images.pexels.com/photos/35587808/pexels-photo-35587808.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=900",
  },
  {
    id: "prod-2",
    tag: "New",
    title: "Structured Wool Trouser",
    sub: "Tailoring",
    price: "$320",
    src: "https://images.pexels.com/photos/8505246/pexels-photo-8505246.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=900",
  },
  {
    id: "prod-3",
    tag: "Best Seller",
    title: "Heavyweight Crew",
    sub: "Essentials",
    price: "$140",
    src: "https://images.pexels.com/photos/17590615/pexels-photo-17590615.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=900",
  },
  {
    id: "prod-4",
    title: "Raw Hem Denim",
    sub: "Denim",
    price: "$260",
    src: "https://images.pexels.com/photos/26274786/pexels-photo-26274786.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=900",
  },
  {
    id: "prod-5",
    tag: "Limited",
    title: "Cashmere Overshirt",
    sub: "Limited Edition",
    price: "$540",
    src: "https://images.pexels.com/photos/29923243/pexels-photo-29923243.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=900",
  },
];

const categories = [
  {
    id: "cat-men",
    title: "Men",
    label: "Shop the edit",
    src: "https://images.pexels.com/photos/8505246/pexels-photo-8505246.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
  {
    id: "cat-women",
    title: "Women",
    label: "Shop the edit",
    src: "https://images.pexels.com/photos/26274786/pexels-photo-26274786.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
  {
    id: "cat-ess",
    title: "Essentials",
    label: "The foundation",
    src: "https://images.pexels.com/photos/17590615/pexels-photo-17590615.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
  {
    id: "cat-ltd",
    title: "Limited Edition",
    label: "Numbered drops",
    src: "https://images.pexels.com/photos/35587808/pexels-photo-35587808.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
];

const community = [
  "https://images.pexels.com/photos/19317139/pexels-photo-19317139.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
  "https://images.pexels.com/photos/8505246/pexels-photo-8505246.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
  "https://images.pexels.com/photos/26274786/pexels-photo-26274786.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
  "https://images.pexels.com/photos/35587808/pexels-photo-35587808.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
  "https://images.pexels.com/photos/17590615/pexels-photo-17590615.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
  "https://images.pexels.com/photos/29923243/pexels-photo-29923243.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
];

const features = [
  {
    num: "01",
    title: "Premium Quality",
    copy: "Mills selected for longevity. Every fibre chosen to age, never wear out.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M24 4l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Ethical Production",
    copy: "Traceable supply chains and fair workshops. Conscience woven into the process.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="24" cy="24" r="18" />
        <path d="M16 24l6 6 12-13" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Contemporary Design",
    copy: "Modern silhouettes drawn with restraint. Designed once, worn for years.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="8" y="8" width="32" height="32" />
        <path d="M8 24h32M24 8v32" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Exclusive Collections",
    copy: "Numbered, limited, never repeated. Owned by few, defined by intent.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M24 6l16 9v18l-16 9-16-9V15z" />
        <path d="M24 24l16-9M24 24v18M24 24L8 15" />
      </svg>
    ),
  },
];

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsSubmitted, setNewsSubmitted] = useState(false);

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const wingLRef = useRef<HTMLImageElement>(null);
  const wingRRef = useRef<HTMLImageElement>(null);
  const heroTagRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/assets/image-slot.js";
    script.async = true;
    document.body.appendChild(script);

    const timer = setTimeout(() => setLoaderDone(true), 900);
    const fallback = setTimeout(() => setLoaderDone(true), 5000);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile =
      window.matchMedia("(max-width: 820px)").matches ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    let revealObserver: IntersectionObserver | null = null;
    let statementObserver: IntersectionObserver | null = null;

    if (!reduceMotion && "IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
      );

      document.querySelectorAll(".reveal").forEach((el) => revealObserver?.observe(el));

      const statement = document.getElementById("statement");
      if (statement) {
        statementObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in");
                statementObserver?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.4 }
        );
        statementObserver.observe(statement);
      }
    } else {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      document.getElementById("statement")?.classList.add("in");
    }

    const pxEls =
      reduceMotion || isMobile
        ? []
        : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map((el) => ({
            el,
            speed: parseFloat(el.dataset.parallax || "0"),
          }));

    let currentScroll = 0;
    let targetScroll = 0;
    let rafId: number | null = null;

    const updateWings = () => {
      if (reduceMotion) {
        if (wingLRef.current) wingLRef.current.style.transform = "rotate(0deg) translate3d(0, 0, 0)";
        if (wingRRef.current) wingRRef.current.style.transform = "rotate(0deg) translate3d(0, 0, 0)";
        return;
      }

      // Smooth interpolation (lerp)
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // Calculate flap angle and translation based on the smoothed scroll position
      const phase = currentScroll * 0.006; // control speed of flap relative to scroll
      const angle = Math.sin(phase) * 16;  // flap angle range
      const driftX = Math.sin(phase) * 6;  // side to side movement
      const driftY = Math.cos(phase * 0.8) * 8; // vertical bounce

      if (wingLRef.current) {
        wingLRef.current.style.transform =
          `rotate(${angle.toFixed(2)}deg) translate3d(${-driftX.toFixed(2)}px, ${driftY.toFixed(2)}px, 0)`;
      }
      if (wingRRef.current) {
        wingRRef.current.style.transform =
          `rotate(${-angle.toFixed(2)}deg) translate3d(${driftX.toFixed(2)}px, ${driftY.toFixed(2)}px, 0)`;
      }

      if (Math.abs(targetScroll - currentScroll) > 0.05) {
        rafId = requestAnimationFrame(updateWings);
      } else {
        rafId = null;
      }
    };

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const vh = window.innerHeight;
      const vc = vh / 2;

      pxEls.forEach((item) => {
        const rect = item.el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const center = rect.top + rect.height / 2;
        const dist = center - vc;
        item.el.style.transform = `translate3d(0, ${(dist * item.speed * 0.6).toFixed(2)}px, 0)`;
      });

      if (heroRef.current && heroTagRef.current) {
        const track = heroRef.current.offsetHeight - vh;
        const progress = track > 0 ? Math.max(0, Math.min(1, scrollY / track)) : 0;
        heroTagRef.current.style.opacity = (
          1 - Math.max(0, Math.min(1, progress / 0.4))
        ).toFixed(2);
      }

      targetScroll = scrollY;
      if (!rafId && !reduceMotion) {
        rafId = requestAnimationFrame(updateWings);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    heroVideoRef.current?.play().catch(() => {});

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      revealObserver?.disconnect();
      statementObserver?.disconnect();
      script.remove();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const handleNewsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsSubmitted(true);
    event.currentTarget.reset();
    window.setTimeout(() => setNewsSubmitted(false), 3500);
  };

  return (
    <>
      <div className={`loader${loaderDone ? " is-done" : ""}`} id="loader" aria-hidden="true">
        <div className="loader__inner">
          <img className="loader__wings" src="/assets/29008569-0b5f-48a4-a3f7-d83c8c21af85.png" alt="" />
          <span className="loader__word">MORAL</span>
          <span className="loader__bar">
            <i />
          </span>
        </div>
      </div>

      <div className="stage" aria-hidden="true">
        <div className="stage__black" />
        <div className="stage__white" />
        <div className="stage__seam" />
      </div>

      <div className="crest" aria-hidden="true">
        <div className="crest__wrap">
          <img ref={wingLRef} className="crest__half crest__half--l" src="/moral-wing.png" alt="" />
          <img ref={wingRRef} className="crest__half crest__half--r" src="/moral-wing.png" alt="" />
        </div>
      </div>

      <header className="nav" id="nav">
        <a className="nav__brand" href="#top" aria-label="MORAL">
          <img className="nav__logo" src="/assets/81783374-d384-4d9a-9e94-6c2b3eeef1aa.png" alt="MORAL" />
        </a>
        <nav className="nav__links">
          <a href="#collection">Shop</a>
          <a href="#philosophy">About</a>
          <a href="#campaign">Campaign</a>
          <a href="#community">Journal</a>
        </nav>
        <div className="nav__right">
          <a className="nav__cart" href="#">
            Cart (0)
          </a>
          <button className="burger" id="burger" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="drawer" id="drawer">
        {["collection", "philosophy", "campaign", "community", "news"].map((id, index) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
            {["Shop", "About", "Campaign", "Journal", "Newsletter"][index]}
          </a>
        ))}
        <div className="drawer__foot">
          <span>Est. MMXXV</span>
          <span>Instagram</span>
        </div>
      </div>

      <main id="top">
        <section ref={heroRef} className="hero" id="hero" data-screen-label="Hero">
          <div className="hero__sticky">
            <video
              ref={heroVideoRef}
              className="hero__video"
              id="heroVideo"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/assets/986cede8-697d-415b-95e4-c54ffff14fa5.png"
            >
              <source src="/assets/c54951d7-bc3c-4898-b859-5d97527fd8bf.mp4" type="video/mp4" />
            </video>
            <div className="hero__veil" />
            <div ref={heroTagRef} className="hero__tag" id="heroTag">
              <span className="label">More Than Clothing</span>
            </div>
            <div className="hero__scroll">
              <span className="line" />
              <span className="label" style={{ letterSpacing: "0.3em", fontSize: "0.6rem" }}>
                Scroll
              </span>
            </div>
          </div>
        </section>

        <section className="split" id="philosophy" data-screen-label="Philosophy">
          <div className="split__grid">
            <div className="split__left">
              <div className="glyphfield" id="glyphfield">
                <span className="glyph" style={{ top: "8%", left: "10%", fontSize: "5rem", opacity: 0.06 }} data-parallax="0.25">M</span>
                <span className="glyph" style={{ top: "62%", left: "6%", fontSize: "8rem", opacity: 0.05 }} data-parallax="-0.3">L</span>
                <span className="glyph" style={{ top: "24%", right: "8%", fontSize: "4rem", opacity: 0.07 }} data-parallax="0.4">R</span>
                <span className="glyph" style={{ bottom: "10%", right: "14%", fontSize: "6rem", opacity: 0.05 }} data-parallax="-0.2">O</span>
              </div>
              <span className="split__mark" data-parallax="0.08">
                M
              </span>
            </div>
            <div className="split__right">
              <div className="split__block reveal">
                <span className="label">The Story</span>
                <h3>
                  Founded on a single conviction —
                  <span className="italic"> that what we wear should mean something.</span>
                </h3>
                <p>
                  A quiet rebellion against the disposable. Garments built to be kept, considered,
                  and worn with intention.
                </p>
              </div>
              <div className="split__block reveal" data-d="1">
                <span className="label">The Philosophy</span>
                <h3>Restraint as luxury.</h3>
                <p>Designed for permanence, not the season. Less, considered more deeply.</p>
              </div>
              <div className="split__block reveal" data-d="2">
                <span className="label">Core Values</span>
                <div className="values">
                  {["Integrity", "Craft", "Permanence", "Conscience"].map((value) => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="collection" id="collection" data-screen-label="Collection">
          <div className="collection__head reveal">
            <div>
              <span className="label">New Arrivals · SS26</span>
              <h2>
                The
                <br />
                <span className="italic serif">Featured</span> Collection
              </h2>
            </div>
            <span className="label rail__hint">Drag → to explore</span>
          </div>
          <div className="rail" id="rail">
            {products.map((product) => (
              <article key={product.id} className="card">
                <div className="card__media">
                  {product.tag ? <span className="card__tag">{product.tag}</span> : null}
                  <image-slot id={product.id} className="filled-stock" src={product.src} placeholder={product.title}></image-slot>
                </div>
                <div className="card__meta">
                  <div>
                    <h4>{product.title}</h4>
                    <span className="sub">{product.sub}</span>
                  </div>
                  <span className="price">{product.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="statement" id="statement" data-screen-label="Statement">
          <div className="statement__inner">
            <h2>
              <span className="reveal-line"><span>More than</span></span>
              <span className="reveal-line"><span className="em">clothing.</span></span>
              <span className="reveal-line"><span className="muted">Wear your</span></span>
              <span className="reveal-line"><span>values.</span></span>
            </h2>
          </div>
        </section>

        <section className="cats" id="categories" data-screen-label="Categories">
          <div className="cats__head reveal">
            <h2>
              Shop by <span className="italic">Category</span>
            </h2>
            <span className="label" style={{ color: "var(--grey)" }}>
              Four worlds, one standard
            </span>
          </div>
          <div className="cats__grid">
            {categories.map((category, index) => (
              <a key={category.id} className="cat reveal" data-d={index ? String(index) : undefined} href="#">
                <div className="reframe-wrap" data-parallax="0.06">
                  <image-slot id={category.id} className="filled-stock" src={category.src} placeholder={category.title}></image-slot>
                </div>
                <div className="cat__overlay">
                  <h3>{category.title}</h3>
                  <span className="label">{category.label}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="why" id="why" data-screen-label="Why MORAL">
          <div className="why__head reveal">
            <span className="label">Why MORAL</span>
            <h2>A standard you can feel in every seam.</h2>
          </div>
          <div className="why__grid">
            {features.map((feature, index) => (
              <div key={feature.num} className="feature reveal" data-d={index ? String(index) : undefined}>
                <span className="feature__num">{feature.num}</span>
                <div className="feature__icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="campaign" id="campaign" data-screen-label="Campaign">
          <div className="campaign__media" data-parallax="-0.22">
            <image-slot
              id="campaign-bg"
              className="filled-stock"
              src="https://images.pexels.com/photos/29923243/pexels-photo-29923243.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1000"
              placeholder="Drop full-bleed campaign photography"
            ></image-slot>
          </div>
          <div className="campaign__veil" />
          <div className="campaign__content reveal">
            <span className="label">The SS26 Campaign</span>
            <h2>
              Dressed in
              <br />
              <span className="italic">conviction.</span>
            </h2>
            <a className="cta" href="#">
              View the Campaign <span>→</span>
            </a>
          </div>
        </section>

        <section className="community" id="community" data-screen-label="Community">
          <div className="community__head reveal">
            <span className="label">@MORAL</span>
            <h2>The MORAL Community</h2>
            <a href="#">Follow on Instagram</a>
          </div>
          <div className="gram">
            {community.map((src, index) => (
              <div key={src} className="gram__cell">
                <image-slot id={`ig-${index + 1}`} className="filled-stock" src={src} placeholder="@"></image-slot>
              </div>
            ))}
          </div>
        </section>

        <section className="news" id="news" data-screen-label="Newsletter">
          <div className="news__inner reveal">
            <span className="label">The Inner Circle</span>
            <h2>
              Join the MORAL
              <br />
              Community
            </h2>
            <p>
              Early access to numbered drops, private previews, and the stories behind every
              collection. No noise — only what matters.
            </p>
            <form className="news__form" id="newsForm" onSubmit={handleNewsSubmit}>
              <input type="email" placeholder="Your email address" required aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
            <div className="news__perks">
              <span>Exclusive Drops</span>
              <span>Early Access</span>
              <span>Member Pricing</span>
            </div>
            <div className={`news__msg${newsSubmitted ? " show" : ""}`} id="newsMsg">
              Welcome to MORAL.
            </div>
          </div>
        </section>

        <footer className="footer" data-screen-label="Footer">
          <div className="footer__top">
            <div className="footer__brand">
              <img className="footer__logo" src="/assets/81783374-d384-4d9a-9e94-6c2b3eeef1aa.png" alt="MORAL" />
              <p>Built on conviction. Designed for permanence. Worn with intention.</p>
            </div>
            <div className="footer__col">
              <h5>Shop</h5>
              <ul>
                <li><a href="#">New Arrivals</a></li>
                <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Limited Edition</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Company</h5>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Sustainability</a></li>
                <li><a href="#">Journal</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Connect</h5>
              <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">TikTok</a></li>
                <li><a href="#">Pinterest</a></li>
                <li><a href="#">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© MMXXVI MORAL. All rights reserved.</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Shipping</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
