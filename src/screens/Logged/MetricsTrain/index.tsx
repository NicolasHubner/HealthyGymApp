import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { PageTitles } from './components/PageTitles';
import { BigGraph } from './components/BigGraph';
import { WeeklyGraph } from './components/WeeklyGraph';
import { GraphicsList } from './components/GraphicsList';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';

import { GraphicContainer, InsightsButton, InsightsText } from './styles';

export function MetricsTrain() {
    const [bigGraphProgress, setBigGraphProgress] = useState(0);

    const generateRandomProgress = () => {
        const random = Math.random();

        console.log({ random: Number(random.toFixed(2)) });
        setBigGraphProgress(Number(random.toFixed(2)));
    };

    const throwRandomToast = () => {
        const success = false;

        if (success) {
            throwSuccessToast({
                title: 'Treino adicionado 🤗',
                message: 'Seu treino foi adicionado!',
                showTime: 5000,
            });
        } else {
            throwErrorToast({
                title: 'Ocorreu um erro 😔',
                message: 'Houve um problema ao adicionar o treino. Por favor, tente novamente!',
                showTime: 5000,
            });
        }
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
            <View style={{ alignSelf: 'flex-end', marginRight: 24 }}>
                <TouchableOpacity onPress={() => throwRandomToast()}>
                    <InsightsButton>
                        <InsightsText>Adicionar treino</InsightsText>
                    </InsightsButton>
                </TouchableOpacity>
            </View>

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
