import TitlePattern from '@/components/atoms/TitlePattern';
import CardWarnings from '@/components/molecules/CardWarnings';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { CardTitle } from './style';
import { FontAwesome5 } from '@expo/vector-icons';
import CardsMetrics from './CardsMetrics';

export default function Metrics() {
    return (
        <ScrollablePageWrapper padding={16}>
            <CardWarnings
                marginTop={36}
                textSubTitle="Nível"
                textSubtitleBody="Com base no seu teste de saúde geral, sua pontuação é 84 e considera boa."
                textSeeMore="Ver mais"
            />
            <CardTitle>
                <TitlePattern size={20}>Métricas</TitlePattern>
                <FontAwesome5 name="ellipsis-h" size={24} color="#D6D9E0" />
            </CardTitle>

            <CardsMetrics />
        </ScrollablePageWrapper>
    );
}
