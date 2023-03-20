import { DailyCalendar } from '@/components/organisms/DailyCalendar';

import { Container, Content, Input, InputContainer, InputSearchIcon } from './styles';
import { FoodBoxContent } from '@/components/organisms/FoodBoxContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { useCallback, useEffect, useState } from 'react';
import { IFood } from './helpers/functions';

export function Daily() {
    const { id: userId, token } = useSelector((state: RootState) => state.user);

    const [foodLunch, setFoodLunch] = useState<IFood[]>([]);
    const [foodDinner, setFoodDinner] = useState<IFood[]>([]);
    const [foodBreakfast, setFoodBreakfast] = useState<IFood[]>([]);

    const getFoodHistory = useCallback(async () => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await api.get('/foods?populate=food_type&image', {
            headers,
        });

        const data_foods = response.data.data as IFood[];
        // console.log(data_foods);
        data_foods.forEach((food: IFood) => {
            if (food.attributes.food_type?.data.attributes.type === 'Almoço') {
                setFoodLunch(prev => [...prev, food]);
            }

            if (food.attributes.food_type?.data.attributes.type === 'Jantar') {
                setFoodDinner(prev => [...prev, food]);
            }

            if (food.attributes.food_type?.data.attributes.type === 'Café da manhã') {
                setFoodBreakfast(prev => [...prev, food]);
            }
        });
    }, [token]);

    useEffect(() => {
        getFoodHistory();
    }, [getFoodHistory]);

    return (
        <Container>
            <DailyCalendar />
            <Content>
                <InputContainer>
                    <InputSearchIcon />
                    <Input placeholder="Pesquise por refeições..." />
                </InputContainer>

                <FoodBoxContent data={foodBreakfast} title="Café da manha" />
                <FoodBoxContent data={foodLunch} title="Almoço" />
                <FoodBoxContent data={foodDinner} title="Jantar" />
            </Content>
        </Container>
    );
}
