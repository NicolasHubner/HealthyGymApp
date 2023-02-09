import React from 'react';
import { FlexStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { Container, ScrollableContainer } from './styles';

interface PageWrapperProps {
  children: React.ReactNode;
  marginTop?: number;
  padding?: number;
  setHeaderShown?: React.Dispatch<React.SetStateAction<boolean>> | null;
  edges?: Edge[];
  styles?: FlexStyle;
}

export function PageWrapper({ children, marginTop, edges }: PageWrapperProps) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={edges}>
      <Container
        style={{
          marginTop: marginTop ?? 0,
        }}>
        {children}
      </Container>
    </SafeAreaView>
  );
}

export function ScrollablePageWrapper({
  children,
  padding = 16,
  setHeaderShown = null,
  edges,
  styles,
}: PageWrapperProps) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={edges}>
      <ScrollableContainer
        scrollEventThrottle={128}
        onScroll={({ nativeEvent }) => {
          if (setHeaderShown === null) {
            return;
          }
          if (nativeEvent.contentOffset.y > 200) {
            setHeaderShown(false);
          } else {
            setHeaderShown(true);
          }
        }}
        style={{
          padding,
          ...styles,
        }}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollableContainer>
    </SafeAreaView>
  );
}
