import { baseBoldText } from '@/styles/global';
import { verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ContainerCreatingFood = styled.View`
    /* flex: 1; */
    flex-direction: column;

    width: 100%;
    justify-content: flex-start;

    /* align-items: center; */
    /* background-color: red; */
`;

export const ContainerCheckBoxes = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-self: center;
    align-items: center;
    margin-top: ${verticalScale(16)}px;
    /* background-color: red; */
`;

export const ButtonCreateFood = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.green[700]};
    border-radius: 16px;

    justify-content: center;
    align-items: center;

    align-self: center;
    width: 90%;
    padding: 16px;
    margin-top: ${verticalScale(48)}px;
`;

export const TextButtonCreateFood = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.white};
    font-size: ${16}px;
`;

export const ContainerPhoto = styled.View`
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 80%;
    margin-top: ${verticalScale(32)}px;
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-radius: 16px;
    /* padding: 16px; */
    min-height: ${verticalScale(120)}px;
`;

export const TextPhoto = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: 14px;
    text-align: center;
    text-decoration: underline;
`;

export const ImageFood = styled.Image`
    width: 100%;
    height: ${verticalScale(180)}px;
    border-radius: 16px;
    /* margin-top: ${verticalScale(16)}px; */
`;

export const CloseIcon = styled.TouchableOpacity`
    position: absolute;
    top: -5px;
    right: -5px;
    /* margin: 16px; */
    background-color: ${({ theme }) => theme.colors.green[700]};
    height: 32px;
    align-items: center;
    justify-content: center;
    width: 32px;
    z-index: 1;
    border-radius: 16px;
`;
