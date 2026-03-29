import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [step, setStep] = useState("address"); // address, payment, confirmation
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [orderNumber, setOrderNumber] = useState(null);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#FF9900",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert("Please fill all address fields");
      return;
    }
    setStep("payment");
  };

  const handlePaymentSubmit = () => {
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      alert("Please fill all payment fields");
      return;
    }
    
    // Simulate payment processing
    const newOrderNumber = "ORD" + Date.now();
    setOrderNumber(newOrderNumber);
    setStep("confirmation");
    clearCart();
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 99;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  return (
    <div style={{ padding: "20px", background: "#eee", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Progress Bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
          background: "white",
          padding: "20px",
          borderRadius: "8px"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: step === "address" || step === "payment" || step === "confirmation" ? "#FF9900" : "#ddd",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px",
              fontWeight: "bold"
            }}>1</div>
            <p>Address</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: step === "payment" || step === "confirmation" ? "#FF9900" : "#ddd",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px",
              fontWeight: "bold"
            }}>2</div>
            <p>Payment</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: step === "confirmation" ? "#FF9900" : "#ddd",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px",
              fontWeight: "bold"
            }}>3</div>
            <p>Confirmation</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
          {/* Main Content */}
          <div style={{ background: "white", padding: "30px", borderRadius: "8px" }}>
            {step === "confirmation" ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <h1 style={{ fontSize: "32px", color: "#27ae60", marginBottom: "20px" }}>Order Confirmed!</h1>
                <p style={{ fontSize: "18px", marginBottom: "20px" }}>Thank you for your purchase</p>
                <div style={{
                  background: "#f0f0f0",
                  padding: "20px",
                  borderRadius: "8px",
                  marginBottom: "20px"
                }}>
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>Order Number: {orderNumber}</p>
                </div>
                <p style={{ color: "#666", marginBottom: "20px" }}>
                  A confirmation email has been sent to {formData.email}
                </p>
                <button
                  onClick={() => navigate("/")}
                  style={{
                    background: "#FF9900",
                    color: "white",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "4px",
                    fontSize: "16px",
                    cursor: "pointer"
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : step === "address" ? (
              <div>
                <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Delivery Address</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px"
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px"
                    }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px"
                    }}
                  />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "16px"
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px"
                    }}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px"
                    }}
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px"
                    }}
                  />
                </div>
                <button
                  onClick={handleAddressSubmit}
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
                    marginTop: "20px"
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            ) : (
              <div>
                <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Payment Details</h2>
                <div style={{
                  background: "#f9f9f9",
                  padding: "15px",
                  borderRadius: "4px",
                  marginBottom: "20px"
                }}>
                  <p style={{ marginBottom: "10px" }}>
                    <strong>Delivering to:</strong> {formData.fullName}, {formData.address}, {formData.city}
                  </p>
                </div>
                <div style={{ marginBottom: "30px" }}>
                  <h3 style={{ marginBottom: "15px" }}>Card Details</h3>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number (16 digits)"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px",
                      marginBottom: "15px"
                    }}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "16px"
                      }}
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "16px"
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "15px" }}>
                  <button
                    onClick={() => setStep("address")}
                    style={{
                      flex: 1,
                      background: "#fff",
                      color: "#FF9900",
                      border: "1px solid #FF9900",
                      padding: "12px",
                      borderRadius: "4px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    style={{
                      flex: 1,
                      background: "#27ae60",
                      color: "white",
                      border: "none",
                      padding: "12px",
                      borderRadius: "4px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ background: "white", padding: "20px", borderRadius: "8px", height: "fit-content" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "20px", fontWeight: "bold" }}>Order Summary</h3>
            
            <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #ddd" }}>
              {cart.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span>{item.name} x{item.quantity || 1}</span>
                  <span>₹{item.price * (item.quantity || 1)}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Shipping:</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <span>Tax (10%):</span>
                <span>₹{tax}</span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "18px",
                fontWeight: "bold",
                paddingTop: "15px",
                borderTop: "1px solid #ddd",
                color: "#B12704"
              }}>
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
