import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { getTotalItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <div
      style={{
        background: "#131921",
        color: "white",
        padding: "10px 15px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* 🔥 LOGO */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        amazon<span style={{ color: "#FF9900" }}>.in</span>
      </Link>

      {/* 🔍 SEARCH BAR */}
      <div
        style={{
          flex: 1,
          display: "flex",
          minWidth: "200px",
          maxWidth: "700px",
          background: "white",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <input
          placeholder="Search Amazon"
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <button
          style={{
            background: "#FF9900",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔍
        </button>
      </div>

      {/* 👤 ACCOUNT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "12px",
          minWidth: "80px",
        }}
      >
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <span
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={logout}
            >
              Sign Out
            </span>
          </>
        ) : (
          <>
            <span>Hello, Sign In</span>
            <Link
              to="/login"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Account
            </Link>
          </>
        )}
      </div>

      {/* 🛒 CART */}
      <Link
        to="/cart"
        style={{
          color: "white",
          textDecoration: "none",
          position: "relative",
          fontSize: "22px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        🛒
        <span style={{ fontSize: "14px" }}>Cart</span>

        {getTotalItems() > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              background: "#FF9900",
              color: "#131921",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {getTotalItems()}
          </span>
        )}
      </Link>
    </div>
  );
};

export default Header;