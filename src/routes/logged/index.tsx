import { Platform } from 'react-native';

import {
  FoodsDetails,
  FoodsDetailsIngredients,
  Home,
  Measures,
  Notification,
  Photos,
} from '@/screens';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { RouteNames } from '../routes_names';

import { useTheme } from 'styled-components/native';
import { Daily } from '@/screens/Logged/Food/Daily';
import { ShoppingList } from '@/screens/Logged/Food/ShoppingList';
import { Water } from '@/screens/Logged/Water';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
  animation: 'fade',
};

export function Logged() {
  const { colors } = useTheme();
  const screenOptionsTransparent: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerTransparent: true,
    headerBackTitleVisible: false,
    headerTintColor: colors.white,
    headerTitle: '',
  };
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
          headerTitleAlign: 'center',
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
            headerTintColor: colors.white,
          }}
        />
        {/* <Stack.Screen name={RouteNames.logged.notification} component={Notification} /> */}
        <Stack.Screen
          options={screenOptionsTransparent}
          name={RouteNames.logged.food.details.initial}
          component={FoodsDetails}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerBlurEffect: 'dark',
            headerTransparent: true,
            headerTintColor: colors.white,
            headerTitle: '',
          }}
          name={RouteNames.logged.food.details.ingredients}
          component={FoodsDetailsIngredients}
        />
        <Stack.Screen
          options={screenOptionsTransparent}
          name={RouteNames.logged.food.shoppingList}
          component={ShoppingList}
        />
        <Stack.Screen
          options={screenOptionsTransparent}
          name={RouteNames.logged.measures}
          component={Measures}
        />
        <Stack.Screen
          options={screenOptionsTransparent}
          name={RouteNames.logged.photos}
          component={Photos}
        />
        <Stack.Screen
          name={RouteNames.logged.water}
          component={Water}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: colors.white,
            },
          }}
        />
      </Stack.Group>

      {/* <Stack.Screen name="MainTab" component={MyTabs} /> */}
    </Stack.Navigator>
  );
}
