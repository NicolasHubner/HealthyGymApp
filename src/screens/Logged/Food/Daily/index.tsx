import { DailyCalendar } from '@/components/organisms/DailyCalendar';

import { Container, Content, Input, InputContainer, InputSearchIcon } from './styles';
import { FoodBoxContent } from '@/components/organisms/FoodBoxContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { useCallback, useEffect, useState } from 'react';
import { IFood } from './helpers/functions';

export function Daily() {
    const { token, gender, goal_type } = useSelector((state: RootState) => state.user);

    const [food_types, setFoodTypes] = useState<string[]>([]);
    const [foods, setFoods] = useState<IFood[]>([]);

    const getFoodHistory = useCallback(async () => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await api.get(
                `/foods?populate=ingredients&populate=food_type&filters[gender][$eq]=${gender}&filters[goal_type]=${goal_type}`,
                {
                    headers,
                }
            );
            const data_foods = response.data.data as IFood[];
            setFoods(data_foods);

            const f_types = data_foods.map(food => food.attributes.food_type?.data.attributes.type);
            const Food_types_No_Duplicate = [...new Set(f_types)];
            const sortedFoodTypes = Food_types_No_Duplicate.sort((a, b) => {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            });

            setFoodTypes(sortedFoodTypes as string[]);
        } catch (error) {
            console.log(error.response.data);
        }
    }, [token]);

    useEffect(() => {
        getFoodHistory();
    }, [getFoodHistory]);

    return (
        <Container>
            <DailyCalendar />
            <Content>
                {/* <InputContainer>
                    <InputSearchIcon />
                    <Input placeholder="Pesquise por refeições..." />
                </InputContainer> */}
                {food_types.map((food_type, index) => (
                    <FoodBoxContent
                        key={index}
                        title={food_type}
                        data={foods.filter(
                            food => food.attributes.food_type?.data.attributes.type === food_type
                        )}
                    />
                ))}
            </Content>
        </Container>
    );
}
