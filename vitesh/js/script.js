/* ==========================================================================
   VITESH FRESH MART - CAPSTONE CLIENT JAVASCRIPT
   Features implemented:
   - F1: Buyer / Seller / Admin authentication & session management
   - F2: Seller listing management (Add, View, Delete, Stock status)
   - F3: Search, multi-category filter & sorting
   - F4: Shopping cart with running subtotal, item removal & quantity adjust
   - F5: Checkout with validation, delivery date picker & mock UPI/COD payment
   - F6: Buyer order history & seller/admin order log
   - F7: Admin control board with live metric counters & order moderation
   - F8: Customer product reviews & star rating submissions
   - O2: Order status workflow (Confirmed -> Shipped -> Delivered)
   - O4: AI Shopping Assistant with grocery knowledge base
   ========================================================================== */

// --- 1. INITIAL CATALOG OF FRESH PRODUCE (26+ REALISTIC ITEMS) ---
const INITIAL_PRODUCTS = [
  // Vegetables
  {
    id: 1,
    name: "Farm Fresh Country Tomatoes",
    brand: "Fresh Valley Farms",
    category: "Vegetables",
    price: 45,
    unit: "per kg",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.9,
    reviewsCount: 38,
    stock: "In Stock (40 kg)",
    badge: "Bestseller",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=80",
    description: "Sun-ripened, firm and juicy red tomatoes. Ideal for curries, salads, and rich gravies."
  },
  {
    id: 2,
    name: "Crunchy Sweet Carrots (Ooty)",
    brand: "Nilgiri Harvest",
    category: "Vegetables",
    price: 60,
    unit: "per kg",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.8,
    reviewsCount: 29,
    stock: "In Stock (25 kg)",
    badge: "High Beta-Carotene",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=600&q=80",
    description: "Tender, high-sweetness Ooty mountain carrots packed with vitamins and natural crunch."
  },
  {
    id: 3,
    name: "Golden Baby Potatoes",
    brand: "Himalayan Soil",
    category: "Vegetables",
    price: 38,
    unit: "per kg",
    rating: "⭐⭐⭐⭐",
    ratingVal: 4.6,
    reviewsCount: 21,
    stock: "In Stock (60 kg)",
    badge: "Farm Direct",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
    description: "Thin-skinned buttery potatoes. Perfect for roasting, dum aloo, and crispy snacks."
  },
  {
    id: 4,
    name: "Fresh Red Onions (Nashik)",
    brand: "Nashik Mandi",
    category: "Vegetables",
    price: 42,
    unit: "per kg",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.7,
    reviewsCount: 44,
    stock: "In Stock (80 kg)",
    badge: "Kitchen Staple",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    description: "Pungent and crisp Nashik red onions with thick layers, giving authentic aroma to curries."
  },
  {
    id: 5,
    name: "Tender Green Peas (Matar)",
    brand: "Punjab Greens",
    category: "Vegetables",
    price: 75,
    unit: "per 500g",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.9,
    reviewsCount: 19,
    stock: "In Stock (18 kg)",
    badge: "Seasonal Pick",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=80",
    description: "Naturally sweet and tender freshly harvested green pods, ready for your favorite pulao."
  },
  {
    id: 6,
    name: "Crisp Green Salad Cucumbers",
    brand: "Hydro Fresh",
    category: "Vegetables",
    price: 35,
    unit: "per kg",
    rating: "⭐⭐⭐⭐",
    ratingVal: 4.5,
    reviewsCount: 16,
    stock: "In Stock (30 kg)",
    badge: "Hydrating",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80",
    description: "Cool, crisp cucumbers with 95% water content. Ideal for raw detox juices and healthy salads."
  },
  {
    id: 7,
    name: "Garden Fresh Cauliflower",
    brand: "Green Plains",
    category: "Vegetables",
    price: 48,
    unit: "per piece (~800g)",
    rating: "⭐⭐⭐⭐",
    ratingVal: 4.4,
    reviewsCount: 14,
    stock: "In Stock (22 pcs)",
    badge: "Zero Worm Guarantee",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80",
    description: "Bright white, compact flower heads free of spots, carefully graded and packaged."
  },
  {
    id: 8,
    name: "Tricolor Bell Peppers (Capsicum)",
    brand: "Rainbow Agro",
    category: "Vegetables",
    price: 110,
    unit: "pack of 3 (500g)",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.8,
    reviewsCount: 32,
    stock: "In Stock (15 packs)",
    badge: "Exotic",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80",
    description: "Crispy red, yellow and green bell peppers brimming with Vitamin C and antioxidant zest."
  },

  // Fruits
  {
    id: 9,
    name: "Royal Gala Crisp Red Apples",
    brand: "Kinnaur Orchard",
    category: "Fruits",
    price: 160,
    unit: "per kg (4-5 pcs)",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.9,
    reviewsCount: 52,
    stock: "In Stock (35 kg)",
    badge: "Sweet & Juicy",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80",
    description: "Imported and hand-graded crisp Royal Gala apples with thin red skin and sweet honey notes."
  },
  {
    id: 10,
    name: "Robusta Golden Bananas",
    brand: "Salem Groves",
    category: "Fruits",
    price: 55,
    unit: "per dozen",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.7,
    reviewsCount: 65,
    stock: "In Stock (50 dozen)",
    badge: "High Potassium",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    description: "Naturally ripened Robusta bananas rich in instant energy, potassium, and dietary fiber."
  },
  {
    id: 11,
    name: "Nagpur Sweet Juicy Oranges",
    brand: "Vidarbha Fresh",
    category: "Fruits",
    price: 95,
    unit: "per kg (5-6 pcs)",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.8,
    reviewsCount: 27,
    stock: "In Stock (30 kg)",
    badge: "Immunity Booster",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=600&q=80",
    description: "Famous Nagpur variety oranges loaded with tangy sweet juice and fresh Vitamin C."
  },
  {
    id: 12,
    name: "Fresh Mahabaleshwar Strawberries",
    brand: "Hilltop Berries",
    category: "Fruits",
    price: 130,
    unit: "per 250g box",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 5.0,
    reviewsCount: 41,
    stock: "In Stock (20 boxes)",
    badge: "Handpicked Daily",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",
    description: "Vibrant scarlet berries with natural fragrant perfume and sweet-tart balance."
  },
  {
    id: 13,
    name: "Alphonso (Hapus) Mangoes",
    brand: "Ratnagiri Estate",
    category: "Fruits",
    price: 499,
    unit: "box of 6 pcs",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 5.0,
    reviewsCount: 88,
    stock: "In Stock (12 boxes)",
    badge: "King of Fruits",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
    description: "GI-tagged Ratnagiri Alphonso mangoes with saffron pulp and mesmerizing tropical fragrance."
  },
  {
    id: 14,
    name: "Ruby Red Pomegranate (Anar)",
    brand: "Solapur Orchards",
    category: "Fruits",
    price: 175,
    unit: "per kg (3-4 pcs)",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.8,
    reviewsCount: 33,
    stock: "In Stock (24 kg)",
    badge: "Superfood",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    description: "Lustrous deep-red arils bursting with antioxidant polyphenols and rich sweet juice."
  },
  {
    id: 15,
    name: "Fresh Seedless Green Grapes",
    brand: "Nashik Vineyards",
    category: "Fruits",
    price: 90,
    unit: "per 500g punnet",
    rating: "⭐⭐⭐⭐",
    ratingVal: 4.6,
    reviewsCount: 22,
    stock: "In Stock (28 punnets)",
    badge: "Seedless Crisp",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80",
    description: "Firm seedless Thompson grapes. Chilled, sweet, and crunchy snacking bliss."
  },
  {
    id: 16,
    name: "Zespri Green Kiwis",
    brand: "New Zealand Imports",
    category: "Fruits",
    price: 110,
    unit: "pack of 3 pcs",
    rating: "⭐⭐⭐⭐",
    ratingVal: 4.5,
    reviewsCount: 17,
    stock: "In Stock (16 packs)",
    badge: "High Fiber",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=600&q=80",
    description: "Tangy green kiwis loaded with actinidin enzymes and Vitamin C for digestive vitality."
  },

  // Leafy Greens
  {
    id: 17,
    name: "Fresh Hydroponic Spinach (Palak)",
    brand: "Organic Greens Co",
    category: "Leafy",
    price: 35,
    unit: "per bunch (250g)",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.8,
    reviewsCount: 31,
    stock: "In Stock (45 bunches)",
    badge: "Iron Rich",
    badgeType: "organic",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    description: "Tender baby spinach leaves harvested at dawn. Washed, crisp, and 100% pesticide-free."
  },
  {
    id: 18,
    name: "Aromatic Fresh Coriander (Dhania)",
    brand: "Local Farm Co-Op",
    category: "Leafy",
    price: 20,
    unit: "per bunch (100g)",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.9,
    reviewsCount: 47,
    stock: "In Stock (70 bunches)",
    badge: "Farm Harvested",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
    description: "Intensely fragrant coriander sprigs with vibrant green stems. The ultimate Indian garnish."
  },
  {
    id: 19,
    name: "Cool Mountain Mint (Pudina)",
    brand: "Local Farm Co-Op",
    category: "Leafy",
    price: 18,
    unit: "per bunch (100g)",
    rating: "⭐⭐⭐⭐",
    ratingVal: 4.7,
    reviewsCount: 23,
    stock: "In Stock (50 bunches)",
    badge: "Refreshing",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80",
    description: "Crisp mint leaves perfect for cooling chutneys, summer mojitos, and spiced chai."
  },

  // Organic
  {
    id: 20,
    name: "Certified Organic Green Broccoli",
    brand: "Nilgiri Bio Farms",
    category: "Organic",
    price: 85,
    unit: "per head (400g)",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.8,
    reviewsCount: 36,
    stock: "In Stock (20 heads)",
    badge: "USDA Organic",
    badgeType: "organic",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80",
    description: "Dense florets cultivated in organic compost soil without synthetic chemical sprays."
  },
  {
    id: 21,
    name: "Organic Hass Avocado",
    brand: "Kodaikanal Agro",
    category: "Organic",
    price: 140,
    unit: "per piece",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.9,
    reviewsCount: 42,
    stock: "In Stock (15 pcs)",
    badge: "Healthy Fats",
    badgeType: "organic",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
    description: "Creamy, rich Hass avocados packed with monounsaturated healthy fats and potassium."
  },
  {
    id: 22,
    name: "Organic Sweet Cherry Tomatoes",
    brand: "Bio Garden",
    category: "Organic",
    price: 70,
    unit: "per 250g punnet",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.8,
    reviewsCount: 25,
    stock: "In Stock (19 punnets)",
    badge: "Bio Certified",
    badgeType: "organic",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    description: "Bite-sized sugary tomatoes bursting with rich sweet flavor. Amazing for pastas & snacking."
  },
  {
    id: 23,
    name: "Organic Wild Blueberries",
    brand: "Berry Best Bio",
    category: "Organic",
    price: 240,
    unit: "per 125g box",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.9,
    reviewsCount: 39,
    stock: "In Stock (10 boxes)",
    badge: "Brain Booster",
    badgeType: "organic",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80",
    description: "Deep indigo berries packed with anthocyanins. Top your morning oats or smoothies."
  },

  // Seasonal
  {
    id: 24,
    name: "Sugar Baby Striped Watermelon",
    brand: "Summer Bliss",
    category: "Seasonal",
    price: 80,
    unit: "per whole (~2.5 kg)",
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 4.9,
    reviewsCount: 54,
    stock: "In Stock (22 pcs)",
    badge: "Summer Favorite",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=600&q=80",
    description: "Extra sweet ruby pulp with dense juice content. Kept cool and delivered fresh."
  },
  {
    id: 25,
    name: "Fresh American Sweet Corn",
    brand: "Golden Harvest",
    category: "Seasonal",
    price: 45,
    unit: "pack of 2 cobs",
    rating: "⭐⭐⭐⭐",
    ratingVal: 4.6,
    reviewsCount: 28,
    stock: "In Stock (35 packs)",
    badge: "Plump Kernels",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
    description: "Golden, juicy, plump sweet corn cobs. Boil, roast with butter and lemon, or make chat."
  },
  {
    id: 26,
    name: "Tender Farm Baby Corn",
    brand: "Golden Harvest",
    category: "Seasonal",
    price: 50,
    unit: "per 200g tray",
    rating: "⭐⭐⭐⭐",
    ratingVal: 4.5,
    reviewsCount: 15,
    stock: "In Stock (18 trays)",
    badge: "Crisp & Fresh",
    badgeType: "",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80",
    description: "Crunchy peeled baby corn shoots for Chinese stir-fries, manchurian, and paneer curry."
  }
];

