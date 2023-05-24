import { Dimensions, View } from 'react-native';
import { Section, SectionTitle } from '../../styles';
import { TextPressables, TopText, TopTextMinor, ViewBox, ViewBoxSelection } from './style';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { calcularUltimos6Meses } from '../../helpers/calculateLast6Months';
import { chartConfigWeight, chartConfigImc, chartConfigAge } from './helpers/chartConfigs';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import {
    InvertAndFill,
    InvertArray,
    calculateDataWeighImc,
    calculateLast6,
} from '../../helpers/calculateDataWeightImc';

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
export const Last6Months = ({ weight, body_age, imc, month }: ILastProps) => {
    const [status, setStatus] = useState<Status>(Status.weight);
    const { colors } = useTheme();

    const [datas, setDatas] = useState({
        weigth: [0, 0, 0, 0, 0, 61],
        imc: [0, 0, 0, 0, 0, 61],
        body_age: [0, 0, 0, 0, 0, 61],
    });

    interface StatusGraphicProps {
        color: string;
        chartConfig: ChartConfig;
    }

    const [statusGraphic, setStatusGraphic] = useState<StatusGraphicProps>({
        color: colors.blue[400],
        chartConfig: chartConfigWeight,
    });

    useEffect(() => {
        setDatas(cur => ({
            ...cur,
            weigth: InvertAndFill(weight),
            imc: InvertAndFill(imc),
            body_age: InvertAndFill(body_age),
        }));
    }, [body_age, imc, weight]);

    // console.log('meses', calculateLast6(month));

    const initialEmptyWeeklyData: LineChartData = {
        labels: calculateLast6(month as number[]),
        datasets: [
            {
                data: InvertAndFill(weight),
                color: () => statusGraphic.color, // optional
                strokeWidth: 3, // optional
                strokeDashArray: [0, 0], // optional
                withScrollableDot: true,
                strokeDashOffset: 0,
            },
        ],
    };

    const [selectedGraphicDataToShow, setSelectedGraphicDataToShow] =
        useState<LineChartData>(initialEmptyWeeklyData);

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
                    ? `${InvertAndFill(weight)[5]}`
                    : '' || Status.imc === status
                    ? `${InvertAndFill(imc)[5]}`
                    : '' || Status.age === status
                    ? `${InvertAndFill(body_age)[5]}`
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
                                    data: InvertAndFill(imc),
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
                                    data: InvertAndFill(body_age),
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
};
