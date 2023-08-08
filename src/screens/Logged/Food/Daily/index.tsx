import { DailyCalendar } from '@/components/organisms/DailyCalendar';

import {
    // ButtonCreateFood,
    Container,
    Content,
    // Input,
    // InputContainer,
    // InputSearchIcon,
    ViewLoading,
} from './styles';
import { FoodBoxContent } from '@/components/organisms/FoodBoxContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { useCallback, useEffect, useState } from 'react';
import { IFood } from './helpers/functions';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
// import { AntDesign } from '@expo/vector-icons';
// import { INavigation } from '@/helpers/interfaces/INavigation';
// import { useNavigation } from '@react-navigation/native';
// import { RouteNames } from '@/routes/routes_names';

export function Daily() {
    const { token, gender, goal_type } = useSelector((state: RootState) => state.user);
    const { colors } = useTheme();

    const [food_types, setFoodTypes] = useState<string[]>([]);
    const [foods, setFoods] = useState<IFood[]>([]);

    // const { navigate } = useNavigation() as INavigation;

    const getFoodHistory = useCallback(async () => {
        try {
            const headers = generateAuthHeaders(token!);
            const { data } = await api.get(
                `/foods?populate=ingredients&populate=food_type&populate=image&filters[gender][$eq]=${gender}&filters[goal_type]=${goal_type}`,
                {
                    headers,
                }
            );
            const foodsFromApi = data.data as IFood[];
            setFoods(foodsFromApi);

            const foodTypes = foodsFromApi
                .map(food => food?.attributes?.food_type?.data?.attributes?.type)
                .filter(foodType => foodType !== undefined || foodType === 'Custom');
            const uniqueFoodTypes = [...new Set(foodTypes)];

            const sortOrder = [
                'Café da manhã',
                'Meio da manhã (COLAÇÃO)',
                'Almoço',
                'Café da tarde',
                'Jantar',
                'Ceia',
            ];

            const sortedFoodTypes = uniqueFoodTypes.sort(
                (a: any, b: any) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
            );

            setFoodTypes(sortedFoodTypes as string[]);
        } catch (error) {
            console.error('Ocorreu um erro ao buscar os alimentos', error);
        }
    }, [token, gender, goal_type]);

    useEffect(() => {
        getFoodHistory();
    }, [getFoodHistory]);

    return (
        <>
            <Container>
                <DailyCalendar />
                {/* <InputContainer>
                    <InputSearchIcon />
                    <Input placeholder="Pesquise por refeições..." />
                </InputContainer> */}
                {food_types.length > 0 ? (
                    <Content>
                        {food_types.map((food_type, index) => (
                            <FoodBoxContent
                                key={index}
                                title={food_type}
                                data={foods
                                    .filter(
                                        food =>
                                            food?.attributes?.food_type?.data?.attributes?.type ===
                                            food_type
                                    )
                                    .slice(0, 3)}
                                dataTotal={foods.filter(
                                    food =>
                                        food?.attributes?.food_type?.data?.attributes?.type ===
                                        food_type
                                )}
                            />
                        ))}
                    </Content>
                ) : (
                    <ViewLoading>
                        <ActivityIndicator size="large" color={colors.green[700]} />
                    </ViewLoading>
                )}
            </Container>

            {/* <ButtonCreateFood onPress={() => navigate(RouteNames.logged.food.creatingFood)}>
                <AntDesign name="plus" size={32} color="white" />
            </ButtonCreateFood> */}
        </>
    );
}
