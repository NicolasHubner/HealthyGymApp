import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

export const ViewContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-horizontal: 28px;
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 64px;
`;

export const ContainerViewIngredients = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  /* margin-bottom: 24px; */
`;
export const ButtonShare = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.green[300]};
  margin-right: 16px;
`;
export const ShareIcon = styled(Entypo)`
  color: ${({ theme }) => theme.colors.green[700]};
`;

export const ButtonViewIngredients = styled.TouchableOpacity`
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 16px 0;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.green[700]};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
`;
export const TextIngredients = styled.Text`
  ${baseBoldText}
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

export const InfoNutritionContainer = styled.View`
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  margin-top: 16px;
`;

export const InfoNutritionTitle = styled.Text`
  ${baseBoldText}
  font-size: 20px;
  color: ${({ theme }) => theme.colors.blue_metal[700]};
  margin-bottom: 16px;
`;
export const ViewCircle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 24px;
`;
export const ViewDetailsNutrition = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const ViewPartNutrition = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

export const ViewTitlePartNutrition = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
`;

export const PartNutritionText = styled.Text`
  ${baseBoldText}
  font-size: 16px;
  margin-left: 16px;
  flex-grow: 1;
  justify-self: flex-start;
  color: ${({ theme }) => theme.colors.blue_metal[700]};
`;

export const PartNutritionValue = styled.Text`
  ${baseBoldText}
  font-size: 16px;
  color: ${({ theme }) => theme.colors.blue_metal[700]};
  letter-spacing: 0.2px;
  justify-self: flex-end;
`;

interface SquareColorProps {
  color: string;
}

export const SquareColor = styled.View<SquareColorProps>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`;
export const ViewSubNutrition = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`;
export const ViewSubNutritionTitle = styled.View`
  flex-direction: row;
  align-items: center;
  /* background-color: yellow; */
  width: 95%;
  height: 40px;
`;
export const SubNutritionText = styled.Text`
  ${baseRegularText}
  font-size: 16px;
  margin-left: 16px;
  flex-grow: 1;
  justify-self: flex-start;
  color: ${({ theme }) => theme.colors.blue_metal[700]};
`;
export const SubNutritionValue = styled.Text`
  ${baseRegularText}
  font-size: 16px;
  color: ${({ theme }) => theme.colors.blue_metal[700]};
  letter-spacing: 0.2px;
  justify-self: flex-end;
`;
