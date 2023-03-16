import { useNavigation } from '@react-navigation/native';

import { cards } from './helpers/cards';
import { INavigation } from '@/helpers/interfaces/INavigation';

import {
    Cards,
    ContainerCards,
    CardTitle,
    CardTitleAtts,
    AttView,
    CardTitleAttsUnit,
    CardAttTime,
} from './styles';
import { handleGraphics } from './helpers/conditionalGraphics';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { WorkoutApiResponse } from '@/types/metrics/Workout';
import { WaterApiResponse } from '@/types/metrics/Water';
import { WeightApiResponse } from '@/types/metrics/Weight';

interface MetricsValue {
    workout: WorkoutApiResponse;
    water: WaterApiResponse;
    weight: WeightApiResponse;
}

export function MetricsInfographic() {
    const [metricsValue, setMetricsValue] = useState<MetricsValue | undefined>(undefined);
    const navigator = useNavigation() as INavigation;

    const { id, token } = useSelector((state: RootState) => state.user);

    const getMetrics = useCallback(async () => {
        try {
            const headers = generateAuthHeaders(token!);

            const urls = [
                `/workout-histories?filters[user][id][$eq]=${id}&sort[0]=datetime:desc&pagination[limit]=20`,
                `/water-histories?filters[user][id][$eq]=${id}&sort[0]=datetime:desc&pagination[limit]=80`,
                `/weight-histories?filters[user][id][$eq]=${id}`,
            ];

            const requests = urls.map(url => {
                const request = () => api.get(url, { headers }).then(res => res.data);
                return request;
            });

            const [workout, water, weight] = requests;

            await Promise.all([workout(), water(), weight()]).then(values => {
                const [workoutResponse, waterResponse, weightResponse] = values;

                setMetricsValue({
                    workout: workoutResponse as WorkoutApiResponse,
                    water: waterResponse as WaterApiResponse,
                    weight: weightResponse as WeightApiResponse,
                });
            });
        } catch (err) {
            console.error('Erro ao buscar métricas: ', err);
        }
    }, [id, token]);

    // const handleAttributes = useCallback(
    //     (attribute: string) => {
    //         switch (attribute) {
    //             case 'workout':

    //                 break;

    //             case 'water':
    //                 break;

    //             case 'weight':
    //                 break;

    //             default:
    //                 null;
    //         }
    //     },
    //     [metricsValue]
    // );

    useEffect(() => {
        getMetrics();
    }, [getMetrics]);

    useEffect(() => {
        if (metricsValue) {
            console.log(JSON.stringify(metricsValue.workout, null, 2));
        }
    }, [metricsValue]);

    return (
        <ContainerCards>
            {cards.map(card => (
                <Cards
                    key={card.id}
                    color={card.color}
                    onPress={() => {
                        navigator.navigate(card.routes);
                    }}>
                    <CardTitle>{card.title}</CardTitle>
                    {handleGraphics(card.id)}
                    <AttView>
                        <CardTitleAtts>0</CardTitleAtts>
                        {card.atributes && <CardTitleAttsUnit>{card.atributes}</CardTitleAttsUnit>}
                    </AttView>
                    <CardAttTime>Atualização 0</CardAttTime>
                </Cards>
            ))}
        </ContainerCards>
    );
}
