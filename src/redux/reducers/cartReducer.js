import { createReducer } from "@reduxjs/toolkit";
import cartActions from "../actions/cartActions";


const {addToCart, changeAmount} = cartActions

const initialState = {

}

const cartReducer = createReducer(initialState, (builder) => {

  
});

export default cartReducer;
