import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { RouteNames } from '../routes_names';

import { useTheme } from 'styled-components/native';
import { Daily } from '@/screens/Logged/Food/Daily';
import { ShoppingList } from '@/screens/Logged/Food/ShoppingList';
import { Water } from '@/screens/Logged/Water';
import { TrainDays } from '@/screens/Logged/TrainDays';
import { Sleep } from '@/screens/Logged/Sleep';
import { MetricsTrain } from '@/screens/Logged/MetricsTrain';
import {
    Explorer,
    FoodsDetails,
    FoodsDetailsIngredients,
    Home,
    Measures,
    Metrics,
    Notification,
    Photos,
} from '@/screens';

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
                statusBarTranslucent: true,
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
                    options={screenOptionsTransparent}
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
                    options={screenOptionsTransparent}
                    name={RouteNames.logged.explorer}
                    component={Explorer}
                />
                <Stack.Screen
                    name={RouteNames.logged.metrics.initial}
                    component={Metrics}
                    options={{
                        ...screenOptionsTransparent,
                        headerTintColor: colors.black,
                    }}
                />
                <Stack.Screen
                    name={RouteNames.logged.water}
                    component={Water}
                    options={{
                        ...screenOptionsTransparent,
                        headerTintColor: colors.black,
                    }}
                />
                <Stack.Screen
                    name={RouteNames.logged.trainDays}
                    component={TrainDays}
                    options={{
                        ...screenOptionsTransparent,
                        headerTintColor: colors.black,
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                    }}
                />
                <Stack.Screen
                    name={RouteNames.logged.sleep}
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
                    }}
                    component={Sleep}
                />
                <Stack.Screen
                    name={RouteNames.logged.metrics.train}
                    component={MetricsTrain}
                    options={{
                        ...screenOptionsTransparent,
                        headerTintColor: colors.black,
                    }}
                />
            </Stack.Group>
            {/* <Stack.Screen name="MainTab" component={MyTabs} /> */}
        </Stack.Navigator>
    );
}
