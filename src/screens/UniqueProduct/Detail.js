import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import favoriteActions from '../../redux/actions/favoriteActions'

const Detail = (props) => {
    let {updateFavorite} = favoriteActions
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Feather name='chevron-left' color='#FFF' size={25}></Feather>
                </TouchableOpacity>
                <View style={styles.iconsview}>
                    <Feather name='shopping-cart' color='#FFF' size={25} style={styles.cart}/>
                    <Feather name='heart' color='#FFF' size={25} onPress={()=> updateFavorite()}/>
                </View>
            </View>
            <Image source={require('../../img/imagen.jpg')} style={styles.img} />
            <View style={styles.cont3}>
                <Text style={styles.title}>Name Product</Text>
                <Text style={styles.subtitle}>Desk</Text>
                <View style={styles.cont2}>
                    <Text style={styles.colors}>Colors</Text>
                    <View style={styles.selected}>
                        <View style={styles.c1} />
                    </View>
                    <View style={styles.c2} />
                    <View style={styles.c3} />
                </View>
                <Text style={styles.text}>Price: $</Text>
                <View style={styles.cont1}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.btn}>
                        <Text style={styles.btnText}>Add to cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    iconsview:{
        flexDirection:'row',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    title: {
        color: '#FFF',
        fontSize: 25,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#474747',
        marginTop: 10,
    },
    text: {
        fontSize: 18,
        color: '#474747',
        marginTop: 1,
        paddingRight: 80,
        lineHeight: 25,
    },
    btn: {
        width:'100%',
        backgroundColor: '#303030',
        paddingHorizontal: 50,
        paddingVertical: 12,
        borderRadius: 30,
        display:'flex',
        alignItems:'center'
    },
    btnText: {
        fontSize: 20,
        color: '#FFF',
        textAlign:'center',
    },
    cont1: {
        display:'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 40
    },
    c3: {
        height: 20,
        width: 20,
        borderRadius: 15,
        backgroundColor: '#52646a'
    },
    c2: {
        height: 20,
        width: 20,
        borderRadius: 15,
        backgroundColor: 'rgb(126,97,71)',
        marginHorizontal: 10,
    },
    c1: {
        height: 20,
        width: 20,
        borderRadius: 15,
        backgroundColor: ' rgb(137,118,101)'
    },
    selected: {
        borderColor: ' rgb(137,118,101)',
        height: 30,
        width: 30,
        borderRadius: 24,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cont2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    img: {
        height: '45%',
        width: '60%',
    },
    cont3: {
        flex: 1,
        backgroundColor: '#c1b8ae',
        width: '100%',
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    colors: {
        color: '#303030',
        fontSize: 25,
        marginTop: 20,
        flex: 2,
        marginTop: 0
    },
    cart:{
        paddingRight:10
    },

})