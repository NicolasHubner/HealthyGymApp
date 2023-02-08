import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik';

import { PageLoading } from '@/components/atoms/PageLoading';
import { InitialFunctions } from '@/components/molecules/InitialFunctions';
import { store } from '@/store';
import { Platform } from 'react-native';
import { Routes } from '@/routes';

import { lightTheme } from '@/styles/theme';

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

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

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>
          <ThemeProvider theme={lightTheme}>
            {/* {Platform.OS === 'android' && ( */}
            {/* <SafeAreaView style={{ flex: 1 }}> */}
            <InitialFunctions />
            {!isAppLoading && fontsLoaded ? <Routes /> : <PageLoading />}
            {/* </SafeAreaView> */}
            {/* // )} */}
            {/* {Platform.OS === 'ios' && fontsLoaded && <Routes />}
            {!fontsLoaded && <PageLoading />} */}
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
