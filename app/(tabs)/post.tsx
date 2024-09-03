import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useState } from "react"
import { Text, StyleSheet, View, TextInput, Button } from "react-native"

export default function CreatePost(){

    const [title, setTitle] = useState('')

    const [message, setMessage] = useState('')


    const handleSubmitPost = async () => {

        const data = {title, text: message}

        const value = await AsyncStorage.getItem('token')

        const token = value != null ? JSON.parse(value) : null;


        try{
            const response = await fetch('https://ancient-lake-71305-93605de8b47e.herokuapp.com/posts',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(data)
                }
            )
    
            const result = await response.json()
    
            alert(`${result}`)

            
        } catch(err){
            console.log(err)
        }
       
    }


    return(
        <View style={styles.container}>
            <Text style={{margin: 5}}>To post something new, think of a title and message then tap post.</Text>


        <View>
           
            <TextInput style={styles.input} placeholder="Your post's title" onChangeText={text => setTitle(text)} maxLength={30} value={title}></TextInput>

            <TextInput multiline style={styles.input} placeholder="Your post's message" onChangeText={text => setMessage(text)} maxLength={200} value={message}></TextInput>

        </View>

            <Button style={{margin: 5}} title='Post' onPress={handleSubmitPost}></Button>       
        
            
        </View>
        
    )
}

const styles = StyleSheet.create({

    container: {flex: 1, flexDirection: 'column', justifyContent: 'center'},

    input: {borderWidth: 2, borderColor: 'black', backgroundColor: 'lightGrey', margin: 2, padding: 5}
})