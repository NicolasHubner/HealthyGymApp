import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { scale } from "react-native-size-matters";

import styled from "styled-components/native";

export const ScrollViewItems = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children, ...props }: PageWrapperProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          paddingTop: Platform.OS === "android" ? 25 : 20,
          ...props,
        }}
      >
        {children}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
///Verificar se esse Props vai funcionar, pois não sei se o React Native aceita isso [NICOLAS]
export function ScrollablePageWrapper({ children, ...props }: PageWrapperProps) {
  return (
    <PageWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollViewItems
          indicatorStyle="white"
          contentContainerStyle={[
            {
              paddingHorizontal: scale(7),
              paddingTop: scale(5),
              alignItems: "center",
              ...props,
            },
            {
              paddingBottom: Platform.OS === "android" ? scale(50) : scale(100),
            },
          ]}
        >
          {children}
        </ScrollViewItems>
      </KeyboardAvoidingView>
    </PageWrapper>
  );
}
