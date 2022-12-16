import productsReducer from "./productReducer";
import usersReducers from "./usersReducers";


const rootReducer = {
 
  user: usersReducers,
  products: productsReducer  
};




export default rootReducer;
