import {
    ButtonContainer,
    ButtonText,
    Container,
    Description,
    Image,
    InfoContent,
    Title,
} from './styles';

export function SuggestionCard() {
    return (
        <Container>
            <Image source={{ uri: 'https://fakeimg.pl/300x300/' }} />

            <InfoContent>
                <Title>BCAA</Title>
                <Description>Whey 900g, isolado preço R$ 350,00</Description>

                <ButtonContainer>
                    <ButtonText>Oferecer</ButtonText>
                </ButtonContainer>
            </InfoContent>
        </Container>
    );
}
