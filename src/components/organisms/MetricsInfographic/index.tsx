import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { MetricsSkeleton } from './components/MetricsSkeleton';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { api } from '@/services/api';
import { FullHistoryResponse } from '@/types/full-history';
import { UserMetrics } from '@/types/metrics/MetricsGeneral';
import { MetricsCards } from '../MetricsCards';
import { ContainerCards } from './styles';
import { formatDateToApi } from '@/helpers/functions/formatDateToApi';
import { useFocusEffect } from '@react-navigation/native';

interface MetricsInfographicProps {
    userIdParam?: number;
    // Format: 2023-01-01
    dateForMetrics?: string;
    weight?: number;
    height?: number;
}

export function MetricsInfographic({
    userIdParam,
    dateForMetrics,
    weight,
    height,
}: MetricsInfographicProps) {
    const [userMetricsToRender, setUserMetricsToRender] = useState<UserMetrics | undefined>(
        undefined
    );
    const [isLoading, setIsLoading] = useState(true);

    const { id, token } = useSelector((state: RootState) => state.user);

    const getMetricsFromStudent = useCallback(async () => {
        setIsLoading(true);

        try {
            const date = new Date(Date.now());
            const today = formatDateToApi(date);
            const headers = generateAuthHeaders(token!);

            const { data } = await api.get<FullHistoryResponse>(
                `/full-histories/${userIdParam ? userIdParam : id}/${dateForMetrics ?? today}`,
                {
                    headers,
                }
            );
            // console.log('oaranetrso', userIdParam, id);
            // const weightHistories = await api.get(
            //     `/weight-histories?filters[user][id][$eq]=${
            //         userIdParam ? userIdParam : id
            //     }&sort[0]=datetime:desc&pagination[limit]=1`,
            //     { headers }
            // );
            // console.log('weigascaschtHissstories', JSON.stringify(weightHistories.data, null, 2));

            const newObject: UserMetrics = {
                weight: data.user.weight ?? 0,
                caloriesConsumedToday:
                    data['food-history']?.reduce((acc, curr) => (acc += curr?.food?.calorie), 0) ??
                    0,
                caloriesBurnedToday: data['workout-history']?.length * 100 ?? 0,
                waterDrinkedToday:
                    data['water-history']?.reduce((acc, curr) => (acc += curr?.amount), 0) ?? 0,
            };

            setUserMetricsToRender(newObject);
        } catch (err) {
            console.error('Erro ao buscar métricas do aluno: ', err);
        } finally {
            setIsLoading(false);
        }
    }, [token, userIdParam, id, dateForMetrics]);

    useFocusEffect(
        useCallback(() => {
            getMetricsFromStudent();
        }, [getMetricsFromStudent])
    );

    return (
        <ContainerCards>
            {isLoading && <MetricsSkeleton />}
            {!isLoading && (
                <MetricsCards
                    userIdParam={userIdParam ?? undefined}
                    userMetricsToRender={userMetricsToRender}
                    weight={weight}
                    height={height}
                />
            )}
        </ContainerCards>
    );
}
