import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.green[700]};
    width: 100%;

    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    border-bottom-right-radius: 24px;
    border-bottom-left-radius: 24px;
`;

export const PageTitle = styled.Text`
    ${baseBoldText}
    font-size: ${scale(14)}px;
    color: ${({ theme }) => theme.colors.white};
`;

export const HeaderContent = styled.View`
    width: 100%;
    flex-direction: row;

    gap: 12px;
    align-items: center;
    justify-content: flex-start;

    margin-top: 16px;
`;

export const UserDescription = styled.View``;

export const UserImage = styled.Image`
    width: 75px;
    height: 75px;
    border-radius: 16px;
`;

export const UserName = styled.Text`
    ${baseBoldText}
    font-size: ${scale(20)}px;
    color: ${({ theme }) => theme.colors.white};
    width: 40%;
`;

export const UserDescriptionText = styled.Text`
    ${baseRegularText}
    font-size: ${scale(14)}px;
    color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
    padding: 40px 20px 0;
    width: 100%;
`;

export const Section = styled.View`
    width: 100%;
`;

export const SectionTitle = styled.Text`
    ${baseBoldText}
    font-size: ${scale(24)}px;
`;
