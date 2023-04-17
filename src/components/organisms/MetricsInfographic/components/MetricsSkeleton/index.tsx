import { Skeleton } from '@/components/atoms/Skeleton';
import { useCallback } from 'react';
import { View } from 'react-native';

export function MetricsSkeleton() {
    const Card = useCallback(() => {
        return <Skeleton width={'48%'} height={220} borderRadius={16} />;
    }, []);

    return (
        <View style={{ gap: 12 }}>
            <View
                style={{
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Card />
                <Card />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Card />
                <Card />
            </View>
        </View>
    );
}
