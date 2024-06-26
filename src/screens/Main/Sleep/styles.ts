import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

import { Entypo } from '@expo/vector-icons';

export const PageContainer = styled.View`
    width: 100%;
    height: auto;

    background-color: #fff;

    margin-top: auto;
    padding: 24px;

    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
`;

export const BackArrow = styled(Entypo).attrs(({ theme }) => ({
    name: 'chevron-down',
    size: 32,
    color: theme.colors.black,
}))``;

export const SleepImage = styled.Image`
    align-self: center;
    width: 143px;
    height: 88px;
`;

export const PageTitleContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

export const PageTitle = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: ${18}px;
    margin-top: 42px;
    text-align: center;
`;

export const PageSubtitle = styled.Text`
    ${baseRegularText}
    font-size: ${14}px;
    text-align: center;
    color: ${({ theme }) => theme.colors.blue_metal[500]};
    text-align: center;

    margin-top: 12px;
`;

export const ButtonContainer = styled.View`
    margin: 30px 0;
    align-items: center;
    justify-content: center;
`;
