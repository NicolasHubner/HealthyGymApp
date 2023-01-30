import { TextRequiredInputs, Container } from './style';
import React from 'react';

interface TextRequiredProps {
  width?: number;
  children: string;
}

export const TextRequired = ({ children, width = 100 }: TextRequiredProps) => {
  return (
    <Container style={{ width: `${width}%` }}>
      <TextRequiredInputs>{children}</TextRequiredInputs>
    </Container>
  );
};
