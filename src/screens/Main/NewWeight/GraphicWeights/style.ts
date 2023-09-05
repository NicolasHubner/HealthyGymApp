import { baseMediumText } from '@/styles/global';
import { verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const TitleGraphic = styled.Text`
    ${baseMediumText};
    font-size: 20px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    margin-vertical: ${verticalScale(12)}px;
`;

export const ContainerArrows = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    align-self: center;
    /* margin-top: 24px; */
`;
