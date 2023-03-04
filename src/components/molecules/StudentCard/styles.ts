import { baseBoldText, baseMediumText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    width: 100%;

    gap: 8px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    padding: 12px;
`;

export const Image = styled.Image.attrs({
    resizeMode: 'cover',
    resizeMethod: 'resize',
})`
    width: 72px;
    height: 72px;

    border-radius: 8px;
`;

export const Info = styled.View`
    flex-grow: 1;
`;

export const Name = styled.Text.attrs({
    numberOfLines: 2,
})`
    flex-wrap: wrap;
    ${baseMediumText}
    letter-spacing: 1px;
    font-size: ${scale(14)}px;
    max-width: 180px;
`;

export const ObjectiveLabel = styled.Text`
    ${baseMediumText}
    letter-spacing: 1px;
    font-size: ${scale(12)}px;
`;

export const ObjectiveValue = styled.Text`
    ${baseRegularText}
    letter-spacing: 1px;
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;

export const Divider = styled.View`
    height: 100%;
    width: 1px;

    margin: 0 auto;

    background-color: ${({ theme }) => theme.colors.gray[300]};
`;

export const UserLevel = styled.View`
    align-items: center;
    justify-content: center;
    margin-right: auto;
`;

export const LevelTitle = styled.Text`
    ${baseRegularText}
    letter-spacing: 1px;
    font-size: ${scale(10)}px;
    color: ${({ theme }) => theme.colors.gray[400]};
`;

export const LevelValueContainer = styled.View`
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.colors.green[700]};
    border-radius: 100px;

    padding: 0px 4px;

    min-width: 20px;
    height: 20px;

    margin-top: 8px;
`;

export const LevelValue = styled.Text`
    ${baseBoldText}
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.white};
`;
