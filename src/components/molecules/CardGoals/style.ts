import { baseBoldText, baseRegularText } from '@/styles/global';
import { Image } from 'react-native';
import styled from 'styled-components/native';

export const Card = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 140px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  margin-top: 12px;
  padding-left: 26px;
  elevation: 20;
  shadow-color: ${({ theme }) => theme.colors.brown[500]};
  shadow-radius: 20px;
  shadow-opacity: 0.1;

  overflow: hidden;
`;

export const InfoContainer = styled.View``;

export const CardTitle = styled.Text`
  ${baseBoldText}
  font-size: 18px;
  color: ${({ theme }) => theme.colors.blue_metal[700]};

  margin: 21px 0 0;
`;

export const CardSubtitle = styled.Text`
  ${baseRegularText}
  font-size: 14px;
  color: ${({ theme }) => theme.colors.blue_metal[300]};

  margin: 3px 0 0;
`;

export const ImageContainer = styled.View`
  background-color: red;
  width: 200px;
  height: 200px;

  border-radius: 120px;
  right: -24px;
  top: 8px;
`;

export const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
