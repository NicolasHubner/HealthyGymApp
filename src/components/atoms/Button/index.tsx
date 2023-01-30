import { ButtonLabel, Container, ContainerButtonGreenLight } from './styles';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

interface ButtonProps {
  label: string;
  isDisabled?: boolean;
  onPress?: () => void;
  isLoading?: boolean;
}

export function Button({
  label,
  isDisabled = false,
  onPress = undefined,
  isLoading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity onPress={!isDisabled ? onPress : undefined} disabled={isDisabled}>
      <Container isDisabled={isDisabled}>
        {isLoading && <ActivityIndicator size="small" color="#fff" />}
        {!isLoading && <ButtonLabel>{label ?? 'Botão'}</ButtonLabel>}
      </Container>
    </TouchableOpacity>
  );
}

export function ButtonNotMyEmail({ label }: ButtonProps) {
  return (
    <TouchableOpacity>
      <ContainerButtonGreenLight>
        <ButtonLabel>{label ?? 'Botão'}</ButtonLabel>
      </ContainerButtonGreenLight>
    </TouchableOpacity>
  );
}
