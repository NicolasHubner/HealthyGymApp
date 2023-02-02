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

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>
          <ThemeProvider theme={lightTheme}>
            <SafeAreaView style={{ flex: 1 }}>
              {fontsLoaded ? <Routes /> : <PageLoading />}
            </SafeAreaView>
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
