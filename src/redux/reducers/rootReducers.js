import productsReducer from "./productReducer";
import usersReducers from "./usersReducers";
import commentsReducers from "./commentsReducers";


const rootReducer = {
 
  user: usersReducers,
  products: productsReducer , 
  comment: commentsReducers,
};




export default rootReducer;
