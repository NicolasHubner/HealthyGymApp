import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { lightTheme as theme } from '@/styles/theme';

export const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    orientation: 'portrait',
    animation: 'fade',
};

export const screenOptionsTransparent: NativeStackNavigationOptions = {
    headerStyle: {
        backgroundColor: 'transparent',
    },
    headerTransparent: true,
    headerBackTitleVisible: false,
    headerTintColor: theme.colors.black,
    headerTitle: '',
};

export const screenOptionsTransparentWhite: NativeStackNavigationOptions = {
    headerStyle: {
        backgroundColor: 'transparent',
    },
    headerTransparent: true,
    headerBackTitleVisible: false,
    contentStyle: {
        backgroundColor: theme.colors.white,
    },
    headerTitle: '',
};
