"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/components/CartProvider";

type ProductVariant = {
  id: string;
  title?: string;
  availableForSale?: boolean;
  selectedOptions?: Array<{
    name: string;
    value: string;
  }>;
};

type Product = {
  id: string;
  variantId?: string;
  variants?: ProductVariant[];
  tag?: string;
  title: string;
  sub: string;
  price: string;
  src: string;
};

type CollectionCard = {
  id: string;
  title: string;
  label: string;
  src: string;
  href?: string;
};

const fallbackCategories: CollectionCard[] = [
  {
    id: "men",
    title: "Men",
    label: "Shop the edit",
    src: "https://images.pexels.com/photos/8505246/pexels-photo-8505246.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
  {
    id: "women",
    title: "Women",
    label: "Shop the edit",
    src: "https://images.pexels.com/photos/26274786/pexels-photo-26274786.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
  {
    id: "essentials",
    title: "Essentials",
    label: "The foundation",
    src: "https://images.pexels.com/photos/17590615/pexels-photo-17590615.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
  {
    id: "limited-edition",
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

interface HomeClientProps {
  products: Product[];
  allProducts: Product[];
  heroVideoUrl?: string | null;
  collections?: CollectionCard[];
}

export default function HomeClient({ products, allProducts, heroVideoUrl, collections = [] }: HomeClientProps) {
  const [newsSubmitted, setNewsSubmitted] = useState(false);
  const [openSizeProductId, setOpenSizeProductId] = useState<string | null>(null);
  const { addItemToCart } = useCart();
  const productImages = Array.from(
    new Map(
      products
        .concat(allProducts)
        .filter((product) => product.src)
        .map((product) => [product.src, product])
    ).values()
  );
  const staticCommunityImages: Product[] = community.map((src, index) => ({
    id: `community-${index}`,
    title: "MORAL community",
    sub: "@MORAL",
    price: "",
    src,
  }));
  const communityImages = productImages.slice(0, 6);
  const categoryCards = collections.filter((collection) => collection.src).slice(0, 4);
  const visibleCategories = categoryCards.length > 0 ? categoryCards : fallbackCategories;

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const wingLRef = useRef<HTMLImageElement>(null);
  const wingRRef = useRef<HTMLImageElement>(null);
  const heroTagRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rails = Array.from(document.querySelectorAll<HTMLElement>("[data-drag-scroll]"));
    if (!rails.length) return;

    const cleanups = rails.map((rail) => {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      let hasMoved = false;

      const handlePointerDown = (e: PointerEvent) => {
        isDown = true;
        rail.classList.add("dragging");
        startX = e.pageX - rail.offsetLeft;
        scrollLeft = rail.scrollLeft;
        hasMoved = false;
      };

      const handlePointerLeave = () => {
        isDown = false;
        rail.classList.remove("dragging");
      };

      const handlePointerUp = (e: PointerEvent) => {
        isDown = false;
        rail.classList.remove("dragging");
        try {
          if (rail.hasPointerCapture?.(e.pointerId)) {
            rail.releasePointerCapture?.(e.pointerId);
          }
        } catch (err) {}
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!isDown) return;
        const x = e.pageX - rail.offsetLeft;
        const walk = (x - startX) * 1.5;
        if (Math.abs(walk) > 4) {
          if (!hasMoved) {
            hasMoved = true;
            try {
              rail.setPointerCapture?.(e.pointerId);
            } catch (err) {}
          }
          e.preventDefault();
          rail.scrollLeft = scrollLeft - walk;
        }
      };

      const handlePreventClick = (e: MouseEvent) => {
        if (hasMoved) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      rail.addEventListener("pointerdown", handlePointerDown);
      rail.addEventListener("pointerleave", handlePointerLeave);
      rail.addEventListener("pointerup", handlePointerUp);
      rail.addEventListener("pointercancel", handlePointerUp);
      rail.addEventListener("pointermove", handlePointerMove);
      rail.addEventListener("click", handlePreventClick, true);

      return () => {
        rail.removeEventListener("pointerdown", handlePointerDown);
        rail.removeEventListener("pointerleave", handlePointerLeave);
        rail.removeEventListener("pointerup", handlePointerUp);
        rail.removeEventListener("pointercancel", handlePointerUp);
        rail.removeEventListener("pointermove", handlePointerMove);
        rail.removeEventListener("click", handlePreventClick, true);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/assets/image-slot.js";
    script.async = true;
    document.body.appendChild(script);

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

      // Check if phone view to reduce gap separation and rotation range
      const isPhone = window.innerWidth < 600;

      // Calculate flap angle and translation based on the smoothed scroll position
      const phase = currentScroll * 0.006; // control speed of flap relative to scroll
      const angle = Math.sin(phase) * (isPhone ? 5 : 11);  // flap angle range
      const driftX = Math.sin(phase) * (isPhone ? 0.2 : 1.2);   // side to side movement (reduced gap)
      const driftY = Math.cos(phase * 0.8) * (isPhone ? 1.5 : 5); // vertical bounce

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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      revealObserver?.disconnect();
      statementObserver?.disconnect();
      script.remove();
    };
  }, []);



  const getVariantSize = (variant: ProductVariant) => {
    const sizeOption = variant.selectedOptions?.find(
      (option) => option.name.toLowerCase() === "size"
    );

    return sizeOption?.value || variant.title || "Default";
  };

  const getProductSizeOptions = (product: Product) => {
    const variants = product.variants?.length
      ? product.variants
      : product.variantId
        ? [{ id: product.variantId, title: "Default", availableForSale: true }]
        : [];

    return variants.map((variant) => ({
      label: getVariantSize(variant),
      variantId: variant.id,
      availableForSale: variant.availableForSale !== false,
    }));
  };

  const handleCardAdd = (product: Product) => {
    const sizeOptions = getProductSizeOptions(product);

    if (sizeOptions.length <= 1) {
      const onlyOption = sizeOptions[0];
      if (onlyOption?.variantId && onlyOption.availableForSale) {
        addItemToCart(onlyOption.variantId);
      }
      return;
    }

    setOpenSizeProductId((currentId) => (currentId === product.id ? null : product.id));
  };

  const handleCardSizeAdd = (variantId: string) => {
    addItemToCart(variantId);
    setOpenSizeProductId(null);
  };
  const handleNewsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsSubmitted(true);
    event.currentTarget.reset();
    window.setTimeout(() => setNewsSubmitted(false), 3500);
  };

  return (
    <>
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
              <source src={heroVideoUrl || "Moral 1x.mp4"} type="video/mp4" />
            </video>
            <div className="hero__veil" />
            <div ref={heroTagRef} className="hero__scroll-indicator" id="heroTag">
              <span className="label">More Than Clothing</span>
              <span className="line" />
              <span className="label scroll-label">Scroll</span>
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
          <div className="rail" id="rail" ref={railRef} data-drag-scroll>
            <div className="rail__spacer" />
            {products.map((product) => (
              <article key={product.id} className="card">
                <Link href={`/product/${product.id}`} className="card__link">
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
                </Link>
                <button
                  className="card__atc"
                  aria-label={`Choose size for ${product.title}`}
                  onClick={() => handleCardAdd(product)}
                >
                  Add to Cart
                </button>
                {openSizeProductId === product.id ? (
                  <div className="card__sizes" role="radiogroup" aria-label={`Choose size for ${product.title}`}>
                    {getProductSizeOptions(product).map((size) => (
                      <button
                        key={`${product.id}-${size.label}-${size.variantId}`}
                        type="button"
                        disabled={!size.availableForSale}
                        onClick={() => handleCardSizeAdd(size.variantId)}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                ) : null}
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
            {visibleCategories.map((category, index) => (
              <Link key={category.id} className="cat reveal" data-d={index ? String(index) : undefined} href={category.href || `/shop?collection=${category.id}`}>
                <div className="reframe-wrap">
                  <image-slot id={category.id} className="filled-stock" src={category.src} placeholder={category.title}></image-slot>
                </div>
                <div className="cat__overlay">
                  <h3>{category.title}</h3>
                  <span className="label">{category.label}</span>
                </div>
              </Link>
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

        <section className="all-products" id="all-products" data-screen-label="All Products">
          <div className="collection__head reveal">
            <div>
              <span className="label">The Archive · Permanent Collection</span>
              <h2>
                All <span className="italic serif">Products</span>
              </h2>
            </div>
          </div>
          <div className="all-products__grid" data-drag-scroll>
            {allProducts.map((product) => (
              <article key={product.id} className="card">
                <Link href={`/product/${product.id}`} className="card__link">
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
                </Link>
                <button
                  className="card__atc"
                  aria-label={`Choose size for ${product.title}`}
                  onClick={() => handleCardAdd(product)}
                >
                  Add to Cart
                </button>
                {openSizeProductId === product.id ? (
                  <div className="card__sizes" role="radiogroup" aria-label={`Choose size for ${product.title}`}>
                    {getProductSizeOptions(product).map((size) => (
                      <button
                        key={`${product.id}-${size.label}-${size.variantId}`}
                        type="button"
                        disabled={!size.availableForSale}
                        onClick={() => handleCardSizeAdd(size.variantId)}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="marquee" id="marquee" data-screen-label="Marquee" aria-hidden="true">
          <div className="marquee__track">
            <div className="marquee__content">
              <span>Integrity</span>
              <span className="sep">✦</span>
              <span>Craft</span>
              <span className="sep">✦</span>
              <span>Permanence</span>
              <span className="sep">✦</span>
              <span>Conscience</span>
              <span className="sep">✦</span>
            </div>
            <div className="marquee__content" aria-hidden="true">
              <span>Integrity</span>
              <span className="sep">✦</span>
              <span>Craft</span>
              <span className="sep">✦</span>
              <span>Permanence</span>
              <span className="sep">✦</span>
              <span>Conscience</span>
              <span className="sep">✦</span>
            </div>
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
            <span className="label">The Permanent Collection</span>
            <h2>
              Discover the
              <br />
              <span className="italic">archive.</span>
            </h2>
            <Link className="cta" href="/shop">
              Explore All Products <span>→</span>
            </Link>
          </div>
        </section>

        <section className="community" id="community" data-screen-label="Community">
          <div className="community__head reveal">
            <span className="label">@MORAL</span>
            <h2>The MORAL Community</h2>
            <a href="https://www.instagram.com/moral_nyc?igsh=bGdnbDM4MmdtNDVv">Follow on Instagram</a>
          </div>
          <div className="gram">
            {communityImages.map((item, index) => (
              <Link
                key={`${item.id}-${index}`}
                href={item.id.startsWith("community-") ? "#community" : `/product/${item.id}`}
                className="gram__cell"
              >
                <image-slot id={`ig-${index + 1}`} className="filled-stock" src={item.src} placeholder={item.title}></image-slot>
              </Link>
            ))}
          </div>
        </section>


        <section className="split" id="philosophy" data-screen-label="Philosophy">
          <div className="split__grid">
            <div className="split__left">
              <div className="glyphfield" id="glyphfield">
                <span className="glyph glyph--m" data-parallax="0.25">M</span>
                <span className="glyph glyph--o" data-parallax="-0.15">O</span>
                <span className="glyph glyph--r" data-parallax="-0.3">R</span>
                <span className="glyph glyph--a">A</span>
                <span className="glyph glyph--l" data-parallax="0.35">L</span>
              </div>
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

        <SiteFooter />
      </main>
    </>
  );
}

