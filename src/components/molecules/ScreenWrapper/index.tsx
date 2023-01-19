import React from 'react';

import { Container, ScrollableContainer } from './styles';

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <Container>{children}</Container>;
}

export function ScrollablePageWrapper({ children }: PageWrapperProps) {
  return <ScrollableContainer showsVerticalScrollIndicator={false}>{children}</ScrollableContainer>;
}
