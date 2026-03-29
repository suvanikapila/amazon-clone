import express from "express";
import pool from "../config/db.js";
import { verifyToken } from "./auth.js";

const router = express.Router();

// Get wishlist
router.get("/", verifyToken, async (req, res) => {
  try {
    const [wishlist] = await pool.query(
      `SELECT w.id, p.* FROM wishlist w
       JOIN products p ON w.productId = p.id
       WHERE w.userId = ?
       ORDER BY w.createdAt DESC`,
      [req.userId]
    );

    res.json(wishlist);
  } catch (error) {
    console.error("❌ Get wishlist error:", error.message);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
});

// Add to wishlist
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;

    await pool.query(
      "INSERT INTO wishlist (userId, productId) VALUES (?, ?)",
      [req.userId, productId]
    );

    res.status(201).json({ message: "Added to wishlist" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Already in wishlist" });
    }
    console.error("❌ Add to wishlist error:", error.message);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
});

// Remove from wishlist
router.delete("/:productId", verifyToken, async (req, res) => {
  try {
    const { productId } = req.params;

    await pool.query(
      "DELETE FROM wishlist WHERE userId = ? AND productId = ?",
      [req.userId, productId]
    );

    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    console.error("❌ Remove from wishlist error:", error.message);
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
});

export default router;
