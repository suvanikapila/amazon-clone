import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { cart, getTotalItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{
      background: "#131921",
      color: "white",
      padding: "8px 20px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
    }}>
      {/* Amazon Logo with Smile */}
      <Link to="/" style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "flex-start",
        minWidth: "150px",
        position: "relative",
        height: "50px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "baseline",
          gap: "3px"
        }}>
          <span style={{
            color: "white",
            fontSize: "28px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "0px",
            lineHeight: "1"
          }}>
            amazon
          </span>
          <span style={{
            color: "#FF9900",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            marginTop: "2px"
          }}>
            .in
          </span>
        </div>
        
        {/* Smile Arrow SVG */}
        <svg width="100" height="25" viewBox="0 0 100 25" style={{
          position: "absolute",
          bottom: "8px",
          left: "0px",
          zIndex: "0"
        }}>
          <path
            d="M 5 20 Q 50 5, 90 18"
            stroke="#FF9900"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <polygon points="90,18 87,13 91,12" fill="#FF9900" />
        </svg>
      </Link>

      {/* Search Bar */}
      <div style={{
        flex: 1,
        display: "flex",
        background: "white",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
      }}>
        <input
          placeholder="Search for products..."
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            color: "#333",
            fontFamily: "Arial, sans-serif"
          }}
        />
        <button style={{
          background: "#FF9900",
          border: "none",
          padding: "10px 15px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          transition: "background 0.2s",
          fontFamily: "Arial, sans-serif"
        }}
        onMouseOver={(e) => e.target.style.background = "#EC7211"}
        onMouseOut={(e) => e.target.style.background = "#FF9900"}
        >
          Search
        </button>
      </div>

      {/* Account Section */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        fontSize: "13px"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          minWidth: "100px",
          cursor: "pointer",
          padding: "5px",
          borderRadius: "4px",
          transition: "background 0.2s",
          fontFamily: "Arial, sans-serif"
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
        >
          {user ? (
            <>
              <div style={{ fontSize: "11px", opacity: 0.7 }}>Hello, {user.name}</div>
              <div style={{
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "underline"
              }} onClick={logout}>
                Sign Out
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: "11px", opacity: 0.7 }}>Hello, Sign In</div>
              <Link to="/login" style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold"
              }}>
                Account
              </Link>
            </>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" style={{
          color: "white",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          minWidth: "80px",
          padding: "5px",
          borderRadius: "4px",
          transition: "background 0.2s",
          fontFamily: "Arial, sans-serif"
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
        >
          <div style={{ fontSize: "22px", position: "relative" }}>
            🛒
            {getTotalItems() > 0 && (
              <span style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "#FF9900",
                color: "#131921",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {getTotalItems()}
              </span>
            )}
          </div>
          <div style={{ fontSize: "12px" }}>Cart</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;