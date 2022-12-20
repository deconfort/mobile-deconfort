import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usersAction from "../redux/actions/usersActions";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Avatar, Title, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";



const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, idUser } = useSelector((state) => state.user);
  const { getUser, editProfile } = usersAction;

  useEffect(() => {
    dispatch(getUser( idUser));
    // eslint-disable-next-line
  }, []);
  const [editUser, setEditUser] = useState({
    name: user.name,
    lastName: user.lastName,
    photo: user.photo,
    age: user.age,
    mail: user.mail,
    // password: user.password
  });

  const handlerInput = (e, campo, defaultValue) => {
    console.log(e);
    setEditUser({
      ...editUser,
      [campo]: e === "" ? defaultValue : e
    });
  };


  const submit = async () => {
    try {
        let data = {
            id: idUser,
            edit: editUser
          }
       let res =  await  dispatch(editProfile(data))
       if (res.payload.success) {
        Alert.alert(user.name, 
        "Your data has been successfully modified", [
          {
            text: "OK",
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: "column",
            marginTop: 90,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar.Image
            source={{
              uri: user.photo,
            }}
            size={150}
          />
          <View>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 20,
                  flexDirection: "column",
                  textAlign: "center",
                },
              ]}
            >
              {user.name}
            </Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
      <View style={styles.row}>
          <Text
            style={{
              color: "#777777",

              marginBottom: 26,
              fontSize: 15,
            }}
          >
            Photo:
          </Text>
          <TextInput
            style={{
              color: "#777777",
              marginLeft: 5,
              marginBottom: 26,
              fontSize: 15,
              backgroundColor: "rgba(255, 255, 255, 0.50)",
              width: "60%",
              borderRadius: 10,
              paddingBottom: 5,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 6,
            }}
            
            defaultValue={user.photo}
            onChangeText={(e) => handlerInput(e, "photo", user.photo )}
          />
          <AntDesign
            name="edit"
            size={24}
            color="#5c195d"
            style={{ marginLeft: 20, marginBottom: 20 }}
          />
        </View>
        <View style={styles.row}>
          <Text
            style={{
              color: "#777777",

              marginBottom: 26,
              fontSize: 15,
            }}
          >
            Name:
          </Text>
          <TextInput
            style={{
              color: "#777777",
              marginLeft: 5,
              marginBottom: 26,
              fontSize: 15,
              backgroundColor: "rgba(255, 255, 255, 0.50)",
              width: "60%",
              borderRadius: 10,
              paddingBottom: 5,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 6,
            }}
            defaultValue={user.name}
            onChangeText={(e) => handlerInput(e, "name", user.name)}
          
          />
          <AntDesign
            name="edit"
            size={24}
            color="#5c195d"
            style={{ marginLeft: 20, marginBottom: 20 }}
          />
        </View>
        <View style={styles.row}>
          <Text
            style={{
              color: "#777777",
              marginBottom: 26,
              fontSize: 15,
            }}
          >
            LastName:
          </Text>
          <TextInput
            style={{
              color: "#777777",
              marginLeft: 5,
              marginBottom: 26,
              fontSize: 15,
              backgroundColor: "rgba(255, 255, 255, 0.50)",
              width: "60%",
              borderRadius: 10,
              paddingBottom: 5,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 6,
            }}
            defaultValue={user.lastName}
            onChangeText={(e) => handlerInput(e, "lastName", user.lastName)}
          />
          <AntDesign
            name="edit"
            size={24}
            color="#5c195d"
            style={{ marginLeft: 20, marginBottom: 20 }}
          />
        </View>
        <View style={styles.row}>
          <Text
            style={{
              color: "#777777",
              marginBottom: 26,
              fontSize: 15,
            }}
          >
            Age:
          </Text>
          <TextInput
            style={{
              color: "#777777",
              marginLeft: 5,
              marginBottom: 26,
              fontSize: 15,
              backgroundColor: "rgba(255, 255, 255, 0.50)",
              width: "60%",
              borderRadius: 10,
              paddingBottom: 5,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 6,
            }}
            defaultValue={user.age}
            onChangeText={(e) => handlerInput(e, "age", user.age)}
            keyboardType="numeric"
          />
          <AntDesign
            name="edit"
            size={24}
            color="#5c195d"
            style={{ marginLeft: 20, marginBottom: 20 }}
          />
        </View>
        <View style={styles.row}>
          <Text
            style={{
              color: "#777777",
              marginBottom: 26,
              fontSize: 15,
            }}
            keyboardType="email-address"
          >
            Mail:
          </Text>
          <TextInput
            style={{
              color: "#777777",
              marginLeft: 5,
              marginBottom: 26,
              fontSize: 15,
              backgroundColor: "rgba(255, 255, 255, 0.50)",
              width: "60%",
              borderRadius: 10,
              paddingBottom: 5,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 6,
            }}
            defaultValue={user.mail}
            onChangeText={(e) => handlerInput(e, "mail" , user.mail)}
          />
          <AntDesign
            name="edit"
            size={24}
            color="#5c195d"
            style={{ marginLeft: 20, marginBottom: 20 }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
      
        >
          <TouchableOpacity style={styles.btCallToAction} onPress={submit}>
            <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    alignItems: "center",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  btCallToAction: {
    backgroundColor: "#5c195d",
    width: "35%",
    borderRadius: 15,
    padding: 15,
    borderColor: "169, 204, 227 ",
    marginBottom:10
  },
});
