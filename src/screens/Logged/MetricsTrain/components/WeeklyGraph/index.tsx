import { Dimensions, View } from 'react-native';

import { LineChart } from 'react-native-chart-kit';
import { chartConfig, data } from './chartConfig';

import { Container, GraphOption, WeekDay, WeekDaysContainer } from './styles';

export function WeeklyGraph() {
    return (
        <Container>
            <WeekDaysContainer>
                <GraphOption>
                    <WeekDay>Dia</WeekDay>
                </GraphOption>
                <GraphOption selected>
                    <WeekDay>Semana</WeekDay>
                </GraphOption>
                <GraphOption>
                    <WeekDay>Mês</WeekDay>
                </GraphOption>
            </WeekDaysContainer>

            <View style={{ marginTop: 16 }}>
                <LineChart
                    data={data}
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
