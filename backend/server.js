import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});