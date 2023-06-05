import { baseBoldText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${18}px;

    margin: 0 0 40px 20px;
`;
