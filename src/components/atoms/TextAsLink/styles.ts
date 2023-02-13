import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { baseBoldText } from '@/styles/global';

export const Container = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: auto;
`;

export const Text = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.green[700]};
`;
