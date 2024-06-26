import { FineShapeQuestion } from '@/screens/Main/FineShape/screens/Question';

import { StackScreenProps } from '@/helpers/interfaces/Stack';
import { RouteNames } from '@/routes/routes_names';
import { EvaluationHistory } from '@/screens/Main/FineShape/screens/EvaluationHistory';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SelectUser } from '@/screens/Main/FineShape/screens/SelectUser';
import { EvaluationResult } from '@/screens/Main/FineShape/screens/EvaluationResult';
import { useTheme } from 'styled-components';

interface FineShapeStackScreensProps extends StackScreenProps {}

export function FineShapeStackScreen({ stack: Stack }: FineShapeStackScreensProps) {
    const { colors } = useTheme();

    if (!Stack) return <></>;
    return (
        <Stack.Group
            screenOptions={
                {
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: colors.green[700],
                    },
                } as NativeStackNavigationOptions
            }>
            <Stack.Screen
                name={RouteNames.logged.fineshape.initial}
                component={SelectUser}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={RouteNames.logged.fineshape.history}
                component={EvaluationHistory}
                options={{
                    headerShown: false,
                    statusBarTranslucent: true,
                }}
            />
            <Stack.Screen
                name={RouteNames.logged.fineshape.result}
                component={EvaluationResult}
                options={{
                    headerShown: false,
                    statusBarTranslucent: true,
                }}
            />
            <Stack.Screen
                name={RouteNames.logged.fineshape.question}
                component={FineShapeQuestion}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Group>
    );
}
