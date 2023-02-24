import { useEffect, useState } from 'react';

import { PageTitles } from './components/PageTitles';
import { BigGraph } from './components/BigGraph';
import { GraphicsList } from './components/GraphicsList';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import { GraphicContainer, InsightsButton, InsightsText } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WeeklyGraph } from './components/WeeklyGraph';

export function MetricsTrain() {
    const [bigGraphProgress, setBigGraphProgress] = useState(0);

    const generateRandomProgress = () => {
        const random = Math.random();

        console.log({ random: Number(random.toFixed(2)) });
        setBigGraphProgress(Number(random.toFixed(2)));
    };

    useEffect(() => {
        setBigGraphProgress(0.5);
    }, []);

    return (
        <ScrollablePageWrapper
            padding={0}
            styles={{ paddingTop: 32 }}
            edges={['top', 'left', 'right']}
            bottomSpacing={0}>
            <InsightsButton>
                <InsightsText>Insight</InsightsText>
            </InsightsButton>

            <PageTitles />

            <GraphicContainer>
                <TouchableOpacity onPress={generateRandomProgress}>
                    <BigGraph bigGraphProgress={Number(bigGraphProgress.toFixed(2))} />
                </TouchableOpacity>
            </GraphicContainer>

            <GraphicsList />

            <WeeklyGraph />
        </ScrollablePageWrapper>
    );
}
