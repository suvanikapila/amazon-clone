import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      background: "white",
      transition: "0.3s",
      cursor: "pointer"
    }}>
      <img
        src={product.image}
        style={{ width: "100%", height: "200px", objectFit: "contain" }}
        alt={product.name}
      />

      <h4 style={{ margin: "10px 0" }}>{product.name}</h4>

      <p style={{ fontWeight: "bold", color: "#B12704" }}>
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        style={{
          width: "100%",
          background: "#FFD814",
          border: "none",
          padding: "8px",
          marginTop: "10px",
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>

      <Link to={`/product/${product.id}`}>
        <button
          style={{
            width: "100%",
            marginTop: "5px",
            padding: "6px"
          }}
        >
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;