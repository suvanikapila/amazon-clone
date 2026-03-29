import { useState, useEffect } from "react";

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      text: "🎉 End of Season Sale - Up to 70% OFF"
    },
    {
      bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      text: "⚡ Flash Sale - Limited Time Offers"
    },
    {
      bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      text: "🚚 Free Shipping on Orders Above ₹500"
    },
    {
      bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      text: "💳 Flat 20% Cashback with Credit Card"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  return (
    <div
      style={{
        background: banners[currentBanner].bg,
        color: "white",
        padding: "40px 20px",
        textAlign: "center",
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "30px",
        position: "relative",
        borderRadius: "8px",
        minHeight: "140px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: "20px",
          background: "rgba(0,0,0,0.4)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        ❮
      </button>

      <div>{banners[currentBanner].text}</div>

      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          right: "20px",
          background: "rgba(0,0,0,0.4)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        ❯
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          display: "flex",
          gap: "8px"
        }}
      >
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentBanner(index)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: index === currentBanner ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
