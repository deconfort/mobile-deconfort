import { View, Text, Image, StyleSheet, Linking } from "react-native";
import CartCard from "../components/CartCard";
import cartActions from "../redux/actions/cartActions";
import userActions from "../redux/actions/usersActions";
import apiUrl from "../../url";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function Cartprueba() {
  let navigation = useNavigation();
  const { changeAmount, getCartProduct } = cartActions;
  const { getUser } = userActions;

  const { idUser, token } = useSelector((state) => state.user);
  const { cartProducts } = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  useEffect(() => {
    getProducts();
    dispatch(getUser(idUser));
    // eslint-disable-next-line
  }, []);

  async function getProducts() {
    try {
      let res = await dispatch(getCartProduct(idUser));
      console.log(res.payload);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`${apiUrl}api/shopping/${id}`, headers);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  let totalPrice = cartProducts.map(
    (product) => product.price * product.amount
  );
  let totalProducts = cartProducts?.map((product) => {
    return product.amount;
  });

  const initialprice = 0;
  const sumWithInitial = totalPrice.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialprice
  );
  const cantProducts = totalProducts.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialprice
  );

  async function add(info) {
    try {
      await dispatch(changeAmount(info));
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }
  async function del(info) {
    try {
      await dispatch(changeAmount(info));
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  function checkout() {
    navigation.navigate("Paypal", {
      item: sumWithInitial,
    });
  }

  return (
    <>
      <View
        style={{
          height: 100,
          backgroundColor: "#fdfaff",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 50,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 25 }}>My Cart </Text>
        <View>
          <Ionicons
            style={{ marginLeft: 15 }}
            name="md-cart-sharp"
            size={35}
            color="black"
          />

          <Text
            style={{
              backgroundColor: "red",
              position: "absolute",
              marginLeft: 40,
              fontSize: 21,
              height: 23,
              marginTop: 15,
              borderRadius: 5,
              width: 23,
              textAlign: "center",
              borderWidth: 1,
              borderColor: 5,
            }}
          >
            {cantProducts}
          </Text>
        </View>
      </View>
      <ScrollView style={{ height: 200, backgroundColor: "#fdfaff" }}>
        {cartProducts?.map((item) => {
          return (
            <CartCard
              key={item._id}
              name={item.name}
              price={item.price}
              photo={item.photo}
              cant={item.amount}
              id={item._id}
              del={() => {
                let info = {
                  id: item._id,
                  amount: item.amount,
                  productId: item.productId,
                  change: "del",
                  token,
                };
                del(info);
              }}
              add={() => {
                let info = {
                  id: item._id,
                  amount: item.amount,
                  productId: item.productId,
                  change: "add",
                  token,
                };
                add(info);
              }}
              deleteProd={() => {
                deleteProduct(item._id);
              }}
            />
          );
        })}

      </ScrollView>
<View
        style={{
          height: 150,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: "white",
          flexDirection: "column",
          alignItems: "center",
          marginTop:10
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            marginBottom: 30,
            color: "#767676",
          }}
        >
          Order Summary
        </Text>
        <Text style={{ color: "#767676" }}>
          _______________________________________
        </Text>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            padding: 5,
          }}
        >
          <Text
            style={{ fontSize: 20, marginHorizontal: 60, color: "#767676" }}
          >
            Total({cantProducts} items)
          </Text>
          <Text
            style={{ fontSize: 20, marginHorizontal: 60, color: "#767676" }}
          >
            ${sumWithInitial}
          </Text>
        </View>
        </View>
<View style={{paddingStart:20, paddingLeft:20, paddingRight:20 }}>
        <Pressable
          style={styles.button}
          onPress={async () => {
            const preference = {
              items: cartProducts.map((item) => {
                return {
                  title: "Deconfort Products ",
                  unit_price: item.price,
                  quantity: item.amount,
                  currency_id: "ARS",
                  id: item._id,
                };
              }),
            };
            let response = await axios.post(
              "https://api.mercadopago.com/checkout/preferences",
              preference,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer APP_USR-537691465530679-121318-8bbc230b0af6d8f1705e1a22a96b0d63-1262875102`,
                },
              }
            );
            try {
              await Linking.openURL(response.data.init_point);
              console.log(Linking.openURL);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Text style={styles.text}>Checkout</Text>
        </Pressable>

</View>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
marginTop:10,
    alignItems: "center",
    justifyContent: "center",
    padding:10,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#5c195d",
    marginBottom: 10,
    
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    
  },
});
