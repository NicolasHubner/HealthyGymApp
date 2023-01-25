import React from 'react';

import { Container, ScrollableContainer } from './styles';

interface PageWrapperProps {
  children: React.ReactNode;
  marginTop?: number;
  padding?: boolean;
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

export function ScrollablePageWrapper({ children, padding = true }: PageWrapperProps) {
  return (
    <ScrollableContainer
      style={{
        padding: padding ? 16 : 0,
      }}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollableContainer>
  );
}
