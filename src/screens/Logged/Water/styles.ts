import { baseBoldText, baseMediumText, baseRegularText } from '@/styles/global';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

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

export const WaterInfoContainer = styled.View`
  margin: 8px 0 0;
`;

export const WaterInfoText = styled.Text`
  ${baseMediumText}
  font-size: 28px;
  align-items: center;
  justify-content: center;
`;

export const WaterInfoCount = styled(WaterInfoText)`
  color: ${({ theme }) => theme.colors.green[500]};
  margin-right: 8px;
`;

export const PageSubtitle = styled.Text`
  ${baseRegularText}
  font-size: 14px;
  color: ${({ theme }) => theme.colors.blue_metal[500]};

  margin: 12px 0 0;
`;

export const WaterIndicatorContainer = styled.View`
  width: 100%;
  padding: 0 32px;
`;

export const WaterIndicator = styled.View`
  width: 100%;
  height: 56px;

  background-color: #5dd3e2;

  border-radius: 100%;
  padding: 4px;

  transition: all 400ms ease;
`;

export const WaterIndicatorFill = styled(Animated.View)`
  width: 100%;
  height: 100%;

  background-color: #7fe3f0;

  border-radius: 100%;

  transition: all 400ms ease;
`;

export const ControlWaterGlassesContainer = styled.View`
  width: 100%;
  align-items: center;

  margin: auto 0 0;
  padding: 25px 0 35px;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
`;

export const WaterGlassesRow = styled.View`
  flex-direction: row;
  justify-content: center;

  width: 100%;
`;

export const WaterGlassImage = styled.Image``;

export const WaterGlassesTitle = styled.Text``;

export const ControlButtonsContainer = styled.View``;

export const ButtonContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.gray[300]};

  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;

  top: 28px;

  border-radius: 12px;
`;

export const DecreaseIcon = styled(Entypo).attrs(({ theme }) => ({
  name: 'minus',
  size: 24,
  color: theme.colors.white,
}))``;

export const IncreaseIcon = styled(Entypo).attrs(({ theme }) => ({
  name: 'plus',
  size: 24,
  color: theme.colors.white,
}))``;

export const AddWaterGlassButton = styled.View`
  align-items: center;
  justify-content: center;

  width: 90%;
  height: 56px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.green[700]};
`;

export const WaterGlassButtonText = styled.Text`
  ${baseBoldText}
  color: ${({ theme }) => theme.colors.white};
`;
