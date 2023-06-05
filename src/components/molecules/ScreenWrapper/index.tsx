import React, { useEffect, useState } from 'react';
import { ScrollView, View, Animated } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { Container, ScrollableContainer } from './styles';

interface PageWrapperProps {
    children: React.ReactNode;
    marginTop?: number;
    padding?: number;
    setHeaderShown?: React.Dispatch<React.SetStateAction<boolean>> | null;
    edges?: Edge[];
    styles?: ViewStyle;
    bottomSpacing?: boolean | number;
    setRef?: React.Dispatch<React.SetStateAction<ScrollView | null>>;
    enableFade?: boolean;
}

export function PageWrapper({
    children,
    marginTop,
    edges,
    bottomSpacing,
    styles,
    enableFade = false,
}: PageWrapperProps) {
    const [fadeAnim, _] = useState(new Animated.Value(enableFade ? 0 : 1));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={edges}>
            <Container
                style={{
                    marginTop: marginTop ?? 0,
                    opacity: enableFade ? 1 : fadeAnim,
                    ...styles,
                }}>
                {children}
                {!!bottomSpacing && (
                    <View
                        style={{ height: typeof bottomSpacing === 'boolean' ? 56 : bottomSpacing }}
                    />
                )}
            </Container>
        </SafeAreaView>
    );
}

export function ScrollablePageWrapper({
    children,
    padding = 16,
    setHeaderShown = null,
    edges,
    styles,
    bottomSpacing,
    setRef,
    enableFade = false,
}: PageWrapperProps) {
    const [fadeAnim, _] = useState(new Animated.Value(enableFade ? 0 : 1));
    const scrollViewRef = React.useRef<ScrollView>(null);

    React.useEffect(() => {
        setRef?.(scrollViewRef.current);
    }, [setRef]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, height: '100%', width: '100%' }} edges={edges}>
            <ScrollableContainer
                scrollEventThrottle={128}
                onScroll={({ nativeEvent }) => {
                    if (setHeaderShown === null) {
                        return;
                    }
                    if (nativeEvent.contentOffset.y > 200) {
                        setHeaderShown(false);
                    } else {
                        setHeaderShown(true);
                    }
                }}
                style={{
                    padding,
                    opacity: enableFade ? 1 : fadeAnim,
                    ...styles,
                }}
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}>
                {children}
                {!!bottomSpacing && (
                    <View
                        style={{
                            height: typeof bottomSpacing === 'boolean' ? 56 : bottomSpacing,
                        }}
                    />
                )}
            </ScrollableContainer>
        </SafeAreaView>
    );
}
