/**
 * VITESH FRESH MART - Shopping Cart Management
 * File: js/cart.js
 * Implements Capstone F4: Cart add, update, remove items, running total & counter
 */

let cart = [];

function addToCart(productId) {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;

  const existing = cart.find((item) => item.id === productId);
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
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;

  const existing = cart.find((item) => item.id === productId);
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
  if (badge) {
    badge.innerText = count;
  }
}

function openCart() {
  renderCartModal();
  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.style.display = "block";
  }
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
