import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { api } from '@/services/api';

import { PageTitles } from './components/PageTitles';
import { BigGraph } from './components/BigGraph';
import { WeeklyGraph } from './components/WeeklyGraph';
import { GraphicsList } from './components/GraphicsList';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import { RootState } from '@/store';
import { setUserMetrics } from '@/store/user';

import { createDataForRegisterTrain } from './helpers/handleTrains';
import { DEFAULT_CALORIES_PER_TRAIN } from '@/helpers/constants/goals';
import { getTodayWorkouts } from '@/helpers/functions/metrics/handleMetrics';
import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';

import { GraphicContainer, InsightsButton, InsightsText } from './styles';

// Calorias padrão por treino: 400
// Tempo padrão por treino: 60
const DEFAULT_TIME = 60;
const TIME_GOAL = DEFAULT_TIME * 10;

export function MetricsTrain() {
    const [trainCount, setTrainCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const userInfo = useSelector((state: RootState) => state.user);
    const { token, id, goals, metrics } = userInfo;

    const dispatch = useDispatch();

    const bigGraphProgress = useMemo(() => {
        const dailyCalories = trainCount * DEFAULT_CALORIES_PER_TRAIN;

        return (dailyCalories / (goals?.caloriesToBurn ?? 1)) * 100;
    }, [trainCount, goals?.caloriesToBurn]);

    const getTrains = useCallback(async () => {
        setLoading(true);
        try {
            const headers = generateAuthHeaders(token!);
            const { data } = await api.get(`/workout-histories?filters[user][id][$eq]=${id}`, {
                headers,
            });
            const todayWorkouts = getTodayWorkouts(data);
            setTrainCount(todayWorkouts?.length ?? 0);
        } catch (err) {
            console.error('Ocorreu um erro ao buscar os dados do treino do usuário', err);
        } finally {
            setLoading(false);
        }
    }, [id, token]);

    const handleAddTrain = useCallback(async () => {
        setLoading(true);
        try {
            const data = createDataForRegisterTrain(1, id!);
            const headers = generateAuthHeaders(token!);
            await api.post('/workout-histories', data, {
                headers,
            });
            setTrainCount(current => current + 1);
            throwSuccessToast({
                title: 'Treino adicionado 🤗',
                message: 'Seu treino foi adicionado!',
                showTime: 5000,
            });
        } catch (err) {
            console.error('Ocorreu um erro ao adicionar o treino.', err);
            throwErrorToast({
                title: 'Ocorreu um erro 😔',
                message: 'Houve um problema ao adicionar o treino. Por favor, tente novamente!',
                showTime: 5000,
            });
        } finally {
            setLoading(false);
        }
    }, [id, token]);

    useEffect(() => {
        getTrains();
    }, [getTrains]);

    useEffect(() => {
        if (loading) return;
        const caloriesBurnedToday = trainCount * DEFAULT_CALORIES_PER_TRAIN;

        if (metrics?.caloriesBurnedToday === caloriesBurnedToday) return;

        dispatch(
            setUserMetrics({
                caloriesBurnedToday,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trainCount, loading]);

    return (
        <ScrollablePageWrapper
            padding={0}
            styles={{ paddingTop: 32 }}
            edges={['top', 'left', 'right']}
            bottomSpacing={0}>
            <View style={{ alignSelf: 'flex-end', marginRight: 24 }}>
                <TouchableOpacity
                    disabled={loading}
                    onPress={() => (loading ? null : handleAddTrain())}>
                    <InsightsButton>
                        {loading && <ActivityIndicator color="#fff" />}
                        {!loading && <InsightsText>Adicionar treino</InsightsText>}
                    </InsightsButton>
                </TouchableOpacity>
            </View>

            <PageTitles trainPercentage={bigGraphProgress.toFixed(0)} />

            <GraphicContainer>
                <BigGraph bigGraphProgress={Number(bigGraphProgress.toFixed(0))} />
            </GraphicContainer>

            <GraphicsList
                caloriesGoal={goals?.caloriesToBurn ?? 0}
                calories={trainCount * DEFAULT_CALORIES_PER_TRAIN}
                time={trainCount * DEFAULT_TIME}
                timeGoal={TIME_GOAL}
            />

            <WeeklyGraph />
        </ScrollablePageWrapper>
    );
}
