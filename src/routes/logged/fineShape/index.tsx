import { FineShapeQuestion } from '@/screens/Logged/FineShape/screens/Question';

import { StackScreenProps } from '@/helpers/interfaces/Stack';
import { RouteNames } from '@/routes/routes_names';
import { EvaluationHistory } from '@/screens/Logged/FineShape/screens/EvaluationHistory';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SelectUser } from '@/screens/Logged/FineShape/components/SelectUser';
import { EvaluationResult } from '@/screens/Logged/FineShape/screens/EvaluationResult';

interface FineShapeStackScreensProps extends StackScreenProps {}

export function FineShapeStackScreen({ stack: Stack }: FineShapeStackScreensProps) {
    if (!Stack) return <></>;

    return (
        <Stack.Group
            screenOptions={
                {
                    headerShown: false,
                } as NativeStackNavigationOptions
            }>
            <Stack.Screen name={RouteNames.logged.fineshape.initial} component={SelectUser} />
            <Stack.Screen name={RouteNames.logged.fineshape.result} component={EvaluationResult} />
            <Stack.Screen
                name={RouteNames.logged.fineshape.question}
                component={FineShapeQuestion}
            />
            <Stack.Screen
                name={RouteNames.logged.fineshape.history}
                component={EvaluationHistory}
            />
        </Stack.Group>
    );
}
