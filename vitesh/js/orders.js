/**
 * VITESH FRESH MART - Order History & Status Progression
 * File: js/orders.js
 * Implements Capstone F6 & O2: Order history tracking, status workflow, invoices
 */

let orders = [];

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

  orders.forEach((o) => {
    const card = document.createElement("div");
    card.className = "order-history-card";

    const itemsHtml = o.items
      .map(
        (i) => `
      <div style="display:flex; justify-content:space-between; font-size:13px; padding: 4px 0;">
        <span>🥬 ${i.name} × <b>${i.qty}</b></span>
        <span>₹${(i.price * i.qty).toLocaleString("en-IN")}</span>
      </div>
    `
      )
      .join("");

    card.innerHTML = `
      <div class="order-card-header">
        <div>
          <span class="order-id-code">${o.orderId}</span>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Placed on ${formatDateString(o.date)}</div>
        </div>
        <div>
          <span class="status-tag ${o.status.toLowerCase().replace(/ /g, "-")}">${o.status}</span>
        </div>
      </div>

      <div class="order-timeline">
        <div class="timeline-step done"><span>✓</span> Confirmed</div>
        <span>→</span>
        <div class="timeline-step ${o.status !== "Confirmed" ? "done" : "active"}"><span>●</span> Fresh Packed</div>
        <span>→</span>
        <div class="timeline-step ${o.status === "Out for Delivery" ? "active" : o.status === "Delivered" ? "done" : ""}"><span>🚚</span> Dispatched</div>
        <span>→</span>
        <div class="timeline-step ${o.status === "Delivered" ? "done" : ""}"><span>📦</span> Delivered</div>
      </div>

      <div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin: 12px 0;">
        <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px; color: #334155;">Ordered Items:</div>
        ${itemsHtml}
        <div style="border-top: 1px dashed #cbd5e1; margin-top: 8px; padding-top: 8px; display: flex; justify-content: space-between; font-weight: 700; font-size: 14px;">
          <span>Total Paid (${o.payment})</span>
          <span class="text-green">₹${o.total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div style="font-size: 12px; color: #64748b; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div>📍 Deliver to: <b>${o.customer.name}</b>, ${o.customer.address} (${o.customer.pincode})</div>
        <button class="btn btn-outline btn-sm" onclick="showToast('Invoice for ${o.orderId} downloaded!', 'info')">📄 Download Invoice</button>
      </div>
    `;
    container.appendChild(card);
  });
}
