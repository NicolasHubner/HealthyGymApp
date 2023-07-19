import { Dimensions, View } from 'react-native';
import { Section, SectionTitle } from '../../styles';
import { TextPressables, TopText, TopTextMinor, ViewBox, ViewBoxSelection } from './style';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { chartConfigWeight, chartConfigImc, chartConfigAge } from './helpers/chartConfigs';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { InvertAndFill, calculateLast6 } from '../../helpers/calculateDataWeightImc';
import { api } from '@/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { Skeleton } from '@/components/atoms/Skeleton';
// import { getLastSixMonths, getLastSixMonthsNumber } from './helpers/getLastMonths';

interface ILastProps {
    weight: number[];
    imc: number[];
    body_age: number[];
    month?: number[];
}

enum Status {
    weight,
    imc,
    age,
}
export const Last6Months = ({ emailUser }: { emailUser: string }) => {
    const [status, setStatus] = useState<Status>(Status.weight);
    const { colors } = useTheme();
    const { token, isCoach, email } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(true);

    const [datas, setDatas] = useState({
        weigth: [0, 0, 0, 0, 0, 0],
        imc: [0, 0, 0, 0, 0, 0],
        body_age: [0, 0, 0, 0, 0, 0],
        month: [0, 0, 0, 0, 0, 0],
    });

    interface StatusGraphicProps {
        color: string;
        chartConfig: ChartConfig;
    }

    const [statusGraphic, setStatusGraphic] = useState<StatusGraphicProps>({
        color: colors.blue[400],
        chartConfig: chartConfigWeight,
    });

    const [mail, setMail] = useState('');

    useEffect(() => {
        if (!email) return;
        if (!isCoach) {
            setMail(email);
        }
        if (isCoach) {
            setMail(emailUser);
        }
    }, [email, emailUser, isCoach]);

    const getUserWeights = useCallback(async () => {
        const headers = generateAuthHeaders(token!);
        const { data } = await api.get(
            `/fine-shapes?filters[email]=${mail}&sort[0]=createdAt:desc`,
            { headers }
        );

        const weights = data?.data.map(
            (item: { attributes: { weight: number } }) => item?.attributes?.weight
        );
        const imcs = data?.data.map(
            (item: { attributes: { imc: number } }) => item?.attributes?.imc
        );
        const body_ages = data?.data.map(
            (item: { attributes: { body_age: number } }) => item?.attributes?.body_age
        );
        const months = data?.data.map((item: { attributes: { createdAt: string } }) =>
            new Date(item.attributes.createdAt).getMonth()
        );

        setDatas(cur => ({
            ...cur,
            weigth: InvertAndFill(weights),
            imc: InvertAndFill(imcs),
            body_age: InvertAndFill(body_ages),
            month: InvertAndFill(months),
        }));
        setLoading(false);
    }, [mail, token]);

    useEffect(() => {
        getUserWeights();
    }, [getUserWeights]);

    const initialEmptyWeeklyData: LineChartData = {
        labels: calculateLast6(datas.month as number[]),
        datasets: [
            {
                data: datas.weigth as number[],
                color: () => statusGraphic.color, // optional
                strokeWidth: 3, // optional
                strokeDashArray: [0, 0], // optional
                withScrollableDot: true,
                strokeDashOffset: 0,
            },
        ],
    };
    useEffect(() => {
        setSelectedGraphicDataToShow(prevStats => ({
            ...prevStats,
            labels: calculateLast6(datas.month as number[]),
            datasets: [
                {
                    data: datas.weigth,
                    color: () => statusGraphic.color, // optional
                    strokeWidth: 3, // optional
                    strokeDashArray: [0, 0], // optional
                    withScrollableDot: true,
                    strokeDashOffset: 0,
                },
            ],
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datas.weigth, datas.month]);
    // console.log(JSON.stringify(datas, null, 2));
    const [selectedGraphicDataToShow, setSelectedGraphicDataToShow] =
        useState<LineChartData>(initialEmptyWeeklyData);

    if (loading && datas.weigth[datas.weigth.length - 1] === 0) {
        return <Skeleton width="100%" height={200} borderRadius={16} />;
    }
    if (!loading && datas.weigth[datas.weigth.length - 1] !== 0) {
        return (
            <Section>
                <SectionTitle>Últimos 6 meses</SectionTitle>
                {/* <View /> */}
                <View style={{ marginTop: 16, marginBottom: 16, alignItems: 'center' }}>
                    <LineChart
                        data={selectedGraphicDataToShow}
                        width={Dimensions.get('window').width}
                        height={170}
                        yAxisInterval={1}
                        verticalLabelRotation={0}
                        chartConfig={statusGraphic.chartConfig}
                        // withHorizontalLabels={false}
                        withHorizontalLines={false}
                        bezier
                    />
                </View>

                {/* <TopTextMinor
                style={{
                    top: 8,
                    right: 32,
                    position: 'absolute',
                }}>
                Atual
            </TopTextMinor> */}
                <TopText>
                    {Status.weight === status
                        ? `${datas.weigth[datas.weigth.length - 1]}`
                        : '' || Status.imc === status
                        ? `${datas.imc[datas.imc.length - 1]}`
                        : '' || Status.age === status
                        ? `${datas.body_age[datas.body_age.length - 1]}`
                        : ''}
                    <TopTextMinor>
                        {Status.weight === status && ' kg'}
                        {/* {Status.imc === status && ' kg/m²'} */}
                    </TopTextMinor>
                </TopText>

                <ViewBoxSelection>
                    <ViewBox
                        onPress={async () => {
                            setStatus(Status.weight);
                            setStatusGraphic({
                                color: colors.blue[400],
                                chartConfig: chartConfigWeight,
                            });
                            setSelectedGraphicDataToShow(prevStats => ({
                                ...prevStats,
                                datasets: [
                                    {
                                        data: datas.weigth,
                                        color: () => colors.blue[400], // optional
                                        strokeWidth: 3, // optional
                                        strokeDashArray: [0, 0], // optional
                                        withScrollableDot: true,
                                        strokeDashOffset: 0,
                                    },
                                ],
                            }));
                        }}
                        bgColor={status === Status.weight ? colors.blue[400] : ''}>
                        <FontAwesome5 name="weight" size={22} color="#fff" />
                        <TextPressables>Peso</TextPressables>
                    </ViewBox>

                    <ViewBox
                        onPress={() => {
                            setStatus(Status.imc);
                            setStatusGraphic({
                                color: colors.green[700],
                                chartConfig: chartConfigImc,
                            });
                            setSelectedGraphicDataToShow(prevStats => ({
                                ...prevStats,
                                datasets: [
                                    {
                                        data: datas.imc,
                                        color: () => colors.green[700], // optional
                                        strokeWidth: 3, // optional
                                        strokeDashArray: [0, 0], // optional
                                        withScrollableDot: true,
                                        strokeDashOffset: 0,
                                    },
                                ],
                            }));
                        }}
                        bgColor={status === Status.imc ? colors.green[700] : ''}>
                        <FontAwesome name="heartbeat" size={22} color="#fff" />
                        <TextPressables>IMC</TextPressables>
                    </ViewBox>

                    <ViewBox
                        onPress={() => {
                            setStatus(Status.age);
                            setStatusGraphic({
                                color: colors.purple[100],
                                chartConfig: chartConfigAge,
                            });
                            setSelectedGraphicDataToShow(prevStats => ({
                                ...prevStats,
                                datasets: [
                                    {
                                        data: datas.body_age,
                                        color: () => colors.purple[100], // optional
                                        strokeWidth: 3, // optional
                                        strokeDashArray: [0, 0], // optional
                                        withScrollableDot: true,
                                        strokeDashOffset: 0,
                                    },
                                ],
                            }));
                        }}
                        bgColor={status === Status.age ? colors.purple[100] : ''}>
                        <FontAwesome name="birthday-cake" size={22} color="#fff" />
                        <TextPressables>Idade Cor.</TextPressables>
                    </ViewBox>
                </ViewBoxSelection>
            </Section>
        );
    } else {
        <Skeleton width="100%" height={200} borderRadius={16} />;
    }
    return null;
};
