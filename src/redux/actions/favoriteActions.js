import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl  from "../../url";

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

const getUserReactions = createAsyncThunk("getUserReactions", async (id, token) => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    try{
    const response = await axios.get(`${apiUrl}api/favs?userId=${id}`, headers);
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
        return response.data.response;
    }
    catch (error) {
        console.log(error)
        return {
            payload: 'An error has ocurred'
        }
    }
});

const deleteReaction = createAsyncThunk("deleteReaction", async ( {id, token }) => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const response = await axios.put(`${apiUrl}api/reactions/${id}`, null, headers);
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
    getUserReactions,
    updateFavorite,
    deleteReaction
}

export default favoriteActions;