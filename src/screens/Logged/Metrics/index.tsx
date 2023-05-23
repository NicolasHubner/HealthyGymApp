import TitlePattern from '@/components/atoms/TitlePattern';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { CardTitle } from './style';
import { FontAwesome5 } from '@expo/vector-icons';
import { Header } from '@/components/organisms/Header';
import { MetricsInfographic } from '@/components/organisms/MetricsInfographic';

export default function Metrics() {
    return (
        <ScrollablePageWrapper padding={16} bottomSpacing={40}>
            <Header />

            <CardTitle>
                <TitlePattern size={20}>Métricas</TitlePattern>
                <FontAwesome5 name="ellipsis-h" size={24} color="#D6D9E0" />
            </CardTitle>

            <MetricsInfographic />
        </ScrollablePageWrapper>
    );
}
