import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { baseBoldText } from '@/styles/global';

interface ContainerProps {
    isDisabled?: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    background-color: ${({ theme }) => theme.colors.green[700]};
    opacity: ${props => (props.isDisabled ? 0.2 : 1)};

    border-radius: 16px;
    height: 56px;
    width: 250px;

    align-items: center;
    justify-content: center;
`;

export const ButtonLabel = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.white};
`;
