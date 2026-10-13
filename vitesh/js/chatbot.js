/**
 * VITESH FRESH MART - AI Chatbot Assistant Engine
 * File: js/chatbot.js
 * Implements Capstone O4 (Weeks 9-10): Domain-restricted grocery AI assistant & smart FAQ
 */

function toggleChatWindow() {
  const win = document.getElementById("chatWindow");
  if (!win) return;
  win.style.display = win.style.display === "none" ? "flex" : "none";
  if (win.style.display === "flex") {
    const input = document.getElementById("chatInput");
    if (input) input.focus();
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
  const msg = input ? input.value.trim() : "";
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
  }, 400);
}

function getAIChatbotReply(query) {
  const q = query.toLowerCase();

  if (q.includes("delivery") || q.includes("charge") || q.includes("shipping") || q.includes("time")) {
    return "🚚 <b>Express Delivery:</b> All grocery orders are dispatched within <b>30–45 minutes</b>! Standard delivery is currently <b>FREE</b> on all orders as part of our harvest promotion.";
  }
  if (q.includes("organic") || q.includes("chemical") || q.includes("natural")) {
    return "🌱 <b>100% Certified Organic:</b> Our organic produce is grown without synthetic pesticides or chemicals in certified Nilgiri and Bio farms. Try our <i>Organic Broccoli</i> and <i>Hass Avocado</i>!";
  }
  if (q.includes("payment") || q.includes("upi") || q.includes("cod") || q.includes("gpay") || q.includes("phonepe") || q.includes("qr")) {
    return "💳 <b>Live Payment Support:</b> We accept instant <b>Google Pay (GPay)</b>, <b>PhonePe</b>, <b>Paytm UPI</b> with a <b>real scannable QR Code</b>, as well as <b>Cash on Delivery (COD)</b>!";
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

  return "🥬 I can assist you with product availability, prices, live UPI QR payments, order status tracking, and organic certifications! Try asking: <i>'How can I pay with GPay or PhonePe?'</i> or <i>'Is delivery free?'</i>.";
}
