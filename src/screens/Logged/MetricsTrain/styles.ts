import { baseMediumText } from '@/styles/global';
import { scale } from 'react-native-size-matters';

import styled from 'styled-components/native';

export const Container = styled.View``;

export const InsightsButton = styled.View`
    background-color: ${({ theme }) => theme.colors.green[300]};
    padding: 12px 16px;
    border-radius: 16px;
    align-self: flex-end;
`;

export const InsightsText = styled.Text`
    ${baseMediumText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.green[700]};
`;

export const GraphicContainer = styled.View`
    margin-top: 24px;
`;

export const GraphicList = styled.View``;
