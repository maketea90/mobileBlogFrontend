import { useState } from "react"
import { View, TextInput, Button, Text, StyleSheet } from "react-native"
import { Link, router } from "expo-router"

export default function Signup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSignup = async () => {

        setIsLoading(true)

        const data = {username, password, confirmPassword}

        try {
            const response = await fetch('https://ancient-lake-71305-93605de8b47e.herokuapp.com/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
    
                }
            )

            const result = await response.json()

            if(!response.ok){
                
                
                alert(`${result.usernameError}  ${result.passwordError}  ${result.confirmPasswordError}`)
            } else {
                router.push('/login')
                alert(`${result}`)
                setIsLoading(false)
            }

            
        } catch(err){
            setError(err)
        } finally{
            
            setIsLoading(false)
        }
        
        // alert(`username: ${username}, password: ${password}`)
    }

    if(isLoading && !error){
        return(
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    } else if (!isLoading && error){
        return(
            <View style={styles.container}>
                <Text>{error}</Text>
            </View>
        )
    } else {
        return(
            <View style={styles.container}>
            <Text>{`Please sign up by entering a username and password.
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

            <TextInput
            style={styles.input}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder='confirm password'
            secureTextEntry={true}
            >  
            </TextInput>
            <Text>{`
            `}</Text>
            <Button title='Sign up' style={styles.button} onPress={handleSignup}></Button>
            <Text>{'  '}</Text>
            <Text>If you have already signed up, click <Link href='/login' style={styles.login}>here</Link> and follow the instructions to log in.</Text>
        </View>
        )
    }

   
}

const styles = StyleSheet.create({
    // button: {
    //     width: '90%'
    // },
    login: {
        fontSize: 20,
        color: 'blue'
    },
    // input: {
    //     height: '10%',
    //     fontSize: 15
        
    // },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        
    
    }
})