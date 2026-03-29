import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config/api";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Store token and user info
      localStorage.setItem("token", data.token);
      login({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });

      navigate("/");
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      // Demo credentials
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "demo@example.com", password: "demo123" }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError("Demo login not available yet. Please register first.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      login({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });

      navigate("/");
    } catch (err) {
      setError("Demo login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "450px",
      margin: "50px auto",
      padding: "30px",
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ fontSize: "28px", marginBottom: "30px", textAlign: "center" }}>
        Sign In
      </h1>

      {error && (
        <div style={{
          background: "#fee",
          color: "#c33",
          padding: "12px",
          borderRadius: "4px",
          marginBottom: "20px",
          fontSize: "14px"
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#FF9900",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <button
        onClick={handleDemoLogin}
        disabled={loading}
        style={{
          width: "100%",
          background: "#37475A",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "4px",
          marginTop: "15px",
          fontSize: "14px",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1
        }}
      >
        Try Demo Login (if available)
      </button>

      <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#0066c0", textDecoration: "none", fontWeight: "500" }}>
          Create account
        </Link>
      </div>
    </div>
  );
};

export default Login;