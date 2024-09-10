import { addToCart } from "@/redux/ProductsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddToCartBtn({ product }) {
  const [added, setAdded] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart(product));
    setAdded(true);
    console.log("added product to cart");
    console.log(product);

    // Eventuell logik för att hantera kundkorgen, t.ex.:
    // addToCart(productId, quantity);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 text-white ${
        added ? "bg-green-600" : "bg-blue-500"
      } rounded hover:bg-blue-700`}
    >
      {added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
