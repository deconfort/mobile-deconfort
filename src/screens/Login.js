import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import usersActions from "../redux/actions/usersActions";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  let dispatch = useDispatch();
  let { enter } = usersActions;
  const [logIn, setLogIn] = useState({
    mail: "",
    password: "",
  });

  const handlerInput = (e, campo, value) => {
    setLogIn({
      ...logIn,
      [campo]: e || value,
    });
  };

  const submit = async () => {
    let inputs = Object.values(logIn).some((input) => input === "");
    if (!inputs) {
      try {
        let res = await dispatch(enter(logIn));
        console.log(res)
        if (res.payload.success) {
          Alert.alert("Hi", "Welcome to My Deconfort! 🤩", [
            {
              text: "OK",
            },
          ]);
        } else {
          Alert.alert("Error", "Your data is invalid ☹️", [
            {
              text: "OK",
            },
          ]);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      Alert.alert("Error", "All the fields are required! ☹️");
    }
  };

  return (
    <>
      <View style={styles.containerr}>
          <Text style={styles.textTittle}>Welcome!</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#333333"
            color="black"
            style={styles.inputSignUp}
            onChangeText={(e) => handlerInput(e, "mail")}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#333333"
            color="black"
            secureTextEntry={true}
            password={true}
            style={styles.inputSignUp}
            onChangeText={(e) => handlerInput(e, "password")}
          />
          <TouchableOpacity style={styles.button}>
            <Text
              style={{ textAlign: "center", color: "white", fontSize: 18 }}
              onPress={submit}
            >
              Log In
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "black", fontSize: 14, textAlign: "center" }}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                color: "black",
                fontSize: 17,
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              Sign Up
            </Text>
          </Pressable>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textTittle: {
    color: "#5c195d",
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 90,
    borderColor: "rgb (68, 78, 84 )",
    shadowColor: "black",
  },

  contenedor: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 900,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingRight: 5,
  },
  inputSignUp: {
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    width: "65%",
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    marginBottom: 20,
    fontSize: 20,
  },
  button: {
    marginTop: 90,
    marginBottom: 25,
    backgroundColor: "#5c195d",
    width: "30%",
    borderRadius: 30,
    padding: 10,
  },
  containerr: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "space-between",
    height: "100%",
  },
  img: {
    width: "100%",
    height: 150,
    resizeMode:'stretch',
    backgroundColor: "white",
    marginBottom:69
  },
});
