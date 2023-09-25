import { getWorkoutByMonth, getWorkoutByWeek } from '@/helpers/functions/metrics/handleMetrics';
import { Workout } from '@/types/metrics/Workout';
import { useCallback, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';

import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { chartConfig, initialEmptyMonthData, initialEmptyWeeklyData } from './chartConfig';

import { lightTheme } from '@/styles/theme';

import { Container, GraphOption, WeekDay, WeekDaysContainer } from './styles';

interface WeeklyGraphProps {
    data: Workout[];
}

export function WeeklyGraph({ data }: WeeklyGraphProps) {
    const [selectedGraphicDataToShow, setSelectedGraphicDataToShow] =
        useState<LineChartData>(initialEmptyWeeklyData);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [chartData, setChartData] = useState<{
        weeklyData: LineChartData;
        monthData: LineChartData;
    }>({
        weeklyData: initialEmptyWeeklyData,
        monthData: initialEmptyMonthData,
    });

    const handleChangeGraphicDataToShow = (index: number) => {
        if (index > 1 && index < 0) return;

        setSelectedGraphicDataToShow(() => {
            if (index === 0) {
                setSelectedIndex(0);
                return chartData.weeklyData;
            }

            if (index === 1) {
                setSelectedIndex(1);
                return chartData.monthData;
            }

            setSelectedIndex(0);
            return chartData.weeklyData;
        });
    };

    const createDataForGraphic = useCallback((dataParam: any) => {
        const { trainsByWeekDay } = getWorkoutByWeek(dataParam);
        const trainsByMonth = getWorkoutByMonth(dataParam);

        return {
            weeklyTrains: trainsByWeekDay,
            monthlyTrains: trainsByMonth,
        };
    }, []);

    const createWeeklyChartData = useCallback((dataForGraphics: any) => {
        if (!dataForGraphics) return undefined;

        const weeklyKeys = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        const localData = weeklyKeys.map(item =>
            dataForGraphics[item] === undefined ? 0 : dataForGraphics[item]
        );

        const localChartData: LineChartData = {
            labels: weeklyKeys,
            datasets: [
                {
                    data: localData,
                    color: () => lightTheme.colors.green[700],
                    strokeWidth: 3, // optional
                    strokeDashArray: [0, 0], // optional
                    withScrollableDot: true,
                    strokeDashOffset: 0,
                },
            ],
        };

        setChartData(current => ({ ...current, weeklyData: localChartData }));
    }, []);

    const createMonthlyChartData = useCallback((dataForGraphics: any) => {
        if (!dataForGraphics) return undefined;

        const monthlyKeys = Object.keys(dataForGraphics).map((_, index) => `${index + 1}ª sem`);

        const localData = monthlyKeys.map((item, index) => {
            switch (index) {
                case 0:
                    return dataForGraphics?.firstWeek;

                case 1:
                    return dataForGraphics?.secondWeek;

                case 2:
                    return dataForGraphics?.thirdWeek;

                case 3:
                    return dataForGraphics?.fourthWeek;

                case 4:
                    return dataForGraphics?.fifthWeek;

                default:
                    return 0;
            }
        });

        const localChartData: LineChartData = {
            labels: monthlyKeys,
            datasets: [
                {
                    data: localData,
                    color: () => lightTheme.colors.green[700],
                    strokeWidth: 3, // optional
                    strokeDashArray: [0, 0], // optional
                    withScrollableDot: true,
                    strokeDashOffset: 0,
                },
            ],
        };

        setChartData(current => ({ ...current, monthData: localChartData }));
    }, []);

    useEffect(() => {
        const { weeklyTrains, monthlyTrains } = createDataForGraphic(data);

        if (weeklyTrains && monthlyTrains) {
            createWeeklyChartData(weeklyTrains);
            createMonthlyChartData(monthlyTrains);
        }
    }, [data, createDataForGraphic, createWeeklyChartData, createMonthlyChartData]);

    useEffect(() => {
        setSelectedGraphicDataToShow(chartData.weeklyData);
    }, [chartData]);

    return (
        <Container>
            <WeekDaysContainer>
                <TouchableOpacity onPress={() => handleChangeGraphicDataToShow(0)}>
                    <GraphOption selected={selectedIndex === 0}>
                        <WeekDay>Semana</WeekDay>
                    </GraphOption>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleChangeGraphicDataToShow(1)}>
                    <GraphOption selected={selectedIndex === 1}>
                        <WeekDay>Mês</WeekDay>
                    </GraphOption>
                </TouchableOpacity>
            </WeekDaysContainer>

            <View style={{ marginTop: 16 }}>
                <LineChart
                    data={selectedGraphicDataToShow}
                    width={Dimensions.get('window').width}
                    height={170}
                    yAxisInterval={1}
                    verticalLabelRotation={0}
                    chartConfig={chartConfig}
                    withHorizontalLabels={false}
                    withHorizontalLines={false}
                    fromZero
                    bezier
                />
            </View>
        </Container>
    );
}
