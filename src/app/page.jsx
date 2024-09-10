"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCollectionSection from "@/components/firstpage-product-collection/ProductCollectionSection";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  const { reduxCategoryProductsArr, status, reduxAllProductsArr } = useSelector(state => state.products);


  useEffect(() => {

    console.log("status:", status);
  }, [status])

  useEffect(() => {

    console.log("reduxCategoryProductsArr:", reduxCategoryProductsArr);
  }, [reduxCategoryProductsArr])

  useEffect(() => {

    console.log("reduxAllProductsArr: ", reduxAllProductsArr);
  }, [reduxAllProductsArr])
  
  // moved the fetch to ReduxAllProductsFetcher.jsx that is then imported in the root layout.js... i.e. fetch all products when the project mounts...
  /* useEffect(() => {

    if (status === "idle") {
      
      
      dispatch(fetchAllProducts());
    }
  }, [])
   */

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="flex flex-col w-full gap-4 pt-4">
        <section className="flex h-96 pl-4 pr-4 w-full box-border lg:justify-center">
          {" "}
          {/* box-border otherwise padding extends the page when calculating w-full */}
          <img
            className="h-full max-w-full object-cover"
            src="https://images.jackjones.com/media/3mtioscl/attack-dayz9-hero-row3-box1-sv-se.jpg?v=4b236c50-f67b-4131-86fa-82613fb0b7d1&format=webp&width=2048&quality=80&key=1-1-3"
            alt="jack&jones-hero"
          />
        </section>

        <section className="min-h-96">
          <h1>REDUX</h1>
          {reduxCategoryProductsArr && reduxCategoryProductsArr.length > 0 ? 
            (reduxCategoryProductsArr.map((categorizedProducts) => {
             // console.log("category: ", categorizedProducts);
              return (
                <ProductCollectionSection
                  key={categorizedProducts.categoryId} // Add a unique key for each section
                  sectionName={categorizedProducts.categoryName}
                  categorizedProductsArr={categorizedProducts.products}
                />
              );
            }) ): (
            <div className="w-full pl-4 pr-4">
              Loading Category... {/* TODO: fix skeleton loader? */}
            </div>)}
        </section>

        
      </main>
      <Footer />
    </div>
  );
}
