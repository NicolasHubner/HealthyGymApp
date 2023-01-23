import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { Home } from '@/screens';

import { RouteNames } from '../routes_names';

import { useTheme } from 'styled-components/native';
import { Daily } from '@/screens/Logged/Food/Daily';

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
      <Stack.Screen
        name={RouteNames.logged.food.daily}
        component={Daily}
        options={{
          headerShown: true,
          headerTitle: 'Diário',
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: colors.green[500] },
          headerTitleStyle: { color: colors.white },
        }}
      />
      {/* <Stack.Screen name="MainTab" component={MyTabs} /> */}
    </Stack.Navigator>
  );
}
