import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

interface ICardViewProps {
    width?: number;
    height?: number;
    margintop?: number;
}

export const CardView = styled.View<ICardViewProps>`
    background-color: #fff;
    border-radius: 30px;
    width: 100%;
    height: ${({ height }) => (height ? `${height}px` : '100%')};
    margin-top: ${({ margintop }) => (margintop ? `${margintop}px` : '0px')};
    justify-content: center;
    align-items: center;
    shadow-color: ${({ theme }) => theme.colors.gray[700]};
    shadow-radius: 20px;
    elevation: 3;
`;

export const CardContainerHeightAlimentation = styled.View`
    flex-direction: row;
    width: 99%;
    align-items: center;
    justify-content: space-between;
    margin-top: 22px;
`;

export const CartTitle = styled.Text`
    ${baseBoldText}
    font-size: ${18}px;
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
    font-size: ${48}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    margin-left: 16px;
`;
export const WeightTextSmall = styled.Text`
    ${baseBoldText}
    font-size: ${22}px;
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
    font-size: ${16}px;
    color: ${({ theme }) => theme.colors.green[600]};
    margin-top: 8px;
    text-decoration: underline;
`;
