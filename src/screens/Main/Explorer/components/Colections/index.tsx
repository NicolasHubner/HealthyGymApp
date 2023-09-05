import TitlePattern from '@/components/atoms/TitlePattern';
import {
    BgCard,
    ColectionCard,
    ColectionsCardsContainer,
    ContainerColection,
    ContainerSubtitle,
    PressableArticles,
    SubtitleCard,
    TextArticles,
    TitleCard,
} from './style';

export default function Colections() {
    return (
        <ContainerColection>
            <ContainerSubtitle>
                <TitlePattern size={20}>Coleções</TitlePattern>
            </ContainerSubtitle>
            <ColectionsCardsContainer>
                <ColectionCard>
                    <BgCard source={require('@/assets/ExplorerCards/emagracer.jpg')} />
                    <TitleCard>SAÚDE</TitleCard>
                    <SubtitleCard>Como ser um corredor melhor</SubtitleCard>
                    <PressableArticles>
                        <TextArticles>8 artigos</TextArticles>
                    </PressableArticles>
                </ColectionCard>
                <ColectionCard>
                    <BgCard source={require('@/assets/ExplorerCards/comida-saudavel.webp')} />
                    <TitleCard>SAÚDE</TitleCard>
                    <SubtitleCard>Saudável Ideia de lanches</SubtitleCard>
                    <PressableArticles>
                        <TextArticles>8 artigos</TextArticles>
                    </PressableArticles>
                </ColectionCard>
                <ColectionCard>
                    <BgCard source={require('@/assets/ExplorerCards/emagracer.jpg')} />
                    <TitleCard>SAÚDE</TitleCard>
                    <SubtitleCard>Como ser um corredor melhor</SubtitleCard>
                    <PressableArticles>
                        <TextArticles>8 artigos</TextArticles>
                    </PressableArticles>
                </ColectionCard>
            </ColectionsCardsContainer>
        </ContainerColection>
    );
}
