import { baseMediumText, baseRegularText } from '@/styles/global';
import { verticalScale, scale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

interface IContainer {
    final: boolean;
}

export const ContainerPhotoPicker = styled(LinearGradient).attrs({
    colors: ['rgb(144, 180, 146)', 'rgba(144, 214, 146, 1)'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
})<IContainer>`
    /* flex: 1; */
    width: 100%;
    align-items: center;
    padding-bottom: ${final => (final ? verticalScale(80) : verticalScale(20))}px;
`;

export const ContainerTumbleButton = styled.View`
    width: 100%;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};
    padding-vertical: ${verticalScale(20)}px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    margin-top: -${verticalScale(40)}px;
`;

export const TitlePhotoPicker = styled.Text`
    ${baseMediumText}
    font-size: ${scale(28)}px;
    color: ${({ theme }) => theme.colors.white};
    width: 80%;
    margin-top: ${verticalScale(80)}px;
`;

export const SubTitlePhotoPicker = styled.Text`
    ${baseRegularText}
    font-size: ${scale(16)}px;
    color: ${({ theme }) => theme.colors.black};
    width: 80%;
    margin-top: ${verticalScale(20)}px;
`;

export const ImageBodyWoman = styled.Image.attrs({
    // width: 200,
    // height: 350,
    resizeMode: 'contain',
})`
    /* width: ${Platform.OS === 'android' ? scale(180) : scale(230)}px; */
    /* width: 50%; */
    height: 55%;
    /* margin-bottom: ${verticalScale(10)}px;// */
    margin-top: ${verticalScale(24)}px;
    /* margin-top: ${Platform.OS === 'android' ? -verticalScale(160) : -verticalScale(90)}px; */
`;
export const ViewImage = styled.View`
    width: 60%;
    align-items: center;
    /* justify-content: center; */
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    margin-top: ${verticalScale(36)}px;
    padding: 10px;
    margin-bottom: ${Platform.OS === 'android' ? verticalScale(36) : verticalScale(0)}px;
    /* margin-top: ${Platform.OS === 'android' ? -verticalScale(160) : -verticalScale(90)}px; */
`;

export const ButtonsPhoto = styled.View`
    align-items: center;
    justify-content: center;
    width: ${scale(300)}px;
    background-color: ${({ theme }) => theme.colors.green[500]};
    padding-vertical: ${verticalScale(10)}px;
    border-radius: 10px;
    margin-bottom: ${verticalScale(10)}px;
    margin-top: ${verticalScale(32)}px;
`;
export const TextButton = styled.Text`
    ${baseRegularText}
    color: #fff;
    font-size: ${scale(12)}px;
`;
