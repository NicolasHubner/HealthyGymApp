import { Container, Subtitle, Title, TitleHighlight } from './styles';

export function PageTitles() {
    return (
        <Container>
            <Subtitle>Treinos Diários</Subtitle>
            <Title>
                Você atingiu <TitleHighlight>40%</TitleHighlight> do
            </Title>
            <Title>seu objetivo</Title>
        </Container>
    );
}
