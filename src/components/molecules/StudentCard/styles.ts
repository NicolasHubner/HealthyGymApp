import { baseBoldText, baseMediumText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
    width: 100%;
    height: auto;

    flex-direction: column;

    background: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    padding-vertical: 8px;
    padding-horizontal: 4px;

    /* align-items: center; */
`;

export const Container = styled.View`
    flex-direction: row;
    /* gap: 4px; */

    /* width: 100%; */
    height: auto;
    /* background-color: green; */
    align-items: center;
    padding-vertical: 2px;
`;

export const Image = styled.Image.attrs({
    resizeMode: 'cover',
    resizeMethod: 'scale',
})`
    width: ${scale(64)}px;
    height: ${scale(64)}px;

    border-radius: 8px;
`;

export const Info = styled.View`
    /* flex-grow: 1; */
    /* width: 65%; */
    gap: 4px;
    margin-left: 8px;
`;

export const Name = styled.Text.attrs({
    numberOfLines: 2,
})`
    flex-wrap: wrap;
    ${baseMediumText}
    letter-spacing: 1px;
    font-size: ${14}px;
    max-width: 180px;
`;

export const ObjectiveLabel = styled.Text`
    ${baseMediumText}
    letter-spacing: 1px;
    font-size: ${12}px;
`;

export const ObjectiveValue = styled.Text`
    ${baseRegularText}
    letter-spacing: 1px;
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;

export const Divider = styled.View`
    height: 100%;
    width: 2px;

    margin-right: 16px;

    background-color: ${({ theme }) => theme.colors.gray[300]};
`;

export const UserLevel = styled.Pressable`
    align-items: center;
    justify-content: center;
    /* width: 15%; */
    /* margin-left: 8px; */
`;

export const LevelTitle = styled.Text`
    ${baseRegularText}
    letter-spacing: 1px;
    font-size: ${12}px;
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
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.white};
`;
