import { baseBoldText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const SubTitleComparation = styled.Text`
    ${baseBoldText}
    font-size: ${scale(32)}px;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${scale(16)}px;
`;
