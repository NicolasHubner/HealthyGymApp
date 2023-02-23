import { baseBoldText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const TitleNavigationContainer = styled.View`
    width: 100%;
    justify-content: flex-start;
    margin-top: 16px;
`;

export const TitleNavigationApp = styled.Text`
    ${baseBoldText}
    font-size: ${scale(20)}px;
    color: ${({ theme }) => theme.colors.black};
    line-height: 30px;
    text-align: left;
`;

export const CardsContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    flex-wrap: wrap;
`;
