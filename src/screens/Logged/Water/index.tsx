import { useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import waterGlassImg from '@/assets/water_glass_image.png';

import { PageWrapper } from '@/components/molecules/ScreenWrapper';

import {
  AddWaterGlassButton,
  ButtonContainer,
  Container,
  ControlWaterGlassesContainer,
  DecreaseIcon,
  IncreaseIcon,
  PageSubtitle,
  PageTitle,
  RulerContainer,
  RulerIndicador,
  RulerText,
  RulerTextContainer,
  RulerWrapper,
  WaterGlassButtonText,
  WaterGlassesRow,
  WaterGlassesTitle,
  WaterGlassImage,
  WaterIcon,
  WaterIndicator,
  WaterIndicatorContainer,
  WaterIndicatorFill,
  WaterInfoContainer,
  WaterInfoCount,
  WaterInfoText,
  WaterMarkContainer,
  WaterMarkPointer,
  WaterMarkText,
} from './styles';
import { Button } from '@/components/atoms/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'styled-components';

const RULER_SIZE = 51;

export function Water() {
  const [waterGlassesToAdd, setWaterGlassesToAdd] = useState(1);

  const increaseSize = useRef(new Animated.Value(50)).current;
  const { colors } = useTheme();

  const handleIncreaseWaterGlasses = () => {
    setWaterGlassesToAdd(current => current + 1);
  };

  const handleDecreaseWaterGlasses = () => {
    setWaterGlassesToAdd(current => (current <= 1 ? 1 : current - 1));
  };

  const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 80) + 20;

    Animated.timing(increaseSize, {
      useNativeDriver: false,
      toValue: random,
      duration: 750,
      easing: Easing.elastic(1),
    }).start();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.white }}
      edges={['top', 'left', 'right']}>
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
              }}>
              <WaterMarkContainer>
                <WaterMarkPointer />
                <WaterMarkText>1,5</WaterMarkText>
              </WaterMarkContainer>
            </WaterIndicatorFill>
          </WaterIndicator>

          <RulerWrapper>
            <RulerContainer>
              {Array.from({ length: 51 }).map((_, index) => (
                <RulerIndicador bigger={index % 5 === 0} />
              ))}
            </RulerContainer>

            <RulerTextContainer>
              <RulerText>Pouco</RulerText>
              <RulerText>Melhor</RulerText>
              <RulerText selected>Quase</RulerText>
              <RulerText>Perfeito</RulerText>
            </RulerTextContainer>
          </RulerWrapper>
        </WaterIndicatorContainer>

        <TouchableOpacity onPress={generateRandomNumber}>
          <View style={{ marginTop: 32 }}>
            <Text>GERAR VALOR ALEATÓRIO</Text>
          </View>
        </TouchableOpacity>

        <ControlWaterGlassesContainer>
          <WaterGlassesRow>
            <TouchableOpacity
              onPress={handleDecreaseWaterGlasses}
              disabled={waterGlassesToAdd === 1}>
              <ButtonContainer isDisabled={waterGlassesToAdd === 1}>
                <DecreaseIcon />
              </ButtonContainer>
            </TouchableOpacity>

            <WaterGlassImage source={waterGlassImg} />

            <TouchableOpacity
              onPress={handleIncreaseWaterGlasses}
              disabled={waterGlassesToAdd >= 20}>
              <ButtonContainer isDisabled={waterGlassesToAdd >= 20}>
                <IncreaseIcon />
              </ButtonContainer>
            </TouchableOpacity>
          </WaterGlassesRow>

          <WaterGlassesTitle>
            {waterGlassesToAdd} {waterGlassesToAdd > 1 ? 'copos' : 'copo'} 200ml
          </WaterGlassesTitle>

          <AddWaterGlassButton>
            <WaterIcon />
            <WaterGlassButtonText>
              Adicionar {waterGlassesToAdd > 1 ? 'copos' : 'copo'}
            </WaterGlassButtonText>
          </AddWaterGlassButton>
        </ControlWaterGlassesContainer>
      </Container>
    </SafeAreaView>
  );
}
