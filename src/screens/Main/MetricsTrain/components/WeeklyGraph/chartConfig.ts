import { lightTheme } from '@/styles/theme';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

export const chartConfig: ChartConfig = {
    backgroundGradientFrom: lightTheme.colors.green[500],
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: lightTheme.colors.green[500],
    backgroundGradientToOpacity: 0.5,

    linejoinType: 'round',
    propsForDots: {
        fill: lightTheme.colors.white,
        strokeWidth: 3,
        strokeLinecap: 'round',
        stroke: lightTheme.colors.green[700],
    },
    strokeWidth: 10, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForBackgroundLines: {
        strokeWidth: 1,
        strokeDasharray: '0', // solid background lines with no dashes
        strokeColor: lightTheme.colors.white,
    },

    // shadow
    fillShadowGradientFrom: lightTheme.colors.blue_metal[500],
    fillShadowGradientFromOpacity: 0.5,
    fillShadowGradientTo: lightTheme.colors.green[500],
    fillShadowGradientToOpacity: 0.5,
    color: () => 'rgba(140, 128, 248, 0.4)',
    labelColor: () => lightTheme.colors.white,
};

export const initialEmptyWeeklyData: LineChartData = {
    labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    datasets: [
        {
            data: [0, 0, 0, 0, 0, 0, 0],
            color: () => lightTheme.colors.green[700],
            strokeWidth: 3, // optional
            strokeDashArray: [0, 0], // optional
            withScrollableDot: true,
            strokeDashOffset: 0,
        },
    ],
};

export const initialEmptyMonthData: LineChartData = {
    labels: ['1ª sem', '2ª sem', '3ª sem', '4ª sem'],
    datasets: [
        {
            data: [0, 0, 0, 0],
            color: () => lightTheme.colors.green[700],
            strokeWidth: 3, // optional
            strokeDashArray: [0, 0], // optional
            withScrollableDot: true,
            strokeDashOffset: 0,
        },
    ],
};
