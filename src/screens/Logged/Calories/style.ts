import { baseBoldText, baseMediumText, baseRegularText } from './../../../styles/global';
import styled from 'styled-components/native';
import { scale, verticalScale } from 'react-native-size-matters';

export const TopTitle = styled.Text`
    ${baseMediumText}
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.green[500]};
    letter-spacing: 2px;
    text-align: center;
    text-transform: uppercase;
    margin-top: ${verticalScale(50)}px;
`;

export const TopSubtitle = styled.Text`
    ${baseMediumText}
    font-size: ${scale(20)}px;
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
    margin-top: ${verticalScale(8)}px;
    width: 70%;
`;

export const TopSubtitleBold = styled(TopSubtitle)`
    color: ${({ theme }) => theme.colors.green[700]};
`;

export const FoodListContainer = styled.View`
    width: 100%;
    margin-top: 12px;
`;

export const FoodListCard = styled.View`
    width: 100%;
    padding: 8px;
    border: 0px solid ${({ theme }) => theme.colors.gray[100]};
    border-top-width: 1px;
`;

export const FoodListCardTitle = styled.Text`
    ${baseBoldText}
    font-size: ${scale(14)}px;
    text-transform: capitalize;
`;

export const FoodListCardPropertyWrapper = styled.View`
    align-items: center;
    justify-content: center;
`;

export const FoodListCardPropKey = styled.Text`
    ${baseRegularText}
    font-size: ${scale(12)}px;
`;
export const FoodListCardProperty = styled.Text`
    ${baseBoldText}
    font-size: ${scale(12)}px;
`;

export const FoodListCardHourWrapper = styled.View`
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-top: 4px;
`;

export const FoodListCardHour = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.green[700]};
    font-size: ${scale(12)}px;
`;

export const VerticalDivider = styled.View`
    width: 1px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.gray[300]};
`;
