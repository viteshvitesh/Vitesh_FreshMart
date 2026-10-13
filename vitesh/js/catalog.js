/**
 * VITESH FRESH MART - Catalog & Discovery Engine
 * File: js/catalog.js
 * Implements Capstone F3: Buyer product browsing, real-time search, category filtering & sorting
 */

let selectedCategory = "All";
let currentSort = "featured";

function renderProducts(listToRender = null) {
  const grid = document.getElementById("products");
  if (!grid) return;

  const list = listToRender || getFilteredAndSortedProducts();
  const countEl = document.getElementById("resultsCount");
  if (countEl) {
    countEl.innerText = `Showing ${list.length} fresh produce item${list.length === 1 ? "" : "s"}`;
  }

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

  list.forEach((p) => {
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
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

  let filtered = products.filter((p) => {
    const matchesSearch =
      !searchTerm ||
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

  // Sorting Logic
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
    document.querySelectorAll(".cat-pill").forEach((p) => p.classList.remove("active"));
    btnElement.classList.add("active");
  } else {
    document.querySelectorAll(".cat-pill").forEach((p) => {
      p.classList.toggle("active", p.innerText.includes(cat));
    });
  }

  renderProducts();
}

function handleSearch() {
  const input = document.getElementById("searchInput");
  const val = input ? input.value : "";
  const clearBtn = document.getElementById("clearSearchBtn");

  if (clearBtn) {
    clearBtn.style.display = val ? "block" : "none";
  }

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
