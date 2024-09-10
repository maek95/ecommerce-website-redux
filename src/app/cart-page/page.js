"use client";
import { RxCross2 } from "react-icons/rx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/redux/ProductsSlice";

export default function CartPage() {
  const { reduxCartProductsArr } = useSelector(state => state.products);

  const dispatch = useDispatch();

  console.log(reduxCartProductsArr);
  

  // Beräknar antalet varor i kundkorgen
  const totalItems = reduxCartProductsArr.length;

  // Beräknar summan av varorna = subTotal
  const subTotal = reduxCartProductsArr.reduce((total, product) => {
    return total + product.price;
    // startvärde för total = 0
  }, 0);


  

  // Beräknar totala summan = sum
  // fraktritt över 450kr, annars läggs 59kr i frakt på.
  const shippingCost = subTotal > 450 ? 0 : 59;
  const sum = subTotal + shippingCost; // Totalpris inkl. frakt

    if (reduxCartProductsArr.length == 0) {
      return (
        <div>
       
          <Navbar totalItems={totalItems} />
          <h2 className="px-8">
            Oh no! <br /> Your cart is empty.
          </h2>
          <Link href="/" className="px-8">
            Shop here
          </Link>
          <Footer />
        </div>
      );
    } 
    

  return (
    <div className="min-h-screen w-full">
      {/* Passed totalItems prop to Navbar */}
      <Navbar totalItems={totalItems} />
      <main className="px-8 box-border pt-8 flex flex-col w-full gap-4">
        <h1 className="text-blue-700 text-xl cart-title">CART</h1>
        <ul className="p-0">
          {reduxCartProductsArr && reduxCartProductsArr.map((product) => (
            <li key={product.id} className="list-none list-items">
              <div className="flex flex-row">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-24 h-24 object-cover mr-4"
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
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{product.title}</span>
                    <span className="text-xs">
                      Article number:&nbsp;{product.id}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className="flex bg-transparent border-none text-xl hover:cursor-pointer"
                    >
                      <RxCross2 />
                    </button>
                    <span className="pr-6 pt-2">{product.price}&nbsp;kr</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <h2 className="text-base">Order summary</h2>
          <div className="flex flex-col bg-gray-100 py-4 px-2">
            <span>{totalItems} items</span>
            <span>Items: {subTotal}&nbsp;kr</span>
            {subTotal > 450 ? (
              <div className="flex flex-col">
                <p className="bg-blue-600 h-2 shipping-bar"></p>
                <span>
                  You have reached{" "}
                  <span className="font-bold">free shipping</span>
                </span>
                <span>Shipping: 0&nbsp;kr</span>
                <span className="pt-8 text-lg">Total: {sum}&nbsp;kr</span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span>Shipping: 59&nbsp;kr</span>
                <span className="pt-8 text-lg">Total: {sum}&nbsp;kr</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
