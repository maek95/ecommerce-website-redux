"use client"
import { fetchAllProducts, setCartFromLocalStorage } from "@/redux/ProductsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AllProductsFetcher() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());  // Dispatch fetchAllProducts on client-side mount
  }, [])

  useEffect(() => {
    const storedCart = localStorage.getItem('reduxCart');
    if (storedCart) {
      dispatch(setCartFromLocalStorage(JSON.parse(storedCart)));
    }
  }, [])

  return null; // component doesnt render anything
}
