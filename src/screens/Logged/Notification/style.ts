import { baseBoldText, baseRegularText } from './../../../styles/global';
import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';

export const TitleContainer = styled.View`
    width: 100%;
    justify-content: flex-start;
`;

export const TitleScreen = styled.Text`
    ${baseBoldText}
    font-size: ${scale(32)}px;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 40px;
`;
export const SubTitleContainer = styled.View`
    width: 100%;
    justify-content: flex-start;
    margin-bottom: 20px;
    flex-direction: row;
`;
export const SubTitle = styled.Text`
    ${baseBoldText}
    font-size: ${scale(20)}px;
    color: ${({ theme }) => theme.colors.black};
    letter-spacing: 0.3px;
`;
export const IconNumberNotification = styled.View`
    width: 40px;
    height: 32px;
    border-radius: 24px;
    background-color: ${({ theme }) => theme.colors.green[500]};
    justify-content: center;
    align-items: center;
    margin-left: 20px;
`;
export const IconText = styled.Text`
    ${baseRegularText}
    font-size: ${scale(16)}px;
    color: ${({ theme }) => theme.colors.black};
    letter-spacing: 0.3px;
    text-align: center;
`;
export const ContainerNotification = styled.View`
    width: 100%;
    flex-direction: column;
    /* margin-bottom: 24px; */
`;
export const NotifcationCard = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    /* justify-content: flex-start; */
    /* align-items: center; */
    margin-bottom: 24px;
    /* background-color: red; */
`;
export const CardTextContainer = styled.View`
    width: 80%;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    /* align-items: flex-start; */
    /* background-color: yellow; */
`;
export const CardTitle = styled.Text`
    ${baseBoldText}
    font-size: ${scale(16)}px;
    color: ${({ theme }) => theme.colors.black};
    letter-spacing: 0.3px;
    margin-bottom: 10px;
`;
export const CardSubTitle = styled.Text`
    ${baseRegularText}
    font-size: ${scale(14)}px;
    color: ${({ theme }) => theme.colors.blue_metal[500]};
    letter-spacing: 0.17px;
`;
