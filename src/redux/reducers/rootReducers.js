import cartReducer from "./cartReducer";
import productsReducer from "./productReducer";
import usersReducers from "./usersReducers";
import commentsReducers from "./commentsReducers";

import favoriteReducers from "./favoriteReducers";

const rootReducer = {
  favorites: favoriteReducers,
  user: usersReducers,
  products: productsReducer,
  comments: commentsReducers,
  cart: cartReducer,
};




export default rootReducer;
