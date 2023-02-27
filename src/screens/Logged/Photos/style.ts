import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const ContainerTop = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: ${verticalScale(700)}px;
    background-color: ${({ theme }) => theme.colors.green[900]};
    z-index: 1;
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
    font-size: ${scale(36)}px;
    color: ${({ theme }) => theme.colors.white};
    margin-top: 80px;
    margin-bottom: 24px;
    text-transform: uppercase;
    text-align: center;
`;

export const Subtitle = styled.Text`
    ${baseRegularText}
    width: 90%;
    font-size: ${scale(20)}px;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    margin-bottom: ${verticalScale(80)}px;
`;
export const ViewTumble = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 96%;
    margin-top: 24px;
`;
export const Tumble = styled.TouchableOpacity`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 8px;
    width: 31%;
    height: 140px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.green[500]};
`;
export const TextTumble = styled.Text`
    ${baseRegularText}
    font-size: ${scale(16)}px;
    color: ${({ theme }) => theme.colors.black};
    margin-top: 16px;
    margin-bottom: 16px;
`;

export const ImageTumble = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 8px;
`;
