import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { router } from "expo-router"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(){


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        
        const data = {username, password}

        try{
            const response = await fetch('https://ancient-lake-71305-93605de8b47e.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })


            if(!response.ok){
                throw new Error('invalid username or password')
            } else {
                const result = await response.json()

                console.log(result)

                try{
                    await AsyncStorage.setItem('token', JSON.stringify(result.token))
                } catch(err){
                    console.log(err)
                }
                

                router.replace('/(tabs)/home')
            }
        } catch(err){
            console.log(err)
        }
        
        
        
        // .then((response) => {
        //     console.log(response)
        //     return response.json()
        // }).then((result) => {
        //     console.log(result)
        // }).catch((err) => {
        //     throw new Error(err)
        // })
    }

    return(
        <View style={styles.container}>
            <Text>{`Please log in by entering your username and password.
            `}</Text>
            <TextInput 
            style={styles.input}
            onChangeText={text => setUsername(text)}
            value={username}
            placeholder='username'
            ></TextInput>
            
            <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="password"
            secureTextEntry={true}
            ></TextInput>

            
            <Text>{`
            `}</Text>
            <Button title='Submit' onPress={handleLogin}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        // width: '20%'
        
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})