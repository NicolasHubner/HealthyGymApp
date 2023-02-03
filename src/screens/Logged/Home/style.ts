import { baseBoldText } from '@/styles/global';
import styled from 'styled-components/native';

export const ContinaerTitle = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const HomeTitleContainer = styled.View`
  flex-direction: column;
  width: 80%;
  justify-content: flex-start;
  margin-top: 32px;
  margin-left: 8px;
  /* background-color: yellow; */
`;
export const ProfileContainer = styled.TouchableOpacity`
  /* width: 48px; */
  /* height: 48px; */
  /* margin-top: 16px; */
  /* justify-content: center; */
  /* align-items: center; */
  /* background-color: ${({ theme }) => theme.colors.green[700]}; */
`;

export const ProfileLogo = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  margin-top: 16px;
  margin-right: 28px;
`;
export const CircleProfileLogo = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green[700]};
  position: absolute;
  bottom: 24px;
  left: -2px;
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
