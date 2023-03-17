import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '@/store';
import { setUserInfo } from '@/store/user';

import { cards, renderCardValue } from './helpers/cards';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { handleGraphics } from './helpers/conditionalGraphics';
import {
    generateApiRequests,
    generateApiResponses,
    getValuesFromMetrics,
} from './helpers/handleMetrics';

import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { WorkoutApiResponse } from '@/types/metrics/Workout';
import { WaterApiResponse } from '@/types/metrics/Water';
import { WeightApiResponse } from '@/types/metrics/Weight';
import { Metrics } from '@/types/metrics/MetricsGeneral';
import { FoodHistoriesApiResponse } from '@/types/metrics/FoodHistories';

import {
    Cards,
    ContainerCards,
    CardTitle,
    CardTitleAtts,
    AttView,
    CardTitleAttsUnit,
    // CardAttTime,
} from './styles';

export function MetricsInfographic() {
    const [metrics, setMetrics] = useState<Metrics | undefined>(undefined);
    const [trainPercentage, setTrainPercentage] = useState(0);
    const [loadingMetrics, setLoadingMetrics] = useState(false);

    const { id, token, metrics: userMetrics } = useSelector((state: RootState) => state.user);
    const navigator = useNavigation() as INavigation;
    const dispatch = useDispatch();

    const getMetrics = useCallback(async () => {
        try {
            setLoadingMetrics(true);
            const headers = generateAuthHeaders(token!);
            const requestsToDo = generateApiRequests(headers, id);
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
    }, [token, id]);

    const setMetricsToState = useCallback(
        (metricsParam: Metrics | undefined) => {
            if (metricsParam) {
                const values = getValuesFromMetrics(metricsParam);

                const userValues = {
                    weight: values.weightValue,
                    caloriesToday: values.caloriesBurnedValue,
                    waterDrinkedToday: values.waterValue,
                    caloriesConsumedToday: values.caloriesConsumedTodayValue,
                };

                dispatch(setUserInfo({ metrics: userValues }));
                const newTrainPercentage = userMetrics?.caloriesGoal
                    ? (values.caloriesBurnedValue / userMetrics.caloriesGoal ?? 1) * 100
                    : 0;
                setTrainPercentage(newTrainPercentage);
            }
        },
        [dispatch, userMetrics?.caloriesGoal]
    );

    const RenderLoadingComponent = useCallback(
        () => (
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        ),
        []
    );

    const RenderCardContent = useCallback(
        ({ card, userMetricsParam, trainPercentageParam }: any) => (
            <>
                <CardTitle>{card.title}</CardTitle>
                {handleGraphics(card.id)}
                <AttView>
                    <CardTitleAtts>
                        {card.api !== 'trainPercentage' ? (
                            <>
                                {userMetricsParam
                                    ? renderCardValue(card.api, userMetricsParam[card.api])
                                    : null}
                            </>
                        ) : (
                            <>{`${trainPercentageParam}`}</>
                        )}
                    </CardTitleAtts>
                    {card.atributes && <CardTitleAttsUnit>{card.atributes}</CardTitleAttsUnit>}
                </AttView>
                {/* <CardAttTime>Atualização 0</CardAttTime> */}
            </>
        ),
        []
    );

    useEffect(() => {
        getMetrics();
    }, [getMetrics]);

    useEffect(() => {
        if (metrics) {
            setMetricsToState(metrics);
        }
    }, [metrics, setMetricsToState]);

    return (
        <ContainerCards>
            {cards.map(card => (
                <Cards
                    key={card.id}
                    color={card.color}
                    onPress={() => {
                        navigator.navigate(card.routes);
                    }}>
                    {loadingMetrics ? (
                        <RenderLoadingComponent />
                    ) : (
                        <RenderCardContent
                            card={card}
                            userMetricsParam={userMetrics}
                            trainPercentageParam={trainPercentage}
                        />
                    )}
                </Cards>
            ))}
        </ContainerCards>
    );
}
