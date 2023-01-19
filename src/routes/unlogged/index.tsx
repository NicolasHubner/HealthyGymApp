import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import { RouteNames } from '@/routes/routes_names';
import {
  ForgotPassword,
  Login,
  SignUp,
  SignUpGoals,
  SignUpNutrients,
  SingUpSizes,
  RegisterSplash,
} from '@/screens';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
  animation: 'fade',
};

export function Unlogged() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={RouteNames.auth.register.splash}>
      <Stack.Screen name={RouteNames.auth.register.splash} component={RegisterSplash} />
      <Stack.Screen name={RouteNames.auth.register.initial} component={SignUp} />
      <Stack.Screen name={RouteNames.auth.register.goals} component={SignUpGoals} />
      <Stack.Screen name={RouteNames.auth.register.nutrients} component={SignUpNutrients} />
      <Stack.Screen name={RouteNames.auth.register.sizes} component={SingUpSizes} />

      <Stack.Screen name={RouteNames.auth.login} component={Login} />
      <Stack.Screen name={RouteNames.auth.forgotPassword} component={ForgotPassword} />
    </Stack.Navigator>
  );
}
