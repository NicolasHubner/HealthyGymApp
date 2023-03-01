import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import { RouteNames } from '../routes_names';

import { HomeFoodStackScreens } from './home/food';
import { HomeMetricsStackScreens } from './home/metrics';
import { HomeScreens } from './home/screens';
import { CoachScreens } from './coach/screens';

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
                statusBarTranslucent: true,
            }}
            initialRouteName={RouteNames.logged.home}>
            <Stack.Group
                screenOptions={{
                    headerShown: true,
                    orientation: 'portrait',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                    headerTintColor: colors.text,
                }}>
                {HomeScreens.map(screen => (
                    <Stack.Screen
                        key={screen.id}
                        name={screen.name}
                        component={screen.component}
                        options={screen.options}
                    />
                ))}

                {HomeFoodStackScreens({ stack: Stack })}
                {HomeMetricsStackScreens({ stack: Stack })}

                {CoachScreens.map(screen => (
                    <Stack.Screen
                        key={screen.id}
                        name={screen.name}
                        component={screen.component}
                        options={screen.options}
                    />
                ))}
            </Stack.Group>
        </Stack.Navigator>
    );
}
