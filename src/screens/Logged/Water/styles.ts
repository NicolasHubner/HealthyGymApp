import styled from 'styled-components/native';
import { baseRegularText } from '@/styles/global';

export const Container = styled.View`
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 100%;
`;

export const PageTitle = styled.Text`
  ${baseRegularText}
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.green[700]};
`;

export const PageSubtitle = styled.Text`
  ${baseRegularText}
  font-size: 14px;
  color: ${({ theme }) => theme.colors.blue_metal[500]};

  margin: 12px 0 100px;
`;
