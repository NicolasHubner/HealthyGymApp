import { baseBoldText, baseMediumText, baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.green[700]};
    width: 100%;

    align-items: center;
    justify-content: center;
    padding: ${verticalScale(16)}px ${verticalScale(24)}px;
    border-bottom-right-radius: 24px;
    border-bottom-left-radius: 24px;
`;

export const PageTitle = styled.Text`
    ${baseBoldText}
    font-size: ${scale(14)}px;
    /* margin-top: ${verticalScale(32)}px; */
    color: ${({ theme }) => theme.colors.white};
`;

export const HeaderContent = styled.View`
    width: 100%;
    flex-direction: row;

    gap: 12px;
    align-items: center;
    justify-content: flex-start;

    margin-top: ${verticalScale(8)}px;
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
    width: 100%;
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
    flex-direction: column;
    /* align-items: center; */
`;

export const SectionTitle = styled.Text`
    ${baseBoldText}
    font-size: ${scale(24)}px;
`;

export const MetabolismSubTitle = styled.Text`
    ${baseRegularText};
    font-size: ${scale(16)}px;
    color: ${({ theme }) => theme.colors.gray[700]};
    margin-top: ${verticalScale(8)}px;
`;

interface CardMetabolismProps {
    color: string;
}

export const ViewCardMetabolism = styled.View<CardMetabolismProps>`
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: ${verticalScale(24)}px;
    margin-bottom: ${verticalScale(96)}px;
    background-color: ${({ color }) => color};
    height: ${verticalScale(120)}px;
    border-radius: 8px;
`;

export const CardMetabolismTitle = styled.Text<CardMetabolismProps>`
    ${baseBoldText};
    font-weight: 600;
    font-size: ${scale(32)}px;
    color: ${({ color }) => color};
    text-align: center;
`;

export const MetabolismTitlteKcal = styled.Text<CardMetabolismProps>`
    ${baseRegularText};
    font-size: ${scale(20)}px;
    color: ${({ color }) => color};
    text-align: center;
`;

export const MetabolismIdealText = styled.Text<CardMetabolismProps>`
    ${baseMediumText};
    font-size: ${scale(12)}px;
    color: ${({ color }) => color};
    /* font-weight: 300; */
    margin-top: ${verticalScale(8)}px;
    text-align: center;
`;

export const PageHeader = styled.View`
    background-color: ${({ theme }) => theme.colors.green[700]};
    align-items: flex-end;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    padding: 40px 20px 12px;
`;

export const PageHeaderTitle = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.white};
    margin: 0 auto;
`;
