import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// ✅ GET all products
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ SEED FUNCTION
export const seedProducts = async () => {
  try {
    const [existing] = await pool.query(
      "SELECT COUNT(*) as count FROM products"
    );

    if (existing[0].count > 0) {
      console.log("ℹ️ Products already exist, skipping seed");
      return;
    }

    const products = [
      // Electronics
      { name: "Wireless Bluetooth Headphones Black", description: "Premium wireless headphones with noise cancellation and 30-hour battery", price: 2999, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", rating: 4.5, reviewCount: 2245, discount: 15, inStock: true },
      { name: "Smart Watch Pro", description: "Advanced smartwatch with fitness tracking and heart rate monitor", price: 9999, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", rating: 4.5, reviewCount: 1567, discount: 22, inStock: true },
      { name: "USB-C Fast Charging Cable", description: "3-pack durable USB-C cables with fast charging support", price: 599, category: "Electronics", image: "https://images.unsplash.com/photo-1599720776407-a8ee8a449a8d?w=400&h=400&fit=crop", rating: 4.4, reviewCount: 890, discount: 20, inStock: true },
      { name: "Portable Power Bank 20000mAh", description: "High capacity portable charger with LED display and dual USB", price: 1299, category: "Electronics", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop", rating: 4.6, reviewCount: 2345, discount: 18, inStock: true },
      { name: "Wireless Mouse Silent", description: "Ergonomic wireless mouse with 18-month battery life", price: 799, category: "Electronics", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop", rating: 4.3, reviewCount: 1456, discount: 12, inStock: true },
      { name: "USB Hub 7 Port 3.0", description: "7-port USB hub with individual switches and power adapter", price: 1299, category: "Electronics", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop", rating: 4.4, reviewCount: 678, discount: 15, inStock: true },
      { name: "4K Webcam Pro", description: "4K Ultra HD webcam with autofocus and noise cancellation", price: 3499, category: "Electronics", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", rating: 4.7, reviewCount: 1234, discount: 24, inStock: true },
      
      // Fashion - Shoes
      { name: "Nike Air Max Running Shoes Black", description: "Professional running shoes with superior cushioning and support", price: 5999, category: "Shoes", image: "https://images.unsplash.com/photo-1645464394096-8bfff6c4a9f8?w=400&h=400&fit=crop", rating: 4.6, reviewCount: 3145, discount: 20, inStock: true },
      { name: "White Casual Sneakers", description: "Comfortable white canvas sneakers for everyday wear", price: 1999, category: "Shoes", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop", rating: 4.4, reviewCount: 2890, discount: 18, inStock: true },
      { name: "Formal Leather Oxford Shoes Brown", description: "Premium leather formal shoes perfect for office and events", price: 3999, category: "Shoes", image: "https://images.unsplash.com/photo-1533090161892-a37c36a76745?w=400&h=400&fit=crop", rating: 4.7, reviewCount: 1834, discount: 15, inStock: true },
      { name: "Sports Training Shoes Blue", description: "Lightweight sports shoes designed for gym and training", price: 2799, category: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", rating: 4.5, reviewCount: 2567, discount: 22, inStock: true },
      { name: "Winter Snow Boots Black", description: "Warm insulated winter boots with waterproof design", price: 5999, category: "Shoes", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop", rating: 4.8, reviewCount: 1892, discount: 25, inStock: true },
      { name: "Comfortable Slides Slippers", description: "Ultra-comfortable slides for indoor and outdoor use", price: 599, category: "Shoes", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", rating: 4.3, reviewCount: 3345, discount: 30, inStock: true },
      
      // Fashion - Clothing
      { name: "Winter Warm Jacket Black", description: "Premium winter jacket with comfortable woolen blend", price: 3499, category: "Clothing", image: "https://images.unsplash.com/photo-1539533057592-4d2b7472e0f7?w=400&h=400&fit=crop", rating: 4.5, reviewCount: 1890, discount: 20, inStock: true },
      { name: "Premium Denim Jeans Blue", description: "Stylish denim jeans with perfect fit and comfort", price: 2199, category: "Clothing", image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop", rating: 4.6, reviewCount: 4456, discount: 18, inStock: true },
      { name: "Cotton T-Shirt Pack of 3", description: "Soft 100% cotton t-shirts perfect for daily wear", price: 1299, category: "Clothing", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", rating: 4.4, reviewCount: 5567, discount: 25, inStock: true },
      { name: "Formal White Shirt", description: "Professional formal shirt perfect for office and events", price: 1999, category: "Clothing", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop", rating: 4.7, reviewCount: 2245, discount: 15, inStock: true },
      { name: "Warm Wool Sweater", description: "Cozy wool sweater for cold weather comfort", price: 2299, category: "Clothing", image: "https://images.unsplash.com/photo-1573624410882-1e9f96e94873?w=400&h=400&fit=crop", rating: 4.5, reviewCount: 1876, discount: 12, inStock: true },
      
      // Home & Kitchen
      { name: "LED Desk Lamp Modern", description: "Modern LED desk lamp with adjustable brightness", price: 1299, category: "Home", image: "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=400&h=400&fit=crop", rating: 4.7, reviewCount: 1789, discount: 10, inStock: true },
      { name: "Premium King Size Bedsheet", description: "100% cotton high-thread-count premium bedsheet set", price: 1799, category: "Home", image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop", rating: 4.8, reviewCount: 3178, discount: 12, inStock: true },
      { name: "Kitchen Utensil Set 12pc", description: "Complete 12-piece kitchen utensil set with storage", price: 899, category: "Home", image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=400&fit=crop", rating: 4.9, reviewCount: 2813, discount: 8, inStock: true },
      { name: "Automatic Coffee Maker", description: "Programmable coffee maker with 1.8L capacity and timer", price: 2199, category: "Home", image: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400&h=400&fit=crop", rating: 4.6, reviewCount: 1567, discount: 14, inStock: true },
      { name: "Non-Stick Cookware Set 5pc", description: "Premium non-stick cookware with heat-resistant handles", price: 1599, category: "Home", image: "https://images.unsplash.com/photo-1595521624590-6b0c6b4e8ba2?w=400&h=400&fit=crop", rating: 4.7, reviewCount: 2345, discount: 18, inStock: true },
      { name: "Soft Cotton Bath Towels 4pc", description: "Ultra-soft cotton bath towels perfect for bathroom", price: 699, category: "Home", image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=400&fit=crop", rating: 4.5, reviewCount: 3456, discount: 20, inStock: true },
      { name: "Memory Foam Pillow Ergonomic", description: "Ergonomic memory foam pillow for comfortable sleep", price: 1299, category: "Home", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop", rating: 4.8, reviewCount: 4456, discount: 16, inStock: true },
      
      // Books
      { name: "The Midnight Library Book", description: "Bestseller about life choices and second chances", price: 599, category: "Books", image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=400&fit=crop", rating: 4.8, reviewCount: 6012, discount: 5, inStock: true },
      { name: "Atomic Habits Book", description: "Transform your life with small habits and big results", price: 499, category: "Books", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", rating: 4.9, reviewCount: 13045, discount: 15, inStock: true },
      { name: "The Psychology of Money", description: "Learn timeless principles of money and behavior", price: 399, category: "Books", image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=400&fit=crop", rating: 4.7, reviewCount: 5890, discount: 20, inStock: true },
      
      // Beauty & Personal Care
      { name: "Face Moisturizer Cream Sensitive Skin", description: "Gentle moisturizer for sensitive skin with natural ingredients", price: 799, category: "Beauty", image: "https://images.unsplash.com/photo-1560750588-8475f1d4bbb5?w=400&h=400&fit=crop", rating: 4.6, reviewCount: 2345, discount: 18, inStock: true },
      { name: "Shampoo and Conditioner Combo", description: "Natural shampoo and conditioner set for healthy hair", price: 599, category: "Beauty", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop", rating: 4.5, reviewCount: 3456, discount: 15, inStock: true },
      { name: "Sunscreen SPF 50 PA+++", description: "Water-resistant sunscreen with SPF 50 protection", price: 499, category: "Beauty", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", rating: 4.7, reviewCount: 2123, discount: 12, inStock: true },
      
      // Sports & Fitness
      { name: "Yoga Mat Premium 6mm", description: "Non-slip yoga mat with alignment marks and carrying strap", price: 1299, category: "Sports", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", rating: 4.8, reviewCount: 3456, discount: 22, inStock: true },
      { name: "Dumbbells Set Adjustable", description: "Adjustable dumbbells set from 2kg to 10kg", price: 3999, category: "Sports", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop", rating: 4.7, reviewCount: 1890, discount: 20, inStock: true },
      { name: "Water Bottle 1L Stainless Steel", description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours", price: 899, category: "Sports", image: "https://images.unsplash.com/photo-1602143407151-7e406dc6c85f?w=400&h=400&fit=crop", rating: 4.6, reviewCount: 2567, discount: 18, inStock: true },
      
      // Furniture
      { name: "Office Chair Ergonomic Black", description: "Ergonomic office chair with lumbar support and adjustable height", price: 4999, category: "Furniture", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop", rating: 4.7, reviewCount: 1234, discount: 25, inStock: true },
      { name: "Wooden Study Desk", description: "Spacious wooden study desk with storage drawers", price: 7999, category: "Furniture", image: "https://images.unsplash.com/photo-1518455641692-87ad85b412fe?w=400&h=400&fit=crop", rating: 4.6, reviewCount: 867, discount: 15, inStock: true },
      { name: "Coffee Table Glass Top", description: "Modern glass top coffee table with wooden base", price: 2999, category: "Furniture", image: "https://images.unsplash.com/photo-1532372320572-cda92c4d00b1?w=400&h=400&fit=crop", rating: 4.5, reviewCount: 456, discount: 12, inStock: true }
    ];

    for (const product of products) {
      await pool.query(
        `INSERT INTO products 
        (name, description, price, category, image, images_json, rating, reviewCount, discount, inStock)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.name,
          product.description,
          product.price,
          product.category,
          product.image,
          JSON.stringify(product.images || [product.image]),
          product.rating,
          product.reviewCount,
          product.discount,
          product.inStock,
        ]
      );
    }

    console.log("✅ 43 products seeded successfully!");
  } catch (error) {
    console.error("❌ Seed error:", error.message);
  }
};

export default router;
