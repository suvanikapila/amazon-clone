# Amazon Clone - Full Stack E-Commerce Application

A fully functional e-commerce application inspired by Amazon, built with React, Node.js, and MySQL.

## ✨ Features

- **User Authentication**: Register and login with secure password hashing
- **Product Catalog**: Browse 43 different products across multiple categories
- **Shopping Cart**: Add/remove products, manage quantities, view totals
- **Product Search**: Search by product name across all products
- **Category Filtering**: Filter products by categories (Electronics, Shoes, Clothing, Home, Books, Beauty, Sports, Furniture)
- **Product Details**: View detailed information about each product
- **Responsive Design**: Mobile-friendly interface
- **Local Storage**: Cart and user session persistence

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Database**
   - Update [backend/config/db.js](backend/config/db.js) with your MySQL credentials:
   ```javascript
   const pool = mysql.createPool({
     host: "localhost",
     user: "root",
     password: "your_password",
     database: "amazon_clone",
   });
   ```

3. **Create Database** (optional - automatically created on first run)
   ```bash
   mysql -u root -p
   CREATE DATABASE amazon_clone;
   ```

4. **Start Backend Server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend-new
   npm install
   ```

2. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## 📁 Project Structure

```
amazon-clone/
├── backend/
│   ├── config/
│   │   ├── db.js          # Database connection
│   │   ├── schema.js      # Database schema initialization
│   │   └── seed.js        # Seed data
│   ├── routes/
│   │   ├── auth.js        # Authentication endpoints
│   │   ├── products.js    # Product endpoints
│   │   ├── cart.js        # Cart endpoints
│   │   ├── orders.js      # Order endpoints
│   │   ├── reviews.js     # Review endpoints
│   │   └── wishlist.js    # Wishlist endpoints
│   ├── server.js          # Main server file
│   └── package.json
│
└── frontend-new/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── ProductList.jsx
    │   │   ├── Footer.jsx
    │   │   └── ProductImages.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx    # Authentication state
    │   │   └── CartContext.jsx    # Cart state management
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Cart.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Checkout.jsx
    │   │   └── Orders.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── assets/
    ├── package.json
    └── vite.config.js
```

## 🔑 Key Features Explained

### Authentication
- User registration with email validation
- Secure login with JWT tokens
- Password hashing using bcryptjs
- Session persistence with localStorage

### Products
- 43 pre-seeded products across 8 categories
- Product images from Unsplash
- Ratings and reviews
- Discount information
- Stock status

### Shopping Cart
- Add multiple quantities of products
- Remove items from cart
- Update quantities dynamically
- Calculate totals with tax (10%) and shipping
- Free shipping over ₹500

### Database Schema
- **users**: User accounts and credentials
- **products**: Product catalog
- **orders**: Customer orders
- **order_items**: Items in each order
- **reviews**: Product reviews
- **wishlist**: Customer wishlists
- **user_addresses**: Delivery addresses

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `DELETE /api/cart/:id` - Remove from cart
- `PUT /api/cart/:id` - Update cart quantity

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Add review

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

## 💻 Technology Stack

### Backend
- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs for password hashing
- **CORS**: Enabled for local development

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Inline CSS (CSS-in-JS)
- **HTTP Client**: Fetch API
- **State Management**: React Context API (Auth & Cart)

## 🧪 Testing the Application

### Test User Flow

1. **Register New Account**
   - Navigate to `http://localhost:5173/register`
   - Fill in name, email, password, phone
   - Click "Create Account"

2. **Browse Products**
   - View all products on home page
   - Filter by category (Electronics, Shoes, etc.)
   - Search for specific products

3. **View Product Details**
   - Click on any product card
   - View full description, rating, reviews
   - See price with discount information

4. **Shopping Cart**
   - Add products to cart (quantity controls available)
   - View cart and manage quantities
   - See order summary with taxes and shipping

5. **Checkout** (UI Ready)
   - Proceed to checkout (integrate payment later)
   - Review order details

## ⚙️ Environment Variables

### Backend (.env - optional)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=amazon_clone
JWT_SECRET=your-secret-key-change-this
PORT=5000
```

## 📝 Sample Products

The database is automatically seeded with 43 products including:
- Electronics (Headphones, Smart Watch, Power Bank, USB Hub, etc.)
- Shoes (Nike, Sneakers, Formal, Sports, etc.)
- Clothing (Jacket, Jeans, T-Shirts, Shirts, Sweater)
- Home & Kitchen (Lamps, Bedsheets, Cookware, Pillows)
- Books (The Midnight Library, Atomic Habits, Psychology of Money)
- Beauty (Face Moisturizer, Shampoo, Sunscreen)
- Sports (Yoga Mat, Dumbbells, Water Bottle)
- Furniture (Office Chair, Study Desk, Coffee Table)

## 🐛 Troubleshooting

### Database Connection Error
- Ensure MySQL server is running
- Check database credentials in [backend/config/db.js](backend/config/db.js)
- Verify database name is "amazon_clone"

### Frontend Cannot Connect to Backend
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled in backend
- Clear browser cache and try again

### Products Not Loading
- Check if database was initialized (should happen automatically)
- Check backend console for error messages
- Restart both frontend and backend servers

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, AWS)
1. Update database connection to use remote MySQL
2. Set environment variables for production
3. Deploy Node.js application

### Frontend Deployment (e.g., Vercel, Netlify)
1. Update API base URL to point to deployed backend
2. Build production version: `npm run build`
3. Deploy dist folder

## 📜 License

This is a demonstration project for educational purposes.

## 🤝 Contributing

Feel free to fork and improve this project!

## 📧 Support

For any issues or questions, please open an issue or check the code comments.

---

**Happy Shopping!** 🛍️
