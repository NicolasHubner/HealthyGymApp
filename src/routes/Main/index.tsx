import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import { RouteNames } from '../routes_names';

import { HomeFoodStackScreens } from './home/food';
import { HomeMetricsStackScreens } from './home/metrics';
import { HomeScreens } from './home/screens';
import { CoachStackScreens } from './coach';
import { screenOptionsTransparent } from '../stackConfigs';
import { Sleep } from '@/screens/Main/Sleep';
import { View } from 'react-native';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { EvolutionPhotosStackScreen } from './evolutionPhotos';
import { FineShapeStackScreen } from './fineShape';
import { UserPhoto } from '@/screens';

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
                headerLeft: HeaderGoBackButton,
                statusBarTranslucent: true,
                // statusBarColor: 'transparent',
                // statusBarStyle: 'dark',
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
                <Stack.Screen
                    name={RouteNames.logged.sleep}
                    component={Sleep}
                    options={{
                        ...screenOptionsTransparent,
                        presentation: 'transparentModal',
                        animation: 'slide_from_bottom',
                        animationDuration: 100,
                        animationTypeForReplace: 'push',
                        // navigationBarColor: colors.green[700],
                        contentStyle: {
                            backgroundColor: 'transparent',
                        },
                        // eslint-disable-next-line react/no-unstable-nested-components
                        headerLeft: () => <View />,
                    }}
                />
                <Stack.Screen
                    name={RouteNames.logged.userPhotos}
                    component={UserPhoto}
                    options={{
                        ...screenOptionsTransparent,
                        presentation: 'transparentModal',
                        animation: 'slide_from_bottom',
                        animationDuration: 100,
                        animationTypeForReplace: 'push',
                        // navigationBarColor: colors.green[700],
                        contentStyle: {
                            backgroundColor: 'transparent',
                        },
                        // eslint-disable-next-line react/no-unstable-nested-components
                        headerLeft: () => <View />,
                    }}
                />

                {HomeFoodStackScreens({ stack: Stack })}
                {HomeMetricsStackScreens({ stack: Stack })}
                {CoachStackScreens({ stack: Stack })}
                {FineShapeStackScreen({ stack: Stack })}
                {EvolutionPhotosStackScreen({ stack: Stack })}
            </Stack.Group>
        </Stack.Navigator>
    );
}
