import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "react-native-paper";

export default function CartCard(props) {
  let { del, add, deleteProd, name, price, cant, photo } = props;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: photo,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            width: 230,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <AntDesign
            onPress={deleteProd}
              style={{  marginLeft: 128, marginTop:12 }}
              name="close"
              size={22}
              color="#6e6b6b"
            />
            <Text style={{ padding: 35, textAlign: "center", fontSize:15, fontWeight:"500", color:"#262525" }}>
              {name}
            </Text>
            
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Text style={{ marginTop: 15, fontSize: 18, marginBottom:10, color:"#262525"}}>${price}</Text>
            <AntDesign onPress={del}
              style={{ marginTop: 15, marginLeft: 10, marginBottom:10 }}
              name="minussquareo"
              size={24}
              color="#6e6b6b"
            />
            <Text style={{ marginTop: 15, fontSize: 18, marginBottom:10, color:"#262525" }}>{cant}</Text>
            <AntDesign
            onPress={add}
              style={{ marginTop: 15, marginBottom:10}}
              name="plussquareo"
              size={24}
              color="#6e6b6b"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "88%",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor:"#e3dede",
    borderRadius: 20,
    backgroundColor: "white",

    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  image: {
    height: "100%",
    width: 176,
    borderBottomLeftRadius: 18,
    borderTopLeftRadius: 18,
  },
});