// --- 2. LOCAL STATE & PERSISTENCE ENGINE ---
let products = [];
let cart = [];
let orders = [];
let reviews = {};
let currentRole = "Buyer"; // 'Buyer', 'Seller', or 'Admin'
let selectedCategory = "All";
let currentSort = "featured";
let currentRatingScore = 5;
let currentReviewProductId = null;

// Initialize State from LocalStorage
function initState() {
  const storedProds = localStorage.getItem("vfm_products");
  if (storedProds) {
    try {
      products = JSON.parse(storedProds);
      // Ensure we have our rich catalog if stored catalog was the small 8-item version
      if (products.length < 15) {
        products = [...INITIAL_PRODUCTS];
        localStorage.setItem("vfm_products", JSON.stringify(products));
      }
    } catch (e) {
      products = [...INITIAL_PRODUCTS];
    }
  } else {
    products = [...INITIAL_PRODUCTS];
    localStorage.setItem("vfm_products", JSON.stringify(products));
  }

  const storedCart = localStorage.getItem("vfm_cart");
  if (storedCart) {
    try { cart = JSON.parse(storedCart); } catch (e) { cart = []; }
  }

  const storedOrders = localStorage.getItem("vfm_orders");
  if (storedOrders) {
    try { orders = JSON.parse(storedOrders); } catch (e) { orders = []; }
  } else {
    // Seed initial demo orders so Orders view & Admin panel look populated right away
    orders = [
      {
        orderId: "#VFM482910",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        customer: {
          name: "Priya Sharma",
          phone: "9840123456",
          address: "12, Besant Nagar Beach Road, Chennai",
          pincode: "600090"
        },
        items: [
          { name: "Royal Gala Crisp Red Apples", price: 160, qty: 2 },
          { name: "Fresh Hydroponic Spinach (Palak)", price: 35, qty: 1 }
        ],
        payment: "UPI Payment",
        total: 355,
        status: "Delivered"
      },
      {
        orderId: "#VFM592014",
        date: new Date(Date.now() - 86400000).toISOString(),
        customer: {
          name: "Vitesh Kumar",
          phone: "9876543210",
          address: "No. 42, Green Avenue, Anna Nagar",
          pincode: "600025"
        },
        items: [
          { name: "Certified Organic Green Broccoli", price: 85, qty: 1 },
          { name: "Farm Fresh Country Tomatoes", price: 45, qty: 2 }
        ],
        payment: "Cash on Delivery",
        total: 175,
        status: "Out for Delivery"
      }
    ];
    localStorage.setItem("vfm_orders", JSON.stringify(orders));
  }

  const storedReviews = localStorage.getItem("vfm_reviews");
  if (storedReviews) {
    try { reviews = JSON.parse(storedReviews); } catch (e) { reviews = {}; }
  }

  updateCartBadge();
  updateOrdersBadge();
}

