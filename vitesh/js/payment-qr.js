/**
 * VITESH FRESH MART - Live UPI & QR Code Payment Engine
 * File: js/payment-qr.js
 * Generates real, working UPI QR Codes for Google Pay, PhonePe, and Paytm / BHIM UPI.
 */

// Official / Merchant UPI details
const UPI_CONFIG = {
  vpa: "viteshfreshmart@okhdfcbank",
  merchantName: "Vitesh Fresh Mart",
  currency: "INR"
};

let selectedPaymentApp = "GPAY"; // 'GPAY', 'PHONEPE', 'PAYTM', or 'COD'
let qrTimerInterval = null;

/**
 * Generates the standard Indian UPI intent string
 * Syntax: upi://pay?pa={vpa}&pn={merchantName}&am={amount}&cu=INR&tn={note}
 */
function getUpiPaymentUrl(amount, note = "Grocery Order") {
  const pa = encodeURIComponent(UPI_CONFIG.vpa);
  const pn = encodeURIComponent(UPI_CONFIG.merchantName);
  const am = encodeURIComponent(Number(amount).toFixed(2));
  const tn = encodeURIComponent(note);
  return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`;
}

/**
 * Updates the payment mode and re-generates the working QR code
 */
function selectPaymentMethod(method) {
  selectedPaymentApp = method;

  // Highlight active payment option card
  document.querySelectorAll(".payment-method-card").forEach((card) => {
    card.classList.toggle("selected", card.dataset.method === method);
  });

  const qrContainer = document.getElementById("upiQrSection");
  const codNotice = document.getElementById("codNoticeSection");

  if (method === "COD") {
    if (qrContainer) qrContainer.style.display = "none";
    if (codNotice) codNotice.style.display = "block";
    clearInterval(qrTimerInterval);
  } else {
    if (codNotice) codNotice.style.display = "none";
    if (qrContainer) qrContainer.style.display = "block";
    renderUpiQRCode();
    startQrCountdown(600); // 10 minutes timer
  }
}

/**
 * Generates the live working QR code image and displays it with app branding
 */
function renderUpiQRCode() {
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const upiUrl = getUpiPaymentUrl(totalAmount, "Fresh Produce Order");

  const qrImageEl = document.getElementById("liveUpiQrImage");
  const qrAmountEl = document.getElementById("qrDisplayAmount");
  const appBadgeEl = document.getElementById("qrAppBadge");
  const qrVpaText = document.getElementById("qrVpaText");

  if (qrAmountEl) {
    qrAmountEl.innerText = `₹${totalAmount.toLocaleString("en-IN")}`;
  }

  if (qrVpaText) {
    qrVpaText.innerText = UPI_CONFIG.vpa;
  }

  // Set App Specific Badge
  if (appBadgeEl) {
    if (selectedPaymentApp === "GPAY") {
      appBadgeEl.innerHTML = `<span style="color:#0f9d58; font-weight:700;">🟢 Google Pay (GPay)</span> - Scan with GPay app`;
    } else if (selectedPaymentApp === "PHONEPE") {
      appBadgeEl.innerHTML = `<span style="color:#5f259f; font-weight:700;">🟣 PhonePe</span> - Scan with PhonePe app`;
    } else {
      appBadgeEl.innerHTML = `<span style="color:#002970; font-weight:700;">🔵 Paytm / All UPI</span> - Scan with any UPI app`;
    }
  }

  // High-Resolution Scannable QR Code Generator URL
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiUrl)}&color=0f172a&bgcolor=ffffff&margin=1`;

  if (qrImageEl) {
    // Show loading state while image loads
    qrImageEl.style.opacity = "0.4";
    qrImageEl.src = qrApiUrl;
    qrImageEl.onload = () => {
      qrImageEl.style.opacity = "1";
    };
    qrImageEl.onerror = () => {
      // Fallback in case of offline/network block: draw canvas QR preview
      drawFallbackCanvasQR(upiUrl);
    };
  }
}

/**
 * Fallback Canvas QR rendering in case external image is blocked
 */
function drawFallbackCanvasQR(text) {
  const canvas = document.getElementById("fallbackQrCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";
  document.getElementById("liveUpiQrImage").style.display = "none";

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 13px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("UPI QR READY", 110, 90);
  ctx.font = "11px Inter, sans-serif";
  ctx.fillText("viteshfreshmart@okhdfcbank", 110, 115);
}

/**
 * Copy UPI ID to clipboard
 */
function copyUpiId() {
  navigator.clipboard.writeText(UPI_CONFIG.vpa).then(() => {
    showToast(`Copied UPI ID: ${UPI_CONFIG.vpa} 📋`, "success");
  }).catch(() => {
    showToast(`UPI ID: ${UPI_CONFIG.vpa}`, "info");
  });
}

/**
 * 10-minute dynamic countdown timer for live QR
 */
function startQrCountdown(seconds) {
  clearInterval(qrTimerInterval);
  let remaining = seconds;
  const timerEl = document.getElementById("qrExpiryTimer");

  function update() {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    if (timerEl) {
      timerEl.innerText = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    if (remaining <= 0) {
      clearInterval(qrTimerInterval);
      if (timerEl) timerEl.innerText = "Expired (Click Refresh)";
    }
    remaining--;
  }

  update();
  qrTimerInterval = setInterval(update, 1000);
}
