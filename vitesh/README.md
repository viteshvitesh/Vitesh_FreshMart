# VITESH FRESH MART 🥬
**Anna University Capstone Project — R2025 Semester 3**  
*Java Servlets · JDBC · Apache Tomcat · Live Server Ready*

---

## 🌐 Localhost Link to Open the Website

To open and run the website with **VS Code Live Server**:
1. Open this workspace in **VS Code**.
2. Right-click on [`index.html`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/index.html) and select **"Open with Live Server"** (or click the **Go Live** button in the status bar at bottom right, shortcut `Alt + L, Alt + O`).
3. Your browser will automatically launch:
   👉 **`http://127.0.0.1:5500/index.html`** *(or `http://localhost:5500/index.html`)*

---

## 📂 Modular Architecture (Separated Clean Files)

The project logic is cleanly organized into dedicated, readable files:

| File | Purpose |
| :--- | :--- |
| [`js/products-data.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/products-data.js) | Full 26+ farm produce catalog (Vegetables, Fruits, Leafy Greens, Organic, Seasonal, Best Sellers). |
| [`js/payment-qr.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/payment-qr.js) | **Working Live UPI QR Code Generator** for Google Pay, PhonePe, Paytm, and BHIM UPI with merchant ID `viteshfreshmart@okhdfcbank`. |
| [`js/checkout.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/checkout.js) | Address validation, delivery date picker, payment method selector, and order placement. |
| [`js/cart.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/cart.js) | Cart management (add, buy now, quantity steppers, item removal, running subtotal & total). |
| [`js/catalog.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/catalog.js) | Real-time search, category filtering pills, and multi-option sorting. |
| [`js/auth.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/auth.js) | Multi-role authentication (Buyer, Seller, Admin) and session switching. |
| [`js/orders.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/orders.js) | Buyer order history, delivery timeline progression (*Confirmed → Fresh Packed → Dispatched → Delivered*). |
| [`js/seller-admin.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/seller-admin.js) | Seller listing management (Add, Delete) & Admin platform metric counters & order moderation. |
| [`js/reviews.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/reviews.js) | 5-star customer review & rating submission modal. |
| [`js/chatbot.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/chatbot.js) | Floating AI grocery shopping assistant widget with smart FAQ domain answers. |
| [`js/app.js`](file:///c:/Users/visha/OneDrive/Desktop/vitesh/js/app.js) | Master controller, toast notifications, navigation routing, and `localStorage` synchronization. |

---

## 💳 Working UPI QR Code Payment (Google Pay & PhonePe)

When you checkout:
1. Select **Google Pay (GPay)** or **PhonePe** or **Paytm**.
2. A **real, scannable QR Code** dynamically renders encoding:
   ```
   upi://pay?pa=viteshfreshmart@okhdfcbank&pn=Vitesh%20Fresh%20Mart&am={ORDER_AMOUNT}&cu=INR&tn=Fresh%20Produce%20Order
   ```
3. Features included:
   - Dynamic order amount reflection (e.g. `₹205.00`)
   - Merchant Name: **Vitesh Fresh Mart**
   - Official UPI ID: `viteshfreshmart@okhdfcbank` with a **📋 Copy** button
   - 10-minute active countdown timer
   - Instant order confirmation receipt with a unique `#VFMxxxxxx` Order ID
