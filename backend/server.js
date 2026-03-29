import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection (using ENV variables)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // 🔥 IMPORTANT (Railway uses custom port)
});

// ✅ Connect DB
db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// ✅ ROOT ROUTE (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("🚀 Amazon Clone Backend is Running");
});

// ✅ GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching products:", err);
      return res.status(500).json({ error: "Server error" });
    }

    res.json(results);
  });
});

// ✅ ADD PRODUCT (optional)
app.post("/api/products", (req, res) => {
  const {
    name,
    description,
    price,
    category,
    image,
    rating,
    reviewCount,
    discount,
    inStock,
  } = req.body;

  const query = `
    INSERT INTO products 
    (name, description, price, category, image, rating, reviewCount, discount, inStock)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, description, price, category, image, rating, reviewCount, discount, inStock],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting product:", err);
        return res.status(500).json({ error: "Server error" });
      }

      res.json({ message: "✅ Product added", id: result.insertId });
    }
  );
});

// ✅ PORT (Render uses process.env.PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});