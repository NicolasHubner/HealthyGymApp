import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text } from 'react-native';
import { Onboard } from './src/Onboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return <>
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        estureEnabled: true,
        gestureDirection: "vertical",
      }}>
        <Stack.Screen name="Onboard" component={Onboard} />
    </Stack.Navigator>
  </NavigationContainer>
  </>
}