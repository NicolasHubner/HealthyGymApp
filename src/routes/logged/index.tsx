import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, SplashScreen } from "../../screens";
import MyTabs from "./MainBottomTab";

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
