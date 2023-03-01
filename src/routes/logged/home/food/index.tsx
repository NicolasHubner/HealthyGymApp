import { useTheme } from 'styled-components/native';

import { FoodsDetails, FoodsDetailsIngredients } from '@/screens';
import { ShoppingList } from '@/screens/Logged/Food/ShoppingList';
import { Daily } from '@/screens/Logged/Food/Daily';

import { screenOptionsTransparent } from '@/routes/stackConfigs';
import { RouteNames } from '@/routes/routes_names';
import { StackScreenProps } from '@/helpers/interfaces/Stack';

interface HomeFoodStackScreensProps extends StackScreenProps {}

export function HomeFoodStackScreens({ stack: Stack }: HomeFoodStackScreensProps) {
    const { colors } = useTheme();

    if (!Stack) return <></>;

    return (
        <>
            <Stack.Screen
                name={RouteNames.logged.food.daily}
                component={Daily}
                options={{
                    headerTitle: 'Diário',
                    headerBackTitleVisible: false,
                    headerStyle: { backgroundColor: colors.green[500] },
                    headerTitleStyle: { color: colors.white },
                    headerTintColor: colors.white,
                }}
            />
            <Stack.Screen
                options={screenOptionsTransparent}
                name={RouteNames.logged.food.details.initial}
                component={FoodsDetails}
            />
            <Stack.Screen
                options={screenOptionsTransparent}
                name={RouteNames.logged.food.details.ingredients}
                component={FoodsDetailsIngredients}
            />
            <Stack.Screen
                options={screenOptionsTransparent}
                name={RouteNames.logged.food.shoppingList}
                component={ShoppingList}
            />
        </>
    );
}
