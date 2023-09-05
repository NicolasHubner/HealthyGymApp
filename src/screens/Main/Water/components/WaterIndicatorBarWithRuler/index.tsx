import { useMemo } from 'react';
import { Animated } from 'react-native';
import { useSelector } from 'react-redux';

import waterRuler from '@/assets/water_ruler.png';

import { RootState } from '@/store';

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
    const { goals } = useSelector((state: RootState) => state.user);

    const goalParsedValue = useMemo(
        () => Number((goals?.waterToIngest ?? 3).toFixed(1)),
        [goals?.waterToIngest]
    );

    return (
        <WaterIndicatorContainer>
            <WaterIndicator>
                <WaterIndicatorFill
                    style={{
                        width: increaseSize.interpolate({
                            inputRange: [0, goalParsedValue],
                            outputRange: ['10%', '100%'],
                        }),
                    }}>
                    <WaterMarkContainer>
                        <WaterMarkPointer />
                        <WaterMarkText>{waterQuantity.toFixed(2)}</WaterMarkText>
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
