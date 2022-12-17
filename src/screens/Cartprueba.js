import { View, Text, Image, StyleSheet } from "react-native";
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
export default function Cartprueba() {
  const { changeAmount } = cartActions;
  const { getUser } = userActions;
  const [products, setProducts] = useState([]);
  const { idUser, token } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  useEffect(() => {
    getProducts();
    dispatch(getUser(idUser));

    // eslint-disable-next-line
  }, [products]);

  async function getProducts() {
    await axios
      .get(`${apiUrl}api/shopping?userId=${idUser}`)
      .then((res) => setProducts(res.data.productsCart));
  }

  async function deleteProduct(id) {
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`${apiUrl}api/shopping/${id}`, headers);
    } catch (error) {
      console.log(error);
    }
  }

  let totalPrice = products.map((product) => product.price * product.amount);
  let totalProducts = products?.map((product) => {
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
  
  function add(info) {
    dispatch(changeAmount(info));
    getProducts();
  }
  function del(info) {
    dispatch(changeAmount(info));
    getProducts();
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
        
          <Text style={{backgroundColor:"red", position:"absolute", marginLeft:40, fontSize:21, height:23, marginTop:15,borderRadius:5, width:23, textAlign:"center",     borderWidth: 1,
    borderColor:5}}>{cantProducts}</Text>
        </View>
      </View>
      <ScrollView style={{ height: 200, backgroundColor: "#fdfaff" }}>
        {products?.map((item) => {
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
          height: 500,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: "white",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
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
            padding: 18,
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
        <Pressable style={styles.button}>
          <Text style={styles.text}>Checkout</Text>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "black",
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
