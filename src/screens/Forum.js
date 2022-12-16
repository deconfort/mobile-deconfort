import { Image,ScrollView,StyleSheet } from 'react-native'
import React  from 'react'

export default function Forum() {
  
    return (

      <ScrollView tyle={styles.container}>
      <Image
      style={styles.img}
      source={require("../../assets/ForumBanner.png")}
    ></Image>
      </ScrollView>
  
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      height: "100%",
      backgroundColor: "white",
    
    },
    img: {
      marginTop:30,
      width: "100%",
      height: 70,
      backgroundColor: "white",
    },
  
  });