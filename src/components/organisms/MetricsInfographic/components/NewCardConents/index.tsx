import {
    Container,
    AttView,
    CardTitle,
    CardTitleAtts,
    CardTitleAttsUnit,
    ImageGraphics,
    Graphics,
} from './styles';

import * as ProgressCircle from 'react-native-progress';
import { scale } from 'react-native-size-matters';
import { FontAwesome5 } from '@expo/vector-icons';

interface CardContentProps {
    title: string;
    metricValue: number;
    metricUnit: string;
    type: 'calories' | 'trains' | 'water' | 'weight';
}

export function CardContent({ title, metricValue, metricUnit, type }: CardContentProps) {
    const renderGraphics = () => {
        if (type === 'weight')
            return (
                <Graphics>
                    <ImageGraphics
                        style={{ resizeMode: 'contain', width: scale(100) }}
                        source={require('@/assets/Metrics/weight.png')}
                    />
                </Graphics>
            );

        if (type === 'water')
            return (
                <Graphics>
                    <ImageGraphics source={require('@/assets/Metrics/glassWater.png')} />
                </Graphics>
            );

        if (type === 'calories')
            return (
                <Graphics>
                    <ProgressCircle.Circle
                        showsText={false}
                        color="white"
                        progress={0.1}
                        borderWidth={0}
                        size={80}
                        thickness={20}
                        unfilledColor="#51B655"
                    />
                </Graphics>
            );

        return (
            <Graphics>
                <ProgressCircle.Circle
                    showsText={true}
                    color="#8C80F8"
                    progress={metricValue > 0 ? 100 : 0}
                    borderWidth={0}
                    size={80}
                    thickness={12}
                    strokeCap="round"
                    unfilledColor="rgba(45, 49, 66, 0.2)"
                    formatText={() => {
                        return <FontAwesome5 name="walking" size={32} color="white" />;
                    }}
                />
            </Graphics>
        );
    };

    return (
        <Container>
            <CardTitle>{title ?? 'Métrica'}</CardTitle>
            {renderGraphics()}
            <AttView>
                <CardTitleAtts>{metricValue ?? 0}</CardTitleAtts>
                <CardTitleAttsUnit>{metricUnit ?? ''}</CardTitleAttsUnit>
            </AttView>
        </Container>
    );
}
