import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

import { Container, ProgressBar } from './styles';

interface ProgressProps {
    currentStep: number;
    maxSteps: number;
}

export function Progress({ currentStep = 1, maxSteps = 1 }: ProgressProps) {
    const [increaseSize] = useState(new Animated.Value(currentStep));

    useEffect(() => {
        Animated.timing(increaseSize, {
            toValue: currentStep,
            duration: 300,
            useNativeDriver: false,
        }).start();

        return () => {
            Animated.timing(increaseSize, {
                toValue: currentStep,
                duration: 300,
                useNativeDriver: false,
            }).stop();
        };
    }, [currentStep, increaseSize]);

    return (
        <Container>
            <ProgressBar
                style={{
                    width: increaseSize.interpolate({
                        inputRange: [1, maxSteps],
                        outputRange: ['5%', '100%'],
                    }),
                }}
            />
        </Container>
    );
}
