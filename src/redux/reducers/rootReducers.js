import cartReducer from "./cartReducer";
import productsReducer from "./productReducer";
import usersReducers from "./usersReducers";


const rootReducer = {
 
  user: usersReducers,
  products: productsReducer,
  cart:cartReducer, 
};




export default rootReducer;
