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
