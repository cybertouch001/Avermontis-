"use client";

import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Leaf, Menu, Search, ShieldCheck, ShoppingBag, Sparkles, Truck, UserRound, X } from "lucide-react";
import { products, type Product } from "@/data/products";

const money = (amount: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function Storefront() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const categories = ["All", "Cleanse", "Treat", "Moisturise", "Protect"];
  const visibleProducts = useMemo(() => products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    (p.name + " " + p.description).toLowerCase().includes(search.toLowerCase())
  ), [activeCategory, search]);
  const count = Object.values(cart).reduce((sum, n) => sum + n, 0);
  const total = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
  const add = (p: Product) => {
    setCart(current => ({ ...current, [p.id]: (current[p.id] || 0) + 1 }));
    setNotice(`${p.name} added to your bag`);
    window.setTimeout(() => setNotice(""), 2400);
  };

  return (
    <main>
      <header className="site-header">
        <button className="mobile-menu icon-button" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        <a className="brand" href="#" aria-label="Avermontis home">
          <Leaf className="brand-leaf" size={20} strokeWidth={1.5} />
          <span>AVERMONTIS</span><small>PURE SKIN. LASTING CARE.</small>
        </a>
        <nav className={mobileMenu ? "main-nav nav-open" : "main-nav"}>
          <a className="active" href="#">Home</a><a href="#shop" onClick={() => setMobileMenu(false)}>Shop</a><a href="#story" onClick={() => setMobileMenu(false)}>Our Philosophy</a><a href="#ritual" onClick={() => setMobileMenu(false)}>The Ritual</a><a href="#footer" onClick={() => setMobileMenu(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search products" onClick={() => { setSearchOpen(!searchOpen); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}><Search size={20}/></button>
          <a className="icon-button account-link" href="#footer" aria-label="Account information"><UserRound size={20}/></a>
          <button className="icon-button bag-button" aria-label={`Shopping bag, ${count} items`} onClick={() => setCartOpen(true)}><ShoppingBag size={20}/><span className="bag-count">{count}</span></button>
        </div>
      </header>

      {searchOpen && <div className="search-bar"><Search size={18}/><input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search your skincare ritual..." aria-label="Search products"/><button onClick={() => { setSearch(""); setSearchOpen(false); }} aria-label="Close search"><X size={18}/></button></div>}

      <section className="hero">
        <div className="hero-shade"/>
        <div className="hero-copy">
          <p className="eyebrow"><span/> BOTANICAL CARE, THOUGHTFULLY FORMULATED</p>
          <h1>Good skin.<br/><em>Grounded in nature.</em></h1>
          <p className="hero-description">Science-backed skincare, rooted in nature. A considered daily ritual for skin that feels as good as it looks.</p>
          <a className="primary-button" href="#shop">Discover your ritual <ArrowRight size={17}/></a>
          <div className="hero-footnote"><Leaf size={16}/> Thoughtful ingredients. Everyday essentials.</div>
        </div>
        <div className="hero-stamp"><span>LESS, BUT BETTER</span><Leaf size={30} strokeWidth={1}/><small>YOUR DAILY RITUAL</small></div>
        <div className="hero-index">01 — THE BOTANICAL EDITION</div>
      </section>

      <section className="promise-strip" aria-label="Store benefits">
        <div><Leaf/><span><b>Thoughtful formulas</b><small>Carefully considered</small></span></div>
        <div><ShieldCheck/><span><b>Secure checkout</b><small>Protected payments</small></span></div>
        <div><Truck/><span><b>Pan-India delivery</b><small>Shipping across India</small></span></div>
        <div><Sparkles/><span><b>Your skin, your ritual</b><small>Made for everyday care</small></span></div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div><p className="eyebrow dark-eyebrow">THE EVERYDAY EDIT</p><h2>Care, <em>curated.</em></h2><p className="section-subtitle">A few good things for your daily ritual.</p></div>
          <span className="product-count">{visibleProducts.length.toString().padStart(2, "0")} PRODUCTS</span>
        </div>
        <div className="filters" role="group" aria-label="Filter products">
          {categories.map(c => <button key={c} className={activeCategory === c ? "filter active-filter" : "filter"} onClick={() => setActiveCategory(c)}>{c}</button>)}
          <span className="filter-note"><ChevronDown size={14}/> Shop by ritual</span>
        </div>
        {visibleProducts.length ? <div className="product-grid">
          {visibleProducts.map((p, i) => <article className="product-card" key={p.id}>
            <div className="product-image-wrap">
              <img src={p.image} alt={p.name} className="product-image" loading={i > 1 ? "lazy" : "eager"}/>
              {p.tag && <span className="product-tag">{p.tag}</span>}
              <button className="quick-add" onClick={() => add(p)} aria-label={`Add ${p.name} to bag`}><ArrowDownRight size={19}/></button>
            </div>
            <div className="product-info">
              <div className="product-meta"><span>{p.category}</span><span className="rating">★ {p.rating} <small>({p.reviews})</small></span></div>
              <h3>{p.name}</h3><p>{p.description}</p>
              <div className="product-bottom"><strong>{money(p.price)}</strong><button className="add-button" onClick={() => add(p)}>Add to bag <span>+</span></button></div>
            </div>
          </article>)}
        </div> : <div className="empty-state"><Search size={24}/><h3>No products found</h3><p>Try another search or category.</p><button className="text-button" onClick={() => { setSearch(""); setActiveCategory("All"); }}>Clear filters</button></div>}
        <p className="catalog-note">Thoughtfully selected essentials. Find the routine that feels like you.</p>
      </section>

      <section className="story-section" id="story">
        <div className="story-image"><div className="story-image-caption">NATURE, MEET KNOW-HOW <span>EST. FOR YOUR EVERYDAY</span></div></div>
        <div className="story-copy"><p className="eyebrow">OUR PHILOSOPHY</p><h2>Skin deserves<br/>a little <em>less noise.</em></h2><p>We believe skincare should feel considered, not complicated. A thoughtful routine brings together ingredients with purpose and the simple pleasure of caring for yourself.</p><a href="#ritual" className="text-link">Get to know us <ArrowRight size={16}/></a></div>
      </section>

      <section className="ritual-section" id="ritual"><p className="eyebrow dark-eyebrow">A MOMENT FOR YOU</p><h2>Your skin. Your pace. <em>Your ritual.</em></h2><p>Start simple. Stay consistent. Let care be the best part of your day.</p><a className="primary-button dark-button" href="#shop">Find your essentials <ArrowRight size={17}/></a></section>

      <footer id="footer" className="site-footer">
        <div className="footer-brand"><a className="brand" href="#"><Leaf className="brand-leaf" size={20}/><span>AVERMONTIS</span><small>PURE SKIN. LASTING CARE.</small></a><p>Thoughtful skincare for the everyday.</p></div>
        <div><h4>EXPLORE</h4><a href="#shop">Shop all</a><a href="#story">Our philosophy</a><a href="#ritual">Our ritual</a></div>
        <div><h4>HERE TO HELP</h4><a href="mailto:hello@avermontis.example">Contact us</a><a href="#footer">Shipping & returns</a><a href="#footer">Privacy policy</a></div>
        <div className="footer-news"><h4>A NOTE FROM US</h4><p>Occasional rituals, new launches and thoughtful skin notes.</p><form onSubmit={e => { e.preventDefault(); setNotice("Thanks — newsletter signup will be connected when email is configured."); }}><input type="email" required placeholder="Your email address" aria-label="Email address"/><button aria-label="Subscribe"><ArrowRight size={18}/></button></form><small>No spam. Just the good stuff.</small></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} AVERMONTIS. ALL RIGHTS RESERVED.</span><span>MADE WITH INTENTION · INDIA</span></div>
      </footer>

      {notice && <div className="toast" role="status"><Check size={17}/>{notice}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()} aria-label="Shopping bag">
        <div className="drawer-heading"><div><p className="eyebrow dark-eyebrow">YOUR SELECTION</p><h2>Your bag <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X/></button></div>
        {count === 0 ? <div className="cart-empty"><ShoppingBag size={34}/><h3>A little room for care.</h3><p>Your bag is waiting for something lovely.</p><button className="primary-button dark-button" onClick={() => setCartOpen(false)}>Explore products <ArrowRight size={16}/></button></div> :
          <><div className="cart-lines">{products.filter(p => cart[p.id]).map(p => <div className="cart-line" key={p.id}><img src={p.image} alt=""/><div className="cart-line-copy"><b>{p.name}</b><span>{money(p.price)}</span><div className="quantity"><button onClick={() => setCart(c => ({...c, [p.id]: Math.max(0, (c[p.id] || 0) - 1)}))} aria-label={`Remove one ${p.name}`}>−</button><span>{cart[p.id]}</span><button onClick={() => setCart(c => ({...c, [p.id]: (c[p.id] || 0) + 1}))} aria-label={`Add one ${p.name}`}>+</button></div></div><button className="remove-item" onClick={() => setCart(c => ({...c, [p.id]: 0}))}>Remove</button></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{money(total)}</strong></div><p className="shipping-note">Shipping and applicable taxes are calculated at checkout.</p><button className="primary-button checkout-button" onClick={() => setNotice("Checkout is not connected yet. No payment has been taken.")}>Continue to checkout <ArrowRight size={17}/></button><p className="demo-note">Demo storefront · Checkout is not live</p></>}
      </aside></div>}
    </main>
  );
}
