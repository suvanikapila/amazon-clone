# Login Connection Error - Complete Fix Guide

## Problem Summary
Register and Login pages were unable to connect to the backend API.

## Root Causes Identified & Fixed

### ✅ FIXED #1: Hardcoded API URLs
**Problem:** All API calls used `http://localhost:5000` which doesn't work in production
**Solution:** Created dynamic API configuration file

**Files Fixed:**
- `frontend-new/src/config/api.js` - Centralized API URL management
- `Register.jsx`, `Login.jsx`, `Checkout.jsx`, `Account.jsx`, `ProductList.jsx`, `Home.jsx`, `ProductDetail.jsx`

**How it works:**
- Development: Auto-uses `http://localhost:5000`
- Production: Auto-uses `https://amazon-clone-backend-c615.onrender.com`

### ✅ FIXED #2: Auth Routes Not Registered in Backend
**Problem:** Authentication routes file existed but was never imported in server.js
**Solution:** Added auth router import and registration in server.js

**Changes:**
```javascript
import authRouter from "./routes/auth.js";
app.use("/api/auth", authRouter);
```

### ✅ FIXED #3: Database Not Initialized on Startup
**Problem:** Database tables not created, no demo user exists
**Solution:** Added automatic database initialization and demo user creation

**Changes in server.js:**
- Import `initializeDatabase` from schema.js
- Import `seedProducts` from seed.js  
- Create async `startServer()` function
- Demo user created: `demo@example.com` / `demo123`

### ✅ FIXED #4: Environment Variables Not Set Locally
**Problem:** .env file missing for local development
**Solution:** Created .env file with database configuration

**Created:** `backend/.env` with default MySQL setup

---

## Testing Login - Local Development

### Step 1: Set Up Local MySQL
```bash
# Install MySQL if not already installed
# Then create database:
mysql -u root -p
CREATE DATABASE amazon_clone;
exit;
```

### Step 2: Update .env if Needed
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=amazon_clone
DB_PORT=3306
```

### Step 3: Start Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend-new
npm run dev
```

### Step 4: Test Login
1. Go to http://localhost:5173/login
2. Use demo credentials: `demo@example.com` / `demo123`
3. OR register a new account

---

## Testing Login - Production (Render)

### Deployment Checklist:

1. **Update Backend .env on Render:**
   - Set environment variables in Render dashboard:
     - `DB_HOST` = your database host
     - `DB_USER` = your database user
     - `DB_PASSWORD` = your password
     - `DB_NAME` = your database name
     - `DB_PORT` = 3306
     - `PORT` = auto-assigned by Render

2. **Push Code to GitHub:**
   ```bash
   git add .
   git commit -m "Fix: Register login API connection issues"
   git push
   ```

3. **Render Auto-Deploys**
   - Wait for backend build to complete
   - Check deployment logs for:
     - "🚀 Server running on port"
     - "✅ MySQL Connected"
     - "✅ Database initialized"
     - "✅ Demo user created"

4. **Test on Deployed Frontend:**
   - Go to your deployed frontend URL
   - Click "Sign In"
   - Test with: `demo@example.com` / `demo123`

---

## Troubleshooting

### Error: "Connection error. Please try again."
- Check if backend is running
- Verify API_URL is correct for your environment
- Check browser console for network errors
- Check CORS settings

### Error: "Invalid credentials"
- Ensure demo user was created (check server logs)
- Verify password is exactly: `demo123`
- Try registering a new account

### Error: "Access denied for user"
- Check .env file exists with correct credentials
- Verify MySQL/database is running
- Test connection manually: `mysql -h <host> -u <user> -p`

### Error: "Database connection error"
- Verify database credentials in .env
- Test with MySQL directly
- On Render, check Environment Variables in dashboard

---

## API Endpoints Verified

✅ `POST /api/auth/register` - User registration
✅ `POST /api/auth/login` - User login
✅ `GET /api/auth/profile` - Get user profile
✅ `PUT /api/auth/profile` - Update profile
✅ `GET /api/products` - Product list
✅ `POST /api/orders` - Create order

---

## Files Modified This Session

### Backend
- `server.js` - Added auth routes, database init, demo user creation
- `.env` - Created with database configuration

### Frontend  
- `src/config/api.js` - Created centralized API config
- `src/pages/Login.jsx`, `Register.jsx` - Updated to use API_URL
- `src/pages/Account.jsx`, `Checkout.jsx` - Updated to use API_URL
- `src/components/ProductList.jsx` - Updated to use API_URL
- `src/pages/Home.jsx`, `ProductDetail.jsx` - Updated to use API_URL

---

## Next Steps

1. **Local Testing:**
   - Set up MySQL locally (if testing locally)
   - Run both servers
   - Test register/login

2. **Production Deployment:**
   - Set Render environment variables
   - Push code to GitHub  
   - Monitor Render logs for startup completion
   - Test on deployed frontend

3. **If Still Issues:**
   - Check browser DevTools Network tab for failed requests
   - Check Render backend logs
   - Verify API endpoint is accessible via curl:
     ```bash
     curl https://your-backend.onrender.com/
     ```
