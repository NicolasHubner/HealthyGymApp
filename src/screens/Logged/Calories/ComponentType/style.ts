import { baseMediumText, baseBoldText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: column;
    width: 100%;
    margin-top: ${20}px;
    align-items: center;
`;

export const ViewItens = styled.View`
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

export const TypeContainer = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    margin-top: ${16}px;
`;

interface IProps {
    color: string;
}
export const Square = styled.View<IProps>`
    width: 16px;
    height: 16px;
    background-color: ${({ color }) => color};
    border-radius: 4px;
    margin-right: ${16}px;
`;

export const ViewText = styled.View`
    flex: 1;
    flex-direction: row;
    padding-right: ${scale(56)}px;
`;

export const TitleComponent = styled.Text`
    ${baseMediumText}
    font-size: ${14}px;
    color: ${({ theme }) => theme.colors.black};
`;

export const ValueComponent = styled.Text`
    ${baseMediumText}
    font-size: ${14}px;
    color: ${({ theme }) => theme.colors.black};
    margin-left: auto;
`;

export const PercentengeValue = styled.Text`
    ${baseBoldText}
    font-size: ${14}px;
    color: ${({ theme }) => theme.colors.black};
    margin-left: ${12}px;
`;
