import TitlePattern from '@/components/atoms/TitlePattern';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { CardTitle } from './style';
// import { FontAwesome5 } from '@expo/vector-icons';
import { Header } from '@/components/organisms/Header';
import { MetricsInfographic } from '@/components/organisms/MetricsInfographic';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function Metrics() {
    const { imageProfile } = useSelector((state: RootState) => state.user);

    return (
        <ScrollablePageWrapper padding={16} bottomSpacing={40}>
            <Header imageProfile={imageProfile || ''} />

            <CardTitle>
                <TitlePattern size={20}>Métricas</TitlePattern>
                {/* <FontAwesome5 name="ellipsis-h" size={24} color="#D6D9E0" /> */}
            </CardTitle>

            <MetricsInfographic />
        </ScrollablePageWrapper>
    );
}
