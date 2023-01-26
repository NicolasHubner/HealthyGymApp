import React from 'react';
import { Divider } from './style';

interface IDivider {
  marginTop?: number;
}

export const DividerComponent = ({ marginTop }: IDivider) => {
  return <Divider marginTop={marginTop} />;
};
