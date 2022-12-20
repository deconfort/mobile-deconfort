import { ScrollView, StyleSheet, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import favoriteActions from "../redux/actions/favoriteActions";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export default function Store(props) {
  const { getUserFavs, deleteFavs } = favoriteActions;
  const dispatch = useDispatch();
  const { favorite } = useSelector((state) => state.favorites);
  const { idUser, token } = useSelector((state) => state.user);

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      await dispatch(getUserFavs(idUser));
    } catch (error) {
      console.log(error);
    }
  }

  async function pullReaction(e) {
    try {
      let res = await dispatch(deleteFavs(e));
      if (res.payload.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Your favorite has been deleted",
          showConfirmButton: false,
          timer: 1500,
        });
        getProduct();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../assets/My_favorite.png")}
      ></Image>
      <View style={{ padding: 15 }}>
        {favorite.map((item) => {
          return (
            <Card style={styles.styleGeneralCard} key={item._id}>
              <Card.Content>
              <Card.Cover style={styles.image_card} source={{ uri: item.productId.photo[0] }} />
              <Title>{item.productId.name}</Title>
                <Paragraph>Category: {item.productId.category}</Paragraph>
                <Paragraph>Price: {item.productId.price}</Paragraph>
              </Card.Content>

              <Card.Actions>
              <Button
                  buttonColor="#5c195d"
                  textColor="white"
                  onPress={() => {
                    props.navigation.navigate("Detail", {
                      idProduct: item._id,
                    });
                   }}
                 >
                   More info <Ionicons name="information-circle-outline" size={21} color="white" />             
            </Button>
                <Button
                  buttonColor="#5c195d"
                  textColor="white"
                  onPress={() => {
                    pullReaction({id: item._id, name: item.name, token: token})
                  }}
                >
                  Delete <Ionicons name="md-trash-outline" size={24} color="white" />
                </Button>
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
    position: "absolute",
    top: 20,
    left: 40,
    width: 70,
  },
  //De aca para abajo es para el estilo de la card
  styleGeneralCard: {
    margin: 10,
    minHeight: 150,
  },

  image_card: {
    // position: "relative",
    top: -16,
    // left:109,
    width: "70%",
    left: 105,
    height: 260,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 30,
  },
});
