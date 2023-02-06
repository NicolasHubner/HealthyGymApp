import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import React from 'react';
import { PageLoading } from '@/components/atoms/PageLoading';
import { Routes } from '@/routes';
import { lightTheme } from '@/styles/theme';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Platform } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>
          <ThemeProvider theme={lightTheme}>
            {/* {Platform.OS === 'android' && ( */}
            <SafeAreaView style={{ flex: 1 }}>
              {fontsLoaded && <Routes />}
              {!fontsLoaded && <PageLoading />}
            </SafeAreaView>
            {/* // )} */}
            {/* {Platform.OS === 'ios' && fontsLoaded && <Routes />}
            {!fontsLoaded && <PageLoading />} */}
          </ThemeProvider>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
}
