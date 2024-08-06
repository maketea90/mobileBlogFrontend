import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { router, useFocusEffect } from "expo-router"
import { useCallback } from "react"

export default function Feed(){

    const [posts, setPosts] = useState([])

    const navigateToPost = (id) => {
        router.push({ pathname: `/(tabs)/home/${id}` })
    }


    const getPosts = async () => {
        const response = await fetch('https://ancient-lake-71305-93605de8b47e.herokuapp.com/posts',
            {
                headers: {
                    'Content-Type': 'application/json'           
                }
            }
        )

        const result = await response.json()

        console.log(result)

        setPosts(result)
    }

    useFocusEffect(
        useCallback(() => {
          getPosts()
        }, []), // No dependencies so should only be called once, on tab focus
      )

    return(
        
        <View style={styles.container}>
            <Text style={{margin: 5}}>Tap a post to view it.</Text>
            {posts.map((post) => {
                return(
                    
                    <View style={styles.item} key={post._id}>

                    <TouchableOpacity
                            onPress={() => navigateToPost(post._id)}
                        >
                        
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.text} numberOfLines={2}>{post.text}</Text>
                        
                        
                    </TouchableOpacity>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 15
    },
    text: {

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    
    },
    item: {
        borderColor: 'black',
        borderWidth: 2,
        margin: 5,
        padding: 3
    }
})