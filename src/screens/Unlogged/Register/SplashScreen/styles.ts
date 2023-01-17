import styled from 'styled-components/native';

import { baseBoldText, baseRegularText } from '@/styles/global';

export const TitleContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;

    align-items: center;
    justify-content: center;

    width: 100%;

    margin: 31px 0 0;
`;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: 28px;
`;

export const TextHighlight = styled.Text`
    ${baseBoldText}
    font-size: 28px;
    margin: 0 8px;
    color: ${({ theme }) => theme.colors.green[700]};
`;

export const SubtitleContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin: 16px 0 45px;
`;

export const Subtitle = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.blue_metal[100]};
`;

export const OnboardImage = styled.Image`
    width: 237px;
    height: 237px;
`;

export const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin: 60px 0 0;
`;

export const LoginContainer = styled.View`
    align-items: center;
    justify-content: center;

    flex-direction: row;
    flex-wrap: wrap;

    margin: 24px 0 0;
`;

export const LoginText = styled.Text`
    ${baseRegularText}
    margin-right: 6px;
`;
