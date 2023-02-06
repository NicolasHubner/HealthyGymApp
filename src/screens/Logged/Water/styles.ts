import { baseMediumText, baseRegularText } from '@/styles/global';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

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