// --- 3. TOAST NOTIFICATION UTILITY ---
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icon = type === "success" ? "✅" : (type === "error" ? "⚠️" : "ℹ️");
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- 4. AUTHENTICATION & ROLE SWITCHING (F1) ---
function setLoginRole(role) {
  currentRole = role;
  document.querySelectorAll(".role-pill").forEach(pill => {
    pill.classList.toggle("active", pill.innerText.includes(role));
  });
}

function login() {
  const email = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!email || !email.includes("@")) {
    showToast("Please enter a valid email address.", "error");
    return;
  }
  if (!pass) {
    showToast("Please enter a password.", "error");
    return;
  }

  document.getElementById("loginPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";

  updateUserDisplay();
  showToast(`Welcome back, ${email.split('@')[0]}! Logged in as ${currentRole}.`, "success");

  // Render initial view
  renderProducts();
  renderSellerInventory();
  renderAdminDashboard();
  renderOrdersHistory();
}

function logout() {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("loginPage").style.display = "flex";
  showToast("Logged out successfully.", "info");
}

function updateUserDisplay() {
  const display = document.getElementById("currentUserDisplay");
  const avatar = document.getElementById("userAvatarIcon");
  if (display) display.innerText = currentRole;
  if (avatar) {
    avatar.innerText = currentRole === "Admin" ? "🛡️" : (currentRole === "Seller" ? "👨‍🌾" : "👤");
  }

  // Highlight/filter tabs based on role if needed
  const sellerBtn = document.getElementById("navSellerBtn");
  const adminBtn = document.getElementById("navAdminBtn");
  if (sellerBtn) sellerBtn.style.display = (currentRole === "Buyer") ? "none" : "flex";
  if (adminBtn) adminBtn.style.display = (currentRole === "Admin") ? "flex" : "none";
}

