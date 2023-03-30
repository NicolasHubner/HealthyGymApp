import 'expo-dev-client';

import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { StatusBar } from 'expo-status-bar';

import {
    useFonts,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
} from '@expo-google-fonts/rubik';

import { InitialFunctions } from '@/components/molecules/InitialFunctions';
import { store } from '@/store';
import { Routes } from '@/routes';

import { lightTheme } from '@/styles/theme';

import inAppMessaging from '@react-native-firebase/in-app-messaging';
import { toastConfig } from '@/helpers/functions/handleToast';
import { Platform, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        Rubik_400Regular,
        Rubik_500Medium,
        Rubik_700Bold,
    });

    async function throwFirebaseNotifications() {
        await inAppMessaging().setMessagesDisplaySuppressed(false);
    }

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            console.log('** App is Ready **');
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    useEffect(() => {
        throwFirebaseNotifications();
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            setAppIsReady(true);
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!appIsReady) {
        return null;
    }

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <GestureHandlerRootView
                    style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>
                    <ThemeProvider theme={lightTheme}>
                        <InitialFunctions />
                        <View style={{ flex: 1, width: '100%' }} onLayout={onLayoutRootView}>
                            <Routes />
                        </View>
                        <Toast config={toastConfig} />
                        <StatusBar style={'dark'} />
                    </ThemeProvider>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </Provider>
    );
}
