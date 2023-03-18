import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import Picker from '@ouroboros/react-native-picker';

import { api } from '@/services/api';

import { MiniCard } from './MiniCard';
import { RenderPickerContent } from './RenderPickerContent';
import { DividerComponent } from '@/components/atoms/Divider';
import CardWarnings from '@/components/molecules/CardWarnings';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import { weightArray } from '@/helpers/constants/weight';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';

import { RootState } from '@/store';
import { setUserMetrics } from '@/store/user';

import { CardContainerHeightAlimentation, CardView, CartTitle, ViewMeasuresCard } from './style';

export default function Measures() {
    const [weight, setWeight] = useState(0);

    const { metrics, id, token } = useSelector((state: RootState) => state.user);
    const { weight: weightMetric } = metrics!;
    const dispatch = useDispatch();

    const weightMemo = useMemo(() => {
        return weightArray();
    }, []);

    const getWeightFromApi = useCallback(async () => {
        try {
            const headers = generateAuthHeaders(token!);
            const response = await api.get(
                `/weight-histories?filters[user][id][$eq]=${id}&sort[0]=datetime:desc&pagination[limit]=2`,
                { headers }
            );

            const newWeightFromApi = response.data?.data[0]?.attributes?.weight ?? 0;

            setWeight(newWeightFromApi);
            dispatch(setUserMetrics({ weight: newWeightFromApi }));
        } catch (err) {
            console.error('Ocorreu um erro ao buscar as informações de peso', err);
        }
    }, [id, token, dispatch]);

    const parseDataToApi = useCallback(
        (weightParam: number) => {
            const data = {
                data: {
                    datetime: new Date().toISOString(),
                    weight: weightParam,
                    user: id,
                },
            };

            return data;
        },
        [id]
    );

    const sendWeightToApi = useCallback(
        async (value: any) => {
            try {
                const headers = generateAuthHeaders(token!);
                const dataToApi = parseDataToApi(value);
                const response = await api.post('/weight-histories', dataToApi, { headers });
                console.log(JSON.stringify(response.data, null, 2));
                setWeight(response.data?.attributes?.weight ?? value);
            } catch (err) {
                console.error('Ocorreu um erro ao salvar as informações de tamanho', err);
            }
        },
        [parseDataToApi, token]
    );

    useEffect(() => {
        getWeightFromApi();
    }, [getWeightFromApi]);

    useEffect(() => {
        if (weightMetric !== weight) setWeight(weightMetric!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weightMetric]);

    return (
        <ScrollablePageWrapper padding={20} bottomSpacing styles={{ paddingTop: 0 }}>
            <CardWarnings
                marginTop={80}
                textSubTitle="Dica"
                textSubtitleBody="Tente se pesar uma vez por semana sempre nos mesmos horários. Isso facilita o planejamento do Coach"
                textSeeMore="Ver mais"
            />

            <CardView
                style={{ width: Dimensions.get('screen').width - 42 }}
                height={257}
                margintop={36}>
                <CartTitle>Seu peso</CartTitle>
                <DividerComponent />
                <ViewMeasuresCard>
                    <View style={{ marginBottom: 24 }}>
                        <FontAwesome5 name="weight" size={29} color="#90D692" />
                    </View>
                    <Picker
                        component={() => RenderPickerContent({ weight })}
                        onChanged={sendWeightToApi}
                        options={weightMemo}
                        value={weight}
                    />
                </ViewMeasuresCard>
            </CardView>

            <CardContainerHeightAlimentation>
                <MiniCard icon="height" quantity={'1,69'} label="Altura" />
                <MiniCard icon="restaurant" quantity={'23'} label="Refeições" />
            </CardContainerHeightAlimentation>
        </ScrollablePageWrapper>
    );
}
