import { baseBoldText, baseRegularText } from './../../../styles/global';
import styled from 'styled-components/native';

export const HomeTitleContainer = styled.View`
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  margin-top: 32px;
  margin-horizontal: 8px;
`;
export const DateText = styled.Text`
  ${baseBoldText}
  font-size: 12px;
  color: ${({ theme }) => theme.colors.green[700]};
  letter-spacing: 2px;
`;
export const WelcomeText = styled.Text`
  ${baseBoldText}
  font-size: 32px;
  color: ${({ theme }) => theme.colors.black};
`;
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
export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.04);
  margin-top: 16px;
`;
export const TitleNavigationContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  margin-top: 16px;
`;

export const TitleNavigationApp = styled.Text`
  ${baseBoldText}
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  line-height: 30px;
  text-align: left;
`;

export const CardsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
`;