// --- 5. NAVIGATION TAB SWITCHING ---
function switchNavTab(tabName) {
  // Update nav buttons
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
  const activeBtn = document.getElementById(`nav${tabName.charAt(0).toUpperCase() + tabName.slice(1)}Btn`);
  if (activeBtn) activeBtn.classList.add("active");

  // Update view panels
  const views = ["store", "orders", "seller", "admin"];
  views.forEach(v => {
    const el = document.getElementById(`${v}View`);
    if (el) el.style.display = (v === tabName) ? "block" : "none";
  });

  // Re-render view specific data
  if (tabName === "store") renderProducts();
  if (tabName === "orders") renderOrdersHistory();
  if (tabName === "seller") renderSellerInventory();
  if (tabName === "admin") renderAdminDashboard();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- 6. CATALOG RENDERING, SEARCH & FILTERING (F3) ---
function renderProducts(listToRender = null) {
  const grid = document.getElementById("products");
  if (!grid) return;

  let list = listToRender || getFilteredAndSortedProducts();
  const countEl = document.getElementById("resultsCount");
  if (countEl) countEl.innerText = `Showing ${list.length} fresh produce item${list.length === 1 ? '' : 's'}`;

  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: white; border-radius: 16px; border: 1px dashed #cbd5e1;">
        <span style="font-size: 50px;">🌱</span>
        <h3 style="margin: 12px 0 6px; font-size: 20px;">No farm produce found</h3>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 18px;">Try clearing search terms or selecting another category.</p>
        <button class="btn btn-primary btn-sm" onclick="clearSearch()">View All Produce</button>
      </div>
    `;
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    const badgeClass = p.badgeType ? ` ${p.badgeType}` : "";
    const badgeHtml = p.badge ? `<span class="prod-badge${badgeClass}">${p.badge}</span>` : "";

    card.innerHTML = `
      <div class="product-img-box">
        ${badgeHtml}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="prod-details">
        <div class="prod-meta">
          <span class="prod-category">${p.category}</span>
          <span class="prod-origin">${p.brand}</span>
        </div>
        <h3 class="prod-name">${p.name}</h3>
        <p class="prod-desc">${p.description}</p>
        
        <div class="prod-rating-row" onclick="openReviewsModal(${p.id})">
          <span class="stars">${p.rating}</span>
          <span class="rating-count">(${p.reviewsCount} reviews)</span>
        </div>

        <div class="prod-price-row">
          <div>
            <span class="price-main">₹${p.price.toLocaleString("en-IN")}</span>
            <span class="price-unit">${p.unit}</span>
          </div>
          <span class="stock-pill">${p.stock}</span>
        </div>

        <div class="prod-actions">
          <button class="btn-add-cart" onclick="addToCart(${p.id})">🛒 Add</button>
          <button class="btn-buy-now" onclick="buyNow(${p.id})">⚡ Buy</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function getFilteredAndSortedProducts() {
  const searchTerm = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();

  let filtered = products.filter(p => {
    const matchesSearch = !searchTerm ||
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm);

    let matchesCategory = true;
    if (selectedCategory === "Popular") {
      matchesCategory = p.badgeType === "bestseller" || p.ratingVal >= 4.8;
    } else if (selectedCategory !== "All") {
      matchesCategory = p.category.toLowerCase() === selectedCategory.toLowerCase();
    }

    return matchesSearch && matchesCategory;
  });

  // Sort
  if (currentSort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating") {
    filtered.sort((a, b) => b.ratingVal - a.ratingVal);
  }

  return filtered;
}

function filterProducts(cat, btnElement = null) {
  selectedCategory = cat;
  if (btnElement) {
    document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
    btnElement.classList.add("active");
  } else {
    document.querySelectorAll(".cat-pill").forEach(p => {
      p.classList.toggle("active", p.innerText.includes(cat));
    });
  }
  renderProducts();
}

function handleSearch() {
  const val = document.getElementById("searchInput").value;
  const clearBtn = document.getElementById("clearSearchBtn");
  if (clearBtn) clearBtn.style.display = val ? "block" : "none";
  renderProducts();
}

function clearSearch() {
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  const clearBtn = document.getElementById("clearSearchBtn");
  if (clearBtn) clearBtn.style.display = "none";
  renderProducts();
}

function sortProducts(val) {
  currentSort = val;
  renderProducts();
}

// --- 7. CART SYSTEM (F4) ---
function addToCart(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...prod, qty: 1 });
  }

  saveCart();
  updateCartBadge();
  showToast(`Added ${prod.name} to cart! 🛒`);
}

