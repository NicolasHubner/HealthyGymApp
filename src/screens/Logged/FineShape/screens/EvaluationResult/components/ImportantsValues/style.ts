import { baseBoldText, baseMediumText, baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ViewMostImportantValues = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: ${verticalScale(24)}px;
    margin-bottom: ${verticalScale(32)}px;
`;

interface PropsViewContainerValues {
    color: string;
}

export const ViewCotainerValues = styled.View<PropsViewContainerValues>`
    width: 100%;
    flex-direction: row;
    max-width: ${scale(335)}px;
    height: ${verticalScale(130)}px;
    border-radius: 8px;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: ${verticalScale(16)}px;
    background-color: ${({ color }) => color};
`;

export const ViewValues = styled.View`
    flex-direction: column;
    align-items: center;
    width: ${scale(60)}px;
    /* background-color: red; */
    /* justify-content: center; */
    margin-left: ${scale(8)}px;
`;

interface PropsTextPrincipalValue {
    color: string;
}

export const ViewText = styled.View`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
`;

export const TextPrincipalValue = styled.Text<PropsTextPrincipalValue>`
    ${baseBoldText};
    font-size: ${scale(20)}px;
    font-weight: 400;
    color: ${({ color }) => color};
`;

export const TextSecondaryValueTitle = styled.Text<PropsTextPrincipalValue>`
    ${baseMediumText};
    font-size: ${scale(12)}px;
    color: ${({ color }) => color};
`;

export const TextSecondaryValue = styled.Text<PropsTextPrincipalValue>`
    ${baseBoldText};
    font-size: ${scale(12)}px;
    width: 100%;
    text-align: center;
    font-weight: 700;
    line-height: ${verticalScale(16)}px;
    margin-top: ${verticalScale(8)}px;
    color: ${({ color }) => color};
`;

export const ContainerTexts = styled.View`
    flex-direction: column;
    justify-content: space-between;
    width: ${scale(230)}px;
    height: 86%;
    padding-right: ${scale(12)}px;
`;

export const TextTitle = styled.Text<PropsTextPrincipalValue>`
    ${baseBoldText};
    color: ${({ color }) => color};
    font-weight: 500;
    margin-top: ${verticalScale(4)}px;
    font-size: ${scale(14)}px;
`;

export const TextDescription = styled.Text<PropsTextPrincipalValue>`
    ${baseRegularText};
    color: ${({ color }) => color};
    font-size: ${scale(12)}px;
    text-align: justify;
    font-weight: 500;
    margin-top: ${verticalScale(4)}px;
`;

export const TextDescriptionIdeal = styled.Text<PropsTextPrincipalValue>`
    ${baseMediumText};
    color: ${({ color }) => color};
    font-size: ${scale(12)}px;
    font-weight: 400;
`;
