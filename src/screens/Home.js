import { Image, ScrollView, StyleSheet, View, Dimensions,Text,SafeAreaView } from "react-native";
import React ,{useState}from "react";
import {  Button } from "react-native-paper";


const ImagesCarousel =[
'https://images.pexels.com/photos/3705540/pexels-photo-3705540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
'https://images.pexels.com/photos/3104527/pexels-photo-3104527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
'https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
'https://images.pexels.com/photos/3285193/pexels-photo-3285193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
]

const WIDTH = Dimensions.get('window').width
const HEIGHT= Dimensions.get('window').height


export default function Home(props) {

  const [imgActive,setImgActive]=useState(0);

onchange =(nativeEvent)=>{
if(nativeEvent){
  const slide =Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
  if(slide != imgActive){
    setImgActive(slide)
  }
}
}

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../assets/decomfortLogo.png")}
      ></Image>

<View style={styles.wrap}>
<ScrollView
onScroll={({nativeEvent})=>onchange(nativeEvent)}
showsHorizontalScrollIndicator={false}
pagingEnabled
horizontal
style={styles.wrap}

>
{
  ImagesCarousel.map((e,index)=>
  <Image
  key={e}
  resizeMode='stretch'
  style={styles.wrap}
  source={{uri: e}}
  />
  )
}
</ScrollView>
<View style={styles.wrapDot}>
{
  ImagesCarousel.map((e,index)=>
  <Text
  key={e}
  style={imgActive ==index ? styles.dotActive: styles.dot}
  >
●
  </Text>
  )
}
</View>
</View>
        <View style={{ padding: 10 }}>

          <Button
            style={{ marginTop: 10, marginBottom: 15, backgroundColor:'gray' }}
            mode="contained"
            onPress={() => {
              props.navigation.navigate("Store");
            }}
          >
            All Product
          </Button>
        </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
  },
  img: {
    width: "100%",
    height: 200,
    backgroundColor: "white",
  },
  text_card: {
    position: "absolute",
    fontSize: 60,
    color: "white",
    textAlign: "center",
    top: 60,
    backgroundColor: "black",
    width: "100%",
  },

  wrap:{
    width:WIDTH,
    height:HEIGHT*0.25
  },
  wrapDot:{
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    alignSelf:'center'
  },
  dotActive:{
    margin:3,
    color:'white'
  },
  dot:{
    margin:3,
    color:'#888'
  }
});