import React from 'react';
import * as ProgressCircle from 'react-native-progress';
import { ViewContainer, TextCircle } from './style';

interface IProgressBarCircle {
    color: string;
    progress: number;
    text: string;
}

export default function ProgressBarCircle({ color, progress, text }: IProgressBarCircle) {
    return (
        <ViewContainer>
            <ProgressCircle.Circle
                showsText={true}
                textStyle={{ color: color, fontSize: 20, fontFamily: 'Rubik_400Regular' }}
                thickness={9}
                borderWidth={1}
                animated={false}
                color={color}
                progress={progress}
                size={96}
            />
            <TextCircle>{text}</TextCircle>
        </ViewContainer>
    );
}
