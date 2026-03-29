import express from "express";
import pool from "../config/db.js";
import { verifyToken } from "./auth.js";

const router = express.Router();

// Create order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items, address, paymentMethod } = req.body;
    const userId = req.userId;

    // Calculate totals
    let subtotal = 0;
    for (let item of items) {
      const [products] = await pool.query(
        "SELECT price FROM products WHERE id = ?",
        [item.productId]
      );
      subtotal += products[0].price * item.quantity;
    }

    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 500 ? 0 : 99; // Free shipping over 500
    const total = subtotal + tax + shipping;

    // Create order
    const [result] = await pool.query(
      "INSERT INTO orders (userId, status, subtotal, tax, shipping, total, deliveryAddress, paymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [userId, "pending", subtotal, tax, shipping, total, JSON.stringify(address), paymentMethod]
    );

    const orderId = result.insertId;

    // Add order items
    for (let item of items) {
      await pool.query(
        "INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.productId, item.quantity, item.price]
      );
    }

    res.status(201).json({
      message: "Order created successfully",
      orderId,
      total
    });
  } catch (error) {
    console.error("❌ Create order error:", error.message);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

// Get user orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT o.*, 
        JSON_ARRAYAGG(JSON_OBJECT('productId', oi.productId, 'quantity', oi.quantity, 'price', oi.price, 'name', p.name)) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.orderId
       LEFT JOIN products p ON oi.productId = p.id
       WHERE o.userId = ?
       GROUP BY o.id
       ORDER BY o.createdAt DESC`,
      [req.userId]
    );

    res.json(orders);
  } catch (error) {
    console.error("❌ Get orders error:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// Get single order
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const [orders] = await pool.query(
      "SELECT * FROM orders WHERE id = ? AND userId = ?",
      [req.params.id, req.userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const [items] = await pool.query(
      `SELECT oi.*, p.name, p.image FROM order_items oi 
       JOIN products p ON oi.productId = p.id 
       WHERE oi.orderId = ?`,
      [req.params.id]
    );

    res.json({ ...orders[0], items });
  } catch (error) {
    console.error("❌ Get order error:", error.message);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

// Get addresses
router.get("/addresses/list", verifyToken, async (req, res) => {
  try {
    const [addresses] = await pool.query(
      "SELECT * FROM user_addresses WHERE userId = ? ORDER BY isDefault DESC",
      [req.userId]
    );

    res.json(addresses);
  } catch (error) {
    console.error("❌ Get addresses error:", error.message);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
});

// Add address
router.post("/addresses", verifyToken, async (req, res) => {
  try {
    const { fullName, phone, street, city, state, zipCode, country, isDefault } = req.body;

    // If default, unset other defaults
    if (isDefault) {
      await pool.query(
        "UPDATE user_addresses SET isDefault = FALSE WHERE userId = ?",
        [req.userId]
      );
    }

    await pool.query(
      "INSERT INTO user_addresses (userId, fullName, phone, street, city, state, zipCode, country, isDefault) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [req.userId, fullName, phone, street, city, state, zipCode, country, isDefault || false]
    );

    res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    console.error("❌ Add address error:", error.message);
    res.status(500).json({ message: "Failed to add address" });
  }
});

export default router;
