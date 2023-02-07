import { baseRegularText, baseBoldText } from '@/styles/global';
import styled from 'styled-components/native';

export const CardIconView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const CardIconText = styled.Text`
  ${baseBoldText}
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  margin-left: 8px;
`;

export const CardLabel = styled.Text`
  ${baseRegularText}
  font-size: 16px;
  color: ${({ theme }) => theme.colors.green[500]};
  margin-top: 8px;
  text-decoration: underline;
`;
