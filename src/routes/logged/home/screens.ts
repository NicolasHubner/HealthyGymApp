import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { generateRandomUuid } from '@/helpers/functions/generateUuid';

import { RouteNames } from '@/routes/routes_names';
import { screenOptionsTransparent, screenOptionsTransparentWhite } from '@/routes/stackConfigs';

import arrowDown from '@/assets/arrow-down.png';

import {
    Calories,
    Explorer,
    FinishEvolution,
    Home,
    Measures,
    Notification,
    Photos,
    Photoss,
    SharePhotos,
} from '@/screens';
import { Water } from '@/screens/Logged/Water';
import { TrainDays } from '@/screens/Logged/TrainDays';
import { Sleep } from '@/screens/Logged/Sleep';

import { lightTheme as theme } from '@/styles/theme';

interface StackScreens {
    id: string;
    name: string;
    component: () => JSX.Element;
    options?: NativeStackNavigationOptions;
}

export const HomeScreens: StackScreens[] = [
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.home,
        component: Home,
        options: {
            headerShown: false,
        },
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.notification,
        component: Notification,
        options: {
            title: '',
        },
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.measures,
        component: Measures,
        options: screenOptionsTransparent,
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.photos,
        component: Photos,
        options: screenOptionsTransparent,
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.explorer,
        component: Explorer,
        options: screenOptionsTransparent,
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.photopicker,
        component: Photoss,
        options: screenOptionsTransparentWhite,
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.finishEvolution,
        component: FinishEvolution,
        options: screenOptionsTransparent,
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.sharePhotos,
        component: SharePhotos,
        options: {
            ...screenOptionsTransparent,
        },
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.water,
        component: Water,
        options: { ...screenOptionsTransparent, headerTintColor: theme.colors.black },
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.trainDays,
        component: TrainDays,
        options: {
            ...screenOptionsTransparent,
            headerTintColor: theme.colors.black,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
        },
    },
    // {
    //     id: generateRandomUuid(),
    //     name: RouteNames.logged.sleep,
    //     component: Sleep,
    //     options: {
    //         ...screenOptionsTransparent,
    //         presentation: 'transparentModal',
    //         animation: 'slide_from_bottom',
    //         animationDuration: 100,
    //         animationTypeForReplace: 'push',
    //         navigationBarColor: theme.colors.green[700],
    //         contentStyle: {
    //             backgroundColor: 'transparent',
    //         },
    //     },
    // },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.calories,
        component: Calories,
        options: {
            ...screenOptionsTransparent,
            contentStyle: {
                backgroundColor: theme.colors.white,
            },
        },
    },
];
