import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const ContainerTop = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: ${height}px;
    background-color: ${({ theme }) => theme.colors.green[900]};
    z-index: 1;
`;
export const ImageCamera = styled.Image`
    width: 88px;
    height: 88px;
    margin-top: ${verticalScale(100)}px;
`;

export const ImageBg = styled.ImageBackground`
    width: 100%;
    height: 100%;
    flex: 1;
    opacity: 0.6;
    position: absolute;
    z-index: -1;
`;

export const Title = styled.Text`
    ${baseBoldText}
    width: 85%;
    font-size: ${24}px;
    color: ${({ theme }) => theme.colors.white};
    margin-top: ${verticalScale(56)}px;
    margin-bottom: 24px;
    text-transform: uppercase;
    text-align: center;
`;

export const Subtitle = styled.Text`
    ${baseRegularText}
    width: 70%;
    font-size: ${14}px;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    margin-bottom: ${verticalScale(80)}px;
`;
