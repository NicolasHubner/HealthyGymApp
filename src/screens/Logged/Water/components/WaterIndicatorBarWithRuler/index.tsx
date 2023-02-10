import { Animated } from 'react-native';

import waterRuler from '@/assets/water_ruler.png';

import {
    RulerImage,
    RulerText,
    RulerTextContainer,
    RulerWrapper,
    WaterIndicator,
    WaterIndicatorContainer,
    WaterIndicatorFill,
    WaterMarkContainer,
    WaterMarkPointer,
    WaterMarkText,
} from './styles';

interface WaterIndicatorBarWithRulerProps {
    increaseSize: Animated.Value;
    waterQuantity: number;
}

export function WaterIndicatorBarWithRuler({
    increaseSize,
    waterQuantity,
}: WaterIndicatorBarWithRulerProps) {
    return (
        <WaterIndicatorContainer>
            <WaterIndicator>
                <WaterIndicatorFill
                    style={{
                        width: increaseSize.interpolate({
                            inputRange: [0, 2],
                            outputRange: ['10%', '100%'],
                        }),
                    }}>
                    <WaterMarkContainer>
                        <WaterMarkPointer />
                        <WaterMarkText>{waterQuantity.toFixed(1)}</WaterMarkText>
                    </WaterMarkContainer>
                </WaterIndicatorFill>
            </WaterIndicator>

            <RulerWrapper>
                <RulerImage source={waterRuler} />

                <RulerTextContainer>
                    <RulerText>Pouco</RulerText>
                    <RulerText>Melhor</RulerText>
                    <RulerText selected>Quase</RulerText>
                    <RulerText>Perfeito</RulerText>
                </RulerTextContainer>
            </RulerWrapper>
        </WaterIndicatorContainer>
    );
}
