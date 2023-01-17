import { Container, Text } from './styles';

interface TextAsLink {
    label: string;
    onPress?: () => void | undefined;
    color?: string;
}

export function TextAsLink({ label, onPress, color }: TextAsLink) {
    return (
        <Container onPress={onPress}>
            <Text>{label}</Text>
        </Container>
    );
}