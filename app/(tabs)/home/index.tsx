import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, ActivityIndicator, SafeAreaView } from "react-native"
import { router, useFocusEffect } from "expo-router"
import { useCallback } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Feed(){

    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const navigateToPost = (id) => {
        router.push({ pathname: `/(tabs)/home/${id}` })
    }


    const getPosts = async () => {



        setIsLoading(true)

        const value = await AsyncStorage.getItem('token')

        const token = value != null ? JSON.parse(value) : null;

        const response = await fetch(`https://ancient-lake-71305-93605de8b47e.herokuapp.com/posts?page=${currentPage}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token           
                }
            }
        )

        const result = await response.json()

        // console.log(result)

        const newPosts = [...posts, ...result]

        // console.log(newPosts)

        setPosts(newPosts)
    
        setIsLoading(false)
    }

    const renderItem = ({ item }) => {
        return(
            <View style={styles.item} key={item._id}>

                    <TouchableOpacity
                            onPress={() => navigateToPost(item._id)}
                        >
                        
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.text} numberOfLines={2}>{item.text}</Text>
                        
                        
                    </TouchableOpacity>
            </View>
        )
    }

    const renderLoader = () => {
        return (
          isLoading ?
            <View>
              <ActivityIndicator size="large" color="#aaa" />
            </View> : null
        );
      };

      const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
        getPosts()
      };

    useFocusEffect(
        useCallback(() => {
          getPosts()
        }, []), // No dependencies so should only be called once, on tab focus
      )

      const renderHeader = () => {
        return(
          <>
          
          {/* <StatusBar backgroundColor='#000'/> */}
          
          
          </>
        )
      }

    // useEffect(() => {
    //     getPosts()
    // }, [])

      return (
        <>
        
        

        
        

        <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={1}
            ListHeaderComponent={renderHeader}
            style={{flex: 1}}
          />

          
        
          {/* <StatusBar backgroundColor="#000" /> */}
          
        </>
      );
    };

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 15
    },
    text: {

    },
    container: {
        margin: 10,
        
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