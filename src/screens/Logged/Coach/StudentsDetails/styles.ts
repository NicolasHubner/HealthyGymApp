import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;

    margin-top: 32px;
`;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${scale(32)}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    margin-left: 20px;
`;

export const Content = styled.View`
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: 40px;
    padding: 0 20px 35px;
`;

export const ContentHeader = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    padding: 40px 0 0;
`;

export const StudentImage = styled.Image.attrs({
    width: 144,
    height: 144,
    resizeMode: 'cover',
    resizeMethod: 'scale',
})`
    border-radius: 8px;
`;

export const StudentName = styled.Text`
    ${baseBoldText}
    font-size: ${scale(24)}px;
    letter-spacing: 1px;

    margin: 16px 0 8px;
`;

export const Divider = styled.View`
    height: 0.5px;
    width: 100%;

    background-color: ${({ theme }) => theme.colors.gray[300]};
`;

export const ObservationContent = styled.View``;

export const ObservationTitle = styled.Text`
    ${baseBoldText}
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;

export const ObservationBox = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    padding: 18px 12px;
    border-radius: 8px;
    margin-top: 16px;
`;

export const ObservationText = styled.Text`
    ${baseRegularText}
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.gray[700]};
`;
