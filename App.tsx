import 'expo-dev-client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
    useFonts,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
} from '@expo-google-fonts/rubik';

import { PageLoading } from '@/components/atoms/PageLoading';
import { InitialFunctions } from '@/components/molecules/InitialFunctions';
import { store } from '@/store';
import { Routes } from '@/routes';

import { lightTheme } from '@/styles/theme';
import { StatusBar } from 'expo-status-bar';

import inAppMessaging from '@react-native-firebase/in-app-messaging';

export default function App() {
    const [isAppLoading, setIsAppLoading] = useState(true);

    async function throwFirebaseNotifications() {
        await inAppMessaging().setMessagesDisplaySuppressed(true);
    }

    const [fontsLoaded] = useFonts({
        Rubik_400Regular,
        Rubik_500Medium,
        Rubik_700Bold,
    });

    useEffect(() => {
        setTimeout(() => {
            setIsAppLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        async () => {
            await throwFirebaseNotifications();
        };
    }, []);

    return (
        <Provider store={store}>
            <StatusBar style="dark" />
            <SafeAreaProvider>
                <GestureHandlerRootView
                    style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>
                    <ThemeProvider theme={lightTheme}>
                        <InitialFunctions />
                        {!isAppLoading && fontsLoaded ? <Routes /> : <PageLoading />}
                    </ThemeProvider>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </Provider>
    );
}
