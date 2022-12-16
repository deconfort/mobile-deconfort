import { createReducer } from "@reduxjs/toolkit";
import productAction from "../actions/productAction";

const { getProducts, getProductsFilter, getOneProduct } = productAction;

const initialState = {
  products: [],
  value: "",
  order: "",
  oneProduct: {}
};

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProducts.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    })
    .addCase(getOneProduct.fulfilled, (state, action) => {
      return {
        ...state,
        oneProduct: action.payload,
      };
    })
    .addCase(getProductsFilter.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });

    
});

export default productsReducer;