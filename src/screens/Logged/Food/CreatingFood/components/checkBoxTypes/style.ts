import { baseRegularText } from '@/styles/global';
import { verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const CheckBoxTouchable = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    /* margin-right: 8px; */
    width: 33%;
    height: ${verticalScale(32)}px;
`;

export const TextCheckBox = styled.Text`
    ${baseRegularText}
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray[500]};
`;