export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/assets/81783374-d384-4d9a-9e94-6c2b3eeef1aa.png"
            alt="MORAL"
          />
          <p>
            Built on conviction. Designed for permanence. Worn with intention.
          </p>
        </div>
        <div className="footer__col">
          <h5>Shop</h5>
          <ul>
            <li>
              <a href="/shop">New Arrivals</a>
            </li>
            <li>
              <a href="/shop">Men</a>
            </li>
            <li>
              <a href="/shop">Women</a>
            </li>
            <li>
              <a href="/shop">Limited Edition</a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Company</h5>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="#">Campaign</a>
            </li>
            <li>
              <a href="#">Journal</a>
            </li>
            <li>
              <a href="/newsletter">Newsletter</a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Connect</h5>
          <ul>
            <li>
              <a href="https://www.instagram.com/moral_nyc?igsh=bGdnbDM4MmdtNDVv">
                Instagram
              </a>
            </li>
            <li>
              <a href="#">TikTok</a>
            </li>
            <li>
              <a href="#">Pinterest</a>
            </li>
            <li>
              <a href="/newsletter">Newsletter</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 MōRAL. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Shipping</a>
        </div>
      </div>
    </footer>
  );
}