function buyNow(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  const existing = cart.find(item => item.id === productId);
  if (!existing) {
    cart.push({ ...prod, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  openCheckout();
}

function saveCart() {
  localStorage.setItem("vfm_cart", JSON.stringify(cart));
}

function updateCartBadge() {
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  const badge = document.getElementById("cartCount");
  if (badge) badge.innerText = count;
}

function openCart() {
  renderCartModal();
  document.getElementById("cartModal").style.display = "block";
}

function renderCartModal() {
  const container = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("cartSubtotal");
  const totalEl = document.getElementById("cartTotal");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: #64748b;">
        <span style="font-size: 42px;">🛒</span>
        <h4 style="margin: 10px 0 4px; color: #1e293b;">Your cart is currently empty</h4>
        <p style="font-size: 13px;">Add fresh farm produce from our catalog to get started.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = "0";
    if (totalEl) totalEl.innerText = "0";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.qty;
    total += itemSubtotal;

    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} ${item.unit}</div>
      </div>
      <div class="cart-qty-ctrl">
        <button onclick="changeCartQty(${index}, -1)">−</button>
        <span class="cart-qty-val">${item.qty}</span>
        <button onclick="changeCartQty(${index}, 1)">+</button>
      </div>
      <div style="font-weight: 700; font-size: 14px; min-width: 60px; text-align: right;">
        ₹${itemSubtotal.toLocaleString("en-IN")}
      </div>
      <button class="cart-item-remove" onclick="removeCartItem(${index})" title="Remove item">🗑️</button>
    `;
    container.appendChild(row);
  });

  if (subtotalEl) subtotalEl.innerText = total.toLocaleString("en-IN");
  if (totalEl) totalEl.innerText = total.toLocaleString("en-IN");
}

function changeCartQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartBadge();
  renderCartModal();
}

function removeCartItem(index) {
  if (!cart[index]) return;
  const name = cart[index].name;
  cart.splice(index, 1);
  saveCart();
  updateCartBadge();
  renderCartModal();
  showToast(`Removed ${name} from cart.`, "info");
}

// --- 8. CHECKOUT & MOCK PAYMENT STEP (F5) ---
function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is empty. Add products to proceed.", "error");
    return;
  }
  closeModal("cartModal");
  openCheckout();
}

function openCheckout() {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const checkoutSubtotal = document.getElementById("checkoutSubtotal");
  const checkoutTotal = document.getElementById("checkoutTotal");
  if (checkoutSubtotal) checkoutSubtotal.innerText = subtotal.toLocaleString("en-IN");
  if (checkoutTotal) checkoutTotal.innerText = subtotal.toLocaleString("en-IN");

  // Set min delivery date as today
  const dateInput = document.getElementById("deliveryDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    if (!dateInput.value) dateInput.value = today;
  }

  document.getElementById("checkoutModal").style.display = "block";
}

function showUPI() {
  const upiBox = document.getElementById("upiBox");
  if (upiBox) upiBox.style.display = "block";
}

function hideUPI() {
  const upiBox = document.getElementById("upiBox");
  if (upiBox) upiBox.style.display = "none";
}

function placeOrder() {
  const name = document.getElementById("customerName")?.value.trim();
  const phone = document.getElementById("customerPhone")?.value.trim();
  const address = document.getElementById("customerAddress")?.value.trim();
  const pincode = document.getElementById("customerPincode")?.value.trim();
  const deliveryDate = document.getElementById("deliveryDate")?.value;
  const paymentRadio = document.querySelector('input[name="payment"]:checked');

  // Input Validation
  if (!name) {
    showToast("Please provide the recipient's full name.", "error");
    return;
  }
  if (!phone || !/^[0-9]{10}$/.test(phone)) {
    showToast("Please enter a valid 10-digit mobile number.", "error");
    return;
  }
  if (!pincode || !/^[0-9]{6}$/.test(pincode)) {
    showToast("Please enter a valid 6-digit postal pincode.", "error");
    return;
  }
  if (!address || address.length < 5) {
    showToast("Please enter complete delivery address.", "error");
    return;
  }
  if (!deliveryDate) {
    showToast("Please select a preferred delivery date.", "error");
    return;
  }
  if (!paymentRadio) {
    showToast("Please select a payment method.", "error");
    return;
  }

  if (paymentRadio.value === "UPI") {
    const upiId = document.getElementById("upiId")?.value.trim();
    if (!upiId || !upiId.includes("@")) {
      showToast("Please provide a valid UPI ID (e.g., name@upi).", "error");
      return;
    }
  }

  const grandTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const orderId = "#VFM" + Math.floor(100000 + Math.random() * 900000);

  const newOrder = {
    orderId: orderId,
    date: new Date().toISOString(),
    deliveryDate: deliveryDate,
    customer: { name, phone, address, pincode },
    items: [...cart],
    payment: paymentRadio.value === "UPI" ? "UPI Instant Payment" : "Cash on Delivery (COD)",
    total: grandTotal,
    status: "Confirmed"
  };

  // Save in orders array
  orders.unshift(newOrder);
  localStorage.setItem("vfm_orders", JSON.stringify(orders));

  // Populate Success Modal
  document.getElementById("orderId").innerText = orderId;
  document.getElementById("successName").innerText = name;
  document.getElementById("successDate").innerText = formatDateString(deliveryDate);
  document.getElementById("successPayment").innerText = newOrder.payment;
  document.getElementById("successTotal").innerText = grandTotal.toLocaleString("en-IN");

  // Empty Cart
  cart = [];
  saveCart();
  updateCartBadge();
  updateOrdersBadge();

  closeModal("checkoutModal");
  document.getElementById("successModal").style.display = "block";
  showToast("Order placed successfully! 🎉", "success");
}

function viewPlacedOrders() {
  closeModal("successModal");
  switchNavTab("orders");
}

function updateOrdersBadge() {
  const badge = document.getElementById("orderCountBadge");
  if (badge) badge.innerText = orders.length;
}

// --- 9. ORDER HISTORY & STATUS WORKFLOW (F6 & O2) ---
function renderOrdersHistory() {
  const container = document.getElementById("ordersListContainer");
  if (!container) return;
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="card-box" style="text-align: center; padding: 48px 20px;">
        <span style="font-size: 48px;">📦</span>
        <h3 style="margin: 12px 0 6px;">No orders found yet</h3>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Place your first order of farm vegetables & fruits to track delivery live.</p>
        <button class="btn btn-primary" onclick="switchNavTab('store')">Browse Farm Produce</button>
      </div>
    `;
    return;
  }

  orders.forEach(o => {
    const card = document.createElement("div");
    card.className = "order-history-card";

    let itemsHtml = o.items.map(i => `
      <div style="display:flex; justify-content:space-between; font-size:13px; padding: 4px 0;">
        <span>🥬 ${i.name} × <b>${i.qty}</b></span>
        <span>₹${(i.price * i.qty).toLocaleString("en-IN")}</span>
      </div>
    `).join("");

    card.innerHTML = `
      <div class="order-card-header">
        <div>
          <span class="order-id-code">${o.orderId}</span>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Placed on ${formatDateString(o.date)}</div>
        </div>
        <div>
          <span class="status-tag ${o.status.toLowerCase().replace(/ /g, '-')}">${o.status}</span>
        </div>
      </div>

      <div class="order-timeline">
        <div class="timeline-step done"><span>✓</span> Confirmed</div>
        <span>→</span>
        <div class="timeline-step ${o.status !== 'Confirmed' ? 'done' : 'active'}"><span>●</span> Fresh Packed</div>
        <span>→</span>
        <div class="timeline-step ${o.status === 'Out for Delivery' ? 'active' : (o.status === 'Delivered' ? 'done' : '')}"><span>🚚</span> Dispatched</div>
        <span>→</span>
        <div class="timeline-step ${o.status === 'Delivered' ? 'done' : ''}"><span>📦</span> Delivered</div>
      </div>

      <div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin: 12px 0;">
        <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px; color: #334155;">Ordered Items:</div>
        ${itemsHtml}
        <div style="border-top: 1px dashed #cbd5e1; margin-top: 8px; padding-top: 8px; display: flex; justify-content: space-between; font-weight: 700; font-size: 14px;">
          <span>Total Paid (${o.payment})</span>
          <span class="text-green">₹${o.total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div style="font-size: 12px; color: #64748b; display: flex; justify-content: space-between; align-items: center;">
        <div>📍 Deliver to: <b>${o.customer.name}</b>, ${o.customer.address} (${o.customer.pincode})</div>
        <button class="btn btn-outline btn-sm" onclick="showToast('Invoice for ${o.orderId} downloaded!', 'info')">📄 Download Invoice</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// --- 10. SELLER HUB (F2) ---
function toggleAddProductForm() {
  const card = document.getElementById("addProductCard");
  if (!card) return;
  card.style.display = card.style.display === "none" ? "block" : "none";
}

function saveNewProduct() {
  const name = document.getElementById("newProdName")?.value.trim();
  const category = document.getElementById("newProdCategory")?.value;
  const price = parseFloat(document.getElementById("newProdPrice")?.value);
  const unit = document.getElementById("newProdUnit")?.value.trim() || "per kg";
  const brand = document.getElementById("newProdBrand")?.value.trim() || "Farm Direct";
  const stock = document.getElementById("newProdStock")?.value.trim() || "In Stock (30 kg)";
  const image = document.getElementById("newProdImage")?.value.trim();
  const desc = document.getElementById("newProdDesc")?.value.trim() || "Fresh harvest produce directly delivered.";

  if (!name || isNaN(price) || price <= 0 || !image) {
    showToast("Please provide valid produce name, price, and image URL.", "error");
    return;
  }

  const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProd = {
    id: newId,
    name: name,
    brand: brand,
    category: category,
    price: price,
    unit: unit,
    rating: "⭐⭐⭐⭐⭐",
    ratingVal: 5.0,
    reviewsCount: 1,
    stock: stock,
    badge: "Seller Fresh",
    badgeType: "organic",
    image: image,
    description: desc
  };

  products.unshift(newProd);
  localStorage.setItem("vfm_products", JSON.stringify(products));

  showToast(`Successfully published ${name} to live catalog!`, "success");
  toggleAddProductForm();
  renderSellerInventory();
  renderProducts();
}

function renderSellerInventory() {
  const tbody = document.getElementById("sellerInventoryBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  products.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${p.image}" style="width:36px; height:36px; border-radius:6px; object-fit:cover;">
          <div>
            <b>${p.name}</b><br>
            <span style="color:#64748b; font-size:11px;">${p.brand}</span>
          </div>
        </div>
      </td>
      <td><span class="status-tag" style="background:#f1f5f9; color:#334155;">${p.category}</span></td>
      <td><b>₹${p.price}</b> <span style="font-size:11px; color:#64748b;">${p.unit}</span></td>
      <td><span class="status-tag confirmed">${p.stock}</span></td>
      <td>${p.rating} (${p.ratingVal})</td>
      <td>
        <button class="btn btn-outline btn-sm" style="color:#ef4444;" onclick="deleteSellerProduct(${p.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteSellerProduct(id) {
  if (!confirm("Are you sure you want to remove this product listing?")) return;
  products = products.filter(p => p.id !== id);
  localStorage.setItem("vfm_products", JSON.stringify(products));
  showToast("Product listing removed.", "info");
  renderSellerInventory();
  renderProducts();
}

// --- 11. ADMIN PANEL CONTROL (F7) ---
function renderAdminDashboard() {
  const totalOrdersEl = document.getElementById("adminTotalOrders");
  const totalRevEl = document.getElementById("adminTotalRevenue");
  const totalItemsEl = document.getElementById("adminTotalItems");
  const tbody = document.getElementById("adminOrdersBody");

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  if (totalOrdersEl) totalOrdersEl.innerText = orders.length;
  if (totalRevEl) totalRevEl.innerText = totalRevenue.toLocaleString("en-IN");
  if (totalItemsEl) totalItemsEl.innerText = products.length;

  if (!tbody) return;
  tbody.innerHTML = "";

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:#64748b;">No system orders logged yet.</td></tr>`;
    return;
  }

  orders.forEach((o, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><b>${o.orderId}</b></td>
      <td>${o.customer.name}</td>
      <td>${o.items.reduce((s, x) => s + x.qty, 0)} items</td>
      <td><b>₹${o.total.toLocaleString("en-IN")}</b></td>
      <td>${o.payment}</td>
      <td>
        <select onchange="updateOrderStatus(${idx}, this.value)" style="padding:4px 8px; font-size:12px; border-radius:4px;">
          <option value="Confirmed" ${o.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
          <option value="Out for Delivery" ${o.status === "Out for Delivery" ? "selected" : ""}>Out for Delivery</option>
          <option value="Delivered" ${o.status === "Delivered" ? "selected" : ""}>Delivered</option>
        </select>
      </td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="showToast('Order details verified.', 'info')">Audit</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateOrderStatus(index, newStatus) {
  if (!orders[index]) return;
  orders[index].status = newStatus;
  localStorage.setItem("vfm_orders", JSON.stringify(orders));
  showToast(`Order ${orders[index].orderId} updated to ${newStatus}!`, "success");
  renderAdminDashboard();
}

// --- 12. PRODUCT REVIEWS MODAL (F8) ---
function openReviewsModal(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  currentReviewProductId = productId;
  const preview = document.getElementById("reviewProductPreview");
  if (preview) {
    preview.innerHTML = `
      <img src="${prod.image}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
      <div>
        <h4 style="margin:0;">${prod.name}</h4>
        <div style="font-size:12px; color:#64748b;">${prod.brand} • ₹${prod.price} ${prod.unit}</div>
      </div>
    `;
  }

  renderProductReviewsList(productId);
  document.getElementById("reviewModal").style.display = "block";
}

function setRatingPick(stars) {
  currentRatingScore = stars;
  const picks = document.querySelectorAll(".star-pick");
  picks.forEach((p, idx) => {
    p.classList.toggle("active", idx < stars);
  });
  const label = document.getElementById("ratingScoreText");
  if (label) label.innerText = `${stars} / 5 Stars`;
}

function submitProductReview() {
  const comment = document.getElementById("reviewCommentInput")?.value.trim();
  if (!comment) {
    showToast("Please enter a few words about your experience.", "error");
    return;
  }

  if (!reviews[currentReviewProductId]) {
    reviews[currentReviewProductId] = [];
  }

  const reviewEntry = {
    user: currentRole + " (" + (document.getElementById("username")?.value.split("@")[0] || "Customer") + ")",
    stars: "⭐".repeat(currentRatingScore),
    ratingScore: currentRatingScore,
    comment: comment,
    date: new Date().toLocaleDateString("en-IN")
  };

  reviews[currentReviewProductId].unshift(reviewEntry);
  localStorage.setItem("vfm_reviews", JSON.stringify(reviews));

  document.getElementById("reviewCommentInput").value = "";
  showToast("Your review has been verified and posted! ⭐", "success");
  renderProductReviewsList(currentReviewProductId);
}

function renderProductReviewsList(productId) {
  const container = document.getElementById("reviewsListContainer");
  if (!container) return;
  container.innerHTML = "";

  const list = reviews[productId] || [
    {
      user: "Sunita M. (Verified Buyer)",
      stars: "⭐⭐⭐⭐⭐",
      ratingScore: 5,
      comment: "Super fresh! Arrived crisp and naturally chilled within 40 minutes.",
      date: "Yesterday"
    },
    {
      user: "Rajesh K. (Verified Buyer)",
      stars: "⭐⭐⭐⭐⭐",
      ratingScore: 5,
      comment: "Much higher quality than local supermarkets. Excellent packaging.",
      date: "3 days ago"
    }
  ];

  list.forEach(r => {
    const item = document.createElement("div");
    item.className = "single-review-item";
    item.innerHTML = `
      <div class="rev-user">
        <span>${r.user}</span>
        <span style="color:#f59e0b;">${r.stars}</span>
      </div>
      <p class="rev-comment">"${r.comment}"</p>
      <div style="font-size:11px; color:#94a3b8; margin-top:4px;">${r.date}</div>
    `;
    container.appendChild(item);
  });
}

// --- 13. AI CHATBOT SHOPPING ASSISTANT (Weeks 9-10 O4) ---
function toggleChatWindow() {
  const win = document.getElementById("chatWindow");
  if (!win) return;
  win.style.display = win.style.display === "none" ? "flex" : "none";
  if (win.style.display === "flex") {
    document.getElementById("chatInput")?.focus();
  }
}

function handleChatKey(e) {
  if (e.key === "Enter") {
    sendChatMessage();
  }
}

function sendQuickChat(text) {
  const input = document.getElementById("chatInput");
  if (input) input.value = text;
  sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const msg = input?.value.trim();
  if (!msg) return;

  const msgBox = document.getElementById("chatMessages");
  if (!msgBox) return;

  // Add User Message Bubble
  const userBubble = document.createElement("div");
  userBubble.className = "chat-msg user";
  userBubble.innerHTML = `<div class="msg-bubble">${escapeHtml(msg)}</div>`;
  msgBox.appendChild(userBubble);

  input.value = "";
  msgBox.scrollTop = msgBox.scrollHeight;

  // AI Response Simulation with Grocery Domain Logic
  setTimeout(() => {
    const reply = getAIChatbotReply(msg);
    const botBubble = document.createElement("div");
    botBubble.className = "chat-msg bot";
    botBubble.innerHTML = `<div class="msg-bubble">${reply}</div>`;
    msgBox.appendChild(botBubble);
    msgBox.scrollTop = msgBox.scrollHeight;
  }, 450);
}

function getAIChatbotReply(query) {
  const q = query.toLowerCase();

  if (q.includes("delivery") || q.includes("charge") || q.includes("shipping")) {
    return "🚚 <b>Express Delivery:</b> All grocery orders are delivered in <b>30–45 minutes</b>! Standard delivery is currently <b>FREE</b> on all orders as part of our harvest promotion.";
  }
  if (q.includes("organic") || q.includes("chemical") || q.includes("natural")) {
    return "🌱 <b>100% Certified Organic:</b> Our organic produce is grown without synthetic pesticides or chemicals in certified Nilgiri and Bio farms. Try our <i>Organic Broccoli</i> and <i>Hass Avocado</i>!";
  }
  if (q.includes("payment") || q.includes("upi") || q.includes("cod") || q.includes("cash")) {
    return "💳 <b>Payment Methods:</b> We accept instant <b>UPI (Google Pay, PhonePe, Paytm)</b> and <b>Cash on Delivery (COD)</b>. In this capstone demo, checkout uses safe mock confirmation.";
  }
  if (q.includes("return") || q.includes("refund") || q.includes("damaged")) {
    return "🔄 <b>No-Questions-Asked Freshness Guarantee:</b> If any fruit or vegetable is not up to your standards, we offer a 100% instant replacement or refund at delivery arrival.";
  }
  if (q.includes("seller") || q.includes("admin") || q.includes("role")) {
    return "👨‍🌾 <b>Role Support:</b> Switch between <b>Buyer</b>, <b>Seller Hub</b>, and <b>Admin Dashboard</b> anytime using the top navigation bar to test all Capstone features (F1–F8).";
  }
  if (q.includes("fruit") || q.includes("apple") || q.includes("mango")) {
    return "🍎 <b>Fresh Fruits Available:</b> We have Kinnaur Crisp Apples, Mahabaleshwar Strawberries, Ratnagiri Alphonso Mangoes, and Nagpur Oranges today!";
  }
  if (q.includes("vegetable") || q.includes("tomato") || q.includes("potato")) {
    return "🥦 <b>Vegetables Today:</b> Fresh country tomatoes at ₹45/kg, sweet Ooty carrots at ₹60/kg, tender Punjabi peas, and farm baby potatoes are freshly stocked!";
  }

  return "🥬 I can assist you with product availability, prices, order status tracking, organic certifications, and delivery options! Try asking: <i>'What organic vegetables do you have?'</i> or <i>'Is delivery free?'</i>.";
}

// --- 14. HELPER UTILITIES ---
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

function formatDateString(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  } catch (e) {
    return dateStr;
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Window click to close modals when clicking backdrop
window.onclick = function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

// Initialize Application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initState();
});
