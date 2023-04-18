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

interface MetricsInfographicProps {
    userIdParam?: number;
    userInfoParam?: StudentDetails;
}

export function MetricsInfographic({ userIdParam, userInfoParam }: MetricsInfographicProps) {
    const [metrics, setMetrics] = useState<MetricsParamToGetValue | undefined>(undefined);
    const [trainPercentage, setTrainPercentage] = useState(0);
    const [loadingMetrics, setLoadingMetrics] = useState(false);

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

    useEffect(() => {
        getMetrics();
    }, [getMetrics]);

    useEffect(() => {
        if (metrics) {
            setMetricsToState(metrics, userGoals);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metrics, setMetricsToState]);

    return (
        <ContainerCards>
            {loadingMetrics && <MetricsSkeleton />}
            {!loadingMetrics && (
                <>
                    {cards.map(card => (
                        <Cards
                            key={card.id}
                            color={card.color}
                            onPress={() => {
                                if (!userIdParam) {
                                    navigator.navigate(card.routes, card.params);
                                }
                            }}>
                            <RenderCardContentProps
                                card={card}
                                userMetrics={userMetrics!}
                                userGoals={userGoals!}
                                trainPercentage={trainPercentage}
                            />
                        </Cards>
                    ))}
                </>
            )}
        </ContainerCards>
    );
}
