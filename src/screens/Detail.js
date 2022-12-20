import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Alert,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import apiUrl from "../../url";
import axios from "axios";
import usersAction from "../redux/actions/usersActions";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../redux/actions/productAction";

const Detail = ({ route }) => {
  const { idProduct } = route.params;
  const {getOneProduct} = productAction;
  const [product, setProduct] = useState();
  const navigation = useNavigation();
  const { getUser } = usersAction;
  const { idUser, user, token  } = useSelector((state) => state.user);
  const {oneProduct} = useSelector((state) => state.products);
  const dispatch = useDispatch();

  console.log(oneProduct)
  async function getMyProduct() {
    try {
      let res = await axios.get(`${apiUrl}api/products/${idProduct}`);
      setProduct(res.data.response);
      dispatch(getOneProduct(idProduct))
      // eslint-disable-next-line
    } catch (error) {}
  }

  useEffect(() => {
    getMyProduct();
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    dispatch(getUser(idUser));
  }, []);

  async function addToCart() {
    let Oneproduct = {
      name: product.name,
      photo: product.photo,
      price: product.price,
      productId: product._id,
      userId: idUser,
    };
    try {
      let res = await axios.post(`${apiUrl}api/shopping`, Oneproduct);
      if (res.data.success) {
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
  const image = { uri: `${product?.photo[0]}` };

  return (
    <View
      style={{
        backgroundColor: "#ffff",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {product && (
        <>
          <ImageBackground
            resizeMode="cover"
            source={image}
            style={styles.image}
          >
            <View style={styles.hero}></View>
          </ImageBackground>
          <View style={styles.cont3}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.subtitle}>{product.description}</Text>
            <Text style={styles.text}>Price $ {product.price}</Text>
            <View style={styles.cont1}></View>
          </View>
          <TouchableOpacity  onPress={() => {
                if (token) {
                  addToCart();
                } else {
                  navigation.navigate("Login");
                }
              }} style={styles.btn}>
            <Text style={styles.btnText}>
              Add to cart{" "}
              <Feather name="shopping-cart" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </>
      )}

    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  hero: {
    height: 380,
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
    fontSize: 18,
    color: "#474747",
    marginTop: 1,
    paddingRight: 80,
    lineHeight: 25,
  },
  image:{},
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
    marginTop: 370,
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
