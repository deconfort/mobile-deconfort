import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../redux/actions/productAction";
import { Searchbar, Button, Card, Title, Paragraph } from "react-native-paper";
import apiUrl from "../../url";
import axios from "axios";

export default function Frames(props) {
  const [open2, setOpen2] = useState(false);
  const { name } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { getProductsFilter } = productAction;
  const [first, setfirst] = useState("");
  let [products, setProducts] = useState([])

  const handleOpen2 = () => {
    open2 ? setOpen2(false) : setOpen2(true);
  };


  useEffect(() => {
    if (name) {
      dispatch(getProductsFilter(name));
    } else {
      axios
      .get(`${apiUrl}api/products?category=frames`)
      .then((res) => setProducts(res.data.response));
    }

    // eslint-disable-next-line
  }, []);


  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../assets/Store.png")}
      ></Image>
      <View style={{ padding: 15 }}>
      <Searchbar
          style={{ marginTop: 10 }}
          placeholder="Search"
          onChangeText={(e) => {
            setfirst(e);
            let text = e;
            dispatch(getProductsFilter({ name: text }));
          }}
        />
      </View>
      
      <View style={{ padding: 15 }}>
      <Button mode="contained" onPress={handleOpen2}>Categories ⇓</Button>
      {open2 ? (
        <>
          <Text
            style={{ textAlign:'center',height:30, fontSize:15, marginTop:10 }}
            onPress={() => {
              props.navigation.navigate("Desk");
            }}
          >
            Desk
          </Text>
          <Text
            style={{ textAlign:'center',height:30, fontSize:15 }}
            onPress={() => {
              props.navigation.navigate("Tables");
            }}
          >
            Tables
          </Text>
          <Text
            style={{ textAlign:'center',height:30, fontSize:15 }}
            onPress={() => {
              props.navigation.navigate("Vases");
            }}
          >
            Vases
          </Text>
          <Text
            style={{ textAlign:'center',height:30, fontSize:15 }}
            onPress={() => {
              props.navigation.navigate("Frames");
            }}
          >
            Frames
          </Text>
          <Text
            style={{ textAlign:'center',height:30, fontSize:15 }}
            onPress={() => {
              props.navigation.navigate("Cushions");
            }}
          >
            Cushions
          </Text>
          <Text
            style={{ textAlign:'center',height:30, fontSize:15 }}
            onPress={() => {
              props.navigation.navigate("Diffuser");
            }}
          >
            Diffuser
          </Text>
          <Text
            style={{ textAlign:'center',height:30, fontSize:15 }}
            onPress={() => {
              props.navigation.navigate("Mirrors");
            }}
          >
            Mirrors
          </Text>
          <Text
            style={{ textAlign:'center',height:30, fontSize:15 }}
            onPress={() => {
              props.navigation.navigate("Blankets");
            }}
          >
            Blankets
          </Text>
        </>
      ) : null}
      </View>

      <View style={styles.select}>
      </View>
      <View style={{ padding: 15 }}>

        {products.map((item) => {
          return (
            <Card style={{ marginBottom: 20 }}>
              <Card.Content>
                <Card.Cover source={{ uri: item.photo[0] }} />
                <Title>{item.name}</Title>
                <Paragraph>Category: {item.category}</Paragraph>
                <Paragraph>Price: {item.price}</Paragraph>
              </Card.Content>
              <Card.Actions style={{ justifyContent: "space-around" }}>
                <Button
                  style={{ backgroundColor: "gray" }}
                  mode="contained"
                  onPress={() => {
                    props.navigation.navigate("Detail", {
                      idProduct: item._id,
                    });
                  }}
                >
                  More info
                </Button>
                <Button>❤</Button>
                <Button>Add to cart</Button>
              </Card.Actions>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: "white",
  },
  img: {
    marginTop: 30,
    width: "100%",
    height: 150,
    resizeMode: "stretch",
    backgroundColor: "white",
  },
  select: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});