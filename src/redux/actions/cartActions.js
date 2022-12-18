import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../../url";

const addToCart = createAsyncThunk("addToCart", async (datos) => {
    let url = `${apiUrl}api/shopping`;
    try {
      const res = await axios.post(url, datos.data);
       console.log(res);
      return {
        success: true,
        product: res.response.data
        
      };
    } catch (error) {
  console.log(error.response);
      return {
        success: false,
        response: error.response.data.message,
      };
    }
  });
  const changeAmount = createAsyncThunk("changeAmount", async (data) => {
    let headers = { headers: { Authorization: `Bearer ${data.token}` } };
    let url = `${apiUrl}api/shopping/${data.id}?query=${data.change}`;
    let datos = {
      amount: data.amount,
      productId: data.productId
    }
    console.log(datos);
    try {
      const res = await axios.put(url, datos, headers);
       console.log(res);
      return {
        success: true,
        product: res.response.data
        
      };
    } catch (error) {
  
      return {
        success: false,
        response: error.response.data.message,
      };
    }
  });
  const deleteProduct = createAsyncThunk("deleteProduct", async (data) => {
    let headers = { headers: { Authorization: `Bearer ${data.token}` } };
    let url = `${apiUrl}api/shopping/${data.id}`;
   
    try {
      const res = await axios.put(url, data, headers);
      return {
        success: true,
        product: res.response.data
        
      };
    } catch (error) {
  
      return {
        success: false,
        response: error.response.data.message,
      };
    }
  });


  
const cartActions = {
  addToCart, 
  changeAmount,
  deleteProduct
  };
  
  export default cartActions;