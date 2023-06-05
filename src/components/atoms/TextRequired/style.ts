import { baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    margin: 4px 0;
`;

export const TextRequiredInputs = styled.Text`
    ${baseRegularText}
    font-size: ${12}px;
    margin-top: 5px;
    color: ${({ theme }) => theme.colors.red[500]};
`;
