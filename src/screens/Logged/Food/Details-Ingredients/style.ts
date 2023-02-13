import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const ViewTypeDiet = styled.View`
    flex-direction: row;
    align-items: flex-start;
    /* justify-content: flex-start; */
    padding-top: 10px;
    padding-horizontal: 28px;
    width: 100%;
    /* background-color: yellow; */
    background-color: ${({ theme }) => theme.colors.white};
    padding-bottom: 36px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
`;

interface TypeDietProps {
    bgColor: string;
}

export const TypeDietView = styled.View<TypeDietProps>`
    justify-content: center;
    align-items: center;
    padding-vertical: 8px;
    padding-horizontal: 10px;
    border-radius: 10px;
    margin-horizontal: 5px;
    background-color: ${({ bgColor }) => bgColor};
`;
export const TypeDietText = styled.Text`
    ${baseRegularText}
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[600]};
    text-transform: uppercase;
`;
export const ModePrepareView = styled.View`
    flex-direction: row;
    padding-horizontal: 28px;
    padding-vertical: 20px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    margin-vertical: 22px;
`;
export const ModePrepareText = styled.Text`
    ${baseBoldText}
    font-size: 20px;
    color: ${({ theme }) => theme.colors.gray[700]};
`;
export const ContainerIngredientsView = styled.View`
    padding-horizontal: 28px;
    padding-vertical: 32px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 30px;
    /* margin-bottom: 40px; */
    justify-content: flex-start;
    align-items: flex-start;
`;
export const TitleIngredientsText = styled.Text`
    ${baseBoldText}
    font-size: 20px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    margin-bottom: 16px;
`;
export const SubtitleIngredientsText = styled.Text`
    ${baseRegularText}
    width: 70%;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.green[700]};
`;
export const ViewIngredients = styled.View`
    margin-top: 16px;
    width: 100%;
`;

export const IngredientView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 16px;
`;
export const IngredientNumber = styled.Text`
    ${baseBoldText}
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
`;
export const IngredientText = styled.Text`
    ${baseRegularText}
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
    margin-left: 8px;
`;
export const StepsText = styled.Text`
    ${baseRegularText}
    font-size: 16px;
    color: ${({ theme }) => theme.colors.green[700]};
    width: 70%;
`;
export const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
    margin-bottom: 64px;
`;
export const ButtonAdd = styled.TouchableOpacity`
    width: 260px;
    height: 56px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.background};
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.green[700]};
`;
export const ButtonAddText = styled.Text`
    ${baseBoldText}
    font-size: 16px;
    color: ${({ theme }) => theme.colors.green[700]};
`;
