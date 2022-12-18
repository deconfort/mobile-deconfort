import { Alert, Image, ScrollView, StyleSheet, View,Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../redux/actions/productAction";
import { Searchbar, Button, Card, Title, Paragraph } from "react-native-paper";
import usersAction from "../redux/actions/usersActions";
import axios from "axios";
import apiUrl from "../../url";
import Favorite from "../components/Favorite";


export default function Store(props) {

  const [open2, setOpen2] = useState(false);
  const { idUser, user, token } = useSelector((state) => state.user);
  const { getProducts, getProductsFilter } = productAction;
  const { getUser } = usersAction;
  const [first, setfirst] = useState("");
  const { products, name } = useSelector((state) => state.products);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getUser(idUser));
    // eslint-disable-next-line
  }, []);

  const handleOpen2 = () => {
    open2 ? setOpen2(false) : setOpen2(true);
  };


  useEffect(() => {
    if (name) {
      dispatch(getProductsFilter(name));
    } else {
      dispatch(getProducts());
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
          async function addToCart() {
            let product = {
              name: item.name,
              photo: item.photo[0],
              price: item.price,
              productId: item._id,
              userId: idUser,
            };
            try {
              let res = await axios.post(`${apiUrl}api/shopping`, product);
              console.log(res.data);
              if (user && res.data.success) {
                Alert.alert(user.name, `${res.data.message} 🛒`, [
                  {
                    text: "OK",
                  },
                ]);
              }
            } catch (error) {
              console.log(error);
              if (user && error) {
                Alert.alert(
                  user.name,
                  "The product is already in the cart 🛒",
                  [
                    {
                      text: "OK",
                    },
                  ]
                );
              }
            }
          }

          return (
            <Card
              style={{ marginBottom: 20 }}
              key={item._id}
             
            >


              <Card.Content>
                <Card.Cover source={{ uri: item.photo[0] }} />
                <Title>{item.name}</Title>
                <Paragraph>Category: {item.category}</Paragraph>
                <Paragraph>Price: {item.price}</Paragraph>
              </Card.Content>
              <Card.Actions style={{ justifyContent: "space-around" }}>
                <Button
                  onPress={() => {
                    props.navigation.navigate("Detail", {
                      idProduct: item._id,
                    });
                  }}
                >
                  More info
                </Button>
                <View style={styles.reactionContainer}>
                  <Favorite productId={item._id}/>
                </View>
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
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
},
});
