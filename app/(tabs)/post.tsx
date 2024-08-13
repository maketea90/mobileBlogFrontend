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
            <Text style={{margin: 5}}>To post something new, think of a title and message then press post.</Text>


        <View style={styles.form}>
            <TextInput style={{margin: 5}} placeholder="Your post's title" onChangeText={text => setTitle(text)} value={title}></TextInput>

            <TextInput style={{margin: 5}}placeholder="Your post's message" onChangeText={text => setMessage(text)} value={message}></TextInput>

            <Button style={{margin: 5}} title='Post' onPress={handleSubmitPost}></Button>       
        </View>
            
        </View>
        
    )
}

const styles = StyleSheet.create({

    container: {flex: 1, flexDirection: 'column', justifyContent: 'center'},

    form: {borderWidth: 2, borderColor: 'black', backgroundColor: 'lightGrey'}
})