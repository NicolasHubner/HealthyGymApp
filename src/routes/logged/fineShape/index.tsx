import { FineShapeQuestion } from '@/screens/Logged/FineShape/screens/Question';

import { StackScreenProps } from '@/helpers/interfaces/Stack';
import { RouteNames } from '@/routes/routes_names';
import { EvaluationHistory } from '@/screens/Logged/FineShape/screens/EvaluationHistory';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SelectUser } from '@/screens/Logged/FineShape/screens/SelectUser';
import { EvaluationResult } from '@/screens/Logged/FineShape/screens/EvaluationResult';
import { useTheme } from 'styled-components';
import { PageHeader, PageHeaderTitle } from './styles';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';

interface FineShapeStackScreensProps extends StackScreenProps {}

export function FineShapeStackScreen({ stack: Stack }: FineShapeStackScreensProps) {
    const { colors } = useTheme();

    const renderHeader = ({ title = '', onPress }: { title: string; onPress: () => void }) => {
        return (
            <PageHeader>
                <HeaderGoBackButton canGoBack onPress={onPress} />
                <PageHeaderTitle>{title}</PageHeaderTitle>
            </PageHeader>
        );
    };

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
                    header: ({ navigation }) =>
                        renderHeader({
                            title: 'Avaliação',
                            onPress: () => navigation.navigate(RouteNames.logged.fineshape.history),
                        }),
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
                    headerShown: true,
                    header: ({ navigation }) =>
                        renderHeader({
                            title: 'Histórico de avaliações',
                            onPress: () => navigation.goBack(),
                        }),
                }}
            />
        </Stack.Group>
    );
}
