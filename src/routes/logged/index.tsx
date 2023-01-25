import { FoodsDetails, Home, Notification } from '@/screens';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Platform } from 'react-native';
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
          title: '',
        }}>
        <Stack.Screen name={RouteNames.logged.notification} component={Notification} />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerBlurEffect: 'dark',
            headerTransparent: true,
            headerTintColor: colors.white,
          }}
          name={RouteNames.logged.foods_deatils}
          component={FoodsDetails}
        />
      </Stack.Group>
      {/* <Stack.Screen name="MainTab" component={MyTabs} /> */}
    </Stack.Navigator>
  );
}
