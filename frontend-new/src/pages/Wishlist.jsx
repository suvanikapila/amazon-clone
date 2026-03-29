import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Product from "../components/Product";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setWishlist(data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        setWishlist(wishlist.filter((item) => item.id !== productId));
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleAddToCart = (product) => {
    // You'll need to pass this from App.jsx
    alert("Added to cart!");
    removeFromWishlist(product.id);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-6 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">Your wishlist is empty</p>
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              ← Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-6">{wishlist.length} items in wishlist</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div key={item.id}>
                  <Product item={item} addToCart={handleAddToCart} />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-full mt-2 text-red-600 hover:text-red-800 font-bold text-sm"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
