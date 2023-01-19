import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const RegisterContainer = styled.View`
  align-items: center;
  justify-content: center;

  flex-direction: row;
  flex-wrap: wrap;

  margin: 24px 0 0;
`;

export const RegisterText = styled.Text`
  ${baseRegularText}
  margin-right: 6px;
`;
