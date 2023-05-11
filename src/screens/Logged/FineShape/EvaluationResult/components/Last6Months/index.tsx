import { Dimensions, View } from 'react-native';
import { Section, SectionTitle } from '../../styles';
import { TextPressables, ViewBox, ViewBoxSelection } from './style';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { calcularUltimos6Meses } from '../../helpers/calculateLast6Months';
import { chartConfigWeight, chartConfigImc, chartConfigAge } from './helpers/chartConfigs';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';

export const Last6Months: React.FC = () => {
    enum Status {
        weight,
        imc,
        age,
    }

    const [status, setStatus] = useState<Status>(Status.weight);
    const { colors } = useTheme();

    // console.log(calcularUltimos6Meses());

    interface StatusGraphicProps {
        color: string;
        chartConfig: ChartConfig;
    }

    const [statusGraphic, setStatusGraphic] = useState<StatusGraphicProps>({
        color: colors.green[700],
        chartConfig: chartConfigImc,
    });
    const initialEmptyWeeklyData: LineChartData = {
        labels: calcularUltimos6Meses(),
        datasets: [
            {
                data: [60, 58, 59, 67, 63, 61],
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
            <View style={{ marginTop: 16, alignItems: 'center' }}>
                <LineChart
                    data={selectedGraphicDataToShow}
                    width={Dimensions.get('window').width}
                    height={90}
                    yAxisInterval={1}
                    verticalLabelRotation={0}
                    chartConfig={statusGraphic.chartConfig}
                    withHorizontalLines={false}
                    // fromZero
                    bezier
                />
            </View>

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
                                    data: [60, 58, 59, 67, 63, 61],
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
                            datasets: [
                                {
                                    data: [60, 58, 59, 67, 63, 61],
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
                                    data: [60, 58, 59, 67, 63, 61],
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
