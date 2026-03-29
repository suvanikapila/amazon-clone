import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Your Shopping Cart is Empty</h2>
        <p style={{ marginBottom: "20px", color: "#666" }}>
          Add items to your cart to get started!
        </p>
        <Link to="/">
          <button style={{
            background: "#FF9900",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer"
          }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Shopping Cart ({getTotalItems()} items)
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Cart Items */}
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "15px",
                padding: "15px",
                background: "white",
                marginBottom: "15px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}
            >
              {/* Product Image */}
              <img
                src={item.images?.[0] || item.image || ""}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain"
                }}
                alt={item.name}
              />

              {/* Product Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>{item.name}</h3>
                <p style={{ color: "#B12704", fontWeight: "bold", marginBottom: "10px" }}>
                  ₹{item.price}
                </p>

                {/* Quantity Controls */}
                <div style={{ marginBottom: "10px" }}>
                  <label style={{ marginRight: "10px" }}>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    style={{
                      width: "60px",
                      padding: "5px",
                      border: "1px solid #ddd",
                      borderRadius: "4px"
                    }}
                  />
                </div>

                {/* Item Total */}
                <p style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
                  Subtotal: ₹{item.price * (item.quantity || 1)}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0066c0",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "14px"
                  }}
                >
                  Delete from Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          height: "fit-content",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ fontSize: "20px", marginBottom: "20px", fontWeight: "bold" }}>
            Order Summary
          </h3>

          <div style={{ marginBottom: "15px", borderBottom: "1px solid #ddd", paddingBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Subtotal:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Shipping:</span>
              <span>{getTotalPrice() > 500 ? "FREE" : "₹99"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Tax (10%):</span>
              <span>₹{Math.round(getTotalPrice() * 0.1)}</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
            <span>Total:</span>
            <span style={{ color: "#B12704" }}>
              ₹{getTotalPrice() + Math.round(getTotalPrice() * 0.1) + (getTotalPrice() > 500 ? 0 : 99)}
            </span>
          </div>

          <button 
            onClick={() => navigate("/checkout")}
            style={{
              width: "100%",
              background: "#FF9900",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "10px"
            }}>
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            style={{
              width: "100%",
              background: "#fff",
              color: "#0066c0",
              border: "1px solid #0066c0",
              padding: "12px",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer"
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;