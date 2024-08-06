import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Post() {

    const params = useLocalSearchParams()

    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const [newComment, setNewComment] = useState('')
    const [indicator, setIndicator] = useState(false)

    const handleComment = async () => {



        const value = await AsyncStorage.getItem('token')

        const token = value != null ? JSON.parse(value) : null;

        try{
            const response = await fetch(`https://ancient-lake-71305-93605de8b47e.herokuapp.com/posts/${params.id}/comments`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({message: newComment})
                }
            )

            console.log(response)

            const result = await response.json()

            console.log(result)

            alert(`${result}`)

            setIndicator(!indicator)
        } catch(err){
            console.error(err)
        }
    }

    const loadPostAndComments = async () => {

        try{

            const postResponse = await fetch(`https://ancient-lake-71305-93605de8b47e.herokuapp.com/posts/${params.id}`,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )

            const postResult = await postResponse.json()

            setPost(postResult)
            

            const commentsResponse = await fetch(`https://ancient-lake-71305-93605de8b47e.herokuapp.com/posts/${params.id}/comments`,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )

            const commentResult = await commentsResponse.json()

            setComments(commentResult)

        } catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        loadPostAndComments()
    }, [indicator])

    if(!comments){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{post.title}</Text>
                <Text>{post.text}</Text>
                <TextInput onChangeText={text => setNewComment(text)} placeholder="comment on this post"></TextInput>
                <Button title='Send' onPress={handleComment}></Button>
            </View>
        )
    } else {
        return(

            <View style={styles.container}>
                <View style={{borderWidth: 2, borderColor: 'black'}}>
                    <Text style={styles.title}>{post.title}</Text>
                    <Text>{post.text}</Text>
                </View>
                
                {comments.map((comment) => {
            return(
                <View style={styles.comment} key={comment._id}>
                    
                    <Text>{}</Text>
                    <Text>{comment.message}</Text>
                
                </View>
            )
        })}     

            <View style={{margin: 10}}>
                <TextInput onChangeText={text => setNewComment(text)} placeholder="comment on this post"></TextInput>
                <Button title='Send' onPress={handleComment}></Button>  
            </View>
                
    
            </View>

        )
    }

       
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 5
    },
    button: {
        
    },
    comment: {
        borderRadius: 5,
        backgroundColor: '#B7C9E2',
        margin: 5
    },
    title: {
        fontWeight: "bold",
        fontSize: 15
    }
})