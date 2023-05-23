import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RenderCardContentProps } from './components/RenderCardContent';
import { MetricsSkeleton } from './components/MetricsSkeleton';

import { RootState } from '@/store';
import { setUserMetrics } from '@/store/user';

import { cards } from './helpers/cards';
import {
    generateApiRequests,
    generateApiResponses,
    getValuesFromMetrics,
} from './helpers/handleMetrics';
import { INavigation } from '@/helpers/interfaces/INavigation';

import { generateAuthHeaders } from '@/utils/generateAuthHeaders';

import { WorkoutApiResponse } from '@/types/metrics/Workout';
import { WaterApiResponse } from '@/types/metrics/Water';
import { WeightApiResponse } from '@/types/metrics/Weight';
import { MetricsParamToGetValue, UserGoals, UserMetrics } from '@/types/metrics/MetricsGeneral';
import { FoodHistoriesApiResponse } from '@/types/metrics/FoodHistories';
import { StudentDetails } from '@/types/coach/Students';

import { Cards, ContainerCards } from './styles';
import { api } from '@/services/api';
import { CardContent } from './components/NewCardConents';
import { FullHistoryResponse } from '@/types/full-history';
import { RouteNames } from '@/routes/routes_names';
import { format } from 'date-fns';

interface MetricsInfographicProps {
    userIdParam?: number;
    userInfoParam?: StudentDetails;
}

export function MetricsInfographic({ userIdParam, userInfoParam }: MetricsInfographicProps) {
    const [metrics, setMetrics] = useState<MetricsParamToGetValue | undefined>(undefined);
    const [trainPercentage, setTrainPercentage] = useState(0);
    const [loadingMetrics, setLoadingMetrics] = useState(false);
    const [userMetricsToRender, setUserMetricsToRender] = useState<UserMetrics | undefined>(
        undefined
    );

    const {
        id,
        token,
        weight: userWeight,
        metrics: userMetrics,
        goals: userGoals,
    } = useSelector((state: RootState) => state.user);

    const navigator = useNavigation() as INavigation;
    const dispatch = useDispatch();

    const getMetrics = useCallback(async () => {
        try {
            setLoadingMetrics(true);
            const headers = generateAuthHeaders(token!);
            const requestsToDo = generateApiRequests(headers, userIdParam ?? id);
            const responses = await generateApiResponses(requestsToDo);

            const [workoutResponse, waterResponse, weightResponse, foodHistoriesResponse] =
                responses;

            setMetrics({
                workouts: workoutResponse as WorkoutApiResponse,
                water: waterResponse as WaterApiResponse,
                weight: weightResponse as WeightApiResponse,
                foodHistories: foodHistoriesResponse as FoodHistoriesApiResponse,
            });
        } catch (err) {
            console.error('Erro ao buscar métricas: ', err);
        } finally {
            setLoadingMetrics(false);
        }
    }, [token, id, userIdParam]);

    const setMetricsToState = useCallback(
        (
            metricsParam: MetricsParamToGetValue | undefined,
            userGoalsParam: Partial<UserGoals> | undefined
        ) => {
            if (metricsParam && userGoalsParam) {
                const {
                    caloriesBurnedTodayValue,
                    caloriesConsumedTodayValue,
                    trainPercentageValue,
                    waterIngestedTodayValue,
                    weightValue,
                } = getValuesFromMetrics(metricsParam, userGoalsParam);

                const userValues: UserMetrics = {
                    caloriesBurnedToday: caloriesBurnedTodayValue,
                    caloriesConsumedToday: caloriesConsumedTodayValue,
                    waterDrinkedToday: waterIngestedTodayValue,
                    weight: weightValue > 0 ? weightValue : userInfoParam?.weight ?? userWeight!,
                };

                dispatch(setUserMetrics(userValues));
                setTrainPercentage(trainPercentageValue);
            }
        },
        [dispatch, userWeight, userInfoParam?.weight]
    );

    const getMetricsFromStudent = useCallback(async () => {
        try {
            const date = new Date(Date.now());
            const today = String(format(date, 'yyyy/MM/dd')?.replaceAll('/', '-'));
            const headers = generateAuthHeaders(token!);

            const { data } = await api.get<FullHistoryResponse>(
                `/full-histories/${userIdParam ?? id}/${today}`,
                {
                    headers,
                }
            );

            const newObject: UserMetrics = {
                weight: data['weight-history']?.[0]?.weight ?? userWeight!,
                caloriesConsumedToday:
                    data['food-history']?.reduce((acc, curr) => (acc += curr?.food?.calorie), 0) ??
                    0,
                caloriesBurnedToday: data['workout-history']?.length * 400 ?? 0,
                waterDrinkedToday:
                    data['water-history']?.reduce((acc, curr) => (acc += curr?.amount), 0) ?? 0,
            };

            setUserMetricsToRender(newObject);
        } catch (err) {
            console.error('Erro ao buscar métricas do aluno: ', err);
        }
    }, [token, userIdParam, id, userWeight]);

    // useEffect(() => {
    //     getMetrics();
    // }, [getMetrics]);

    useEffect(() => {
        getMetricsFromStudent();
    }, [getMetricsFromStudent]);

    // useEffect(() => {
    //     if (metrics) {
    //         setMetricsToState(metrics, userGoals);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [metrics, setMetricsToState]);

    return (
        <ContainerCards>
            {loadingMetrics && <MetricsSkeleton />}
            {!loadingMetrics && (
                <>
                    <Cards
                        color="#90D692"
                        onPress={() => {
                            if (!userIdParam) {
                                navigator.navigate(RouteNames.logged.calories, {
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
                                navigator.navigate(RouteNames.logged.measures);
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
                                navigator.navigate(RouteNames.logged.water);
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
                                navigator.navigate(RouteNames.logged.metrics.train);
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
            )}
        </ContainerCards>
    );
}
