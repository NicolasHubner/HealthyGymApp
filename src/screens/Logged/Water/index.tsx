import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { PageHeader } from './components/PageHeader';
import { WaterIndicatorBarWithRuler } from './components/WaterIndicatorBarWithRuler';
import { WaterGlassesHandler } from './components/WaterGlassesHandler';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import { api } from '@/services/api';
import { RootState } from '@/store';

import { PageSubtitle, PageTitle } from './styles';
import { useTheme } from 'styled-components';
import { getTodayWaterAmount } from '@/helpers/functions/metrics/handleMetrics';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { WaterApiResponse } from '@/types/metrics/Water';
import { setUserMetrics } from '@/store/user';

export function Water() {
    const [loadingData, setLoadingData] = useState(true);
    const [waterGlassesToAdd, setWaterGlassesToAdd] = useState(1);
    const [waterQuantityToday, setWaterQuantityToday] = useState(0);
    const increaseSize = useRef(new Animated.Value(0)).current;

    const { id: userId, token, metrics, goals } = useSelector((state: RootState) => state.user);
    const { waterDrinkedToday } = metrics!;
    const { waterToIngest } = goals!;

    const dispatch = useDispatch();
    const { colors } = useTheme();

    const handleIncreaseWaterGlasses = () => {
        setWaterGlassesToAdd(current => current + 1);
    };

    const handleDecreaseWaterGlasses = () => {
        setWaterGlassesToAdd(current => (current <= 1 ? 1 : current - 1));
    };

    const handleAddWaterGlasses = useCallback(
        (waterGlassSize = 200) => {
            dispatch(
                setUserMetrics({
                    waterDrinkedToday:
                        (waterDrinkedToday ?? 0) + waterGlassesToAdd * waterGlassSize,
                })
            );
            setWaterGlassesToAdd(1);
        },
        [dispatch, waterDrinkedToday, waterGlassesToAdd]
    );

    const getUserWaterHistory = useCallback(async () => {
        setLoadingData(true);

        try {
            const headers = generateAuthHeaders(token!);
            const { data } = await api.get(
                `/water-histories?filters[user][id][$eq]=${userId}&sort[0]=datetime:desc&pagination[limit]=100`,
                { headers }
            );

            if (data) {
                const amountOfWater = getTodayWaterAmount(data as WaterApiResponse);
                dispatch(setUserMetrics({ waterDrinkedToday: amountOfWater }));
                increaseSize.setValue(amountOfWater / 1000);
            }
        } catch (err) {
            console.error('Ocorreu um erro ao obter o histório de consumo de água do usuário', err);
        } finally {
            setLoadingData(false);
        }
    }, [userId, token, increaseSize, dispatch]);

    useEffect(() => {
        getUserWaterHistory();
    }, [getUserWaterHistory]);

    useEffect(() => {
        Animated.timing(increaseSize, {
            useNativeDriver: false,
            toValue: waterDrinkedToday ?? 0,
            duration: 750,
            easing: Easing.elastic(1.5),
        }).start();
    }, [waterDrinkedToday, increaseSize]);

    useEffect(() => {
        setWaterQuantityToday(waterDrinkedToday ?? 0);
    }, [waterDrinkedToday]);

    return (
        <ScrollablePageWrapper
            padding={0}
            styles={{ paddingTop: 72, backgroundColor: '#fff' }}
            bottomSpacing>
            <PageTitle>Hidratação</PageTitle>

            {loadingData && (
                <View style={{ marginTop: 40 }}>
                    <ActivityIndicator color={colors.green[500]} size={32} />
                </View>
            )}

            {!loadingData && (
                <>
                    <PageHeader waterQuantity={(waterQuantityToday ?? 0) / 1000} />

                    <PageSubtitle>
                        {waterQuantityToday >= (waterToIngest ?? 0) &&
                            'Você atingiu sua meta. Parabéns!'}
                        {waterQuantityToday < (waterToIngest ?? 0) &&
                            'Quase lá! Mantenha-se hidratado.'}
                    </PageSubtitle>

                    <WaterIndicatorBarWithRuler
                        waterQuantity={(waterQuantityToday ?? 0) / 1000}
                        increaseSize={increaseSize}
                    />

                    <WaterGlassesHandler
                        handleDecreaseWaterGlasses={handleDecreaseWaterGlasses}
                        handleIncreaseWaterGlasses={handleIncreaseWaterGlasses}
                        handleAddWaterGlasses={handleAddWaterGlasses}
                        waterGlassesToAdd={waterGlassesToAdd}
                    />
                </>
            )}
        </ScrollablePageWrapper>
    );
}
