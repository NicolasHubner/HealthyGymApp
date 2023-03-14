import { ActivityIndicator } from 'react-native';
import { ButtonLabel, Container, ContainerButtonGreenLight } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps {
    label: string;
    isDisabled?: boolean;
    onPress?: () => void;
    isLoading?: boolean;
    backgroundColor?: string;
    fullWidth?: boolean;
}

export function Button({
    label,
    isDisabled = false,
    onPress = undefined,
    isLoading = false,
    fullWidth = false,
    backgroundColor,
}: ButtonProps) {
    return (
        <TouchableOpacity onPress={!isDisabled ? onPress : undefined} disabled={isDisabled}>
            <Container
                isDisabled={isDisabled}
                fullWidth={fullWidth}
                backgroundColor={backgroundColor}>
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
