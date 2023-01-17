import React from "react";
import { Text } from "react-native";
import { PageWrapper } from "@/components/molecules/ScreenWrapper";
import { useFonts, Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";

export function SignUpNutrients() {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <PageWrapper>
      <Text style={{ fontSize: 40 }}>SIGNUP GOALS SCREEN!</Text>
      <Text style={{ fontFamily: "Rubik_400Regular", fontSize: 40 }}>TESTE RUBRIK</Text>
    </PageWrapper>
  );
}
