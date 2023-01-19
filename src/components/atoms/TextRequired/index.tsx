import { TextRequiredInputs } from './style';
import React from 'react';

export const TextRequired = ({ children }: { children: string }) => {
  return <TextRequiredInputs>{children}</TextRequiredInputs>;
};
