import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      
      if (!response.ok) {
        setError("Product not found");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError("Failed to load product details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p style={{ color: "red" }}>{error || "Product not found"}</p>
      </div>
    );
  }

  // Get all images from images_json or fall back to single image
  let allImages = [];
  try {
    if (typeof product.images_json === 'string') {
      allImages = JSON.parse(product.images_json);
    } else if (Array.isArray(product.images_json)) {
      allImages = product.images_json;
    } else {
      allImages = [product.image];
    }
  } catch (e) {
    allImages = [product.image];
  }
  
  if (!Array.isArray(allImages) || allImages.length === 0) {
    allImages = [product.image];
  }
  
  const currentImage = allImages[selectedImageIndex] || product.image;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", padding: "20px", background: "white", margin: "20px" }}>
      {/* Product Image Gallery */}
      <div>
        {/* Main Image */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          borderRadius: "8px",
          padding: "40px",
          marginBottom: "15px",
          minHeight: "500px"
        }}>
          <img
            src={currentImage}
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              objectFit: "contain"
            }}
            alt={product.name}
            onError={(e) => {
              e.target.src = product.image; // Fallback to primary image
            }}
          />
        </div>

        {/* Thumbnail Gallery */}
        {allImages.length > 1 && (
          <div style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "10px"
          }}>
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                style={{
                  flexShrink: 0,
                  width: "80px",
                  height: "80px",
                  border: idx === selectedImageIndex ? "3px solid #FF9900" : "2px solid #ddd",
                  borderRadius: "4px",
                  background: "#f5f5f5",
                  padding: "4px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                <img
                  src={img}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                  alt={`View ${idx + 1}`}
                  onError={(e) => {
                    e.target.src = product.image;
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div>
        <h1 style={{ fontSize: "28px", marginBottom: "15px" }}>{product.name}</h1>

        <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #ddd" }}>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ fontSize: "18px", color: "#666" }}>Rating: </span>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>{product.rating || 4.5} ⭐</span>
            <span style={{ fontSize: "14px", color: "#666", marginLeft: "10px" }}>
              ({product.reviewCount || 0} reviews)
            </span>
          </div>

          {allImages.length > 1 && (
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", color: "#666" }}>
                📸 {allImages.length} photos available
              </span>
            </div>
          )}

          {product.discount > 0 && (
            <div style={{ marginBottom: "10px" }}>
              <span style={{
                background: "#cc0000",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: "bold"
              }}>
                {product.discount}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "32px", color: "#B12704", fontWeight: "bold", marginBottom: "10px" }}>
            ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
          </h2>
          {product.discount > 0 && (
            <p style={{ fontSize: "14px", color: "#666" }}>
              Original: ₹{product.price}
            </p>
          )}
        </div>

        {/* Stock Status */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: product.inStock ? "#27ae60" : "#e74c3c"
          }}>
            {product.inStock ? "✓ In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Description */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "10px" }}>About this item:</h3>
          <p style={{ color: "#666", lineHeight: "1.6" }}>{product.description}</p>
        </div>

        {/* Add to Cart Section */}
        {product.inStock && (
          <div style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ marginRight: "10px", fontWeight: "500" }}>Quantity:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{
                  width: "60px",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "16px"
                }}
              />
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                width: "100%",
                background: "#FF9900",
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: "4px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "10px"
              }}
            >
              Add to Cart
            </button>

            <button
              style={{
                width: "100%",
                background: "#fff",
                color: "#FF9900",
                border: "2px solid #FF9900",
                padding: "14px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Buy Now
            </button>
          </div>
        )}

        {/* Additional Info */}
        <div style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px"
        }}>
          <h4 style={{ marginBottom: "10px" }}>Category:</h4>
          <p>{product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;