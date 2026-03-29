import { useState } from "react";

const ProductImages = ({ images }) => {
  const [main, setMain] = useState(images[0]);

  return (
    <div>
      <img src={main} width="300" />

      <div>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            width="60"
            onClick={() => setMain(img)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;