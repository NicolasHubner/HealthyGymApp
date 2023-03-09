import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, View } from 'react-native';
import { useSelector } from 'react-redux';
import { isToday } from 'date-fns';

import { PageHeader } from './components/PageHeader';
import { WaterIndicatorBarWithRuler } from './components/WaterIndicatorBarWithRuler';
import { WaterGlassesHandler } from './components/WaterGlassesHandler';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import { api } from '@/services/api';
import { RootState } from '@/store';
import { UserWaterHistory } from '@/types/user/UserWaterHistory';

import { PageSubtitle, PageTitle } from './styles';
import { useTheme } from 'styled-components';

export function Water() {
    const [loadingData, setLoadingData] = useState(true);
    const [waterGlassesToAdd, setWaterGlassesToAdd] = useState(1);
    const [waterQuantityToday, setWaterQuantityToday] = useState(0);
    const increaseSize = useRef(new Animated.Value(0)).current;

    const { id: userId, token } = useSelector((state: RootState) => state.user);
    const { colors } = useTheme();

    const handleIncreaseWaterGlasses = () => {
        setWaterGlassesToAdd(current => current + 1);
    };

    const handleDecreaseWaterGlasses = () => {
        setWaterGlassesToAdd(current => (current <= 1 ? 1 : current - 1));
    };

    const handleAddWaterGlasses = useCallback(
        (waterGlassSize = 0.2) => {
            setWaterQuantityToday(current => current + waterGlassesToAdd * waterGlassSize);
            setWaterGlassesToAdd(1);
        },
        [waterGlassesToAdd]
    );

    const filterWaterDrinkedToday = useCallback((data: any) => {
        const waterDrinkedToday = data?.filter((glass: any) =>
            isToday(new Date(glass.attributes.createdAt))
        );

        return waterDrinkedToday;
    }, []);

    const getAmountOfWaterDrinked = useCallback((data: any) => {
        const amountOfWater = data?.reduce(
            (acc: any, glass: any) => acc + glass.attributes.amount,
            0
        );

        return amountOfWater;
    }, []);

    const getUserWaterHistory = useCallback(async () => {
        setLoadingData(true);

        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await api.get(
                `/water-histories?filters[user][id][$eq]=${userId}&sort[0]=datetime:desc&pagination[limit]=100`,
                {
                    headers,
                }
            );

            if (response) {
                const { data }: { data: UserWaterHistory[] } = response?.data;

                const waterDrinkedToday = filterWaterDrinkedToday(data);
                const amountOfWater = getAmountOfWaterDrinked(waterDrinkedToday);

                setWaterQuantityToday(amountOfWater / 1000);
                increaseSize.setValue(amountOfWater / 1000);
            }
        } catch (err) {
            console.error('Ocorreu um erro ao obter o histório de consumo de água do usuário', err);
        } finally {
            setLoadingData(false);
        }
    }, [userId, token, increaseSize, filterWaterDrinkedToday, getAmountOfWaterDrinked]);

    useEffect(() => {
        getUserWaterHistory();
    }, [getUserWaterHistory]);

    useEffect(() => {
        Animated.timing(increaseSize, {
            useNativeDriver: false,
            toValue: waterQuantityToday,
            duration: 750,
            easing: Easing.elastic(1.5),
        }).start();
    }, [waterQuantityToday, increaseSize]);

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
                    <PageHeader waterQuantity={waterQuantityToday} />

                    <PageSubtitle>Quase lá! Mantenha-se hidratado.</PageSubtitle>

                    <WaterIndicatorBarWithRuler
                        waterQuantity={waterQuantityToday}
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
