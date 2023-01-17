import { ActivityIndicator, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import { Routes } from "@/routes";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { lightTheme } from "@/styles/theme";
import { useFonts, Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { PageLoading } from "@/components/atoms/PageLoading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

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
