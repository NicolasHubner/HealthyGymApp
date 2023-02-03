import { baseBoldText, baseRegularText } from '@/styles/global';
import Checkbox from 'expo-checkbox';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Title = styled.Text`
  ${baseBoldText}
  font-size: 20px;

  margin: 17px 0;
`;

export const RestrictionsList = styled.View`
  /* height: 260px; */
  width: 100%;

  flex-direction: column;
  /* margin-bottom: 20px; */
`;

export const CardContainer = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 10px 27px;
`;

export const CardImage = styled.Image`
  width: 32px;
  height: 32px;
`;

export const CardText = styled.Text`
  ${baseRegularText}
  font-size: 14px;
  margin-left: 10px;
`;

export const CardCheckbox = styled(Checkbox)`
  margin-left: auto;
`;

export const ButtonContainer = styled.View`
  margin-top: 16px;
`;
