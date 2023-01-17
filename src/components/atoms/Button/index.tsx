import { ButtonLabel, Container } from './styles';

interface ButtonProps {
    label: string;
    isDisabled?: boolean;
    onPress?: () => void | undefined;
}

export function Button({ label, isDisabled = false, onPress = undefined }: ButtonProps) {
    return (
        <Container isDisabled={isDisabled} onPress={!isDisabled ? onPress : undefined}>
            <ButtonLabel>{label ?? 'Botão'}</ButtonLabel>
        </Container>
    );
}
