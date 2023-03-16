import * as ProgressCircle from 'react-native-progress';
import { scale } from 'react-native-size-matters';
import { FontAwesome5 } from '@expo/vector-icons';

import { Graphics, ImageGraphics } from '../styles';

export const handleGraphics = (id: string) => {
    switch (id) {
        case 'calories':
            return (
                <Graphics>
                    <ProgressCircle.Circle
                        showsText={false}
                        color="white"
                        progress={0.5}
                        borderWidth={0}
                        size={80}
                        thickness={20}
                        unfilledColor="#51B655"
                    />
                </Graphics>
            );
        case 'trains':
            return (
                <Graphics>
                    <ProgressCircle.Circle
                        showsText={true}
                        color="#8C80F8"
                        progress={0.42}
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
        case 'water':
            return (
                <Graphics>
                    <ImageGraphics source={require('@/assets/Metrics/glassWater.png')} />
                </Graphics>
            );
        case 'weight':
            return (
                <Graphics>
                    <ImageGraphics
                        style={{ resizeMode: 'contain', width: scale(100) }}
                        source={require('@/assets/Metrics/weight.png')}
                    />
                </Graphics>
            );
    }
};
