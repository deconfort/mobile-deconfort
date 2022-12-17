import cartReducer from "./cartReducer";
import productsReducer from "./productReducer";
import usersReducers from "./usersReducers";
import commentsReducers from "./commentsReducers";
import reducerSelect from "./reducerSelect";


const rootReducer = {
 
  user: usersReducers,

  products: productsReducer , 
  comment: commentsReducers,
  cart:cartReducer, 
  reducerSelect

};




export default rootReducer;
