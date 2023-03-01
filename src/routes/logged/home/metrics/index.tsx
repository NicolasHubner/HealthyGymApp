import { StackScreenProps } from '@/helpers/interfaces/Stack';
import { RouteNames } from '@/routes/routes_names';
import { screenOptionsTransparent } from '@/routes/stackConfigs';
import { Metrics } from '@/screens';
import { MetricsTrain } from '@/screens/Logged/MetricsTrain';

import { useTheme } from 'styled-components';

interface HomeMetricsScreens extends StackScreenProps {}

export function HomeMetricsStackScreens({ stack: Stack }: HomeMetricsScreens) {
    const { colors } = useTheme();

    if (!Stack) return <></>;

    return (
        <>
            <Stack.Screen
                name={RouteNames.logged.metrics.initial}
                component={Metrics}
                options={{
                    ...screenOptionsTransparent,
                    headerTintColor: colors.black,
                }}
            />
            <Stack.Screen
                name={RouteNames.logged.metrics.train}
                component={MetricsTrain}
                options={{
                    ...screenOptionsTransparent,
                    headerTintColor: colors.black,
                }}
            />
        </>
    );
}
