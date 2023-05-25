import { FineShapeQuestion } from '@/screens/Logged/FineShape/screens/Question';

import { StackScreenProps } from '@/helpers/interfaces/Stack';
import { RouteNames } from '@/routes/routes_names';
import { EvaluationHistory } from '@/screens/Logged/FineShape/screens/EvaluationHistory';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SelectUser } from '@/screens/Logged/FineShape/screens/SelectUser';
import { EvaluationResult } from '@/screens/Logged/FineShape/screens/EvaluationResult';
import { useTheme } from 'styled-components';

interface FineShapeStackScreensProps extends StackScreenProps {}

export function FineShapeStackScreen({ stack: Stack }: FineShapeStackScreensProps) {
    const { colors } = useTheme();

    if (!Stack) return <></>;

    return (
        <Stack.Group
            screenOptions={
                {
                    headerShown: true,
                    statusBarHidden: true,
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
                name={RouteNames.logged.fineshape.result}
                component={EvaluationResult}
                options={{
                    headerShown: true,
                    headerTitle: 'Avaliação',
                    headerTitleStyle: {
                        color: colors.white,
                        fontFamily: 'Rubik_400',
                    },
                    headerStyle: {
                        backgroundColor: colors.green[700],
                    },
                    // statusBarHidden: true,
                }}
            />
            <Stack.Screen
                name={RouteNames.logged.fineshape.question}
                component={FineShapeQuestion}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={RouteNames.logged.fineshape.history}
                component={EvaluationHistory}
                options={{
                    headerTitle: 'Histórico de avaliações',
                    headerShown: true,
                    headerTitleStyle: {
                        color: colors.white,
                    },
                    headerStyle: {
                        backgroundColor: colors.green[700],
                    },
                }}
            />
        </Stack.Group>
    );
}
