import { useState, useEffect, useRef } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

const COLORS = {
  cream: "#FAF7F2",
  charcoal: "#1C1C1C",
  warm: "#8B6F5E",
  accent: "#C9A96E",
  light: "#F0EBE3",
  muted: "#9E9087",
  white: "#FFFFFF",
  red: "#C0392B",
};

const TICKER_MESSAGES = [
  "✦ FREE SHIPPING ON ORDERS OVER ₹2999",
  "✦ SUMMER SALE — UP TO 40% OFF",
  "✦ NEW DROP: RESORT COLLECTION 2026",
  "✦ USE CODE LUXE15 FOR 15% OFF YOUR FIRST ORDER",
  "✦ EXCLUSIVE MEMBERS-ONLY PREVIEW — JOIN NOW",
  "✦ HANDCRAFTED IN INDIA • SHIPPED WORLDWIDE",
];

const HERO_SLIDES = [
  {
    id: 1,
    name: "Ivory Linen Co-ord Set",
    tag: "BESTSELLER",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80",
    badge: "SOLD OUT 3× THIS SEASON",
  },
  {
    id: 2,
    name: "Rust Terra Kurta Set",
    tag: "NEW ARRIVAL",
    price: "₹2,899",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80",
    badge: "LIMITED PIECES LEFT",
  },
  {
    id: 3,
    name: "Midnight Drape Saree",
    tag: "EDITOR'S PICK",
    price: "₹5,199",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80",
    badge: "FEATURED IN VOGUE INDIA",
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Sage Linen Shirt Dress",
    price: "₹2,299",
    originalPrice: "₹3,199",
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { author: "Priya M.", rating: 5, text: "Absolutely love the fabric quality. Wore it to three events!" },
      { author: "Sneha R.", rating: 4, text: "Perfect fit, slightly long but styled beautifully." },
      { author: "Anika B.", rating: 5, text: "The color is exactly as shown. Will definitely reorder." },
    ],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80",
    ],
    tag: "SALE",
  },
  {
    id: 2,
    name: "Terracotta Wrap Blouse",
    price: "₹1,799",
    originalPrice: null,
    sizes: ["S", "M", "L", "XL"],
    reviews: [
      { author: "Meera K.", rating: 5, text: "Such a gorgeous color, gets compliments every time." },
      { author: "Ritu S.", rating: 4, text: "Comfortable and chic. The wrap style is very flattering." },
    ],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4e5a?w=600&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&q=80",
    ],
    tag: "NEW",
  },
  {
    id: 3,
    name: "Ivory Pleated Palazzo Set",
    price: "₹3,899",
    originalPrice: "₹4,999",
    sizes: ["XS", "S", "M", "L"],
    reviews: [
      { author: "Divya L.", rating: 5, text: "Stunning set! Worth every rupee. The pleats are perfect." },
      { author: "Kavya N.", rating: 5, text: "Wore this to my friend's wedding and looked like a queen." },
      { author: "Pooja T.", rating: 4, text: "Good quality but the top runs slightly small." },
      { author: "Simran G.", rating: 5, text: "Absolutely ethereal. Fast shipping too!" },
    ],
    images: [
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80",
      "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600&q=80",
      "https://images.unsplash.com/photo-1499939667766-4afceb292d05?w=600&q=80",
    ],
    tag: "SALE",
  },
  {
    id: 4,
    name: "Dusty Rose Midi Skirt",
    price: "₹1,599",
    originalPrice: null,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    reviews: [
      { author: "Isha P.", rating: 4, text: "Love the color! The fabric is light and flows well." },
    ],
    images: [
      "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=600&q=80",
      "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600&q=80",
    ],
    tag: "NEW",
  },
  {
    id: 5,
    name: "Forest Green Kurta",
    price: "₹2,099",
    originalPrice: "₹2,699",
    sizes: ["S", "M", "L", "XL"],
    reviews: [
      { author: "Ananya S.", rating: 5, text: "The embroidery detail is exquisite. Very premium feel." },
      { author: "Tara V.", rating: 5, text: "Perfect for both casual and semi-formal occasions." },
      { author: "Neha M.", rating: 4, text: "Beautiful kurta, love the forest green shade." },
    ],
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
    ],
    tag: "SALE",
  },
  {
    id: 6,
    name: "Midnight Blue Kaftan",
    price: "₹3,299",
    originalPrice: null,
    sizes: ["Free Size", "S/M", "L/XL"],
    reviews: [],
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    ],
    tag: "NEW",
  },
];

