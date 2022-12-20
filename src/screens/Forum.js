import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import commentsAction from "../redux/actions/commentAction";
import axios from "axios";
import apiUrl from "../../url";

export default function Forum() {
  const [open2, setOpen2] = useState(false);
  const { idUser, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let [reload, setReload] = useState(true);
  const { getComment, deleteComment, editComment, createComment } =
    commentsAction;
  let [comments, setComments] = useState([]);
  const [create, setCreate] = useState({
    userId: idUser,
    comment: "",
    photo: "",
    date: new Date(),
  });
  const [edit, setEdit] = useState({
    userId: idUser,
    comment: "",
    photo: "",
    date: new Date(),
  });

  const handleOpen2 = () => {
    open2 ? setOpen2(false) : setOpen2(true);
  };

  useEffect(() => {
    getMyComments();
    // eslint-disable-next-line
  }, [reload]);

  async function getMyComments() {
    let res = await dispatch(getComment());
    setComments(res.payload.comments);
  }

  const handlerInput = (e, campo, value) => {
    setCreate({
      ...create,
      [campo]: e || value,
    });
  };

  const handlerInputTwo = (e, campo, value) => {
    setEdit({
      ...edit,
      [campo]: e || value,
    });
  };

  const submit = async () => {
    let inputs = Object.values(create).some((input) => input === "");
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    if (!inputs) {
      let data = {
        token: token,
        data: create,
      };
      try {
        let res = await axios.post(`${apiUrl}api/comments`, create, headers);
        console.log(res);
        setReload(!reload);
        if (res.data.success) {
          Alert.alert("Hi", "The comment was created successfully 🤩", [
            {
              text: "OK",
            },
          ]);
        } else {
          Alert.alert("Error", "Your comment could not be posted☹️", [
            {
              text: "OK",
            },
          ]);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      Alert.alert("Error", "All the fields are required! ☹️", [
        {
          text: "OK",
        },
      ]);
    }
  };

  const submitTwo = async (id) => {
    let inputs = Object.values(edit).some((input) => input === "");
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    if (!inputs) {
      try {
        let res = await axios.put(`${apiUrl}api/comments/${id}`, edit, headers);
        console.log(res);
        getMyComments();
        if (res.data.success) {
          Alert.alert("Hi", "The comment has been successfully edited 🤩", [
            {
              text: "OK",
            },
          ]);
        } else {
          Alert.alert("Error", "Your comment could not be edited☹️", [
            {
              text: "OK",
            },
          ]);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      Alert.alert("Error", "All the fields are required! ☹️", [
        {
          text: "OK",
        },
      ]);
    }
  };

  return (
    <View tyle={styles.container}>
      <Image
        style={styles.img}
        source={require("../../assets/ForumBanner.png")}
      ></Image>
      <ScrollView>
        <View>
          <View style={styles.viewInputComment}>
            <View style={styles.containInput}>
              <TextInput
                style={styles.inputCommnets}
                placeholder="Leave your photo"
                onChangeText={(e) => handlerInput(e, "photo")}
              />
              <TextInput
                placeholder="Leave your comment"
                id="comment"
                style={styles.inputCommnets}
                color="black"
                onChangeText={(e) => handlerInput(e, "comment")}
              />
            </View>
            <View style={styles.containBtn}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.sendComment} onPress={submit}>
                  Send comment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containComme}>
            {comments?.map((item) => {
              return (
                <View style={styles.borderCommnetsCard}>
                  <Text style={{ marginTop: 30 }} className="dateForum">
                    {item.date}
                  </Text>
                  <Image
                    style={styles.image}
                    source={{ uri: item.photo }}
                    alt="Happy"
                  />
                  <Text className="textForum">{item.comment}</Text>
                  <View>
                    <View style={styles.photoAndName}>
                      <Image
                        style={styles.imagenProfileComments}
                        source={{ uri: item?.userId?.photo }}
                        alt=""
                      />
                      <Text style={{ marginLeft: 10 }} className="nameForum">
                        {item?.userId?.name}
                      </Text>
                    </View>
                    {item.userId?._id === idUser ? (
                      <>
                        <View style={styles.containIcon}>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignContent: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                Alert.alert(
                                  "Hi",
                                  "Are you sure to delete the comment?",
                                  [
                                    {
                                      text: "OK",
                                      onPress: async () => {
                                        let headers = {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        };
                                        try {
                                          await axios.delete(
                                            `${apiUrl}api/comments/${item._id}`,
                                            headers
                                          );
                                          setReload(!reload);
                                        } catch {}
                                      },
                                    },
                                    {
                                      text: "Cancel",
                                      style: "cancel",
                                    },
                                  ]
                                )
                              }
                            >
                              <Image
                                source={require("../../assets/eliminar.png")}
                                style={styles.edit}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleOpen2}>
                              <Image
                                source={require("../../assets/editar.png")}
                                style={styles.edit}
                              />
                            </TouchableOpacity>
                          </View>
                          {open2 ? (
                            <>
                              <View>
                                <TextInput
                                  style={styles.inputBoxEdit}
                                  placeholder="Leave your photo"
                                  onChangeText={(e) =>
                                    handlerInputTwo(e, "photo")
                                  }
                                />
                                <TextInput
                                  placeholder="Leave your comment"
                                  id="comment"
                                  style={styles.inputBoxEdit}
                                  color="black"
                                  onChangeText={(e) =>
                                    handlerInputTwo(e, "comment")
                                  }
                                />
                                <TouchableOpacity
                                  onPress={() => submitTwo(item._id)}
                                  style={styles.ButtonChangesEdit}
                                >
                                  <Button
                                    buttonColor="#5c195d"
                                    textColor="white"
                                  >
                                    Save changes
                                  </Button>
                                </TouchableOpacity>
                              </View>
                            </>
                          ) : null}
                        </View>
                      </>
                    ) : (
                      <Text
                        className="buttonForum"
                        style={styles.reportComments}
                      >
                        Report comment
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
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
    height: 120,
    resizeMode: "stretch",
    backgroundColor: "white",
  },
  ButtonChangesEdit: {
    height: 40,
    fontSize: 10,
    borderRadius: 14,
    marginBottom: 10,
  },
  image: {
    //etiqueta que maneja el tamaño de la imagen del post y profile//
    width: 90,
    height: 90,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingRight: 5,
  },
  imagenProfileComments: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 5,
  },
  photoAndName: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  edit: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 11,
  },

  containInput: {
    width: "100%",
    alignItems: "center",
    padding: 25,
  },

  viewInputComment: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 10,
    //shadow box//
    shadowColor: "#a7aba8",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    margin: 10,
    padding: 10,
  },
  containComme: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    padding: 50,
  },
  inputCommnets: {
    height: 40,
    width: 300,
    borderColor: "#5c195d",
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
    padding: 5,
  },
  inputBoxEdit: {
    height: 40,
    width: 200,
    borderColor: "#5c195d",
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 5,
    padding: 5,
  },
  sendComment: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    backgroundColor: "#5c195d",
    borderRadius: 10,
    width: 200,
    height: 30,
    marginBottom: 10,
  },
  borderCommnets: {
    display: "flex",
    alignItems: "center",
    // borderWidth: 3,
    // borderColor: "#5c195d",
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
    shadowColor: "#a7aba8",
    shadowOffset: {
      width: 20,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  borderCommnetsCard: {
    minHeight: 300,
    display: "flex",
    alignItems: "center",
    // borderWidth: 3,
    // borderColor: "#5c195d",
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
    shadowColor: "#a7aba8",
    shadowOffset: {
      width: 20,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  reportComments: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    backgroundColor: "#5c195d",
    borderRadius: 10,
    width: 200,
    height: 25,
    marginBottom: 10,
  },
  containIcon: {
    width: "100%",
    display: "flex",
    marginLeft: 10,
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 10,
  },
});
