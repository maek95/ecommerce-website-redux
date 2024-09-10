"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AddToCartBtn from "@/components/product-page-components/AddToCartBtn";
import ProdDescription from "@/components/product-page-components/ProdDescription";
import ProductUsp from "@/components/product-page-components/ProductUsp";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { useSelector } from "react-redux";

export default function ProductPage() {
  const params = useParams(); // Nextjs använder useParams för att läsa av [id] i filnamnet. I React Router defienrar man dessa parametrar i en "route"-fil.
  const productId = params.id; // Läser av id:et från params. 
  const router = useRouter(); // Nextjs använder useRouter medan React router använder useNavigation, ungefär samma grej.


  const { reduxAllProductsArr } = useSelector(state => state.products)
  const handleNavigation = () => {
    router.back();
  };

  const product = reduxAllProductsArr.find(
    (productObj) => productObj.id == productId // Letar igenom arrayen efter rätt produkt som matchar id:et. 
  );

  if (!product) {
    return <h1>Loading Page...</h1>;
  }

  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <main className=" flex flex-col pl-4 pr-4">
        <div>
          <button
            onClick={handleNavigation}
            className=" underline my-4 flex justify-center border-none bg-transparent hover:cursor-pointer "
          >
            Back
          </button>
          <h1 className="font-bebas">product page</h1>

          <header className="h-96 max-w-full object-cover">
            {/* product image */}
            {product && (
              <img
                className="h-96 max-w-full object-cover"
                src={product.images[0]}
                alt="Failed loading image"
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
            )}
            
          </header>

          <div>
            {/* Product name */}
            <h2 className="font-normal">{product.title}</h2>
            

            {/* Product pris */}
            <h2>{product.price}kr</h2>
            

            <div>
              <AddToCartBtn product={product} />
            </div>
            <div>
              <ProductUsp />
            </div>

            {/* Description */}
            <div>
              <ProdDescription description={product.description} />
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
