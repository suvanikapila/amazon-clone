import express from "express";
import cors from "cors";
import productsRoutes, { seedProducts } from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import ordersRoutes from "./routes/orders.js";
import reviewsRoutes from "./routes/reviews.js";
import wishlistRoutes from "./routes/wishlist.js";
import { initializeDatabase } from "./config/schema.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Initialize database
console.log("📦 Initializing database...");
await initializeDatabase();

// ✅ Seed products
console.log("🌱 Seeding products...");
await seedProducts();

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/wishlist", wishlistRoutes);

// ✅ Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "✅ Server is running" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});