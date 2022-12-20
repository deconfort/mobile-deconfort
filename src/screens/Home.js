import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Button, Paragraph } from "react-native-paper";

const ImagesCarousel = [
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/home-office-decor-ideas-1611764047.jpg",
  "https://media.architecturaldigest.com/photos/5abbf4772589ce07049dd6a5/16:9/w_3456,h_1944,c_limit/Level%20Frames%20-%20online%20custom%20framing%20artwork%20and%20photos.jpeg",
  "https://www.jomalone.com.au/media/export/cms/smpp/home/SMPP_MOB_Banner_Diffusers_375x240@2x.jpg",
  "https://www.pavilionbroadway.co.uk/blogs/wp-content/uploads/2021/01/geometric-wall-mirrors.jpg",
];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function Home(props) {
  const [imgActive, setImgActive] = useState(0);

  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../assets/decomfortLogo.png")}
      ></Image>

      <View style={styles.wrap}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {ImagesCarousel.map((e, index) => (
            <Image
              key={e}
              resizeMode="stretch"
              style={styles.wrap}
              source={{ uri: e }}
            />
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {ImagesCarousel.map((e, index) => (
            <Text
              key={e}
              style={imgActive == index ? styles.dotActive : styles.dot}
            >
              ●
            </Text>
          ))}
        </View>
      </View>
      {/* Container main */}
      <ScrollView>
        {/* primer view */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            minHeight: 150,
            marginTop: 3,
          }}
        >
          <View>
            <Image
              style={{ width: 160, height: 160, marginTop: 2 }}
              source={{
                uri: "https://images-negozona-argentina.s3.amazonaws.com/uploads/picture/image/35443/IMG-4715.webp",
              }}
            ></Image>
          </View>
          <View
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 15,
            }}
          >
            <Text style={{ textAlign: "center" }}>Mission</Text>
            <Paragraph style={{ fontSize: 10 }}>
              Our mission is to offer the best design {"\n"}and decoration
              solutions, maintaining {"\n"}high quality standards, respecting
              {"\n"} the environment and seeking processes{"\n"} that allow us
              to be more productive, {"\n"}obtaining greater benefits for {"\n"}
              our clients and collaborators.
            </Paragraph>
          </View>
        </View>
        {/* segundo view */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            minHeight: 150,
            marginTop: 3,
          }}
        >
          <View
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 15,
            }}
          >
            <Text style={{ textAlign: "center" }}>Vision</Text>
            <Paragraph style={{ fontSize: 10 }}>
              Our vision is a leading company in{"\n"}
              interiorsolutions,decoration and{"\n"}accessories,using modern
              {"\n"}methodologiesandrespectingthe needs{"\n"}
              of ourcustomers,thusproviding maximum{"\n"}
              addedvalue,providingthem with{"\n"}confidenceand security.
            </Paragraph>
          </View>
          <View>
            <Image
              style={{ width: 160, height: 160, marginTop: 4 }}
              source={{
                uri: "https://cdn.shopify.com/s/files/1/0259/4835/6663/files/About_us_3x2_1_600x_09285351-ea72-48d0-a08a-ab5ca7d1b6ca.png?v=1659443205",
              }}
            ></Image>
          </View>
        </View>
      </ScrollView>
      {/* termina el main view */}
      <View style={{ padding: 10 }}>
        <Button
          style={{
            marginTop: 10,
            marginBottom: 15,
            backgroundColor: "#5c195d",
          }}
          mode="contained"
          onPress={() => {
            props.navigation.navigate("Store");
          }}
        >
          All Product
        </Button>
      </View>
    </SafeAreaView>
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
    height: 200,
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

  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: "white",
  },
  dot: {
    margin: 3,
    color: "#888",
  },
});
