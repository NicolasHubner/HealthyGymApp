import { ButtonLabel, Container } from './styles';
import React from 'react';

interface ButtonProps {
    label: string;
    isDisabled?: boolean;
    onPress?: () => any | undefined;
}
//Olhar tipagem do onPress
export function Button({ label, isDisabled = false, onPress = undefined }: ButtonProps) {
    return (
        <Container isDisabled={isDisabled} onPress={!isDisabled ? onPress : undefined}>
            <ButtonLabel>{label ?? 'Botão'}</ButtonLabel>
        </Container>
    );
}
