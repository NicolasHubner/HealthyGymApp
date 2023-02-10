import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

export const CardIngredientsList = styled.View`
    flex: 1;
`;

export const CardIngredientContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 24px 20px;
`;

export const CardIngredientInfoWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const CardIngredientQuantity = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: 18px;
    margin-right: 8px;
`;

export const CardIngredientText = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: 14px;
    margin-right: 8px;
`;

export const CardIngredientCheckbox = styled(BouncyCheckbox).attrs(({ theme }) => ({
    size: 20,
    unfillColor: 'transparent',
    fillColor: theme.colors.blue_metal[500],
    iconStyle: {
        borderRadius: 0,
    },
    innerIconStyle: {
        borderRadius: 0,
    },
}))`
    border-radius: 0;
`;
