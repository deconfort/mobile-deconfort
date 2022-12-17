import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import React from "react";
import { Card, Button } from "react-native-paper";

export default function Home(props) {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../assets/decomfortLogo.png")}
      ></Image>
      <View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text style={{ width: 180, textAlign: "center" }}>
              Free EU shipping over 150€
            </Text>
            <Text style={{ width: 180, textAlign: "center" }}>
              with DHL Express
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text style={{ width: 320, textAlign: "center" }}>
              Shop Your Local Store & Get It Faster
            </Text>
            <Text style={{ width: 320, textAlign: "center" }}>
              Come see us IRL or choose in-store pickup at checkout
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text style={{ width: 330, textAlign: "center", marginTop: 15 }}>
              E-GIFT CARDS
            </Text>
            <Text style={{ width: 330, textAlign: "center" }}>
              Make it easy for them to pick out what they want
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>
        <View style={{ padding: 15 }}>
          <Card style={{ marginTop: 10 }}>
            <Text style={styles.text_card}>Bed Back</Text>
            <Card.Cover
              style={{ resizeMode: "contain", opacity: 0.5, padding: 10 }}
              source={{
                uri: "https://crystalcomfort.co.uk/wp-content/uploads/2022/05/26019_watermarked-2.png",
              }}
            />
          </Card>
          <Card style={{ marginTop: 10 }}>
            <Text style={styles.text_card}>Cups</Text>
            <Card.Cover
              style={{ resizeMode: "contain", opacity: 0.5, padding: 10 }}
              source={{
                uri: "https://i.pinimg.com/564x/bb/d1/8e/bbd18e239fc5930f21ffb1b6a627e55c.jpg",
              }}
            />
          </Card>
          <Card style={{ marginTop: 10 }}>
            <Text style={styles.text_card}>Outdoor</Text>
            <Card.Cover
              style={{ resizeMode: "contain", opacity: 0.5, padding: 10 }}
              source={{
                uri: "https://brownjordanoutdoorkitchens.com/wp-content/uploads/2021/11/Birmingham-outdoor-kitchen.jpg",
              }}
            />
          </Card>
        </View>
        <View style={{ padding: 10 }}>
          <Button
            style={{ marginTop: 10, marginBottom: 15 }}
            mode="contained"
            onPress={() => {
              props.navigation.navigate("Store");
            }}
          >
            All Product
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
  },
  img: {
    width: "100%",
    height: 100,
    backgroundColor: "white",
  },
  text_card: {
    position: "absolute",
    fontSize: 60,
    color: "white",
    textAlign: "center",
    top: 60,
    backgroundColor: "black",
    width: "100%",
  },
});
