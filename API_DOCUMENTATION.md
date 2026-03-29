# 🔌 API Documentation

Base URL: `http://localhost:5000/api`

---

## 🔐 Authentication Routes

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "john123",
  "phone": "9999999999"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully"
}
```

**Errors:**
- 400: User already exists
- 500: Registration failed

---

### Login User
**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "john123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9999999999"
  }
}
```

**Errors:**
- 401: Invalid credentials
- 500: Login failed

---

### Get User Profile
**GET** `/auth/profile`

Get authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9999999999",
  "createdAt": "2024-03-29T10:30:00.000Z"
}
```

**Errors:**
- 401: No token provided or invalid token
- 500: Failed to fetch profile

---

## 📦 Products Routes

### Get All Products
**GET** `/products`

Retrieve all products.

**Query Parameters:** None

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Wireless Bluetooth Headphones Black",
    "description": "Premium wireless headphones with noise cancellation and 30-hour battery",
    "price": 2999,
    "category": "Electronics",
    "image": "https://images.unsplash.com/...",
    "rating": 4.5,
    "reviewCount": 2245,
    "discount": 15,
    "inStock": true,
    "createdAt": "2024-03-29T10:30:00.000Z"
  },
  ...
]
```

**Example Usage:**
```bash
curl http://localhost:5000/api/products
```

---

### Get Single Product
**GET** `/products/:id`

Get details of a specific product.

**URL Parameters:**
- `id` (required): Product ID (1-43)

**Response (200):**
```json
{
  "id": 1,
  "name": "Wireless Bluetooth Headphones Black",
  "description": "Premium wireless headphones with noise cancellation and 30-hour battery",
  "price": 2999,
  "category": "Electronics",
  "image": "https://images.unsplash.com/...",
  "rating": 4.5,
  "reviewCount": 2245,
  "discount": 15,
  "inStock": true,
  "createdAt": "2024-03-29T10:30:00.000Z"
}
```

**Errors:**
- 404: Product not found
- 500: Server error

**Example Usage:**
```bash
curl http://localhost:5000/api/products/1
```

---

## 🛒 Cart Routes

### Get All Cart Items
**GET** `/cart`

Retrieve all items in cart.

**Response (200):**
```json
[
  {
    "id": 1,
    "product_id": 5,
    "quantity": 2,
    "name": "Portable Power Bank 20000mAh",
    "price": 1299
  },
  ...
]
```

---

### Add to Cart
**POST** `/cart`

Add product to cart.

**Request Body:**
```json
{
  "product_id": 1,
  "quantity": 2
}
```

**Response (201):**
```json
{
  "message": "Added to cart"
}
```

**Errors:**
- 400: Missing product_id or quantity
- 500: Failed to add to cart

---

### Update Cart Item
**PUT** `/cart/:id`

Update quantity of cart item.

**URL Parameters:**
- `id` (required): Cart item ID

**Request Body:**
```json
{
  "quantity": 5
}
```

**Response (200):**
```json
{
  "message": "Cart updated"
}
```

**Errors:**
- 400: Invalid quantity (must be > 0)
- 500: Failed to update cart

---

### Remove from Cart
**DELETE** `/cart/:id`

Delete item from cart.

**URL Parameters:**
- `id` (required): Cart item ID

**Response (200):**
```json
{
  "message": "Removed from cart"
}
```

**Errors:**
- 500: Failed to remove from cart

---

## 📋 Orders Routes

### Create Order
**POST** `/orders`

Create a new order (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 2999
    }
  ],
  "address": {
    "fullName": "John Doe",
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "paymentMethod": "credit_card"
}
```

**Response (201):**
```json
{
  "message": "Order created successfully",
  "orderId": 1,
  "total": 6598
}
```

---

### Get User Orders
**GET** `/orders`

Get all orders for authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "userId": 1,
    "status": "pending",
    "subtotal": 5998,
    "tax": 600,
    "shipping": 0,
    "total": 6598,
    "createdAt": "2024-03-29T10:30:00.000Z",
    "items": [...]
  }
]
```

---

### Get Single Order
**GET** `/orders/:id`

Get details of a specific order.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (required): Order ID

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "status": "pending",
  "subtotal": 5998,
  "tax": 600,
  "shipping": 0,
  "total": 6598,
  "deliveryAddress": "...",
  "paymentMethod": "credit_card",
  "createdAt": "2024-03-29T10:30:00.000Z",
  "items": [
    {
      "id": 1,
      "orderId": 1,
      "productId": 1,
      "quantity": 2,
      "price": 2999,
      "name": "Wireless Bluetooth Headphones Black",
      "image": "https://..."
    }
  ]
}
```

---

## ⭐ Reviews Routes

### Get Product Reviews
**GET** `/reviews/product/:productId`

Get all reviews for a product.

**URL Parameters:**
- `productId` (required): Product ID

**Response (200):**
```json
[
  {
    "id": 1,
    "productId": 1,
    "userId": 2,
    "rating": 5,
    "title": "Excellent product!",
    "comment": "Great sound quality and battery life",
    "helpful": 15,
    "name": "Jane Smith",
    "createdAt": "2024-03-29T10:30:00.000Z"
  }
]
```

---

### Add Review
**POST** `/reviews`

Add review for a product (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "productId": 1,
  "rating": 5,
  "title": "Excellent product!",
  "comment": "Great sound quality and battery life"
}
```

**Response (201):**
```json
{
  "message": "Review added successfully"
}
```

---

## 💖 Wishlist Routes

### Get Wishlist
**GET** `/wishlist`

Get all items in user's wishlist.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "id": 5,
    "name": "Portable Power Bank 20000mAh",
    "price": 1299,
    "category": "Electronics",
    "image": "https://...",
    "rating": 4.6
  }
]
```

---

### Add to Wishlist
**POST** `/wishlist/add`

Add product to wishlist.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "productId": 5
}
```

**Response (201):**
```json
{
  "message": "Added to wishlist"
}
```

**Errors:**
- 400: Already in wishlist
- 500: Failed to add to wishlist

---

### Remove from Wishlist
**DELETE** `/wishlist/:productId`

Remove product from wishlist.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `productId` (required): Product ID

**Response (200):**
```json
{
  "message": "Removed from wishlist"
}
```

---

## ✅ Health Check

### Server Status
**GET** `/health`

Check if server is running.

**Response (200):**
```json
{
  "status": "✅ Server is running"
}
```

---

## 🔑 Authentication

Protected routes require JWT token in headers:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/orders
```

**Token from Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE0MDAwMDAwLCJleHAiOjE3MTY1OTIwMDB9.XYZ"
}
```

**Token Expiry:** 30 days from issue

---

## 📊 Product Categories

Available categories for filtering:
- Electronics
- Shoes
- Clothing
- Home
- Books
- Beauty
- Sports
- Furniture

---

## 💬 Error Responses

All errors follow this format:

```json
{
  "message": "Error description",
  "error": "Additional details"
}
```

**Common Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized (missing/invalid token)
- 404: Not Found
- 500: Server Error

---

## 🧪 Testing with cURL

**Test Database Connection:**
```bash
curl http://localhost:5000/api/health
```

**Get All Products:**
```bash
curl http://localhost:5000/api/products
```

**Get Single Product:**
```bash
curl http://localhost:5000/api/products/1
```

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123","phone":"9999999999"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Get Orders (with token):**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:5000/api/orders
```

---

## 📝 Rate Limiting

No rate limiting implemented. For production, consider adding:
- Limit login attempts
- Limit API requests per IP
- Implement request throttling

---

**[Back to README](README.md)** | **[Back to Setup Guide](SETUP.md)**
