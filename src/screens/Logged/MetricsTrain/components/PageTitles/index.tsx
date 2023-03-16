import { Container, Subtitle, Title, TitleHighlight } from './styles';

interface PageTitlesProps {
    trainPercentage: number;
}

export function PageTitles({ trainPercentage }: PageTitlesProps) {
    return (
        <Container>
            <Subtitle>Treinos Diários</Subtitle>
            <Title>
                Você atingiu <TitleHighlight>{trainPercentage}%</TitleHighlight> do
            </Title>
            <Title>seu objetivo</Title>
        </Container>
    );
}
