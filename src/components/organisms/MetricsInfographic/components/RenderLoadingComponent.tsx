import { ActivityIndicator, View } from 'react-native';

export function RenderLoadingComponent() {
    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
}
