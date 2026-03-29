import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { cart, subtotal = 0, tax = 0, shipping = 0, total = 0 } = location.state || {};

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [loading, setLoading] = useState(false);

  const [newAddress, setNewAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress && !showNewAddress) {
      alert("Please select or add a delivery address");
      return;
    }

    setLoading(true);

    const orderData = {
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity || 1,
        price: item.price
      })),
      address: showNewAddress ? newAddress : selectedAddress,
      paymentMethod
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully!");
        navigate(`/orders/${data.orderId}`);
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Section - Delivery & Payment */}
          <div className="col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">1. Delivery Address</h2>

              <div className="space-y-3">
                {addresses.map((addr, i) => (
                  <label key={i} className="flex items-start gap-3 p-3 border rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      checked={selectedAddress === i}
                      onChange={() => setSelectedAddress(i)}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <p className="font-bold">{addr.fullName}</p>
                      <p className="text-gray-600">{addr.street}</p>
                      <p className="text-gray-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                      <p className="text-gray-600 text-xs">📞 {addr.phone}</p>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={() => setShowNewAddress(!showNewAddress)}
                className="mt-4 text-blue-600 hover:text-blue-800 font-bold"
              >
                + Add New Address
              </button>

              {showNewAddress && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <input
                    type="text"
                    name="fullName"
                    value={newAddress.fullName}
                    onChange={handleAddressChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleAddressChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="street"
                    value={newAddress.street}
                    onChange={handleAddressChange}
                    placeholder="Street Address"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                      className="w-full px-4 py-2 border rounded"
                    />
                    <input
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                      placeholder="State"
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <input
                    type="text"
                    name="zipCode"
                    value={newAddress.zipCode}
                    onChange={handleAddressChange}
                    placeholder="ZIP Code"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">2. Payment Method</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50">
                  <input
                    type="radio"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💳 Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50">
                  <input
                    type="radio"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>📱 UPI</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50">
                  <input
                    type="radio"
                    value="netbanking"
                    checked={paymentMethod === "netbanking"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>🏦 Net Banking</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50">
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>📦 Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Review Items */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">3. Order Review</h2>
              <div className="space-y-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm pb-2 border-b">
                    <div>
                      <p>{item.name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity || 1}</p>
                    </div>
                    <p className="font-bold">₹{(item.price * (item.quantity || 1)).toFixed(0)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="bg-white p-6 rounded shadow-md h-fit">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>

            <div className="space-y-2 pb-4 border-b text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className={shipping === 0 ? "text-green-600 font-bold" : ""}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xl font-bold my-4">
              <span>Total:</span>
              <span>₹{total.toFixed(0)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-3 rounded font-bold hover:bg-yellow-500 disabled:bg-gray-300"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            <p className="text-xs text-gray-600 mt-4">
              By placing this order, you agree to Amazon's conditions of use and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
