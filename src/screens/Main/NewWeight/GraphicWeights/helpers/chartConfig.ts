import { lightTheme } from '@/styles/theme';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';

export const chartsCfgWeight: ChartConfig = {
    // backgroundGradientFrom: lightTheme.colors.blue[400],
    backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: lightTheme.colors.blue[400],
    backgroundGradientToOpacity: 0.0,

    linejoinType: 'round',
    // propsForDots: {
    //     fill: lightTheme.colors.green[500],
    //     strokeWidth: 4,
    //     strokeLinecap: 'round',
    //     stroke: lightTheme.colors.green[300],
    //     strokeLinejoin: 'round',
    // },
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional

    propsForBackgroundLines: {
        strokeWidth: 0.5,
        strokeDasharray: '0', // solid background lines with no dashes
        strokeColor: lightTheme.colors.white,
    },

    // shadow
    fillShadowGradientFrom: lightTheme.colors.green[300],
    fillShadowGradientFromOpacity: 0.3,
    fillShadowGradientTo: lightTheme.colors.green[500],
    fillShadowGradientToOpacity: 0.01,
    color: () => lightTheme.colors.green[500],
    labelColor: () => lightTheme.colors.gray[600],
};
