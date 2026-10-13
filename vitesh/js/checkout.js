/**
 * VITESH FRESH MART - Checkout Processing Flow
 * File: js/checkout.js
 * Implements Capstone F5: Customer info validation, delivery scheduling, order placement
 */

function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is empty. Add fresh products to proceed.", "error");
    return;
  }
  closeModal("cartModal");
  openCheckout();
}

function openCheckout() {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
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

  // Initialize selected payment method (Default to Google Pay with live QR)
  selectPaymentMethod(selectedPaymentApp || "GPAY");

  const checkoutModal = document.getElementById("checkoutModal");
  if (checkoutModal) {
    checkoutModal.style.display = "block";
  }
}

function placeOrder() {
  const nameInput = document.getElementById("customerName");
  const phoneInput = document.getElementById("customerPhone");
  const addressInput = document.getElementById("customerAddress");
  const pincodeInput = document.getElementById("customerPincode");
  const deliveryDateInput = document.getElementById("deliveryDate");

  const name = nameInput ? nameInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const address = addressInput ? addressInput.value.trim() : "";
  const pincode = pincodeInput ? pincodeInput.value.trim() : "";
  const deliveryDate = deliveryDateInput ? deliveryDateInput.value : "";

  // Validation
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

  let paymentMethodLabel = "Cash on Delivery (COD)";
  if (selectedPaymentApp === "GPAY") paymentMethodLabel = "Google Pay (GPay UPI)";
  else if (selectedPaymentApp === "PHONEPE") paymentMethodLabel = "PhonePe (UPI)";
  else if (selectedPaymentApp === "PAYTM") paymentMethodLabel = "Paytm / BHIM UPI";

  const grandTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const orderId = "#VFM" + Math.floor(100000 + Math.random() * 900000);

  const newOrder = {
    orderId: orderId,
    date: new Date().toISOString(),
    deliveryDate: deliveryDate,
    customer: { name, phone, address, pincode },
    items: [...cart],
    payment: paymentMethodLabel,
    total: grandTotal,
    status: "Confirmed"
  };

  // Persist order in local storage
  orders.unshift(newOrder);
  localStorage.setItem("vfm_orders", JSON.stringify(orders));

  // Populate Order Success Receipt Modal
  const orderIdEl = document.getElementById("orderId");
  const successNameEl = document.getElementById("successName");
  const successDateEl = document.getElementById("successDate");
  const successPaymentEl = document.getElementById("successPayment");
  const successTotalEl = document.getElementById("successTotal");

  if (orderIdEl) orderIdEl.innerText = orderId;
  if (successNameEl) successNameEl.innerText = name;
  if (successDateEl) successDateEl.innerText = formatDateString(deliveryDate);
  if (successPaymentEl) successPaymentEl.innerText = paymentMethodLabel;
  if (successTotalEl) successTotalEl.innerText = grandTotal.toLocaleString("en-IN");

  // Clear Cart
  cart = [];
  saveCart();
  updateCartBadge();
  updateOrdersBadge();

  closeModal("checkoutModal");
  const successModal = document.getElementById("successModal");
  if (successModal) {
    successModal.style.display = "block";
  }

  showToast("Order placed successfully! 🎉", "success");
}

function viewPlacedOrders() {
  closeModal("successModal");
  switchNavTab("orders");
}

function updateOrdersBadge() {
  const badge = document.getElementById("orderCountBadge");
  if (badge) {
    badge.innerText = orders.length;
  }
}
