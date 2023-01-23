import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import React from 'react';
import { PageLoading } from '@/components/atoms/PageLoading';
import { Routes } from '@/routes';
import { lightTheme } from '@/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>
        <ThemeProvider theme={lightTheme}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            {fontsLoaded && <Routes />}
            {!fontsLoaded && <PageLoading />}
          </SafeAreaView>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
