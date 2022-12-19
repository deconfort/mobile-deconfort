import { createReducer } from "@reduxjs/toolkit";
import cartActions from "../actions/cartActions";


const {addToCart, changeAmount, getCartProduct} = cartActions

const initialState = {
    cartProducts: [],
}

const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getCartProduct.fulfilled, (state, action) => {
            state.cartProducts = action.payload.product
        })
});

export default cartReducer;
