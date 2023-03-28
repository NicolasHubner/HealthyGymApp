import { Image, View } from 'react-native';

import graphicDashesImg from '@/assets/Metrics/train-graphic-dashes.png';

import { BigGraphic, GraphContent, GraphIcon, GraphProgressText, GraphSubtitle } from './styles';

interface BigGraphProps {
    bigGraphProgress: number;
}

export function BigGraph({ bigGraphProgress }: BigGraphProps) {
    const renderCircleContent = () => {
        return (
            <GraphContent>
                <View
                    style={{
                        position: 'absolute',
                        top: -38,
                        borderRadius: 900,
                        width: 'auto',
                    }}>
                    <Image source={graphicDashesImg} resizeMethod="scale" resizeMode="contain" />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <GraphIcon />
                    <GraphProgressText>{(bigGraphProgress ?? 0).toFixed(0)}%</GraphProgressText>
                    <GraphSubtitle>Treino</GraphSubtitle>
                </View>
            </GraphContent>
        );
    };

    return <BigGraphic progress={(bigGraphProgress ?? 0) / 100} formatText={renderCircleContent} />;
}
