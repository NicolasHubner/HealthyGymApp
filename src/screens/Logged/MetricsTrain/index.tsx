import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { PageTitles } from './components/PageTitles';
import { BigGraph } from './components/BigGraph';
import { WeeklyGraph } from './components/WeeklyGraph';
import { GraphicsList } from './components/GraphicsList';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import { RootState } from '@/store';
import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { api } from '@/services/api';

import { GraphicContainer, InsightsButton, InsightsText } from './styles';
import { isToday } from 'date-fns';

// Calorias padrão por treino: 400
// Tempo padrão por treino: 60
const CALORIES_GOAL = 2000;
const DEFAULT_CALORIES = 400;
const DEFAULT_TIME = 60;
const TIME_GOAL = (CALORIES_GOAL / DEFAULT_CALORIES) * DEFAULT_TIME;

export function MetricsTrain() {
    const [trainCount, setTrainCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const { token, id } = useSelector((state: RootState) => state.user);

    const bigGraphProgress = useMemo(() => {
        const dailyCalories = trainCount * DEFAULT_CALORIES;
        return (dailyCalories / CALORIES_GOAL) * 100;
    }, [trainCount]);

    const getTrains = useCallback(async () => {
        setLoading(true);

        try {
            const headers = generateAuthHeaders(token!);
            const { data } = await api.get(`/workout-histories?filters[user][id][$eq]=${id}`, {
                headers,
            });

            const todayTrains = data?.data?.filter((train: any) => {
                const date = train?.attributes?.datetime;
                return isToday(new Date(date));
            });

            setTrainCount(todayTrains?.length ?? 0);
        } catch (err) {
            console.error('Ocorreu um erro ao buscar os dados do treino do usuário', err);
        } finally {
            setLoading(false);
        }
    }, [id, token]);

    const handleAddTrain = async () => {
        setLoading(true);

        try {
            const data = {
                data: {
                    datetime: new Date().toISOString(),
                    workout: 1,
                    user: id,
                },
            };

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
            console.log(err);
            throwErrorToast({
                title: 'Ocorreu um erro 😔',
                message: 'Houve um problema ao adicionar o treino. Por favor, tente novamente!',
                showTime: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTrains();
    }, [getTrains]);

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

            <PageTitles trainPercentage={bigGraphProgress} />

            <GraphicContainer>
                <BigGraph bigGraphProgress={Number(bigGraphProgress.toFixed(2))} />
            </GraphicContainer>

            <GraphicsList
                caloriesGoal={CALORIES_GOAL}
                calories={trainCount * DEFAULT_CALORIES}
                time={trainCount * DEFAULT_TIME}
                timeGoal={TIME_GOAL}
            />

            <WeeklyGraph />
        </ScrollablePageWrapper>
    );
}
