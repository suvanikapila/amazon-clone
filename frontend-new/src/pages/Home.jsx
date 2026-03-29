import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import { API_URL } from "../config/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/products`
      );

      if (!response.ok) {
        setError("Failed to load products");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setProducts(data);

      const uniqueCategories = ["All", ...new Set(data.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError("Connection error. Please refresh the page.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <Banner />

      <div style={{ padding: "20px" }}>
        
        {/* 🔍 SEARCH */}
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            display: "block",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "16px"
          }}
        />

        {/* 🏷 CATEGORY FILTER */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "20px"
          }}
        >
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: "8px 14px",
                background: category === c ? "#FF9900" : "#fff",
                color: category === c ? "white" : "#333",
                border: "1px solid #ddd",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: category === c ? "bold" : "normal",
                fontSize: "14px"
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 🛍 PRODUCTS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >
          {filtered.length > 0 ? (
            filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#666"
              }}
            >
              No products found
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;