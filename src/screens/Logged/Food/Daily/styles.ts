import { baseMediumText, baseRegularText } from '@/styles/global';
import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

export const Container = styled.View``;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  height: 100%;

  margin-top: -24px;
  border-radius: 30px 30px 0 0;
  padding: 24px;
`;

export const Input = styled(TextInput)``;

export const Box = styled.View`
  background: ${({ theme }) => theme.colors.white};

  padding: 20px;
  border-radius: 20px;
`;

export const BoxContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const BoxHeader = styled.View``;

export const BoxTitleContent = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;

  margin: 14px 0 0;
`;

export const BoxTitle = styled.Text`
  ${baseMediumText}
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green[700]};
  letter-spacing: 2px;
`;

export const FlameIcon = styled(Ionicons).attrs(({ theme }) => ({
  name: 'flame',
  size: 20,
  color: theme.colors.green[500],
}))`
  padding: 0 0 3px;
  margin-right: 12px;
`;

export const BoxKcal = styled.Text`
  ${baseMediumText}
  font-size: 24px;
`;

export const BoxKcalText = styled.Text`
  ${baseRegularText}
  font-size: 12px;
  line-height: 20px;

  color: ${({ theme }) => theme.colors.blue_metal[500]};

  margin-left: 4px;
`;

export const BoxButtonPlus = styled.View`
  background-color: ${({ theme }) => theme.colors.green[300]};
  border-radius: 12px;

  height: 36px;
  width: 36px;

  align-items: center;
  justify-content: center;
`;

export const PlusIcon = styled(AntDesign).attrs(({ theme }) => ({
  name: 'plus',
  size: 24,
  color: theme.colors.green[700],
}))``;

export const BoxCard = styled.View``;

export const BoxCardInfo = styled.View``;

export const BoxCardTitle = styled.Text``;

export const BoxCardKcal = styled.Text``;

export const BoxCardCarboIndicator = styled.View``;

export const BoxCardFooter = styled.View``;

export const BoxCardFooterText = styled.Text``;

export const BoxCardFooterLink = styled.Text``;
