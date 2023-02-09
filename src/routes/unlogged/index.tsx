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
    SignUpNutri,
    SingUpSizes,
    RegisterSplash,
    FinishRegister,
} from '@/screens';
import { Platform } from 'react-native';

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
                statusBarTranslucent: Platform.OS === 'android' ? false : true,
            }}
            initialRouteName={RouteNames.auth.register.splash}>
            <Stack.Screen name={RouteNames.auth.register.splash} component={RegisterSplash} />
            <Stack.Screen name={RouteNames.auth.register.initial} component={SignUp} />
            <Stack.Group
                screenOptions={
                    {
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: colors.background,
                        },
                        headerShadowVisible: false,
                        animation: 'slide_from_right',
                        headerTintColor: colors.black,
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            // fontSize: 30,
                        },
                        title: '',
                    } as NativeStackNavigationOptions
                }>
                <Stack.Screen name={RouteNames.auth.register.goals} component={SignUpGoals} />
                <Stack.Screen name={RouteNames.auth.register.nutri} component={SignUpNutri} />
                <Stack.Screen name={RouteNames.auth.register.sizes} component={SingUpSizes} />
            </Stack.Group>

            <Stack.Screen
                name={RouteNames.auth.register.finishRegister}
                component={FinishRegister}
            />

            <Stack.Screen name={RouteNames.auth.login} component={Login} />
            <Stack.Screen name={RouteNames.auth.forgotPassword} component={ForgotPassword} />
        </Stack.Navigator>
    );
}
