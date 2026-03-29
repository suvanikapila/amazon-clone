import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <div style={{ background: "#EAEDED", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;