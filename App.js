import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import {NavigationContainer} from "@react-navigation/native"
import Navigator from "./src/navigation/MainNavStack"
import 'react-native-gesture-handler';


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator/>
       {/* <DrawerNavigation/> */}
      </NavigationContainer>
    </Provider>
  );
}

