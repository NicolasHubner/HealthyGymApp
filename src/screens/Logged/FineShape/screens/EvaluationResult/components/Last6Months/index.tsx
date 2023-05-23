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
import { current } from '@reduxjs/toolkit';
import { calculateDataWeighImc } from '../../helpers/calculateDataWeightImc';

interface ILastProps {
    isOneData: boolean;
    weight: number | number[];
    imc: number | number[];
    body_age?: number | number[];
    height?: number;
}

enum Status {
    weight,
    imc,
    age,
}
export const Last6Months = ({ isOneData, weight, body_age, imc, height }: ILastProps) => {
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
        color: colors.green[700],
        chartConfig: chartConfigImc,
    });

    // console.log('weir', weight, imc, body_age, height);

    useEffect(() => {
        if (isOneData) {
            setDatas({
                weigth: [0, 0, 0, 0, 0, weight as number],
                imc: [0, 0, 0, 0, 0, imc as number],
                body_age: [0, 0, 0, 0, 0, body_age as number],
            });
        }
    }, [body_age, imc, isOneData, weight]);

    useEffect(() => {
        if (!isOneData) {
            setDatas(cur => ({
                ...cur,
                weigth: weight as number[],
                imc: calculateDataWeighImc({
                    weight: weight as number[],
                    height: height as number,
                }),
            }));
        }
    }, [body_age, height, imc, isOneData, weight]);

    const initialEmptyWeeklyData: LineChartData = {
        labels: calcularUltimos6Meses(),
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
    };

    // console.log('ronlado');

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
                    ? `${datas.weigth[5]}`
                    : '' || Status.imc === status
                    ? `${datas.imc[5]}`
                    : '' || Status.age === status
                    ? `${datas.body_age[5]}`
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
                        setSelectedGraphicDataToShow(prevState => ({
                            ...prevState,
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
                        setSelectedGraphicDataToShow(prevState => ({
                            ...prevState,
                            labels: calcularUltimos6Meses(),
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
                        setSelectedGraphicDataToShow(prevState => ({
                            ...prevState,
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
};
