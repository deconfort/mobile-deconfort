import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const UniqueProduct = (props) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../img/imagen.jpg')} style={styles.img}/>
      <Text style={styles.title}>Name product</Text>
      <Text style={styles.detail}>
        With a new design home
      </Text>
      <TouchableOpacity style={styles.btn} onPress={()=>props.navigation.navigate('Detail')}>
        <Text style={styles.text}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UniqueProduct

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#121212',
  },
  img:{
    height:'50%',
    width:'100%',
    resizeMode:'contain',
  },
  title:{
    color:'#FFF',
    fontSize:30,
    marginTop:20,
  },
  detail:{
    color:'#FFF',
    fontSize:18,
    textAlign:'center',
    paddingHorizontal:20,
    lineHeight:30,
    marginTop:30
  },
  btn:{
    marginTop:80,
    backgroundColor:'#E2443B',
    paddingHorizontal:140,
    paddingVertical:10,
    borderRadius:30,
  },
  text:{
    fontSize:30,
    color:'#FFF',
  }
})
