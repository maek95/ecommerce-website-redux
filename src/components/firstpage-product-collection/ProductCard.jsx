"use client";
import { useContext, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa"; // Re-added the missing import
import PopUpCard from "../PopUpCard";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/ProductsSlice";

export default function ProductCard({
  title = "No Title",
  price = 0,
  imgSrc = "https://images.jackjones.com/media/0d4k0bhx/suits-dayz35-carousel-3-sv-se.jpg?v=60140033-f495-450b-8155-7c2f21c65e0f&format=webp&width=360&quality=80&key=3-2-1",
  productId,
  product,
}) {
  const [isCartClicked, setIsCartClicked] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const dispath = useDispatch();
  
  if (!productId) {
    return (
      <div className="h-full w-36 flex-shrink-0 flex flex-col gap-4">
        Loading...
      </div>
    );
  }

 

  function handleClickCart() {

   // addToCart(product); // context
    dispath(addToCart(product));
    setIsCartClicked(true); // change to count if add multiple times?

    setTimeout(() => setIsCartClicked(false), 500);
  }

  const handleProductClick = () => {
    setPopupVisible(true);
  };

 
  return (
    <div className="h-full w-36 flex-shrink-0 flex flex-col gap-4">
      <div onClick={handleProductClick} className="h-3/4 w-full cursor-pointer">
        <img
          className="h-full object-cover w-full"
          src={`${imgSrc}`}
          alt="imgSrc failed"
          onError={(e) => {
            e.target.onerror = null; // Remove the error handler after first execution, otherwise infinite loop
            if (e.target.src === product.category.image) {
              // If the category image ALSO fails, show a our local fallback image (mock-img.webp)
              e.target.src = "/mock-img.webp"; // Replace with the path to your local fallback image
            } else {
              // Attempt to load the category image after product image fails
              e.target.src = product.category.image;
            }
          }}
        />
      </div>

      <div className="h-1/4 w-full flex flex-col text-sm">
        <div className="flex justify-between w-full items-center">
          <p className="p-0 m-0 w-3/4 break-words truncate">{title}</p>
          <FaShoppingBasket
            className={`${isCartClicked ? "animate-impact" : ""}`}
            onClick={handleClickCart}
          />
        </div>
        <p className="font-bold p-0 m-0 ">{price}</p>
      </div>

      {/* PopUpCard rendered conditionally */}
      {isPopupVisible && <PopUpCard product={product} setPopupVisible={setPopupVisible}/>}
    </div>
  );
}
