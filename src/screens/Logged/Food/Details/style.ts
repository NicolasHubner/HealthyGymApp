import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

export const ImageTop = styled.Image`
  width: 100%;
  height: 400px;
`;
export const ViewContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-horizontal: 28px;
  padding-top: 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: -100px;
`;
export const ViewTitle = styled.View`
  width: 100%;
  justify-content: flex-start;
`;
export const TextTitle = styled.Text`
  ${baseBoldText}
  font-size: 12px;
  color: ${({ theme }) => theme.colors.green[700]};
  letter-spacing: 2px;
  text-transform: uppercase;
`;
export const NameFood = styled.Text`
  ${baseBoldText}
  font-size: 28px;
  letter-spacing: -0.9px;
  color: ${({ theme }) => theme.colors.blue_metal[700]};
`;
export const ViewKcalAndTime = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 24px;
`;
export const ViewKcal = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const TextKcal = styled.Text`
  ${baseBoldText}
  font-size: 32px;
  color: ${({ theme }) => theme.colors.blue_metal[700]};
`;
export const TextKcalUnit = styled.Text`
  ${baseRegularText};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.blue_metal[700]};
  margin-left: 8px;
`;
export const IconFire = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.colors.green[700]};
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