const StarRating = ({ rating, size = 14 }) => (
  <span style={{ display: "inline-flex", gap: 1 }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ fontSize: size, color: i <= rating ? COLORS.accent : "#D9D0C7" }}>★</span>
    ))}
  </span>
);

const avgRating = (reviews) => reviews.length
  ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
  : null;

export default function App() {
  const [page, setPage] = useState("home");
  const [activePDP, setActivePDP] = useState(null);
  const [likedIds, setLikedIds] = useState(new Set());
  const [cartCount, setCartCount] = useState(0);
  const [heroIdx, setHeroIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const tickerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIdx(i => (i + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (id, e) => {
    e?.stopPropagation();
    setLikedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const likedProducts = PRODUCTS.filter(p => likedIds.has(p.id));

  const openPDP = (product) => {
    setActivePDP(product);
    setPage("pdp");
    window.scrollTo(0, 0);
  };

  const goHome = () => { setPage("home"); setActivePDP(null); window.scrollTo(0,0); };

  const navLinks = ["Home", "New Collection", "Liked", "Shop", "About"];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: COLORS.cream, minHeight: "100vh", color: COLORS.charcoal }}>
      <style>{`
        ${FONT}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoomIn { from { transform: scale(1); } to { transform: scale(1.04); } }
        .card-hover { transition: box-shadow 0.3s ease, transform 0.3s ease; cursor: pointer; }
        .card-hover:hover { box-shadow: 0 12px 40px rgba(28,28,28,0.12); transform: translateY(-4px); }
        .img-zoom { overflow: hidden; }
        .img-zoom img { transition: transform 0.5s ease; }
        .img-zoom:hover img { transform: scale(1.08); }
        .like-btn { background: none; border: none; cursor: pointer; transition: transform 0.2s ease; }
        .like-btn:hover { transform: scale(1.2); }
        .nav-link { cursor: pointer; transition: color 0.2s; text-decoration: none; }
        .nav-link:hover { color: ${COLORS.accent}; }
        .size-btn { border: 1px solid ${COLORS.muted}; background: none; cursor: pointer; border-radius: 4px; padding: 6px 12px; font-size: 13px; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .size-btn:hover, .size-btn.active { background: ${COLORS.charcoal}; color: white; border-color: ${COLORS.charcoal}; }
        .add-to-cart { background: ${COLORS.charcoal}; color: white; border: none; padding: 14px 36px; font-size: 14px; font-family: 'DM Sans', sans-serif; letter-spacing: 1.5px; cursor: pointer; transition: background 0.2s; width: 100%; }
        .add-to-cart:hover { background: ${COLORS.warm}; }
        @media (max-width: 768px) {
          .hero-text { padding: 24px !important; }
          .products-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* TICKER */}
      <div style={{ background: COLORS.charcoal, color: COLORS.cream, padding: "10px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div ref={tickerRef} style={{ display: "inline-flex", animation: "ticker 28s linear infinite" }}>
          {[...TICKER_MESSAGES, ...TICKER_MESSAGES].map((msg, i) => (
            <span key={i} style={{ padding: "0 40px", fontSize: 12, letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif" }}>{msg}</span>
          ))}
        </div>
      </div>

      {/* NAVBAR */}
      <nav style={{ background: COLORS.cream, borderBottom: `1px solid ${COLORS.light}`, position: "sticky", top: 0, zIndex: 100, padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <div onClick={goHome} style={{ cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, letterSpacing: "0.1em", color: COLORS.charcoal, textDecoration:"uppercase" }}>
            GLIMPEX
          </div>

          {/* Desktop Nav */}
          <div className="nav-desktop" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {navLinks.map(link => (
              <span
                key={link}
                className="nav-link"
                onClick={() => { setPage(link === "Home" ? "home" : link.toLowerCase().replace(" ", "-")); setMenuOpen(false); }}
                style={{ fontSize: 13, letterSpacing: "0.08em", color: COLORS.charcoal }}
              >
                {link.toUpperCase()}
              </span>
            ))}
            {/* Cart */}
            <div onClick={() => setPage("shop")} style={{ position: "relative", cursor: "pointer" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS.charcoal} strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: -6, right: -6, background: COLORS.accent, color: "white", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 4 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 1.5, background: COLORS.charcoal, transition: "all 0.3s" }} />)}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ borderTop: `1px solid ${COLORS.light}`, padding: "16px 0", animation: "fadeSlide 0.2s ease" }}>
            {navLinks.map(link => (
              <div key={link} onClick={() => { setPage(link === "Home" ? "home" : link.toLowerCase().replace(" ", "-")); setMenuOpen(false); }}
                style={{ padding: "12px 24px", fontSize: 14, letterSpacing: "0.06em", cursor: "pointer", color: COLORS.charcoal }}>
                {link}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* PAGES */}
      {page === "home" && <HomePage heroIdx={heroIdx} setHeroIdx={setHeroIdx} openPDP={openPDP} likedIds={likedIds} toggleLike={toggleLike} setCartCount={setCartCount} />}
      {page === "shop" && <ShopPage openPDP={openPDP} likedIds={likedIds} toggleLike={toggleLike} />}
      {page === "liked" && <LikedPage likedProducts={likedProducts} openPDP={openPDP} likedIds={likedIds} toggleLike={toggleLike} />}
      {page === "new-collection" && <NewCollectionPage openPDP={openPDP} likedIds={likedIds} toggleLike={toggleLike} />}
      {page === "about" && <AboutPage />}
      {page === "pdp" && activePDP && <PDPPage product={activePDP} likedIds={likedIds} toggleLike={toggleLike} setCartCount={setCartCount} goBack={goHome} />}

      {/* FOOTER */}
      <footer style={{ background: COLORS.charcoal, color: COLORS.cream, padding: "40px 24px", marginTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, marginBottom: 12, letterSpacing: "0.1em" }}> GLIMPEX</div>
            <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.8 }}>Crafting slow fashion with intention. Based in Jaipur, shipped worldwide.</p>
          </div>
          {[["Shop", ["New Arrivals", "Sale", "Collections", "Lookbook"]], ["Help", ["Sizing Guide", "Returns", "Track Order", "Contact"]]].map(([title, links]) => (
            <div key={title}>
              <div style={{ fontSize: 12, letterSpacing: "0.12em", marginBottom: 16, color: COLORS.muted }}>{title.toUpperCase()}</div>
              {links.map(l => <div key={l} style={{ fontSize: 13, marginBottom: 8, color: COLORS.cream, cursor: "pointer", opacity: 0.7 }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: "32px auto 0", borderTop: `1px solid rgba(255,255,255,0.1)`, paddingTop: 24, fontSize: 12, color: COLORS.muted, textAlign: "center" }}>
          © 2026  GLIMPEX. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function HomePage({ heroIdx, setHeroIdx, openPDP, likedIds, toggleLike, setCartCount }) {
  return (
    <div>
      {/* HERO SLIDER */}
      <div style={{ position: "relative", height: "min(85vh, 600px)", overflow: "hidden", background: COLORS.charcoal }}>
        {HERO_SLIDES.map((slide, i) => (
          <div key={slide.id} style={{
            position: "absolute", inset: 0,
            opacity: i === heroIdx ? 1 : 0,
            transition: "opacity 0.8s ease",
            pointerEvents: i === heroIdx ? "auto" : "none"
          }}>
            <img src={slide.image} alt={slide.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
            <div className="hero-text" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "60px 64px", background: "linear-gradient(to top, rgba(28,28,28,0.9) 0%, transparent 100%)" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: COLORS.accent, marginBottom: 10 }}>{slide.tag}</div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 5vw, 54px)", fontWeight: 300, color: "white", marginBottom: 8, lineHeight: 1.1 }}>{slide.name}</h1>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>{slide.badge} &nbsp;·&nbsp; {slide.price}</div>
              <button onClick={() => openPDP(PRODUCTS[i])} style={{ background: "transparent", border: "1px solid white", color: "white", padding: "12px 32px", fontSize: 12, letterSpacing: "0.15em", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.background = "white"; e.target.style.color = COLORS.charcoal; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "white"; }}>
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
        {/* Dots */}
        <div style={{ position: "absolute", bottom: 24, right: 64, display: "flex", gap: 8 }}>
          {HERO_SLIDES.map((_, i) => (
            <div key={i} onClick={() => setHeroIdx(i)} style={{ width: i === heroIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === heroIdx ? COLORS.accent : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      </div>

      {/* BEST SELLERS MARQUEE */}
      <div style={{ padding: "48px 0", borderBottom: `1px solid ${COLORS.light}` }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted, marginBottom: 8 }}>WHAT EVERYONE'S BUYING</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 400 }}>Best Sold Collections</h2>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", animation: "ticker 30s linear infinite", gap: 16, width: "max-content" }}>
            {[...PRODUCTS, ...PRODUCTS].map((p, i) => (
              <div key={i} onClick={() => openPDP(p)} style={{ width: 220, flexShrink: 0, cursor: "pointer" }}>
                <div className="img-zoom" style={{ height: 280, borderRadius: 4, overflow: "hidden", background: COLORS.light }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "10px 4px" }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MORE COLLECTIONS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted, marginBottom: 8 }}>CURATED FOR YOU</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 400, marginBottom: 8 }}>More Collections</h2>
          <p style={{ fontSize: 14, color: COLORS.muted, maxWidth: 400, margin: "0 auto" }}>Thoughtfully crafted pieces for every occasion</p>
        </div>
        <ProductGrid products={PRODUCTS} openPDP={openPDP} likedIds={likedIds} toggleLike={toggleLike} />
      </div>
    </div>
  );
}

function ProductGrid({ products, openPDP, likedIds, toggleLike }) {
  const [hovered, setHovered] = useState(null);
  const [zoomProduct, setZoomProduct] = useState(null);

  return (
    <>
      {zoomProduct && (
        <div onClick={() => setZoomProduct(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <img src={zoomProduct.images[0]} alt={zoomProduct.name} style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 4 }} onClick={e => e.stopPropagation()} />
          <div style={{ position: "absolute", top: 24, right: 24, color: "white", fontSize: 28, cursor: "pointer" }} onClick={() => setZoomProduct(null)}>×</div>
        </div>
      )}
      <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} openPDP={openPDP} likedIds={likedIds} toggleLike={toggleLike} setZoomProduct={setZoomProduct} />
        ))}
      </div>
    </>
  );
}

function ProductCard({ product, openPDP, likedIds, toggleLike, setZoomProduct }) {
  const [hovered, setHovered] = useState(false);
  const avg = avgRating(product.reviews);

  return (
    <div className="card-hover" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: COLORS.white, borderRadius: 4, overflow: "visible", position: "relative" }}
      onClick={() => openPDP(product)}>

      {/* Tag */}
      {product.tag && (
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: product.tag === "SALE" ? COLORS.red : COLORS.charcoal, color: "white", fontSize: 10, padding: "4px 10px", letterSpacing: "0.1em" }}>
          {product.tag}
        </div>
      )}

      {/* Like */}
      <button className="like-btn" onClick={(e) => toggleLike(product.id, e)} style={{ position: "absolute", top: 12, right: 12, zIndex: 2, fontSize: 20, color: likedIds.has(product.id) ? COLORS.red : "rgba(28,28,28,0.4)" }}>
        {likedIds.has(product.id) ? "♥" : "♡"}
      </button>

      {/* Image + hover zoom icon */}
      <div className="img-zoom" style={{ height: 300, background: COLORS.light, position: "relative", overflow: "hidden" }}>
        <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {hovered && (
          <div onClick={e => { e.stopPropagation(); setZoomProduct(product); }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)", cursor: "zoom-in", animation: "fadeSlide 0.2s ease" }}>
            <div style={{ background: "white", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔍</div>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "16px 12px 12px" }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, lineHeight: 1.3 }}>{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: COLORS.charcoal }}>{product.price}</span>
          {product.originalPrice && <span style={{ fontSize: 13, textDecoration: "line-through", color: COLORS.muted }}>{product.originalPrice}</span>}
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
          {product.sizes.slice(0, 4).map(s => (
            <span key={s} style={{ fontSize: 10, border: `1px solid ${COLORS.light}`, padding: "2px 6px", color: COLORS.muted, borderRadius: 2 }}>{s}</span>
          ))}
          {product.sizes.length > 4 && <span style={{ fontSize: 10, color: COLORS.muted }}>+{product.sizes.length - 4}</span>}
        </div>
        {avg && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <StarRating rating={Math.round(parseFloat(avg))} size={12} />
            <span style={{ fontSize: 12, color: COLORS.muted }}>{avg} ({product.reviews.length})</span>
          </div>
        )}
        {product.reviews.length === 0 && <span style={{ fontSize: 11, color: COLORS.muted }}>No reviews yet</span>}
      </div>
    </div>
  );
}

function PDPPage({ product, likedIds, toggleLike, setCartCount, goBack }) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const avg = avgRating(product.reviews);

  const handleAdd = () => {
    if (!selectedSize) return alert("Please select a size");
    setCartCount(c => c + qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", animation: "fadeSlide 0.3s ease" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 13, color: COLORS.muted }}>
        <span onClick={goBack} style={{ cursor: "pointer", color: COLORS.charcoal }}>Home</span>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
        {/* Images */}
        <div>
          <div className="img-zoom" style={{ height: 500, borderRadius: 4, overflow: "hidden", background: COLORS.light, marginBottom: 12 }}>
            <img src={product.images[activeImg]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {product.images.map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 90, borderRadius: 2, overflow: "hidden", cursor: "pointer", border: `2px solid ${i === activeImg ? COLORS.charcoal : "transparent"}`, flexShrink: 0 }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          {product.tag && (
            <div style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.15em", background: product.tag === "SALE" ? COLORS.red : COLORS.charcoal, color: "white", padding: "4px 10px", marginBottom: 16 }}>{product.tag}</div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 400, lineHeight: 1.2, marginBottom: 12, flex: 1 }}>{product.name}</h1>
            <button className="like-btn" onClick={(e) => toggleLike(product.id, e)} style={{ fontSize: 26, color: likedIds.has(product.id) ? COLORS.red : COLORS.muted, marginLeft: 16, marginTop: 4 }}>
              {likedIds.has(product.id) ? "♥" : "♡"}
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 500 }}>{product.price}</span>
            {product.originalPrice && <span style={{ fontSize: 16, textDecoration: "line-through", color: COLORS.muted }}>{product.originalPrice}</span>}
            {product.originalPrice && <span style={{ fontSize: 13, color: COLORS.red, background: "#FEF0EF", padding: "2px 8px", borderRadius: 2 }}>SALE</span>}
          </div>

          {avg && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <StarRating rating={Math.round(parseFloat(avg))} size={16} />
              <span style={{ fontSize: 14, color: COLORS.muted }}>{avg} · {product.reviews.length} reviews</span>
            </div>
          )}

          <div style={{ borderTop: `1px solid ${COLORS.light}`, paddingTop: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", color: COLORS.muted, marginBottom: 12 }}>SELECT SIZE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {product.sizes.map(s => (
                <button key={s} className={`size-btn${selectedSize === s ? " active" : ""}`} onClick={() => setSelectedSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", color: COLORS.muted, marginBottom: 12 }}>QUANTITY</div>
            <div style={{ display: "flex", alignItems: "center", gap: 0, border: `1px solid ${COLORS.light}`,}}>
              <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ width: 40, height: 40, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: COLORS.charcoal }}>−</button>
              <span style={{ width: 40, textAlign: "center", fontSize: 15 }}>{qty}</span>
              <button onClick={() => setQty(q => q+1)} style={{ width: 40, height: 40, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: COLORS.charcoal }}>+</button>
            </div>
          </div>

          <button className="add-to-cart" onClick={handleAdd} style={{ letterSpacing: "0.12em", marginBottom: 12, background: added ? COLORS.warm : COLORS.charcoal }}>
            {added ? "✓ ADDED TO CART" : "ADD TO CART"}
          </button>

          <div style={{ fontSize: 12, color: COLORS.muted, textAlign: "center", marginBottom: 32 }}>
            Free shipping on orders above ₹2999 · Easy 14-day returns
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div style={{ marginTop: 64, borderTop: `1px solid ${COLORS.light}`, paddingTop: 48 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 400, marginBottom: 8 }}>Customer Reviews</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <StarRating rating={Math.round(parseFloat(avg))} size={20} />
            <span style={{ fontSize: 16, fontWeight: 500 }}>{avg} out of 5</span>
            <span style={{ fontSize: 14, color: COLORS.muted }}>({product.reviews.length} reviews)</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {product.reviews.map((r, i) => (
              <div key={i} style={{ background: COLORS.white, border: `1px solid ${COLORS.light}`, borderRadius: 4, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{r.author}</span>
                  <StarRating rating={r.rating} size={13} />
                </div>
                <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ShopPage({ openPDP, likedIds, toggleLike }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted, marginBottom: 8 }}>BROWSE ALL</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400 }}>The Full Collection</h1>
      </div>
      <ProductGrid products={PRODUCTS} openPDP={openPDP} likedIds={likedIds} toggleLike={toggleLike} />
    </div>
  );
}

function LikedPage({ likedProducts, openPDP, likedIds, toggleLike }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted, marginBottom: 8 }}>YOUR WISHLIST</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400 }}>Liked Items</h1>
      </div>
      {likedProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: COLORS.muted }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>♡</div>
          <p style={{ fontSize: 16 }}>No liked items yet</p>
          <p style={{ fontSize: 13, marginTop: 8 }}>Click the heart on any product to save it here</p>
        </div>
      ) : (
        <ProductGrid products={likedProducts} openPDP={openPDP} likedIds={likedIds} toggleLike={toggleLike} />
      )}
    </div>
  );
}

function NewCollectionPage({ openPDP, likedIds, toggleLike }) {
  const newProducts = PRODUCTS.filter(p => p.tag === "NEW");
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted, marginBottom: 8 }}>JUST ARRIVED</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400 }}>New Collection</h1>
        <p style={{ fontSize: 14, color: COLORS.muted, marginTop: 12, maxWidth: 400, margin: "12px auto 0" }}>Fresh drops, crafted with intention. Limited quantities available.</p>
      </div>
      <ProductGrid products={newProducts} openPDP={openPDP} likedIds={likedIds} toggleLike={toggleLike} />
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted, marginBottom: 8 }}>OUR STORY</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, fontStyle: "italic" }}>Wear what you believe in</h1>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 48, marginBottom: 64 }}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" alt="About" style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 4 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, marginBottom: 16 }}>Rooted in Jaipur, Worn Worldwide</h2>
          <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.9, marginBottom: 16 }}> GLIMPEX was born from a love for slow fashion — pieces that are made to be worn, remembered, and passed on. Every garment is crafted by skilled artisans in Jaipur using natural fabrics and traditional techniques.</p>
          <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.9 }}>We believe in quality over quantity. Our collections are intentionally small — each season brings only what feels right, made to last beyond trends.</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, textAlign: "center" }}>
        {[["2019", "Founded"], ["4800+", "Happy Customers"], ["100%", "Natural Fabrics"], ["Jaipur", "Handcrafted"]].map(([num, label]) => (
          <div key={label} style={{ padding: 24, borderTop: `2px solid ${COLORS.accent}` }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, marginBottom: 4 }}>{num}</div>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", color: COLORS.muted }}>{label.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}