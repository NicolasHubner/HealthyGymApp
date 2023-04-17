import { useEffect, useState } from 'react';
import { Animated, ViewStyle } from 'react-native';

import { Container } from './styles';

interface SkeletonProps {
    width?: ViewStyle['width'];
    height?: ViewStyle['height'];
    borderRadius?: ViewStyle['borderRadius'];
    minOpacity?: number;
    maxOpacity?: number;
}

export function Skeleton({
    width = '100%',
    height = 'auto',
    borderRadius = 0,
    minOpacity = 0.2,
    maxOpacity = 0.6,
}: SkeletonProps) {
    const [animatedOpacityValue, _] = useState(new Animated.Value(minOpacity));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedOpacityValue, {
                    toValue: maxOpacity,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedOpacityValue, {
                    toValue: minOpacity,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animatedOpacityValue, minOpacity, maxOpacity]);

    return <Container style={{ opacity: animatedOpacityValue, width, height, borderRadius }} />;
}
