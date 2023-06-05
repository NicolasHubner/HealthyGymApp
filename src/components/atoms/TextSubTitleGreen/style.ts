import { baseBoldText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const TextSubTitle = styled.Text`
    ${baseBoldText}
    font-size: ${18}px;
    color: ${({ theme }) => theme.colors.green[700]};
    text-align: center;
    /* letter-spacing: 1px; */
    margin-top: 26px;
    margin-bottom: 18px;
`;
