import { useMemo } from 'react';
import { Container, Subtitle, Title, TitleHighlight } from './styles';

interface PageTitlesProps {
    trainPercentage: number | string;
}

export function PageTitles({ trainPercentage }: PageTitlesProps) {
    const trainPercentageFixed = useMemo(() => {
        if (typeof trainPercentage !== 'number' || 'string') {
            return 0;
        }

        return trainPercentage;
    }, [trainPercentage]);

    console.log('trainPercentageFixed', trainPercentageFixed);

    return (
        <Container>
            <Subtitle>Treinos Diários</Subtitle>
            <Title>
                Você atingiu <TitleHighlight>{trainPercentageFixed ?? 0}%</TitleHighlight> do
            </Title>
            <Title>seu objetivo</Title>
        </Container>
    );
}
