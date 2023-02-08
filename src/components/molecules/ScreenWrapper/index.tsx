import React from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { Container, ScrollableContainer } from './styles';

interface PageWrapperProps {
  children: React.ReactNode;
  marginTop?: number;
  padding?: boolean;
  setHeaderShown?: React.Dispatch<React.SetStateAction<boolean>> | null;
  edges?: Edge[];
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
  padding = true,
  setHeaderShown = null,
}: PageWrapperProps) {
  return (
    <ScrollableContainer
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
        padding: padding ? 16 : 0,
      }}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollableContainer>
  );
}
