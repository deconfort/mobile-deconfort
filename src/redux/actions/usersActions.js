import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../../url";

const enter = createAsyncThunk("enter", async (datos) => {
  //datos son el objeto que viene del formulario
  let url = `${apiUrl}api/auth/sign-in`;
  try {
    let user = await axios.post(url, datos);
    return {
      success: true,
      response: user.data.response,
      res: user.data,
    };
  } catch (error) {
    console.log(error.response);
    return {
      success: false,
      response: error.response.data.message,
    };
  }
});

const reEnter = createAsyncThunk("reEnter", async (token) => {
  let url = `${apiUrl}api/auth/token`;
  let headers = { headers: { Authorization: `Bearer ${token}` } };
  try {
    let user = await axios.post(url, null, headers);
    return {
      success: true,
      response: user.data.response,
      token: token,
    };
  } catch (error) {
    console.log(error.response);
    return {
      success: false,
      response: error.response.data.message,
    };
  }
});
const signOff = createAsyncThunk("signOff", async (token) => {
  let url = `${apiUrl}api/auth/sign-out`;
  let headers = { headers: { Authorization: `Bearer ${token}` } };
  try {
    let user = await axios.post(url, null, headers);
    return {
      success: true,
      response: user.data.message,
    };
  } catch (error) {
    console.log(error.response);
    return {
      success: false,
      response: error.response.data.message,
    };
  }
});
const getUser = createAsyncThunk("getUser", async (id) => {
  let url = `${apiUrl}api/auth/me/${id}`;
  try {
    let res = await axios.get(url);
    return {
      //el return es el payload (carga) que recibe el reductor
      success: true,
      response: res.data.response,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      response: "ocurrió un error",
    };
  }
});

  const editProfile = createAsyncThunk("editProfile", async (data) =>{
  let url = `${apiUrl}api/auth/me/${data.id}`;

  try{
  let res = await axios.patch(url, data.edit)
  return{
    success:true,
    response:res.data.data
  }
  }catch(error) {
    console.log(error);
    return {
      success: false,
      response: "ocurrió un error",
    };
  }

})

const usersActions = {
  enter,
  reEnter,
  signOff,
  getUser,
  editProfile
};

export default usersActions;
