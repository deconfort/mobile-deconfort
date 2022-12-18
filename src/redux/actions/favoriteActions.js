import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl  from "../../../url";

const getFav = createAsyncThunk("getFav", async (id) => {
    try{
    const response = await axios.get(`${apiUrl}api/favs?productId=${id}`);
    return {
        success: true,
        response: response.data,
        reqId: response.data.id
    };
    } catch(error){ 
        return {
        success: false,
        response: error.response.data.data,
        }
    }
});

const getUserFavs = createAsyncThunk("getUserFavs", async (id) => {
    try{
    const response = await axios.get(`${apiUrl}api/favs?userId=${id}`);
    return {
        success: true,
        response: response.data.data,
    };
    } catch(error){
        return {
        success: false,
        response: error.response.data.data,
        }
    }
});

const updateFavorite = createAsyncThunk("updateFavorite", async ( data ) => {
    let headers = { headers: { Authorization: `Bearer ${data.token}` } };
    try {
        const response = await axios.put(`${apiUrl}api/favs?productId=${data.id}`,data.name, headers);
        return {
            success: response.data.success,
            message: response.data.message,
        }
    }
    catch (error) {
        console.log(error)
        return {
            payload: 'An error has ocurred'
        }
    }
});

const deleteFavs = createAsyncThunk("deleteFavs", async ( {name, id, token }) => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const response = await axios.put(`${apiUrl}api/favs/${id}`, name, headers);
        return response.data.response;
    }
    catch (error) {
        console.log(error)
        return {    
            payload: 'An error has ocurred'
        }
    }
});

const favoriteActions = {
    getFav,
    getUserFavs,
    updateFavorite,
    deleteFavs
}

export default favoriteActions;