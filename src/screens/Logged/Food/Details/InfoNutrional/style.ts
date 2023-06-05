import { baseBoldText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ViewDetailsNutrition = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
export const ViewPartNutrition = styled.View`
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
`;

export const ViewTitlePartNutrition = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 40px;
`;

export const PartNutritionText = styled.Text`
    ${baseBoldText}
    font-size: ${16}px;
    margin-left: 16px;
    flex-grow: 1;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;

export const PartNutritionValue = styled.Text`
    ${baseBoldText}
    font-size: ${16}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    letter-spacing: 0.2px;
`;
