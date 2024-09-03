import { useState } from "react";
import { Text,View, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Profile(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const logout = async () => {
        await AsyncStorage.setItem('token', JSON.stringify(null))
        router.replace('/')
    }

    

    const changeUsername = async () => {

        const value = await AsyncStorage.getItem('token')

        const token = value != null ? JSON.parse(value) : null; 

        try{
            const response = await fetch('https://ancient-lake-71305-93605de8b47e.herokuapp.com/changeUsername',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({username})
                }
            )

            console.log(response)

            const result = await response.json()

            console.log(result)

            alert(`${result}`)
        } catch(err){
            console.error(err)
        }
    }

    const changePassword = async() => {
        
        const value = await AsyncStorage.getItem('token')

        const token = value != null ? JSON.parse(value) : null;  
        
        try{
            const response = await fetch('https://ancient-lake-71305-93605de8b47e.herokuapp.com/changePassword',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({password})
                }
            )

            console.log(response)

            const result = await response.json()

            alert(`${result}`)

        }catch(err){
            console.error(err)
        }
    }


    return(
        <View style={styles.container}>

            
            <View>
                <TextInput style={styles.input} placeholder='change your username' onChangeText={(text) => setUsername(text)}></TextInput>
                <Button title='change username' onPress={changeUsername}></Button>
            </View>
            <View>
                <TextInput secureTextEntry={true} style={styles.input} placeholder='change your password' onChangeText={(text) => setPassword(text)}></TextInput>
                <Button title='change password' onPress={changePassword}></Button>
            </View>
            <Button style={styles.button} title='logout' onPress={logout}></Button>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {flex: 1, justifyContent: 'space-evenly'},
    input: {
        borderWidth: 3,
        borderColor: '#B7C9E2',
        margin: 5,
        padding: 5,
    },
    button: {
        margin: 5
    }   
})