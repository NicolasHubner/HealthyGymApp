import { Home } from '@/screens';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { RouteNames } from '../routes_names';

// import MyTabs from './MainBottomTab';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
  animation: 'fade',
};

export function Logged() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={RouteNames.logged.home}>
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
      <Stack.Screen name={RouteNames.logged.home} component={Home} />
      {/* <Stack.Screen name="MainTab" component={MyTabs} /> */}
    </Stack.Navigator>
  );
}
