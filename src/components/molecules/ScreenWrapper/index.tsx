import React, { useState } from 'react';

import { Container, ScrollableContainer } from './styles';

interface PageWrapperProps {
  children: React.ReactNode;
  marginTop?: number;
  padding?: boolean;
  setHeaderShown?: React.Dispatch<React.SetStateAction<boolean>> | null;
}

export function PageWrapper({ children, marginTop }: PageWrapperProps) {
  return (
    <Container
      style={{
        marginTop: marginTop ?? 0,
      }}>
      {children}
    </Container>
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
