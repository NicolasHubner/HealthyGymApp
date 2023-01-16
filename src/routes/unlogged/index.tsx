import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword, Login, SignUp, SignUpGoals, SignUpNutri, SingUpSizes, SplashScreen } from '../../screens';
import { BACKGROUND_COLOR } from '../../styles/Colors';
import RoutesUnlogged from '../../routes/Routes';

const Stack = createNativeStackNavigator();

export default function Unlogged () {
  return(
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      orientation: 'portrait',
      animation: 'fade',
      contentStyle: {
        backgroundColor: BACKGROUND_COLOR,
      },
    }}
    initialRouteName={RoutesUnlogged.FORGOT_PASSWORD}
    >
      <Stack.Screen name={RoutesUnlogged.SPLASH} component={SplashScreen} />
      <Stack.Screen name={RoutesUnlogged.LOGIN} component={Login} />
      <Stack.Screen name={RoutesUnlogged.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={RoutesUnlogged.SINGUP_GOALS} component={SignUpGoals} />
      <Stack.Screen name={RoutesUnlogged.SINGUP} component={SignUp} />
      <Stack.Screen name={RoutesUnlogged.SINGUP_NUTRIENTS} component={SignUpNutri} />
      <Stack.Screen name={RoutesUnlogged.SINGUP_SIZES} component={SingUpSizes} />
    </Stack.Navigator>
  )
}