import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { UserMetrics } from '@/types/metrics/MetricsGeneral';
import { useNavigation } from '@react-navigation/native';
import { CardContent } from '../MetricsInfographic/components/NewCardConents';
import { Cards } from './styles';

interface MetricsCardsProps {
    userIdParam?: number;
    userMetricsToRender?: UserMetrics;
}

export function MetricsCards({ userIdParam, userMetricsToRender }: MetricsCardsProps) {
    const { navigate } = useNavigation<INavigation>();

    return (
        <>
            <Cards
                color="#90D692"
                onPress={() => {
                    if (!userIdParam) {
                        navigate(RouteNames.logged.calories, {
                            from: 'metrics',
                        });
                    }
                }}>
                <CardContent
                    title="Calorias"
                    metricValue={userMetricsToRender?.caloriesConsumedToday ?? 0}
                    metricUnit="kcal"
                    type="calories"
                />
            </Cards>
            <Cards
                color="#589A5A"
                onPress={() => {
                    if (!userIdParam) {
                        navigate(RouteNames.logged.measures);
                    }
                }}>
                <CardContent
                    title="Peso"
                    metricValue={userMetricsToRender?.weight ?? 0}
                    metricUnit="kg"
                    type="weight"
                />
            </Cards>
            <Cards
                color="#1F87FE"
                onPress={() => {
                    if (!userIdParam) {
                        navigate(RouteNames.logged.water);
                    }
                }}>
                <CardContent
                    title="Água"
                    metricValue={userMetricsToRender?.waterDrinkedToday ?? 0}
                    metricUnit="ml"
                    type="water"
                />
            </Cards>
            <Cards
                color="#4C5980"
                onPress={() => {
                    if (!userIdParam) {
                        navigate(RouteNames.logged.metrics.train);
                    }
                }}>
                <CardContent
                    title="Treino"
                    metricValue={userMetricsToRender?.caloriesBurnedToday ?? 0}
                    metricUnit="%"
                    type="trains"
                />
            </Cards>
        </>
    );
}
