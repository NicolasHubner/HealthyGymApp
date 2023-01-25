import { baseMediumText, baseRegularText } from '@/styles/global';
import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

export const Container = styled.View``;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  height: 100%;

  margin-top: -24px;
  border-radius: 30px 30px 0 0;
  padding: 24px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 14px 20px;
  border-radius: 16px;
`;

export const InputSearchIcon = styled(AntDesign).attrs(({ theme }) => ({
  color: theme.colors.blue_metal[700],
  size: 16,
  name: 'search1',
}))``;

export const Input = styled(TextInput)`
  color: ${({ theme }) => theme.colors.blue_metal[700]};

  padding-left: 12px;
`;

export const Box = styled.View`
  background: ${({ theme }) => theme.colors.white};

  padding: 20px;
  border-radius: 20px;

  margin: 16px 0 0;
`;

export const BoxContent = styled.View``;

export const BoxHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const BoxHeader = styled.View``;

export const BoxTitleContent = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;

  margin: 14px 0 0;
`;

export const BoxTitle = styled.Text`
  ${baseMediumText}
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green[700]};
  letter-spacing: 2px;
`;

export const FlameIcon = styled(Ionicons).attrs(({ theme }) => ({
  name: 'flame',
  size: 20,
  color: theme.colors.green[500],
}))`
  padding: 0 0 3px;
  margin-right: 12px;
`;

export const BoxKcal = styled.Text`
  ${baseMediumText}
  font-size: 24px;
`;

export const BoxKcalText = styled.Text`
  ${baseRegularText}
  font-size: 12px;
  line-height: 20px;

  color: ${({ theme }) => theme.colors.blue_metal[500]};

  margin-left: 4px;
`;

export const BoxButtonPlus = styled.View`
  background-color: ${({ theme }) => theme.colors.green[300]};
  border-radius: 12px;

  height: 36px;
  width: 36px;

  align-items: center;
  justify-content: center;
`;

export const PlusIcon = styled(AntDesign).attrs(({ theme }) => ({
  name: 'plus',
  size: 24,
  color: theme.colors.green[700],
}))``;

export const Divider = styled.View`
  height: 1px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.gray[100]};

  margin: 14px 0 16px;
`;

export const BoxCard = styled.View`
  flex-direction: row;
`;

export const BoxCardImageContainer = styled.View`
  position: relative;
`;

export const BoxCardImage = styled.Image.attrs({
  resizeMode: 'cover',
  resizeMethod: 'resize',
})`
  width: 84px;
  height: 84px;

  border-radius: 16px;
`;

export const BoxCardEmojiContainer = styled.View`
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.white};
  width: 32px;
  height: 32px;

  border-radius: 999px;

  position: absolute;
  right: -8px;
  bottom: -8px;
`;

export const BoxCardEmoji = styled(Ionicons).attrs(({ theme, name }) => ({
  size: 22,
  color: name === 'happy' ? theme.colors.blue[300] : theme.colors.red[100],
}))``;

export const BoxCardEmojiText = styled.Text.attrs({})`
  ${baseMediumText}
  flex-wrap: nowrap;
  white-space: nowrap;

  width: 160px;

  color: ${({ theme }) => theme.colors.red[100]};
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 2px;

  text-transform: uppercase;

  position: absolute;
  right: -176px;
  bottom: 0;
`;

export const BoxCardInfo = styled.View`
  padding-left: 16px;
`;

export const BoxCardTitle = styled.Text.attrs({
  numberOfLines: 2,
})`
  ${baseMediumText}
  color: ${({ theme }) => theme.colors.blue_metal[700]};
  font-size: 16px;
  line-height: 20px;

  width: 100%;
  max-width: 90%;
  margin-top: 6px;
`;

export const BoxCardKcal = styled.Text`
  ${baseRegularText}
  color: ${({ theme }) => theme.colors.blue_metal[300]};
  font-size: 14px;

  margin-top: 4px;
`;

export const BoxCardCarboIndicator = styled.View``;

export const BoxCardFooter = styled.View``;

export const BoxCardFooterText = styled.Text.attrs({
  numberOfLines: 2,
})`
  ${baseRegularText}
  color: ${({ theme }) => theme.colors.blue_metal[500]};
  font-size: 14px;

  line-height: 24px;
`;

export const BoxCardFooterLink = styled.Text`
  ${baseMediumText}
  color: ${({ theme }) => theme.colors.green[700]};
  font-size: 14px;
  margin-top: 8px;
`;
