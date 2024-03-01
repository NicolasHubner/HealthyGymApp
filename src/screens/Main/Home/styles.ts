import { baseBoldText } from '@/styles/global';
import styled from 'styled-components/native';

export const TitleNavigationContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    flex-direction: row;
`;

export const TitleNavigationApp = styled.Text`
    ${baseBoldText}
    font-size: ${18}px;
    color: ${({ theme }) => theme.colors.black};
    line-height: 30px;
    text-align: left;
`;

export const OptionsContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    margin-top: 16px;
`;
