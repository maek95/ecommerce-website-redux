import { getAndCleanAllProducts } from "@/app/api/productsFetches";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


/* 
fetchAllProducts is an action creator that, when dispatched, triggers the actual async fetch operation. I run fetchAllProducts() in ReduxAllProductsFetcher.jsx to populate reduxAllProductsArr and reduxCategoryProductsArr... alternatively it can be run on some page.jsx!
 */
export const fetchAllProducts = createAsyncThunk( // read more about createAsyncThunk at the bottom of this file
  'products/fetchAllProducts',
  getAndCleanAllProducts
)

export const productsSlice = createSlice({

  name: 'products',
  initialState: {
    reduxAllProductsArr: [], // gets populated on mount in ReduxAllProductsFetcher.jsx
    status: 'idle', // idle | loading | succeeded | failed  <- Redux's own asyncThunk... provides a lifecycle of the fetch
    error: null,
    reduxCartProductsArr: [], // TODO: populated from reducers?
    reduxCategoryProductsArr: [] // gets populated on mount in ReduxAllProductsFetcher.jsx
  },
  reducers: {
    // fetchAllProducts is not placed here because it is async, reducers should only handle synchronous functions...?
    setCartFromLocalStorage: (state, action) => { 
      // will only run once on mount... didn't place it in an asyncThunk, not sure if needed?
      state.reduxCategoryProductsArr = action.payload; 
    },
    // TODO: addToCart ... delete... edit?...
    addToCart: (state, action) => {
     const updatedCart = [...state.reduxCartProductsArr, action.payload] // even though we have Immer this seems required to post correct updated cart to localStorage.
     //state.reduxCartProductsArr.push(action.payload) // built-in immer, does not mutate array. But doesnt happen immediately...
     state.reduxCartProductsArr = updatedCart;
      
     if (typeof window !== "undefined") {

       localStorage.setItem("reduxCart", JSON.stringify(updatedCart)); // asyncThunk not needed?
     }
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.reduxCartProductsArr.filter(product => {
        return product.id != action.payload;
      })

      state.reduxCartProductsArr = updatedCart;

      if (typeof window !== "undefined") {

        localStorage.setItem("reduxCart", JSON.stringify(updatedCart)); // asyncThunk not needed?
      }
    }

  },  
  extraReducers: (builder) => { // asyncThunk extraReducers
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reduxAllProductsArr = action.payload; // 'getAndCleanAllProducts' returned data

        // no await needed: "You don’t need await inside the extraReducers since the thunk already handles the promise resolution."
        // 
        state.reduxCategoryProductsArr = groupProductsByCategory(action.payload); 
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})

export const { addToCart, setCartFromLocalStorage, removeFromCart } = productsSlice.actions;

export default productsSlice.reducer;

// sort products into categories, sorting them into category arrays 1, 2, 3...
// category name (for display) can be extracted from the product objects.
function groupProductsByCategory(products) {
  const productCategories = [];

  products.forEach((product) => {
    const categoryId = product.category.id;
    const categoryName = product.category.name;

    let category = productCategories.find(
      (category) => category.categoryId == categoryId
    );

    if (!category) {
      // if category doesnt exist we will create it
      category = {
        categoryId,
        categoryName,
        products: [], // initalize with an empty array
      };
      productCategories.push(category); // push new category to groupedProducts array
    }

    // now that the category exists we can push in the product
    category.products.push(product);
  });

  return productCategories;
}



/*  more about createAsyncThunk and extraReducers:
Automated Action Types: When you use createAsyncThunk, Redux Toolkit automatically generates three action types for each thunk:

pending: Dispatched when the async call starts.
fulfilled: Dispatched when the async call is successful.
rejected: Dispatched if the async call fails.
These actions are handled in extraReducers, which makes it easier to manage the loading, success, and error states in your reducers. */