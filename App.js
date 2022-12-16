import React from 'react'
import 'react-native-gesture-handler'
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import {NavigationContainer} from "@react-navigation/native"

import Navigator from "./src/navigation/MainNavStack";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
         <Navigator/>

      </NavigationContainer>


    </Provider>
  );
}

