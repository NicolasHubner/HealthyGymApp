import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import { RouteNames } from '../routes_names';

import arrowDown from '@/assets/arrow-down.png';

import { HomeFoodStackScreens } from './home/food';
import { HomeMetricsStackScreens } from './home/metrics';
import { HomeScreens } from './home/screens';
import { CoachStackScreens } from './coach';
import { screenOptionsTransparent } from '../stackConfigs';
import { Sleep } from '@/screens/Logged/Sleep';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    orientation: 'portrait',
    animation: 'fade',
};

export function Logged() {
    const { colors } = useTheme();

    const { goBack } = useNavigation<INavigation>();

    const renderGoBackButtonForSleepScreen = () => (
        <TouchableOpacity onPress={() => goBack()}>
            <View style={{ paddingTop: 50 }}>
                <Image
                    source={arrowDown}
                    resizeMethod="resize"
                    resizeMode="center"
                    style={{ width: 24, height: 24 }}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <Stack.Navigator
            screenOptions={{
                ...screenOptions,
                contentStyle: {
                    backgroundColor: colors.background,
                },
                headerLeft: HeaderGoBackButton,
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
                <Stack.Screen
                    name={RouteNames.logged.sleep}
                    component={Sleep}
                    options={{
                        ...screenOptionsTransparent,
                        presentation: 'transparentModal',
                        animation: 'slide_from_bottom',
                        animationDuration: 100,
                        animationTypeForReplace: 'push',
                        navigationBarColor: colors.green[700],
                        contentStyle: {
                            backgroundColor: 'transparent',
                        },
                        headerLeft: renderGoBackButtonForSleepScreen,
                    }}
                />

                {HomeFoodStackScreens({ stack: Stack })}
                {HomeMetricsStackScreens({ stack: Stack })}
                {CoachStackScreens({ stack: Stack })}
            </Stack.Group>
        </Stack.Navigator>
    );
}
