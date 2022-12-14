import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import SingUp from "../screens/SingUp";
import Login from "../screens/Login";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/Profile";
// import MyReactions from "../screens/MyReactions";
import EditProfile from "../screens/EditProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import usersActions from "../redux/actions/usersActions";
import { useDispatch, useSelector } from "react-redux";
import Home from "../screens/Home";

const Bottom = createBottomTabNavigator();

const Navigator = () => {
  let dispatch = useDispatch();
  const [reload, setReload] = useState(true);
  const { logged, token } = useSelector((state) => state.user);
  let { reEnter, signOff } = usersActions;
  const get = async () => {
    let token = await AsyncStorage.getItem("token");
    token = token ? JSON.parse(token) : undefined;
    if (token) {
      dispatchEvent(reEnter(token.token.user));
    }
  };
  useEffect(() => {
    get();
  }, [reload]);
  return (
    <Bottom.Navigator
      options={{ headerShown: false }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Login") {
            iconName = focused ? "enter" : "enter";
          } else if (route.name === "SignUp") {
            iconName = focused ? "person-add" : "person-add";
          } else if (route.name === "LogOut") {
            iconName = focused ? "exit" : "exit";
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                onPress={async () => {
                  try {
                    let res = await dispatch(signOff(token));
                    if (res.payload.success) {
                      await AsyncStorage.removeItem("token");
                      setReload(!reload);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
            );
          } else if (route.name === "My Profile") {
            iconName = focused ? "person-circle-sharp" : "person-circle-sharp";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1c7cafe6",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {!logged ? (
        <>
          <Bottom.Screen name="Home" options={{ headerShown: false }}
          component={Home} />

          <Bottom.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Bottom.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SingUp}
          />
        </>
      ) : (
        <>
          <Bottom.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />

          <Bottom.Screen
            name="My Profile"
            options={{ headerShown: false }}
            component={ProfileScreen}
          />
          {/* <Bottom.Screen
            name="MyReactions"
            options={{
              headerShown: false,
              tabBarItemStyle: { display: "none" },
            }}
            component={MyReactions}
          /> */}

          <Bottom.Screen
            name="EditProfile"
            options={{ tabBarItemStyle: { display: "none" } }}
            component={EditProfile}
          />

          <Bottom.Screen
            name="LogOut"
            options={{ headerShown: false }}
            component={Home}
          />
        </>
      )}
    </Bottom.Navigator>
  );
};

export default Navigator;
