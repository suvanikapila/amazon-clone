# 🎬 How to Run & What to Expect

## Terminal 1: Start Backend

```bash
cd amazon-clone/backend
npm install  # (only first time)
npm run dev
```

**Expected Output:**
```
📦 Initializing database...
✅ Users table created
✅ Products table created
✅ Orders table created
✅ Order Items table created
✅ Reviews table created
✅ Wishlist table created
✅ User Addresses table created
🎉 All tables initialized successfully!

🌱 Seeding products...
✅ 43 products seeded successfully!

🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
```

✅ Server is ready when you see "🚀 Server running on port 5000"

---

## Terminal 2: Start Frontend

```bash
cd amazon-clone/frontend-new
npm install  # (only first time)
npm run dev
```

**Expected Output:**
```
  VITE v4.5.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Frontend is ready at http://localhost:5173/

---

## 🌐 Open Browser

Go to: **http://localhost:5173**

You should see:

```
┌─────────────────────────────────────────────────────────┐
│ 🅰️ amazon  [Search Box]  [Hello Guest] [🛒 Cart (0)]  │
└─────────────────────────────────────────────────────────┘

[All] [Electronics] [Shoes] [Clothing] [Home] [Books] [Beauty] [Sports] [Furniture]

┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Product  │  │ Product  │  │ Product  │  │ Product  │
│ Image    │  │ Image    │  │ Image    │  │ Image    │
│          │  │          │  │          │  │          │
│ Name     │  │ Name     │  │ Name     │  │ Name     │
│ ₹Price   │  │ ₹Price   │  │ ₹Price   │  │ ₹Price   │
│ [Add]    │  │ [Add]    │  │ [Add]    │  │ [Add]    │
│ [Details]│  │ [Details]│  │ [Details]│  │ [Details]│
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

## 🧪 Test Journey

### Step 1: Register Account

1. Click **[Hello Guest]** → **Sign In**
2. Click **"Create account"** link
3. Fill in:
   - **Full Name**: John Doe
   - **Email**: john@example.com
   - **Password**: john123
   - **Phone**: 9999999999
4. Click **"Create Account"**
5. ✅ Redirected to Home

---

### Step 2: Browse Products

1. ✅ You should see 43 products displayed
2. Click **[Electronics]** → See 7 electronics items
3. Try other categories: **[Shoes]**, **[Clothing]**, etc.
4. Search for a product:
   - Type "Nike" in search → See Nike shoes
   - Type "Headphones" → See wireless headphones
   - Clear search → All products return

---

### Step 3: View Product Details

1. Click on any product card → **Product Detail Page**
2. See:
   - Large product image
   - Full name & description
   - Price with discount info
   - Rating & review count
   - Stock status
   - Quantity selector
3. Set quantity to 2
4. Click **"Add to Cart"**

---

### Step 4: Shopping Cart

1. Click **🛒 Cart (2)** in header
2. See cart page with:
   ```
   ┌─────────────────────────┬──────────────────┐
   │ Product Image  [Remove] │ Order Summary    │
   │ Product Name           │ Subtotal: ₹5998  │
   │ Price: ₹2999          │ Shipping: FREE   │
   │ Quantity: [2]          │ Tax (10%): ₹600  │
   │ Subtotal: ₹5998        │ ─────────────────│
   │                        │ Total: ₹6598    │
   └─────────────────────────┴──────────────────┘
   ```
3. Change quantity:
   - Change to 3 → Totals update immediately
   - Change to 1 → Totals update
4. Click **Delete from Cart** → Item removed
5. Add another product
6. See **Proceed to Checkout** button (UI ready)

---

### Step 5: Sign Out

1. Click **"Hello, John Doe"** dropdown
2. Click **"Sign Out"**
3. Header shows **"Hello, Guest"** → Login link

---

### Step 6: Login Again

1. Click **Sign In**
2. Enter:
   - **Email**: john@example.com
   - **Password**: john123
3. Click **"Sign In"**
4. ✅ Logged back in as John Doe
5. Cart preserved! (See items still in cart)

---

## ✨ Features to Try

✅ **Multi-Category Browsing**
   - Switch between 8 categories instantly

✅ **Real-Time Search**
   - Search updates results as you type
   - Case-insensitive matching

✅ **Product Details**
   - Click any product → Full info display
   - Quantity selector (1-10)
   - Discount info displayed

✅ **Cart Persistence**
   - Add items → Refresh page → Items still there!
   - Local storage saves automatically

✅ **Smart Cart Calculations**
   - Add ₹500+ worth → Shipping becomes FREE
   - Tax calculated at 10%
   - Totals update dynamically

✅ **Multiple User Sessions**
   - Open incognito/private window
   - Register different user
   - Each has separate cart and session

---

## 🔍 API Verification

To verify backend is working:

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Browse home page
4. Should see: `GET http://localhost:5000/api/products` → Status 200
5. Should see 43 products in response

Or test manually:
```bash
curl http://localhost:5000/api/products
# Should return array of 43 products
```

---

## 📱 Browser Compatibility

✅ Works on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🎯 Checklist

Before moving to production:

- [ ] Backend starts without errors
- [ ] Frontend loads at localhost:5173
- [ ] Can register new account
- [ ] Can login with registered account
- [ ] Can browse 43 products
- [ ] Can filter by category
- [ ] Can search products
- [ ] Can view product details
- [ ] Can add to cart
- [ ] Cart totals calculate correctly
- [ ] Can update quantities
- [ ] Cart persists on refresh
- [ ] Can logout and back in

---

## 🆘 If Something Breaks

### Port 5000 already in use
```bash
# Kill port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MySQL connection error
```bash
# Check MySQL is running
mysql -u root -p
# Enter your password
exit
```

### Frontend can't reach backend
- Open DevTools (F12)
- Check Console tab
- Should NOT see any CORS errors
- Restart both servers

### Products not loading
- Check backend console for errors
- Clear browser cache: Ctrl+Shift+Del
- Restart both servers

---

## 🎓 Learning Resources

**Key Files to Study:**
- `backend/routes/products.js` - How to query database
- `frontend-new/src/pages/Home.jsx` - How to fetch from API
- `frontend-new/src/context/CartContext.jsx` - State management
- `frontend-new/src/pages/Cart.jsx` - Cart calculations

**Concepts:**
- REST API endpoints
- JWT authentication
- React Context API
- LocalStorage for persistence
- MySQL queries

---

## 🚀 Next Steps

1. ✅ All features work? Add payment gateway
2. ✅ Payment works? Add order confirmation emails
3. ✅ Emails work? Build admin dashboard
4. ✅ Admin ready? Deploy to production

---

**Enjoy your fully functional Amazon clone!** 🎉
