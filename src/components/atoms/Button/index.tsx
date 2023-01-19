import { ButtonLabel, Container } from './styles';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps {
  label: string;
  isDisabled?: boolean;
  onPress?: () => void;
}

export function Button({ label, isDisabled = false, onPress = undefined }: ButtonProps) {
  return (
    <TouchableOpacity onPress={!isDisabled ? onPress : undefined} disabled={isDisabled}>
      <Container isDisabled={isDisabled}>
        <ButtonLabel>{label ?? 'Botão'}</ButtonLabel>
      </Container>
    </TouchableOpacity>
  );
}
