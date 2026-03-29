import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/api/products/${id}`
      );

      if (!res.ok) {
        setError("Product not found");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

  if (error) {
    return (
      <p style={{ color: "red", padding: "40px" }}>
        {error}
      </p>
    );
  }

  return (
    <div style={{
      padding: "20px",
      display: "flex",
      gap: "30px",
      flexWrap: "wrap",
      background: "#fff",
      margin: "20px"
    }}>
      
      {/* IMAGE */}
      <div style={{ flex: "1", minWidth: "300px" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            maxWidth: "400px",
            objectFit: "contain"
          }}
        />
      </div>

      {/* DETAILS */}
      <div style={{ flex: "2", minWidth: "300px" }}>
        <h2>{product.name}</h2>

        <p style={{ color: "#555" }}>
          {product.description}
        </p>

        <h3 style={{ color: "#B12704" }}>
          ₹{product.price}
        </h3>

        <p>⭐ {product.rating} ({product.reviewCount} reviews)</p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* BUTTONS */}
        <div style={{ marginTop: "20px" }}>
          <button style={{
            padding: "10px 20px",
            background: "#FFD814",
            border: "1px solid #FCD200",
            cursor: "pointer",
            marginRight: "10px"
          }}>
            Add to Cart
          </button>

          <button style={{
            padding: "10px 20px",
            background: "#FFA41C",
            border: "1px solid #FF8F00",
            cursor: "pointer"
          }}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;