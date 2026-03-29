import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get cart
router.get("/", async (req, res) => {
  try {
    const [cart] = await pool.query(
      "SELECT cart.*, products.name, products.price FROM cart JOIN products ON cart.product_id = products.id"
    );
    res.json(cart);
  } catch (error) {
    console.error("❌ Error fetching cart:", error.message);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// Add to cart
router.post("/", async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    await pool.query(
      "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
      [product_id, quantity]
    );

    res.status(201).json({ message: "Added to cart" });
  } catch (error) {
    console.error("❌ Error adding to cart:", error.message);
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

// Remove from cart
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM cart WHERE id = ?", [id]);

    res.json({ message: "Removed from cart" });
  } catch (error) {
    console.error("❌ Error removing from cart:", error.message);
    res.status(500).json({ message: "Failed to remove from cart" });
  }
});

// Update cart quantity
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    await pool.query("UPDATE cart SET quantity = ? WHERE id = ?", [quantity, id]);

    res.json({ message: "Cart updated" });
  } catch (error) {
    console.error("❌ Error updating cart:", error.message);
    res.status(500).json({ message: "Failed to update cart" });
  }
});

export default router;