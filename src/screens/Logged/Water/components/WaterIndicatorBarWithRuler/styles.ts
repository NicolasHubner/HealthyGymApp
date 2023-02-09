import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { baseBoldText, baseRegularText } from '@/styles/global';

export const WaterMarkContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.green[700]};

  width: 80px;
  height: 80px;

  align-items: center;
  justify-content: center;

  border-radius: 100%;
  z-index: 2;

  margin-bottom: 12px;

  position: absolute;
  bottom: 100%;
  right: -32px;
`;

export const WaterMarkPointer = styled.View`
  background-color: ${({ theme }) => theme.colors.green[700]};

  width: 10px;
  height: 10px;

  position: absolute;
  bottom: -4px;
  transform: rotate(45deg);
`;

export const WaterMarkText = styled.Text`
  ${baseRegularText}
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
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
  width: 0;
  max-width: 100%;
  height: 100%;
  max-height: 100%;

  background-color: #7fe3f0;

  border-radius: 100%;

  transition: all 400ms ease;
  position: relative;
`;

export const RulerWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

export const RulerImage = styled.Image.attrs({
  resizeMode: 'cover',
  resizeMethod: 'scale',
})`
  width: 95%;
  margin-top: 8px;
`;

export const RulerTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  margin-top: 16px;
`;

interface RulerTextProps {
  selected?: boolean;
}

export const RulerText = styled.Text<RulerTextProps>`
  font-weight: ${({ selected }) => (selected ? baseBoldText : baseRegularText)};
  font-size: 12px;
`;
