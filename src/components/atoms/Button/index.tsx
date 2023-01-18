import { ButtonLabel, Container } from './styles';
import React from 'react';

interface ButtonProps {
    label: string;
    isDisabled?: boolean;
    onPress?: () => any | undefined;
}
//Olhar tipagem do onPress
//Alteração da propriedade isDisabled para que o botão fique desabilitado[NICOLAS]
export function Button({ label, isDisabled = false, onPress = undefined }: ButtonProps) {
    // console.log('butao', isDisabled);
    return (
        <Container
            // isDisabled={isDisabled}
            style={{
                backgroundColor: isDisabled ? 'rgba(88, 154, 90, 0.2)' : 'rgba(88, 154, 90, 1)',
            }}
            onPress={!isDisabled ? onPress : undefined}>
            <ButtonLabel>{label ?? 'Botão'}</ButtonLabel>
        </Container>
    );
}
