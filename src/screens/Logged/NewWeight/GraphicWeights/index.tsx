import { ActivityIndicator, Dimensions, View } from 'react-native';
import * as S from './style';
import { LineChart } from 'react-native-chart-kit';
import { chartsCfgWeight } from './helpers/chartConfig';
import { useTheme } from 'styled-components';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { InvertAndFill } from '../../FineShape/screens/EvaluationResult/helpers/calculateDataWeightImc';
import { last6DaysAndMonths } from './helpers/InvertAndPopulate';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

interface GraphicsWeightsProps {
    userId: string;
}

export const GraphicsWeights = ({ userId }: GraphicsWeightsProps) => {
    const { colors } = useTheme();

    const { token, id, isCoach } = useSelector((state: RootState) => state.user);

    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const headers = generateAuthHeaders(token!);
    const [loading, setLoading] = useState(false);

    const [months, setMonths] = useState<string[]>([]);
    const [weights, setWeights] = useState<number[]>([]);

    const GetWeight = useCallback(async () => {
        setLoading(true);
        const itemsPerPage = 6;

        const offset = page * itemsPerPage;
        // console.log('offset', offset);

        const { data } = await api.get(
            `/weight-histories?filters[user][id][$eq]=${
                isCoach ? userId : id
            }&sort[0]=datetime:desc&pagination[limit]=${itemsPerPage}&pagination[start]=${offset}`,
            { headers }
        );

        // console.log('data', JSON.stringify(data, null, 2));s

        setTotal(data?.meta?.pagination?.total ?? 0);

        if (!data || data?.data?.length <= 0 || data?.meta?.pagination?.total <= 0) return;

        const newWeightFromApi = data?.data.map((item: any) => ({
            weight: item?.attributes?.weight ?? 0,
            date: item?.attributes?.datetime ?? 0,
        }));

        setLoading(false);
        return newWeightFromApi;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useFocusEffect(
        useCallback(() => {
            GetWeight().then(res => {
                if (!res) return;
                // console.log(res);
                const newMonths = res.map((item: any) => item.date);
                const newWeights = res.map((item: any) => item.weight);
                setWeights(newWeights);
                setMonths(newMonths);
            });
            //Se colocar getWeightFromApi aqui, vai dar loop infinito
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [page])
    );
    // console.log('months', months);
    // console.log('weights', weights);
    // console.log('ronalo3ascassacsa3d');

    const initialEmptyWeeklyData: LineChartData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0],
                color: () => colors.green[500], // optional
                strokeWidth: 3, // optional
                // strokeDashArray: [0, 0], // optional
                withScrollableDot: true,
                strokeDashOffset: 10,
            },
        ],
    };

    // console.log(total);

    const [selectedGraphicDataToShow, setSelectedGraphicDataToShow] =
        useState<LineChartData>(initialEmptyWeeklyData);

    useEffect(() => {
        last6DaysAndMonths(months);
        if (months.length > 0 && weights.length > 0) {
            setSelectedGraphicDataToShow(cur => ({
                ...cur,
                labels: last6DaysAndMonths(months),
                datasets: [
                    {
                        data: InvertAndFill(weights.slice(0, 6)),
                        color: () => colors.green[500], // optional
                        strokeWidth: 3, // optional
                        // strokeDashArray: [0, 0], // optional
                        withScrollableDot: true,
                        strokeDashOffset: 10,
                    },
                ],
            }));
        }
    }, [page, months, weights, colors.green]);

    // function arrowLogics() {

    return (
        <>
            <S.TitleGraphic>{!isCoach ? 'Meu Progresso' : 'Progresso do Aluno'}</S.TitleGraphic>

            <View style={{ marginTop: 16, marginBottom: 16, alignItems: 'center' }}>
                {loading && (
                    <ActivityIndicator
                        size="large"
                        color={colors.green[500]}
                        style={{ height: 170 }}
                    />
                )}
                {!loading && (
                    <LineChart
                        data={selectedGraphicDataToShow}
                        width={Dimensions.get('window').width}
                        height={170}
                        yAxisInterval={1}
                        verticalLabelRotation={0}
                        chartConfig={chartsCfgWeight}
                        // withHorizontalLabels={false}
                        withHorizontalLines={false}
                        bezier
                        fromNumber={weights.reduce((a, b) => Math.max(a, b), 0)}
                        fromZero
                        // formatYLabel={value => `${value}kg`}
                        // horizontalLabelRotation={40}
                        // verticalLabelRotation={30}
                        getDotProps={() => {
                            return {
                                r: '4',
                                strokeWidth: '4',
                                stroke: colors.green[300],
                                fill: 'white',
                            };
                        }}
                    />
                )}
            </View>

            <S.ContainerArrows>
                <Ionicons
                    name="ios-arrow-back-circle-outline"
                    size={24}
                    disabled={total / 6 <= page + 1}
                    onPress={() => {
                        setPage(cur => (cur += 1));
                    }}
                    color={total / 6 <= page + 1 ? colors.gray[300] : colors.green[500]}
                />
                <Ionicons
                    name="ios-arrow-forward-circle-outline"
                    onPress={() => {
                        setPage(cur => (cur -= 1));
                    }}
                    disabled={page === 0}
                    size={24}
                    color={page === 0 ? colors.gray[300] : colors.green[500]}
                />
            </S.ContainerArrows>
        </>
    );
};
