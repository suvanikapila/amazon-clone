import express from "express";
import pool from "../config/db.js";
import { verifyToken } from "./auth.js";

const router = express.Router();

// Get reviews for a product
router.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const [reviews] = await pool.query(
      `SELECT r.*, u.name FROM reviews r
       JOIN users u ON r.userId = u.id
       WHERE r.productId = ?
       ORDER BY r.createdAt DESC`,
      [productId]
    );

    res.json(reviews);
  } catch (error) {
    console.error("❌ Get reviews error:", error.message);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

// Add review
router.post("/", verifyToken, async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;

    await pool.query(
      "INSERT INTO reviews (productId, userId, rating, title, comment) VALUES (?, ?, ?, ?, ?)",
      [productId, req.userId, rating, title, comment]
    );

    // Update product rating
    const [ratingData] = await pool.query(
      "SELECT AVG(rating) as avgRating, COUNT(*) as count FROM reviews WHERE productId = ?",
      [productId]
    );

    await pool.query(
      "UPDATE products SET rating = ?, reviewCount = ? WHERE id = ?",
      [ratingData[0].avgRating || 0, ratingData[0].count, productId]
    );

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("❌ Add review error:", error.message);
    res.status(500).json({ message: "Failed to add review" });
  }
});

// Mark review as helpful
router.put("/:reviewId/helpful", async (req, res) => {
  try {
    const { reviewId } = req.params;

    await pool.query(
      "UPDATE reviews SET helpful = helpful + 1 WHERE id = ?",
      [reviewId]
    );

    res.json({ message: "Review marked as helpful" });
  } catch (error) {
    console.error("❌ Mark helpful error:", error.message);
    res.status(500).json({ message: "Failed to update review" });
  }
});

export default router;
