import React from 'react';

import { Container, ScrollableContainer } from './styles';

interface PageWrapperProps {
  children: React.ReactNode;
  marginTop?: number;
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

export function ScrollablePageWrapper({ children }: PageWrapperProps) {
  return <ScrollableContainer showsVerticalScrollIndicator={false}>{children}</ScrollableContainer>;
}
