import { lightTheme } from '@/styles/theme';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';

export const chartConfigWeight: ChartConfig = {
    // backgroundGradientFrom: lightTheme.colors.blue[400],
    backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: lightTheme.colors.blue[400],
    backgroundGradientToOpacity: 0.0,

    linejoinType: 'round',
    propsForDots: {
        // fill: lightTheme.colors.white,
        strokeWidth: 2,
        strokeLinecap: 'round',
        stroke: lightTheme.colors.blue[400],
    },
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional

    propsForBackgroundLines: {
        strokeWidth: 0.5,
        strokeDasharray: '0', // solid background lines with no dashes
        strokeColor: lightTheme.colors.white,
    },

    // shadow
    fillShadowGradientFrom: lightTheme.colors.blue[300],
    fillShadowGradientFromOpacity: 0.3,
    fillShadowGradientTo: lightTheme.colors.blue[500],
    fillShadowGradientToOpacity: 0.01,
    color: () => 'rgba(140, 128, 248, 0.4)',
    labelColor: () => lightTheme.colors.gray[600],
};

export const chartConfigImc: ChartConfig = {
    // backgroundGradientFrom: lightTheme.colors.blue[400],
    backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: lightTheme.colors.blue[400],
    backgroundGradientToOpacity: 0.0,

    linejoinType: 'round',
    propsForDots: {
        // fill: lightTheme.colors.white,
        strokeWidth: 2,
        strokeLinecap: 'round',
        stroke: lightTheme.colors.green[700],
    },
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional

    propsForBackgroundLines: {
        strokeWidth: 0.5,
        strokeDasharray: '0', // solid background lines with no dashes
        strokeColor: lightTheme.colors.white,
    },

    // shadow
    fillShadowGradientFrom: lightTheme.colors.green[900],
    fillShadowGradientFromOpacity: 0.4,
    fillShadowGradientTo: lightTheme.colors.blue[500],
    fillShadowGradientToOpacity: 0.01,
    color: () => 'rgba(140, 128, 248, 0.4)',
    labelColor: () => lightTheme.colors.gray[600],
};

export const chartConfigAge: ChartConfig = {
    // backgroundGradientFrom: lightTheme.colors.blue[400],
    backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: lightTheme.colors.blue[400],
    backgroundGradientToOpacity: 0.0,

    linejoinType: 'round',
    propsForDots: {
        // fill: lightTheme.colors.white,
        strokeWidth: 2,
        strokeLinecap: 'round',
        stroke: lightTheme.colors.purple[100],
    },
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional

    propsForBackgroundLines: {
        strokeWidth: 0.5,
        strokeDasharray: '0', // solid background lines with no dashes
        strokeColor: lightTheme.colors.white,
    },

    // shadow
    fillShadowGradientFrom: lightTheme.colors.purple[100],
    fillShadowGradientFromOpacity: 0.3,
    fillShadowGradientTo: lightTheme.colors.purple[100],
    fillShadowGradientToOpacity: 0.01,
    color: () => 'rgba(140, 128, 248, 0.4)',
    labelColor: () => lightTheme.colors.gray[600],
};
