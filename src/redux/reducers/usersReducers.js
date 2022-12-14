import { createReducer } from "@reduxjs/toolkit";
import usersActions from "../actions/usersActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { enter, reEnter, signOff, getUser, editProfile } = usersActions;

const initialState = {
  name: "",
  lastName: "",
  photo: "",
  logged: false,
  token: "",
  idUser: "",
  user: [],
};

const usersReducers = createReducer(initialState, (builder) => {
  builder
    .addCase(enter.fulfilled, (state, action) => {
      const { success, response } = action.payload;
      if (success) {
        let { user, token } = response; 
        const store = async () => {
          try {
            await AsyncStorage.setItem(
              "token",
              JSON.stringify({ token: { user: token } })
            );
          } catch (error) {
            console.log(error);
          }
        };

        store();

        let newState = {
          ...state,
          name: user.name,
          lastName: user.lastName,
          photo: user.photo,
          logged: true,
          role: user.role,
          idUser: user.id,
          token: token,
        };
     
        return newState;
      } else {
        let newState = {
          ...state,
          message: response,
        };
        return newState;
      }
    })
    .addCase(reEnter.fulfilled, (state, action) => {
      const { success, response, token } = action.payload;
      if (success) {
        let { user } = response;

        let newState = {
          ...state,
          name: user.name,
          lastName: user.lastName,
          photo: user.photo,
          logged: true,
          role: user.role,
          idUser: user.id,
          token: token,
        };

        return newState;
      } else {
        let newState = {
          ...state,
          message: response,
        };
        return newState;
      }
    })
    .addCase(signOff.fulfilled, (state, action) => {
      const { success, response } = action.payload;
      if (success) {
        AsyncStorage.removeItem("token");
        let newState = {
          ...state,
          name: "",
          lastName: "",
          photo: "",
          country:"",
          logged: false,
          role: "",
          idUser: "",
          token: "",
        };
        return newState;
      } else {
        let newState = {
          ...state,
          message: response,
        };
        return newState;
      }
    })
    .addCase(getUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload.response,
      };
    })
    .addCase(editProfile.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload.response,
        name: action.payload.response.name,
        lastName: action.payload.response.lastName,
        photo: action.payload.response.photo,
        role: action.payload.response.role,
        age: action.payload.response.age,
        country:action.payload.country
      };
    });
});

export default usersReducers;
