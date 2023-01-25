import { Platform } from 'react-native';

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { Home, Notification } from '@/screens';

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
        statusBarTranslucent: Platform.OS === 'android' ? false : true,
      }}
      initialRouteName={RouteNames.logged.home}>
      <Stack.Screen name={RouteNames.logged.home} component={Home} />
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          animation: 'slide_from_right',
          headerTintColor: colors.text,
        }}>
        <Stack.Screen
          name={RouteNames.logged.notification}
          component={Notification}
          options={{ title: '' }}
        />
        <Stack.Screen
          name={RouteNames.logged.food.daily}
          component={Daily}
          options={{
            headerTitle: 'Diário',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: colors.green[500] },
            headerTitleStyle: { color: colors.white },
          }}
        />
      </Stack.Group>
      {/* <Stack.Screen name="MainTab" component={MyTabs} /> */}
    </Stack.Navigator>
  );
}
