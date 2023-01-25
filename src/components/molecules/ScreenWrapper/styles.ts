import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  align-items: center;
`;

export const KeyboardAvoidingContainer = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  align-items: center;
`;

export const ScrollableContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  flex: 1;
  width: 100%;
`;
