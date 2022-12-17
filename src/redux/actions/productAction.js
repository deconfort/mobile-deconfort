import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../../url";

const getProducts = createAsyncThunk("getProducts", async () => {
  try {
    const res = await axios.get(`${apiUrl}api/products`);
    return(res.data.response);
  } catch (error) {
    console.log(error);
    return {
      payload: "Error",
    };
  }
});

const getOneProduct = createAsyncThunk("getOneProduct", async (id) => {
  try {
    const res = await axios.get(`${apiUrl}api/products/${id}`);
    return{
      response: res.data.response,
      success: res.data.success,
      message: res.data.message,
    }
  } catch (error) {
    console.log(error);
    return {
      payload: "Error",
    };
  }
});

const editProduct = createAsyncThunk("editProduct", async (data) => {
  let headers = { headers: { Authorization: `Bearer ${data.token}` } };
  try {
    const res = await axios.put(`${apiUrl}api/products/${data.id}`, data.productEdited, headers);
    return {
      response: res.data.response,
      success: res.data.success,
      message: res.data.message,
    }
  } catch (error) {
    console.log(error);
    return {
      payload: "Error",
    };
  }
});

const getProductsFilter = createAsyncThunk(
  "getProductsFilter",
  async ({  value, order }) => {
    let url = `${apiUrl}api/products?name=${value}&order=${order}`;

    try {
      const res = await axios.get(url);
      return {
        products: res.data.response,
        value,
        order
      };
    } catch (error) {
      console.log(error);
      return {
        payload: "Error",
      };
    }
  }
);


const updateProduct = createAsyncThunk("updateProduct",async ({data, token})=>{
  let headers = {headers: { Authorization: `Bearer ${token}`}};
  try{
      const response = await axios.put(`${apiUrl}api/products/${data.id}`, data.product, headers);
  return response.data.response;
}
  catch(error){
      console.log(error)
      return {
          payload: 'An error has ocurred'
      }
  }
  
});

const productAction = {
  getProducts,
  getProductsFilter,
  getOneProduct,
  editProduct,
  updateProduct
};

export default productAction;