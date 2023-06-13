import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const ObservationContent = styled.View``;

export const ObservationTitle = styled.Text`
    ${baseBoldText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;

export const ObservationBox = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    padding: 18px 12px;
    border-radius: 8px;
    margin-top: 16px;
    min-height: 140px;
`;

export const ObservationText = styled.Text`
    ${baseRegularText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.gray[700]};
`;

export const FlatlistFooter = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 6px;
`;

export const ObservationDate = styled.Text`
    ${baseRegularText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;

interface CarouselDotProps {
    selected?: boolean;
}

export const CarouselDot = styled.View<CarouselDotProps>`
    width: 12px;
    height: 12px;
    border-radius: 999px;

    background-color: ${({ theme, selected }) =>
        selected ? theme.colors.green[700] : theme.colors.white};

    border: 1px solid
        ${({ theme, selected }) => (selected ? theme.colors.green[700] : theme.colors.green[500])};
`;
