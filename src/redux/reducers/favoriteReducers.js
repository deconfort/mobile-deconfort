import { createReducer } from "@reduxjs/toolkit";
import favoriteActions from "../actions/favoriteActions";

const { getUserFavs, deleteFavs } = favoriteActions;

const initialState = {
    favorite: []
};

const favoriteReducers = createReducer(initialState,
    (builder) => {
        builder

            .addCase(getUserFavs.fulfilled, (state, action) => {
                return { ...state, favorite: action.payload.response }
            })

            .addCase(deleteFavs.fulfilled, (state, action) => {
                let myfavorite = state.favorite.filter(reaction => reaction._id !== action.payload._id)
                return { ...state, favorite: myfavorite }
            })

    })

export default favoriteReducers;