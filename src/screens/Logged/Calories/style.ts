import { baseMediumText } from './../../../styles/global';
import styled from 'styled-components/native';
import { verticalScale } from 'react-native-size-matters';

export const FoodListContainer = styled.View`
    width: 100%;
    margin-top: 12px;
`;

export const TopTitle = styled.Text`
    ${baseMediumText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.green[500]};
    letter-spacing: 2px;
    text-align: center;
    text-transform: uppercase;
    margin-top: ${verticalScale(50)}px;
`;

export const TopSubtitle = styled.Text`
    ${baseMediumText}
    font-size: ${18}px;
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
    margin-top: ${12}px;
    width: 70%;
`;

export const TopSubtitleBold = styled(TopSubtitle)`
    color: ${({ theme }) => theme.colors.green[700]};
`;
