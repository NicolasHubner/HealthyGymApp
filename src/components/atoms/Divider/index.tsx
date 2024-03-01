import React from 'react';
import { Divider } from './style';

interface IDivider {
    marginTop?: number;
    width?: string; // Em porcentagem
}

export const DividerComponent = ({ marginTop = 16, width }: IDivider) => {
    return <Divider width={width} marginTop={marginTop} />;
};
