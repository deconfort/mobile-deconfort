import React from 'react'
import { Alert, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import favoriteActions from '../redux/actions/favoriteActions'

export default function Favorite(props) {
    const { token, idUser } = useSelector(state => state.user)
    const { favorite } = useSelector(state => state.favorites)
    const dispatch = useDispatch()
    let { productId } = props
    const { getFav, updateFavorite } = favoriteActions
    const [reactions, setReaction] = useState([])
    const [like, setLike] = useState(true)

    useEffect(() => {
        reactioness()
    }, [like, favorite])

    async function reactioness() {
        let res = await dispatch(getFav(productId))
        setReaction(res.payload.response)
    }

    async function likeEvent(reaction) {

        let name
        let icon
        let iconBack
        reactions.data.map(react => {
            if (react.name === reaction) {
                name = react.name
                icon = react.icon
                iconBack = react.iconBack
            }
        })

        let data = {
            token,
            id: productId,
            name,
        }
        try {
            let res = await dispatch(updateFavorite(data))
            if(!res.payload.success){
                Alert.alert('Ups!', 'You have alredy logged to add this product to your favorites')
            }
            setLike(!like)
        } catch (error) {
            console.log(error)
        }
    }

    const styles = StyleSheet.create({
        icon: {
            width: 34,
            height: 34,
        }
    });

    return (
        <>
            {reactions.success &&
                reactions.data.map((reaction) => {
                    let res = reaction.userId.find(user => user._id === idUser)
                    return (
                        res ? (
                            <>
                                <TouchableOpacity onPress={() => {
                                    likeEvent(reaction.name)
                                }}>
                                    <Image source={{ uri: reaction.icon }} name={reaction.name} key={reaction._id} style={styles.icon} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity onPress={() => {
                                    likeEvent(reaction.name)
                                }}>
                                    <Image source={{ uri: reaction.iconBack }} name={reaction.name} key={reaction._id} style={styles.icon} />
                                </TouchableOpacity>
                            </>
                        ))
                })
            }
        </>
    )
}
