/**
 * VITESH FRESH MART - Master Application Controller
 * File: js/app.js
 * Initializes all submodules, navigation routing, toasts, and storage synchronization
 */

let products = [];

// --- INITIALIZE APPLICATION STATE ---
function initState() {
  // 1. Initialize Products
  const storedProds = localStorage.getItem("vfm_products");
  if (storedProds) {
    try {
      products = JSON.parse(storedProds);
      if (!Array.isArray(products) || products.length < 15) {
        products = typeof INITIAL_PRODUCTS !== "undefined" ? [...INITIAL_PRODUCTS] : [];
        localStorage.setItem("vfm_products", JSON.stringify(products));
      }
    } catch (e) {
      products = typeof INITIAL_PRODUCTS !== "undefined" ? [...INITIAL_PRODUCTS] : [];
    }
  } else {
    products = typeof INITIAL_PRODUCTS !== "undefined" ? [...INITIAL_PRODUCTS] : [];
    localStorage.setItem("vfm_products", JSON.stringify(products));
  }

  // 2. Initialize Cart
  const storedCart = localStorage.getItem("vfm_cart");
  if (storedCart) {
    try {
      cart = JSON.parse(storedCart);
    } catch (e) {
      cart = [];
    }
  }

  // 3. Initialize Orders
  const storedOrders = localStorage.getItem("vfm_orders");
  if (storedOrders) {
    try {
      orders = JSON.parse(storedOrders);
    } catch (e) {
      orders = [];
    }
  } else {
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
        payment: "Google Pay (GPay UPI)",
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
        payment: "PhonePe (UPI)",
        total: 175,
        status: "Out for Delivery"
      }
    ];
    localStorage.setItem("vfm_orders", JSON.stringify(orders));
  }

  // 4. Initialize Reviews
  const storedReviews = localStorage.getItem("vfm_reviews");
  if (storedReviews) {
    try {
      reviews = JSON.parse(storedReviews);
    } catch (e) {
      reviews = {};
    }
  }

  // 5. Update UI counters
  if (typeof updateCartBadge === "function") updateCartBadge();
  if (typeof updateOrdersBadge === "function") updateOrdersBadge();
}

// --- TOAST NOTIFICATION UTILITY ---
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = "✅";
  if (type === "error") icon = "⚠️";
  else if (type === "info") icon = "ℹ️";

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- NAVIGATION TAB SWITCHING ---
function switchNavTab(tabName) {
  document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.getElementById(`nav${tabName.charAt(0).toUpperCase() + tabName.slice(1)}Btn`);
  if (activeBtn) activeBtn.classList.add("active");

  const views = ["store", "orders", "seller", "admin"];
  views.forEach((v) => {
    const el = document.getElementById(`${v}View`);
    if (el) el.style.display = v === tabName ? "block" : "none";
  });

  if (tabName === "store" && typeof renderProducts === "function") renderProducts();
  if (tabName === "orders" && typeof renderOrdersHistory === "function") renderOrdersHistory();
  if (tabName === "seller" && typeof renderSellerInventory === "function") renderSellerInventory();
  if (tabName === "admin" && typeof renderAdminDashboard === "function") renderAdminDashboard();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- HELPER UTILITIES ---
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

// Backdrop modal click listener
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  initState();
});
