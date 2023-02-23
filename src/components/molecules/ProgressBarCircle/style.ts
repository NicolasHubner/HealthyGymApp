import { baseRegularText } from './../../../styles/global';
import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';

export const ViewContainer = styled.View`
    flex-direction: column;
    align-items: center;
`;
export const TextCircle = styled.Text`
    ${baseRegularText}
    margin-top: 8px;
    font-size: ${scale(14)}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;
