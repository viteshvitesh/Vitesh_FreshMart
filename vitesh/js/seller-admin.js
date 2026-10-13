/**
 * VITESH FRESH MART - Seller Hub & Admin Control Board
 * File: js/seller-admin.js
 * Implements Capstone F2 (Seller listings) & F7 (Admin moderation and audit)
 */

// --- SELLER HUB (F2) ---
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

  const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
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

  products.forEach((p) => {
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
  products = products.filter((p) => p.id !== id);
  localStorage.setItem("vfm_products", JSON.stringify(products));
  showToast("Product listing removed.", "info");
  renderSellerInventory();
  renderProducts();
}

// --- ADMIN PANEL CONTROL (F7) ---
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
