/**
 * VITESH FRESH MART - Authentication & Role Management
 * File: js/auth.js
 * Implements Capstone F1: Buyer, Seller, and Seeded Admin authentication
 */

let currentRole = "Buyer"; // Default role: 'Buyer', 'Seller', or 'Admin'

function setLoginRole(role) {
  currentRole = role;
  const pills = document.querySelectorAll(".role-pill");
  pills.forEach((pill) => {
    pill.classList.toggle("active", pill.innerText.includes(role));
  });
}

function login() {
  const emailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value.trim() : "";

  if (!email || !email.includes("@")) {
    showToast("Please enter a valid email address.", "error");
    return;
  }
  if (!password) {
    showToast("Please enter a password.", "error");
    return;
  }

  // Switch views
  const loginPage = document.getElementById("loginPage");
  const mainPage = document.getElementById("mainPage");

  if (loginPage) loginPage.style.display = "none";
  if (mainPage) mainPage.style.display = "block";

  updateUserDisplay();
  showToast(`Welcome back! Logged in as ${currentRole}.`, "success");

  // Render the views
  if (typeof renderProducts === "function") renderProducts();
  if (typeof renderSellerInventory === "function") renderSellerInventory();
  if (typeof renderAdminDashboard === "function") renderAdminDashboard();
  if (typeof renderOrdersHistory === "function") renderOrdersHistory();
}

function logout() {
  const loginPage = document.getElementById("loginPage");
  const mainPage = document.getElementById("mainPage");

  if (mainPage) mainPage.style.display = "none";
  if (loginPage) loginPage.style.display = "flex";

  showToast("Logged out successfully.", "info");
}

function updateUserDisplay() {
  const display = document.getElementById("currentUserDisplay");
  const avatar = document.getElementById("userAvatarIcon");

  if (display) display.innerText = currentRole;
  if (avatar) {
    if (currentRole === "Admin") avatar.innerText = "🛡️";
    else if (currentRole === "Seller") avatar.innerText = "👨‍🌾";
    else avatar.innerText = "👤";
  }

  // Role visibility controls
  const sellerBtn = document.getElementById("navSellerBtn");
  const adminBtn = document.getElementById("navAdminBtn");

  if (sellerBtn) {
    sellerBtn.style.display = currentRole === "Buyer" ? "none" : "flex";
  }
  if (adminBtn) {
    adminBtn.style.display = currentRole === "Admin" ? "flex" : "none";
  }
}
