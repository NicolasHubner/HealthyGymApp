import { baseMediumText } from './../../../styles/global';
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