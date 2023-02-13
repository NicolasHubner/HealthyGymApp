import React from 'react';
import * as ProgressCircle from 'react-native-progress';
import { ViewContainer, TextCircle } from './style';

interface IProgressBarCircle {
    color: string;
    progress: number;
    text: string;
    colorUnfilled: string;
}

export default function ProgressBarCircle({
    color,
    progress,
    text,
    colorUnfilled,
}: IProgressBarCircle) {
    return (
        <ViewContainer>
            <ProgressCircle.Circle
                showsText={true}
                textStyle={{ color: color, fontSize: 20, fontFamily: 'Rubik_400Regular' }}
                thickness={12}
                borderWidth={0}
                animated={false}
                unfilledColor={colorUnfilled}
                color={color}
                strokeCap="round"
                progress={progress}
                size={96}
            />
            <TextCircle>{text}</TextCircle>
        </ViewContainer>
    );
}
