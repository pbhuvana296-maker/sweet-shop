import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./style.css";

const reveal = {
  hidden: { opacity: 0, y: 55, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const products = [
  { id: 1, name: "Royal Kaju Katli", category: "Traditional", price: 480, oldPrice: 600, rating: "4.9", tag: "BESTSELLER", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kaju%20katli%20sweet.jpg" },
  { id: 2, name: "Motichoor Ladoo", category: "Ladoo", price: 320, oldPrice: 400, rating: "4.8", tag: "POPULAR", image: "https://upload.wikimedia.org/wikipedia/commons/6/61/Motichoor_Ki_Laadu_Khajrana_Indore.jpg" },
  { id: 3, name: "Gulab Jamun", category: "Milk Sweets", price: 280, oldPrice: 350, rating: "4.9", tag: "FAVOURITE", image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_400/oyusmirujwwiwtw9fu0m" },
  { id: 4, name: "Badam Halwa", category: "Halwa", price: 390, oldPrice: 450, rating: "4.7", tag: "CHEF'S PICK", image: "https://indiasweethouse.in/cdn/shop/files/CopyofBadamHalwa.png?v=1755673640" },
  { id: 5, name: "Milk Peda", category: "Milk Sweets", price: 260, oldPrice: 320, rating: "4.8", tag: "FRESH", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Milk%20Peda.JPG" },
  { id: 6, name: "Festive Gift Box", category: "Gift Boxes", price: 799, oldPrice: 999, rating: "5.0", tag: "GIFT SPECIAL", image: "https://misree.co.in/cdn/shop/files/FestivalEthnic-Boxof16-1.jpg?crop=center&height=2048&v=1730111332&width=2048" },
  { id: 7, name: "Mysore Pak", category: "Traditional", price: 350, oldPrice: 420, rating: "4.9", tag: "TRADITIONAL", image: "https://gpullareddysweets.com/cdn/shop/files/MilkMysorepak_49bd0250-9468-4040-bbff-c6fe7b0f99e0.png?v=1753960650&width=1346" },
  { id: 8, name: "Carrot Halwa", category: "Halwa", price: 300, oldPrice: 360, rating: "4.8", tag: "FRESH TODAY", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Delicious%20Gajar%20Ka%20Halwa.jpg" },
];

const categories = ["All Sweets", "Traditional", "Ladoo", "Milk Sweets", "Halwa", "Gift Boxes"];
const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

function App() {
  const [activeCategory, setActiveCategory] = useState("All Sweets");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [email, setEmail] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Sweets" ||
        product.category === activeCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const subscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">✦</span>
          <span>
            SWEET<span className="brand-light"> SHOP</span>
            <small>Your Choice, Your Sweetness</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>

        <nav className={mobileMenu ? "nav-links show" : "nav-links"}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#categories" onClick={() => setMobileMenu(false)}>Categories</a>
          <a href="#products" onClick={() => setMobileMenu(false)}>Our Sweets</a>
          <a href="#story" onClick={() => setMobileMenu(false)}>Our Story</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-button" onClick={() => setCartOpen(true)} aria-label="Open cart">
            ♡ <span className="cart-count">{cartCount}</span>
          </button>
          <button className="bag-button" onClick={() => setCartOpen(true)}>
            Bag ({cartCount})
          </button>
        </div>
      </header>

      {/* HERO */}
      <motion.section
        className="hero"
        id="home"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        <div className="hero-content">
          <p className="eyebrow">A LITTLE PIECE OF HAPPINESS</p>
          <h1>Every Sweet<br />Tells a <span>Story.</span></h1>
          <p className="hero-description">
            Discover the authentic taste of Indian tradition.
            Handcrafted sweets made with love, care and the finest ingredients.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="primary-button">Explore Sweets <span>→</span></a>
            <a href="#story" className="text-button">Our Story</a>
          </div>
          <div className="hero-rating">
            <span>★★★★★</span>
            <p>Loved by 10,000+ sweet lovers</p>
          </div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 50, scale: 0.94 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="hero-image-frame">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              src="https://www.lakshmiwholesale.com/cdn/shop/articles/Lakshmi_Wholesale_-_Sweets_Snacks.jpg?v=1773123893"
              alt="Traditional Indian sweets"
            />
          </div>
          <div className="hero-stamp">
            <span>MADE WITH</span>
            <strong>LOVE</strong>
            <span>& TRADITION</span>
          </div>
        </motion.div>
      </motion.section>

      {/* PROMISES */}
      <motion.section className="promises" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
        {[
          ["✧", "Freshly Prepared", "Made fresh every day"],
          ["❀", "Premium Ingredients", "Only the finest quality"],
          ["♡", "Made With Love", "Tradition in every bite"],
          ["♧", "Safe Delivery", "Carefully packed for you"],
        ].map(([symbol, title, detail], index) => (
          <motion.div
            className="promise-item"
            key={title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
          >
            <span>{symbol}</span>
            <div><h4>{title}</h4><p>{detail}</p></div>
          </motion.div>
        ))}
      </motion.section>

      {/* CATEGORIES */}
      <motion.section className="categories-section" id="categories" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
        <div className="section-heading">
          <p className="eyebrow">EXPLORE OUR COLLECTION</p>
          <h2>Find Your <span>Favourite</span></h2>
          <p>Something special for every sweet moment.</p>
        </div>

        <div className="category-grid">
          {[
            { name: "Traditional", symbol: "✺", detail: "Classic Indian delights" },
            { name: "Ladoo", symbol: "●", detail: "Little balls of happiness" },
            { name: "Milk Sweets", symbol: "❀", detail: "Rich and creamy treats" },
            { name: "Halwa", symbol: "◆", detail: "A taste of tradition" },
            { name: "Gift Boxes", symbol: "♧", detail: "Share the sweetness" },
          ].map((category, index) => (
            <motion.button
              className="category-card"
              key={category.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => {
                setActiveCategory(category.name);
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="category-symbol">{category.symbol}</span>
              <h3>{category.name}</h3>
              <p>{category.detail}</p>
              <span className="category-arrow">↗</span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* PRODUCTS */}
      <motion.section className="products-section" id="products" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        <div className="products-heading">
          <div className="section-heading left-heading">
            <p className="eyebrow">MADE TO MAKE YOU SMILE</p>
            <h2>Our Sweet <span>Collection</span></h2>
            <p>Handpicked favourites, prepared fresh for you.</p>
          </div>
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search your favourite sweet..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="filter-list">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "filter active" : "filter"}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="product-grid">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.article
                className="product-card"
                key={product.id}
                layout
                initial={{ opacity: 0, y: 45, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <div className="product-photo">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7 }}
                    whileHover={{ scale: 1.08 }}
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                  <span className="product-tag">{product.tag}</span>
                  <button
                    className={wishlist.includes(product.id) ? "wishlist-button selected" : "wishlist-button"}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Toggle wishlist"
                  >
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="product-info">
                  <div className="product-meta">
                    <span>{product.category}</span>
                    <span>★ {product.rating}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <div className="product-bottom">
                    <div className="price">
                      <strong>{formatPrice(product.price)}</strong>
                      <del>{formatPrice(product.oldPrice)}</del>
                    </div>
                    <button className="add-button" onClick={() => addToCart(product)}>+ Add</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="empty-products">
            <span>♡</span>
            <h3>No sweets found</h3>
            <p>Try another search or category.</p>
          </div>
        )}
      </motion.section>

      {/* FESTIVE BANNER */}
      <motion.section className="festive-section" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
        <motion.div
          className="festive-content"
          initial={{ opacity: 0, x: -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">MAKE EVERY MOMENT SWEETER</p>
          <h2>Celebrate With<br /><span>Something Sweet.</span></h2>
          <p>Beautifully packed sweet boxes to make your celebrations unforgettable.</p>
          <a href="#products" className="primary-button">Shop Gift Boxes <span>→</span></a>
        </motion.div>
        <motion.div
          className="festive-art"
          initial={{ opacity: 0, x: 45, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <img
            src="https://misree.co.in/cdn/shop/files/FestivalEthnic-Boxof16-1.jpg?crop=center&height=2048&v=1730111332&width=2048"
            alt="Sweet gift box"
            loading="lazy"
          />
        </motion.div>
      </motion.section>

      {/* STORY */}
      <motion.section className="story-section" id="story" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
        <motion.div
          className="story-visual"
          initial={{ opacity: 0, x: -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://indiasweethouse.in/cdn/shop/files/CopyofBadamHalwa.png?v=1755673640"
            alt="Handcrafted traditional sweets"
            loading="lazy"
          />
          <div className="story-note">
            <strong>Since Day One</strong>
            <span>Tradition • Taste • Love</span>
          </div>
        </motion.div>
        <motion.div
          className="story-content"
          initial={{ opacity: 0, x: 45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="eyebrow">A SWEET TRADITION</p>
          <h2>Rooted in Tradition.<br /><span>Made With Love.</span></h2>
          <p>
            At Sweet Shop, every recipe carries a little piece of tradition.
            We bring together authentic flavours, quality ingredients and
            the joy of sharing something sweet.
          </p>
          <p>
            From everyday treats to special celebrations, we make every
            moment a little more memorable.
          </p>
          <a href="#products" className="text-button">Discover Our Sweets →</a>
        </motion.div>
      </motion.section>
      {/* CUSTOMER REVIEWS */}
<motion.section
  className="reviews-section"
  id="reviews"
  variants={reveal}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
>
  <div className="section-heading">
    <p className="eyebrow">LOVE FROM OUR CUSTOMERS</p>
    <h2>Sweet Words, <span>Happy Hearts.</span></h2>
    <p>Every review makes our day a little sweeter.</p>
  </div>

  <div className="review-rating">
    <strong>4.9</strong>
    <div>
      <span>★★★★★</span>
      <p>Demo rating • Customer review examples</p>
    </div>
  </div>

  <div className="review-grid">
    {[
      {
        name: "Ananya",
        city: "Chennai",
        avatar: "A",
        review: "The sweets were absolutely delicious! Fresh, soft and perfectly balanced in taste.",
      },
      {
        name: "Priya",
        city: "Coimbatore",
        avatar: "P",
        review: "Loved the traditional taste. The packaging was beautiful and perfect for gifting.",
      },
      {
        name: "Karthik",
        city: "Madurai",
        avatar: "K",
        review: "The Mysore Pak was amazing. Every bite reminded me of homemade sweets!",
      },
    ].map((review, index) => (
      <motion.div
        className="review-card"
        key={review.name}
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.18 }}
        whileHover={{ y: -8 }}
      >
        <div className="review-stars">★★★★★</div>
        <p className="review-text">“{review.review}”</p>
        <div className="review-person">
          <div className="review-avatar">{review.avatar}</div>
          <div>
            <h4>{review.name}</h4>
            <span>{review.city}</span>
          </div>
          <span className="verified">✓</span>
        </div>
      </motion.div>
    ))}
  </div>
</motion.section>

      {/* NEWSLETTER */}
      <motion.section className="newsletter" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
        <p className="eyebrow">A LITTLE SWEETNESS IN YOUR INBOX</p>
        <h2>Stay in the <span>Sweet Loop.</span></h2>
        <p>Get updates on new arrivals, festive specials and sweet offers.</p>
        <form onSubmit={subscribe}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="submit">Subscribe →</button>
        </form>
      </motion.section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <span className="brand-icon">✦</span>
              <span>
                SWEET<span className="brand-light"> SHOP</span>
                <small>Your Choice, Your Sweetness</small>
              </span>
            </a>
            <p>Bringing sweetness to every celebration with authentic flavours and handcrafted happiness.</p>
          </div>

          <div className="footer-column">
            <h4>Explore</h4>
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#products">Our Sweets</a>
            <a href="#story">Our Story</a>
          </div>

          <div className="footer-column">
            <h4>Customer Care</h4>
            <a href="#products">Shopping</a>
            <a href="#products">Gift Boxes</a>
            <a href="#story">About Us</a>
            <a href="#home">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Follow Us</h4>
            <a href="#home">Instagram ↗</a>
            <a href="#home">Facebook ↗</a>
            <a href="#home">Pinterest ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 SWEET SHOP. All rights reserved.</p>
          <p>Made with ♡ for sweet moments.</p>
        </div>
      </footer>

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />
            <motion.aside
              className="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="cart-header">
                <div>
                  <p className="eyebrow">YOUR SELECTION</p>
                  <h2>Your Sweet Bag</h2>
                </div>
                <button className="close-cart" onClick={() => setCartOpen(false)}>×</button>
              </div>

              {cart.length === 0 ? (
                <div className="empty-cart">
                  <span>♡</span>
                  <h3>Your bag is waiting!</h3>
                  <p>Add something sweet to get started.</p>
                  <button className="primary-button" onClick={() => setCartOpen(false)}>Explore Sweets →</button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <strong>{formatPrice(item.price)}</strong>
                          <div className="quantity-control">
                            <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Subtotal</span>
                      <strong>{formatPrice(cartTotal)}</strong>
                    </div>
                    <button
                      className="checkout-button"
                      onClick={() => {
                        if (cart.length === 0) return;
                        setCart([]);
                        setCartOpen(false);
                        window.alert("🎉 Your order has been confirmed! Thank you for choosing SWEET SHOP ❤️");
                      }}
                    >
                      Order Now →
                    </button>
                    <p>Delivery charges calculated at checkout.</p>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;