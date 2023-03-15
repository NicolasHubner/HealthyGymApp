import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { PageTitles } from './components/PageTitles';
import { BigGraph } from './components/BigGraph';
import { WeeklyGraph } from './components/WeeklyGraph';
import { GraphicsList } from './components/GraphicsList';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import { RootState } from '@/store';
import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { api } from '@/services/api';

import { GraphicContainer, InsightsButton, InsightsText } from './styles';

export function MetricsTrain() {
    const [bigGraphProgress, setBigGraphProgress] = useState(0);
    const { token, id } = useSelector((state: RootState) => state.user);

    const generateRandomProgress = () => {
        const random = Math.random();
        setBigGraphProgress(Number(random.toFixed(2)));
    };

    const handleAddTrain = async () => {
        try {
            const data = {
                datetime: new Date(),
                workout: '', // ADICIONAR O ID DO TREINO CORRETO
                user: id,
            };

            const headers = generateAuthHeaders(token!);
            const getTrains = await api.post('/workout-histories', data, {
                headers,
            });

            // console.log(JSON.stringify(getTrains.data, null, 2));

            throwSuccessToast({
                title: 'Treino adicionado 🤗',
                message: 'Seu treino foi adicionado!',
                showTime: 5000,
            });
        } catch (err) {
            console.log(err);
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
                <TouchableOpacity onPress={() => handleAddTrain()}>
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
