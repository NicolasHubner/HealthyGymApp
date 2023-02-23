import React from 'react';
import { View } from 'react-native';
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
}

export function PageWrapper({ children, marginTop, edges, bottomSpacing }: PageWrapperProps) {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={edges}>
            <Container
                style={{
                    marginTop: marginTop ?? 0,
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
}: PageWrapperProps) {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={edges}>
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
                    ...styles,
                }}
                showsVerticalScrollIndicator={false}>
                {children}
                {!!bottomSpacing && (
                    <View
                        style={{ height: typeof bottomSpacing === 'boolean' ? 56 : bottomSpacing }}
                    />
                )}
            </ScrollableContainer>
        </SafeAreaView>
    );
}
