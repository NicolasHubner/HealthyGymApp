import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const ContainerStyle = styled.View`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.green[300]};
  width: 100%;
  /* margin-left: 20px; */
  margin-top: 24px;
  border-radius: 20px;
  padding: 19px 33px 20px 19px;
`;
export const TextSubTitle = styled.Text`
  ${baseBoldText}
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black};
  letter-spacing: 0.2px;
`;
export const TextSubtitleBody = styled.Text`
  ${baseRegularText}
  font-size: 14px;
  color: ${({ theme }) => theme.colors.blue_metal[500]};
  line-height: 24px;
  margin-top: 2px;
`;
export const TextSeeMore = styled.Text`
  ${baseBoldText}
  font-size: 14px;
  color: ${({ theme }) => theme.colors.green[700]};
  letter-spacing: 0.2px;
  margin-top: 8px;
`;
