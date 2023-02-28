import { verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const ContainerTop = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: ${height * 1}px;
    background-color: ${({ theme }) => theme.colors.green[900]};
    z-index: 1;
`;
