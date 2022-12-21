import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from "react-native";

import apiUrl from "../../url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../redux/actions/productAction";
import cartActions from "../redux/actions/cartActions";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";


const Detail = ({ route }) => {
  const { idProduct } = route.params;
  const { getOneProduct } = productAction;
  const { idUser, user, token } = useSelector((state) => state.user);
  const { oneProduct } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { getCartProduct } = cartActions;
  let [time, setTime] = useState(true)


  useEffect(() => {
    getMyProduct();
    // eslint-disable-next-line
  }, []);



  async function getMyProduct() {
    try {
      await dispatch(getOneProduct(idProduct));
      setTimeout(() => {
        setTime(false)
      }, 500);
    } catch (error) { }
  }


  async function pushCartProducts() {
    try {
      await dispatch(getCartProduct(idUser));
    } catch (error) {
      console.log(error);
    }
  }

  async function addToCart() {
    let Oneproduct = {
      name: oneProduct.name,
      photo: oneProduct.photo[0],
      price: oneProduct.price,
      productId: oneProduct._id,
      userId: idUser,
    };
    try {
      let res = await axios.post(`${apiUrl}api/shopping`, Oneproduct);
      if (res.data.success) {
        pushCartProducts()
        Alert.alert(user.name, `${res.data.message} 🛒`, [
          {
            text: "OK",
          },
        ]);
      }
    } catch (error) {
      Alert.alert(user.name, "The product is already in the cart 🛒", [
        {
          text: "OK",
        },
      ]);
    }
  }
  if (time) {
    return (
      <View
        style={{
          backgroundColor: "#ffff",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <ActivityIndicator
          color={"black"}
          size={"large"}
          style={{ alignSelf: "center" }}
        />
      </View>
    )
  } else {

    return (
      <View
        style={{
          backgroundColor: "#ffff",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {oneProduct && (
          <>
            {time ? <Text>Loading...</Text> :
              <ImageBackground
                resizeMode="cover"
                source={{ uri: oneProduct.photo[0] }}
                style={styles.image}
              >
                <View style={styles.hero}></View>
              </ImageBackground>
            }
            <View style={styles.cont3}>
              <Text style={styles.title}>{oneProduct.name}</Text>
              <Text style={styles.subtitle}>{oneProduct.description}</Text>
              <Text style={styles.text}>Price $ {oneProduct.price}</Text>
              <View style={styles.cont1}></View>
            </View>
            <Button
              buttonColor="#5c195d"
              textColor="white"
              onPress={() => {
                if (token) {
                  addToCart();
                } else {
                  Alert.alert(
                    "Ups!",
                    "You have to registered to add this product to your cart"
                  );
                }
              }}
            >
              Add to cart <Ionicons name="cart-outline" size={24} color="white" />
            </Button>
          </>
        )}
      </View>
    );
  }

};

export default Detail;

const styles = StyleSheet.create({
  hero: {
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },

  iconsview: {
    flexDirection: "row",
  },

  title: {
    color: "black",
    fontSize: 25,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#474747",
    marginTop: 10,
  },
  text: {
    marginLeft: 70,
    fontSize: 18,
    color: "#474747",
    marginTop: 5,
    paddingRight: 80,
    lineHeight: 25,
  },
  image: {
    width: "100%",
    height: "80%",
  },
  btn: {
    marginTop: 90,
    width: "50%",
    backgroundColor: "#303030",
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 30,
  },
  btnText: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
  cont1: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 40,
  },
  c3: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#52646a",
  },
  c2: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "rgb(126,97,71)",
    marginHorizontal: 10,
  },
  c1: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: " rgb(137,118,101)",
  },
  selected: {
    borderColor: " rgb(137,118,101)",
    height: 30,
    width: 30,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  cont2: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 25,
  },

  cont3: {
    flex: 1,
    alignItems: "center",
    height: 500,
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
    position: "absolute",
    marginTop: 470,
  },
  colors: {
    color: "#303030",
    fontSize: 25,
    marginTop: 20,
    flex: 2,
    marginTop: 0,
  },
  cart: {
    paddingRight: 10,
  },
});
