import cartReducer from "./cartReducer";
import productsReducer from "./productReducer";
import usersReducers from "./usersReducers";
import commentsReducers from "./commentsReducers";


const rootReducer = {
 
  user: usersReducers,

  products: productsReducer , 
  comment: commentsReducers,
  cart:cartReducer, 

};




export default rootReducer;
