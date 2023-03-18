import { DailyCalendar } from '@/components/organisms/DailyCalendar';

import { Container, Content, Input, InputContainer, InputSearchIcon } from './styles';
import { FoodBoxContent } from '@/components/organisms/FoodBoxContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { useCallback, useEffect } from 'react';

export function Daily() {
    const { id: userId, token } = useSelector((state: RootState) => state.user);

    // const getFoodHistory = useCallback(async () => {
    //     const headers = {
    //         Authorization: `Bearer ${token}`,
    //     };
    //     const response = await api.get('/food-restrictions', {
    //         headers,
    //     });
    //     console.log(response.data.data);
    // }, [token]);

    // useEffect(() => {
    //     getFoodHistory();
    // }, [getFoodHistory]);
    return (
        <Container>
            <DailyCalendar />
            <Content>
                <InputContainer>
                    <InputSearchIcon />
                    <Input placeholder="Pesquise por refeições..." />
                </InputContainer>

                <FoodBoxContent title="Café da manha" />
                <FoodBoxContent title="Almoço" />
                <FoodBoxContent title="Jantar" />
            </Content>
        </Container>
    );
}
