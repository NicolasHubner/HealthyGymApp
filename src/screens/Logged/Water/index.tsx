import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Container,
  PageSubtitle,
  PageTitle,
  WaterIndicator,
  WaterIndicatorContainer,
  WaterIndicatorFill,
  WaterInfoContainer,
  WaterInfoCount,
  WaterInfoText,
} from './styles';

export function Water() {
  const increaseSize = useRef(new Animated.Value(0)).current;

  const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 80) + 20;

    Animated.timing(increaseSize, {
      useNativeDriver: false,
      toValue: random,
      duration: 500,
    }).start();
  };

  return (
    <PageWrapper>
      <Container>
        <PageTitle>Hidratação</PageTitle>
        <WaterInfoContainer>
          <WaterInfoText>Hoje você bebeu</WaterInfoText>
          <View style={{ flexDirection: 'row' }}>
            <WaterInfoCount>750ml</WaterInfoCount>
            <WaterInfoText>de água💧</WaterInfoText>
          </View>
        </WaterInfoContainer>
        <PageSubtitle>Quase lá! Mantenha-se hidratado.</PageSubtitle>

        <WaterIndicatorContainer>
          <WaterIndicator>
            <WaterIndicatorFill
              style={{
                width: increaseSize.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              }}
            />
          </WaterIndicator>
        </WaterIndicatorContainer>

        <TouchableOpacity onPress={generateRandomNumber}>
          <View>
            <Text>GERAR VALOR ALEATÓRIO</Text>
          </View>
        </TouchableOpacity>

        <View>
          <Text>Seletor de copos</Text>
        </View>
      </Container>
    </PageWrapper>
  );
}
