import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components';

import { PageHeader } from './components/PageHeader';
import { WaterIndicatorBarWithRuler } from './components/WaterIndicatorBarWithRuler';
import { WaterGlassesHandler } from './components/WaterGlassesHandler';

import { Container, PageSubtitle, PageTitle } from './styles';
import { api } from '@/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function Water() {
  const [waterGlassesToAdd, setWaterGlassesToAdd] = useState(1);
  const [waterQuantityToday, setWaterQuantityToday] = useState(0);
  const increaseSize = useRef(new Animated.Value(0)).current;

  const { colors } = useTheme();

  const { id: userId } = useSelector((state: RootState) => state.user);

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
      const response = await api.get(`/water-histories/${userId}`);

      if (response) {
        const {
          attributes: { createdAt },
        } = response?.data;

        console.log({ createdAt });
      }
    } catch (err) {
      console.error('Ocorreu um erro ao obter o histório de consumo de água do usuário', err);
    }
  }, [userId]);

  // AGUARDANDO MUDANÇA NA API PARA IMPLEMENTAR O RESTANTE DA API
  console.log({ getUserWaterHistory });

  useEffect(() => {
    Animated.timing(increaseSize, {
      useNativeDriver: false,
      toValue: waterQuantityToday,
      duration: 750,
      easing: Easing.elastic(1.5),
    }).start();
  }, [waterQuantityToday, increaseSize]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.white }}
      edges={['top', 'left', 'right']}>
      <Container>
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
      </Container>
    </SafeAreaView>
  );
}
