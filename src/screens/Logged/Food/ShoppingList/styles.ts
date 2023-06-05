import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';

export const Container = styled.View`
    flex: 1;
`;

export const ContainerGradient = styled(LinearGradient).attrs(({ theme }) => ({
    colors: [theme.colors.black, 'transparent'],
}))`
    z-index: 2;

    width: 100%;
    height: 160px;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`;

export const IngredientsImage = styled.Image`
    width: 100%;
    height: 160px;

    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;

    z-index: 1;
`;

export const CardRecipeContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 24px 20px;
`;

export const CardRecipseInfoWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const CardRecipeText = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: ${14}px;
    margin-right: 8px;
`;

export const CardRecipeArrow = styled(Ionicons).attrs(({ theme }) => ({
    name: 'chevron-forward-outline',
    size: 20,
    color: theme.colors.blue_metal[700],
}))``;

export const SeparatorMessageContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.gray[300]};
    align-items: center;
    justify-content: center;

    padding: 12px;
`;

export const SeparatorMessage = styled.Text`
    ${baseRegularText}
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: ${14}px;
`;

export const CardIngredientsList = styled.View`
    flex: 1;
`;
