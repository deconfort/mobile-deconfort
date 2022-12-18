import { ScrollView, StyleSheet, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import favoriteActions from "../redux/actions/favoriteActions";
import { Button, Card, Title, Paragraph } from "react-native-paper";

export default function Store(props) {
  const { getUserFavs, deleteFavs } = favoriteActions
  const dispatch = useDispatch()
  const { favorite } = useSelector((state) => state.favorites)
  const { idUser, token } = useSelector((state) => state.user)

  useEffect(() => {
    getProduct()
  }, [])

  async function getProduct() {
    try {
      await dispatch(getUserFavs(idUser))
    } catch (error) {
      console.log(error)
    }
  }

  async function pullReaction(e) {
    try {
      let res = await dispatch(deleteFavs(e))
      if (res.payload.success) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Your favorite has been deleted',
          showConfirmButton: false,
          timer: 1500
        })
        getProduct()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../assets/Store.png")}
      ></Image>
      <View style={{ padding: 15 }}>
        {favorite.map((item) => {
          return (
            <Card style={{ marginBottom: 20 }}>
              <Card.Content>
                <Card.Cover source={{ uri: item.productId.photo[0] }} />
                <Title>{item.productId.name}</Title>
                <Paragraph>Price: {item.productId.price}</Paragraph>
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
                <Button
                  style={{ backgroundColor: "gray" }}
                  mode="contained"
                  onPress={() => {
                    pullReaction({id: item._id, name: item.name, token: token})
                  }}
                >
                  Delete
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
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
});
