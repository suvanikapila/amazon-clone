import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "processing":
        return "text-blue-600 bg-blue-50";
      case "shipped":
        return "text-purple-600 bg-purple-50";
      case "delivered":
        return "text-green-600 bg-green-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Order Placed",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled"
    };
    return labels[status] || status;
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-6 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded shadow-md p-6">
                <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b">
                  <div>
                    <p className="text-xs text-gray-600">ORDER ID</p>
                    <p className="font-bold">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">ORDER DATE</p>
                    <p className="font-bold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">TOTAL</p>
                    <p className="font-bold">₹{order.total}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">STATUS</p>
                    <p className={`font-bold px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 mb-4">
                  {order.items && Array.isArray(order.items) && order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Estimated Delivery</p>
                    <p className="font-bold">
                      {new Date(new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="text-blue-600 hover:text-blue-800 font-bold"
                    >
                      View Details
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 font-bold">
                      Track Package
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
