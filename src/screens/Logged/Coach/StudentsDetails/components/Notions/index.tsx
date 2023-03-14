import { Button } from '@/components/atoms/Button';
import { useState } from 'react';
import { View } from 'react-native';
import { CaracterCounter, Container, TextArea, Title } from './styles';

export function Notions() {
    const [caractersCount, setCaractersCount] = useState(0);
    const caractersLimit = 400;

    return (
        <Container>
            <Title>Anotações</Title>

            <TextArea
                multiline
                maxLength={caractersLimit}
                onChangeText={e => setCaractersCount(e.length)}
                textAlign="left"
            />

            <CaracterCounter>
                {caractersCount}/{caractersLimit}
            </CaracterCounter>

            <View style={{ marginTop: 48 }}>
                <Button fullWidth label="Salvar" />
            </View>
        </Container>
    );
}
