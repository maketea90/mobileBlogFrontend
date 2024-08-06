import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}>
      <Tabs.Screen name='home' 


      options={{ tabBarLabel: "Home", tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color={color} size={size} />
      )}}/>
      <Tabs.Screen name='post' options={{tabBarLabel:"Post",

        tabBarIcon: ({color, size}) => (
            <MaterialIcons name='post-add' color={color} size={size}/>
        )
      }}/>
      
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile",

        tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name='face-woman-profile' color={color} size={size}/>
        )
       }}/>
    </Tabs>
  );
}