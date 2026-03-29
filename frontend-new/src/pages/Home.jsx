import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";

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
      const response = await fetch("https://amazon-clone-backend-c615.onrender.com/api/products");
      
      if (!response.ok) {
        setError("Failed to load products");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setProducts(data);

      // Extract unique categories
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
      <div style={{ padding: "40px 20px" }}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <Banner />
      <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: "8px 16px",
                background: category === c ? "#FF9900" : "#fff",
                color: category === c ? "white" : "#333",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: category === c ? "bold" : "normal"
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {filtered.length > 0 ? (
          filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666" }}>
            No products found
          </p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Home;