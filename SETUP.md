# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend-new
npm install
```

## Step 2: Setup Database

### Option A: Automatic (Recommended)
The database will be created automatically when you start the backend server for the first time.

### Option B: Manual
```bash
mysql -u root -p
CREATE DATABASE amazon_clone;
EXIT;
```

## Step 3: Configure Database Connection

Edit `backend/config/db.js` and update your MySQL credentials:
```javascript
const pool = mysql.createPool({
  host: "localhost",
  user: "root",               // Your MySQL username
  password: "1Jan,1980",      // Your MySQL password
  database: "amazon_clone",
});
```

## Step 4: Start Backend Server

```bash
cd backend
npm run dev
```

Should see:
```
📦 Initializing database...
✅ Users table created
✅ Products table created
...
🌱 Seeding products...
✅ 43 products seeded successfully!
🚀 Server running on port 5000
```

## Step 5: Start Frontend Server

In a new terminal:
```bash
cd frontend-new
npm run dev
```

Should see:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

## Step 6: Open in Browser

Visit: `http://localhost:5173`

## 🎯 Try These Features

1. **Register**: Click "Create account" → Fill form → Create Account
2. **Browse Products**: View all products with filtering and search
3. **Add to Cart**: Click on product → Add to Cart
4. **View Cart**: Click cart icon → Manage quantities → See totals

## 📋 What Gets Created

When you start the backend, these are automatically created:

### Database Tables
- `users` - User accounts
- `products` - 43 pre-loaded products
- `orders` - Customer orders
- `order_items` - Items in orders
- `reviews` - Product reviews
- `wishlist` - Customer wishlists
- `user_addresses` - Delivery addresses

### Sample Products (43 total)
- 7 Electronics items
- 6 Shoes
- 5 Clothing
- 7 Home & Kitchen
- 3 Books
- 3 Beauty products
- 3 Sports items
- 3 Furniture items

## ✨ Default Features

✅ Register & Login with JWT  
✅ Browse 43 Products  
✅ Filter by Category  
✅ Search Products  
✅ View Product Details  
✅ Add to Cart (with quantities)  
✅ Cart Persistence (localStorage)  
✅ Calculate Totals with Tax & Shipping  

## 🔒 Test Credentials

After registration, use your credentials to login.

Or create a test account:
- **Name**: Test User
- **Email**: test@example.com
- **Password**: test123

## 🛠️ Troubleshooting

### "Can't connect to MySQL"
```bash
# Make sure MySQL is running
mysql -u root -p  # Enter password, should connect
exit
```

### "Port 5000 already in use"
```bash
# Kill the process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### "Frontend can't reach backend"
- Check backend is running on `http://localhost:5000`
- Check that there are no CORS errors in browser console
- Restart both servers

## 📚 Next Steps

1. Try different product categories
2. Add multiple items to cart
3. Register different user accounts
4. Search for products by name

## 🎓 Project Structure

```
amazon-clone/
├── backend/              # Node.js + Express APIs
│   ├── routes/          # API endpoints
│   ├── config/          # Database config
│   └── server.js        # Main server
│
└── frontend-new/        # React + Vite UI
    ├── src/
    │   ├── pages/       # Page components
    │   ├── components/  # UI components
    │   ├── context/     # State management
    │   └── App.jsx      # Main app
```

## 🎯 Key Files to Know

**Backend**
- `backend/server.js` - Where server starts
- `backend/routes/products.js` - Product API
- `backend/routes/auth.js` - Login/Register API

**Frontend**
- `frontend-new/src/App.jsx` - Main routing
- `frontend-new/src/pages/Home.jsx` - Product listing
- `frontend-new/src/context/CartContext.jsx` - Cart state

## 🔑 Important Notes

1. **Database Resets**: Products are seeded fresh each server start
2. **JWT Token**: Stored in localStorage, valid for 30 days
3. **Cart**: Persists in browser localStorage
4. **Images**: Products use real images from Unsplash

---

**You're all set! Start building!** 🚀
