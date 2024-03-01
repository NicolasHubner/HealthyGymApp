import { Container, Text } from './styles';
import React from 'react';

interface TextAsLink {
    label: string;
    onPress?: () => void | undefined;
    color?: string;
}

export function TextAsLink({ label, onPress }: TextAsLink) {
    return (
        <Container onPress={onPress}>
            <Text>{label}</Text>
        </Container>
    );
}
