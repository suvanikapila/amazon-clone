import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import { initializeDatabase } from "./config/schema.js";
import { seedProducts } from "./config/seed.js";
import pool from "./config/db.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection (Railway / Render compatible)
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // gondola.proxy.rlwy.net
  user: process.env.DB_USER,      // root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,  // railway
  port: process.env.DB_PORT       // 3306 OR railway port
});

// ✅ Connect DB
db.connect(err => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// ✅ Initialize Database and Seed Data
const startServer = async () => {
  try {
    console.log("🔧 Initializing database...");
    await initializeDatabase();
    console.log("✅ Database initialized");
    
    console.log("🌱 Seeding products...");
    await seedProducts();
    
    console.log("👤 Seeding demo user...");
    // Check if demo user exists
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", ["demo@example.com"]);
    
    if (users.length === 0) {
      const hashedPassword = await bcrypt.hash("demo123", 10);
      await pool.query(
        "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
        ["Demo User", "demo@example.com", hashedPassword, "9999999999"]
      );
      console.log("✅ Demo user created: demo@example.com / demo123");
    } else {
      console.log("ℹ️ Demo user already exists");
    }
  } catch (error) {
    console.error("❌ Error during startup:", error.message);
  }
};

// ✅ REGISTER ROUTES
app.use("/api/auth", authRouter);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }

    res.json(results);
  });
});

// ✅ GET SINGLE PRODUCT (🔥 IMPORTANT FIX)
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;

  const query = "SELECT * FROM products WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]);
  });
});

// ✅ PORT FIX FOR RENDER
const PORT = process.env.PORT || 5000;

// ✅ Start server after initialization
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await startServer();
});