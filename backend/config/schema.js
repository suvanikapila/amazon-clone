import pool from "./db.js";

export const initializeDatabase = async () => {
  try {
    // Disable foreign key checks temporarily
    await pool.query("SET FOREIGN_KEY_CHECKS=0");

    // Drop and recreate users table
    await pool.query("DROP TABLE IF EXISTS users");
    
    await pool.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Users table created");

    // Drop and recreate products table
    await pool.query("DROP TABLE IF EXISTS products");
    
    await pool.query(`
      CREATE TABLE products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(50),
        image VARCHAR(500),
        images_json JSON,
        rating DECIMAL(3, 1) DEFAULT 4.5,
        reviewCount INT DEFAULT 0,
        discount INT DEFAULT 0,
        inStock BOOLEAN DEFAULT TRUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Products table created");

    // Re-enable foreign key checks
    await pool.query("SET FOREIGN_KEY_CHECKS=1");

    // Orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        subtotal DECIMAL(10, 2),
        tax DECIMAL(10, 2),
        shipping DECIMAL(10, 2),
        total DECIMAL(10, 2),
        deliveryAddress TEXT,
        paymentMethod VARCHAR(50),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);
    console.log("✅ Orders table created");

    // Order Items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        orderId INT NOT NULL,
        productId INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (orderId) REFERENCES orders(id),
        FOREIGN KEY (productId) REFERENCES products(id)
      )
    `);
    console.log("✅ Order Items table created");

    // Reviews table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT PRIMARY KEY AUTO_INCREMENT,
        productId INT NOT NULL,
        userId INT NOT NULL,
        rating INT,
        title VARCHAR(200),
        comment TEXT,
        helpful INT DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (productId) REFERENCES products(id),
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);
    console.log("✅ Reviews table created");

    // Wishlist table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        productId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_wishlist (userId, productId),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (productId) REFERENCES products(id)
      )
    `);
    console.log("✅ Wishlist table created");

    // User Addresses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_addresses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        fullName VARCHAR(100),
        phone VARCHAR(20),
        street VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(100),
        zipCode VARCHAR(10),
        country VARCHAR(100),
        isDefault BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);
    console.log("✅ User Addresses table created");

    console.log("🎉 All tables initialized successfully!");

  } catch (error) {
    console.error("❌ Error initializing database:", error.message);
  }
};
