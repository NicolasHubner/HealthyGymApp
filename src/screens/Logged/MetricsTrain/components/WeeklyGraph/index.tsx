import { useState } from 'react';
import { Dimensions, View } from 'react-native';

import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { chartConfig, dailyData, weeklyData, monthData } from './chartConfig';

import { Container, GraphOption, WeekDay, WeekDaysContainer } from './styles';

export function WeeklyGraph() {
    const [selectedGraphicDataToShow, setSelectedGraphicDataToShow] =
        useState<LineChartData>(weeklyData);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleChangeGraphicDataToShow = (index: number) => {
        if (index > 2 && index < 0) return;

        setSelectedGraphicDataToShow(() => {
            if (index === 1) {
                setSelectedIndex(1);
                return weeklyData;
            }

            if (index === 2) {
                setSelectedIndex(2);
                return monthData;
            }
            setSelectedIndex(0);
            return dailyData;
        });
    };

    return (
        <Container>
            <WeekDaysContainer>
                <TouchableOpacity onPress={() => handleChangeGraphicDataToShow(0)}>
                    <GraphOption selected={selectedIndex === 0}>
                        <WeekDay>Dia</WeekDay>
                    </GraphOption>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleChangeGraphicDataToShow(1)}>
                    <GraphOption selected={selectedIndex === 1}>
                        <WeekDay>Semana</WeekDay>
                    </GraphOption>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleChangeGraphicDataToShow(2)}>
                    <GraphOption selected={selectedIndex === 2}>
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
