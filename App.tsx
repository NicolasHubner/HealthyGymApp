import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import { Routes } from "@/routes";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { lightTheme } from "@/styles/theme";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>
        <ThemeProvider theme={lightTheme}>
          <SafeAreaView style={{ flex: 1 }}>
            <Routes />
            <StatusBar style="auto" />
          </SafeAreaView>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
