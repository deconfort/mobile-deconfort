import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import apiUrl from "../../url";
import { useNavigation } from '@react-navigation/native';




export default function SingUp() {
  const navigation = useNavigation();
 
  const [signUp, setSignUp] = useState({
    name: "",
    lastName: "",
    photo: "",
    age: "",
    role: "user",
    country:"",
    mail: "",
    password: "",
  });
 

  const handlerInput = (e, campo, value) => {
    setSignUp({
      ...signUp,
      [campo]: e || value,
    });
  };

  const submit = async () => {
    let inputs = Object.values(signUp).some((input) => input === "");
    if (!inputs) {
      try {
        let res = await axios.post(`${apiUrl}api/auth/sign-up`, signUp);

        if (res.data.success) {
          Alert.alert(
            "Hi",
            "Deconfort sent a notification to your email, open the Gmail app and tap Verify my account prompt to verify its you",
            [
              {
                text: "OK",
              },
            ]
          );
        } else {
          Alert.alert("Error", "Your data is invalid ☹️", [
            {
              text: "OK",
            },
          ]);
        }

      } catch (e) {
        Alert.alert("Error",  e.response.data.message, [
          {
            text: "OK",
          },
        ]);
      }
    }else {
      Alert.alert("Error", "All the fields are required! ☹️");
    }
  };

  return (
    <View style={styles.contenedor}>

        <Text style={styles.textTittle}>Create an account</Text>
        <TextInput
          style={styles.inputSignUp}
          id="name"
          placeholderTextColor="#333333"
          color="black"
          placeholder="Name"
          onChangeText={(e) => handlerInput(e, "name")}
        />
        <TextInput
          style={styles.inputSignUp}
          id="LastName"
          placeholderTextColor="#333333"
          color="black"
          placeholder="LastName"
          onChangeText={(e) => handlerInput(e, "lastName")}
        />
        <TextInput
          style={styles.inputSignUp}
          id="photo"
          color="black"
          placeholderTextColor="#333333"
          placeholder="URL photo"
          onChangeText={(e) => handlerInput(e, "photo")}
        />
        <TextInput
          style={styles.inputSignUp}
          id="Age"
          color="black"
          placeholderTextColor="#333333"
          placeholder="Age"
          onChangeText={(e) => handlerInput(e, "age")}
        />
        <TextInput
          style={styles.inputSignUp}
          id="Country"
          color="black"
          placeholderTextColor="#333333"
          placeholder="Country"
          onChangeText={(e) => handlerInput(e, "country")}
        />
        <TextInput
          style={styles.inputSignUp}
          id="mail"
          placeholderTextColor="#333333"
          color="black"
          placeholder="Email"
          onChangeText={(e) => handlerInput(e, "mail")}
        />
        <TextInput
          style={styles.inputSignUp}
          id="password"
          placeholderTextColor="#333333"
          color="black"
          placeholder="Password"
          secureTextEntry={true}
          password={true}
          onChangeText={(e) => handlerInput(e, "password")}
        />
        <TouchableOpacity style={styles.button}>
          <Text
            style={{ textAlign: "center", color: "white", fontSize: 18 }}
            onPress={submit}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "black", fontSize: 14, textAlign: "center" }}>
          Already have an account?
        </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: "black",
              fontSize: 17,
              textAlign: "center",
              textDecorationLine: "underline",
            }}
          >
            Log In
          </Text>
        </Pressable>
 
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    width: "100%",
    minHeight: "100%",
  },
  image: {
    width: "100%",
    height: 900,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingRight: 5,
  },
  textTittle: {
    color: "rgb(111, 164, 198 )",
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 50,
    borderColor: "rgb (68, 78, 84 )",
    shadowColor: "black",
  },
  inputSignUp: {
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    width: "65%",
    borderRadius: 30,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    marginBottom: 20,
    fontSize: 20,
  },
  button: {
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: "#1c7cafe6",
    width: "30%",
    borderRadius: 30,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  dropdown1BtnStyle: {
    width: "65%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    borderRadius: 30,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    marginBottom: 20,
    fontSize: 20,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "black", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "black", textAlign: "left" },
});
