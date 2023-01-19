import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyTabs from './MainBottomTab';
import { Login, SplashScreen } from '../../screens';

const Stack = createNativeStackNavigator();

export function Logged() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainTab" component={MyTabs} />
    </Stack.Navigator>
  );
}
