import { baseMediumText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Graphics = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;
export const ViewTextGraphic = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
`;

export const TextGraphic = styled.Text`
    ${baseMediumText}
    font-size: ${22}px;
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
`;
export const SubTitleGraphic = styled.Text`
    ${baseRegularText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.blue_metal[500]};
    text-align: center;
    margin-top: 5px;
    width: 50%;
`;
