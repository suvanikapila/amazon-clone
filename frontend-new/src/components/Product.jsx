import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ item, addToCart }) => {
  const navigate = useNavigate();

  let images = [];
  try {
    images = JSON.parse(item.images_json || "[]");
  } catch {
    images = [];
  }

  const image = images[0] || item.image || "https://via.placeholder.com/200";

  return (
    <div className="bg-white p-3 shadow hover:shadow-lg transition rounded-sm">
      
      <div onClick={() => navigate(`/product/${item.id}`)} className="cursor-pointer">
        <img src={image} className="h-48 w-full object-contain" />

        <h2 className="text-sm font-semibold mt-2 line-clamp-2">
          {item.name}
        </h2>

        <p className="text-xs text-gray-500">
          {item.description}
        </p>

        <p className="text-lg font-bold mt-1">₹{item.price}</p>
      </div>

      <button
        onClick={() => addToCart(item)}
        className="bg-yellow-400 w-full py-1 mt-2 rounded hover:bg-yellow-500"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;