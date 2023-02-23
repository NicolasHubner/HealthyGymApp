import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

interface ICardViewProps {
    width: number;
    height: number;
    margintop: number;
    justifycontent: string;
    alignitems: string;
}

export const CardView = styled.View<ICardViewProps>`
    background-color: #fff;
    border-radius: 30px;
    width: ${({ width }) => (width ? `${width}px` : '100%')};
    height: ${({ height }) => (height ? `${height}px` : '100%')};
    padding: 24px;
    margin: 10px;
    margin-top: ${({ margintop }) => (margintop ? `${margintop}px` : '0px')};
    justify-content: ${({ justifycontent }) => justifycontent};
    align-items: ${({ alignitems }) => alignitems};
    shadow-color: ${({ theme }) => theme.colors.brown[500]};
    shadow-radius: 20px;
    shadow-opacity: 0.1;
    elevation: 7;
`;

export const CardContainerHeightAlimentation = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

export const CartTitle = styled.Text`
    ${baseBoldText}
    font-size: ${scale(18)}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;

interface IViewMeasuresCardProps {
    margintop?: number;
}

export const ViewMeasuresCard = styled.View<IViewMeasuresCardProps>`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: ${({ margintop }) => (margintop ? `${margintop}px` : '32px')};
`;
export const WeightText = styled.Text`
    ${baseBoldText}
    font-size: ${scale(48)}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    margin-left: 16px;
`;
export const WeightTextSmall = styled.Text`
    ${baseBoldText}
    font-size: ${scale(24)}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    margin-left: 8px;
`;
export const ViewInsertMeasures = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 8px;
`;
export const InsertMeasuresText = styled.Text`
    ${baseRegularText}
    font-size: ${scale(16)}px;
    color: ${({ theme }) => theme.colors.green[600]};
    /* text-decoration: underline; */
`;
