import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

import { PageHeader } from './components/PageHeader';
import { WaterIndicatorBarWithRuler } from './components/WaterIndicatorBarWithRuler';
import { WaterGlassesHandler } from './components/WaterGlassesHandler';

import { PageSubtitle, PageTitle } from './styles';
import { api } from '@/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { UserWaterHistory } from '@/types/user/UserWaterHistory';
import { isToday } from 'date-fns';

export function Water() {
    const [waterGlassesToAdd, setWaterGlassesToAdd] = useState(1);
    const [waterQuantityToday, setWaterQuantityToday] = useState(0);
    const increaseSize = useRef(new Animated.Value(0)).current;

    const { id: userId, token } = useSelector((state: RootState) => state.user);

    const handleIncreaseWaterGlasses = () => {
        setWaterGlassesToAdd(current => current + 1);
    };

    const handleDecreaseWaterGlasses = () => {
        setWaterGlassesToAdd(current => (current <= 1 ? 1 : current - 1));
    };

    const handleAddWaterGlasses = useCallback(() => {
        setWaterQuantityToday(current => current + waterGlassesToAdd * 0.2);
        setWaterGlassesToAdd(1);
    }, [waterGlassesToAdd]);

    const getUserWaterHistory = useCallback(async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await api.get(`/water-histories?filters[user][id][$eq]=${userId}`, {
                headers,
            });

            if (response) {
                const { data }: { data: UserWaterHistory[] } = response?.data;

                const waterDrinkedToday = data
                    ?.filter(glass => isToday(new Date(glass.attributes.createdAt)))
                    .reduce((acc, glass) => acc + glass.attributes.amount, 0);

                setWaterQuantityToday(waterDrinkedToday / 1000);
                increaseSize.setValue(waterDrinkedToday / 1000);
            }
        } catch (err) {
            console.error('Ocorreu um erro ao obter o histório de consumo de água do usuário', err);
        }
    }, [userId, token, increaseSize]);

    // AGUARDANDO MUDANÇA NA API PARA IMPLEMENTAR O RESTANTE DA API
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
        </ScrollablePageWrapper>
    );
}
