import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const ContainerTop = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${height * 1}px;
    background-color: ${({ theme }) => theme.colors.green[900]};
    z-index: 1;
`;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${20}px;
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    letter-spacing: 1.2px;
    width: 60%;
    text-align: center;
`;

export const MedalImage = styled.Image.attrs({
    resizeMode: 'contain',
})`
    /* width: ${width}px; */
    /* height: ${height}px; */
    position: relative;
    bottom: ${verticalScale(80)}px;
    /* background-color: red; */
    /* margin-top: ${verticalScale(40)}px; */
`;

export const SubtitleFinish = styled.Text`
    ${baseRegularText}
    font-size: ${16}px;
    color: ${({ theme }) => theme.colors.white};
    width: 80%;
    text-align: center;
    margin-top: -${verticalScale(160)}px;
`;

export const ButtonsPhoto = styled.View`
    align-items: center;
    justify-content: center;
    width: ${scale(300)}px;
    background-color: ${({ theme }) => theme.colors.green[500]};
    padding-vertical: ${16}px;
    border-radius: 10px;
    margin-bottom: ${12}px;
    margin-top: ${verticalScale(120)}px;
`;
export const TextButton = styled.Text`
    ${baseRegularText}
    color: #fff;
    font-size: ${12}px;
`;
