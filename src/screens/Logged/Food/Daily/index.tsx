import { DailyCalendar } from '@/components/organisms/DailyCalendar';

import { Container, Content, Input, InputContainer, InputSearchIcon } from './styles';
import { FoodBoxContent } from '@/components/organisms/FoodBoxContent';

export function Daily() {
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
