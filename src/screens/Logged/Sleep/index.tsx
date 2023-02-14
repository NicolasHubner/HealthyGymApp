import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Text, View } from 'react-native';

import {
    PageTitleContainer,
    PageTitle,
    PageSubtitle,
    DaysListTitle,
    DayName,
    DayList,
    WeekDay,
} from './styles';

export function Sleep() {
    return (
        <ScrollablePageWrapper>
            <Text>Imagem</Text>

            <PageTitleContainer>
                <PageTitle>Dias de treino</PageTitle>

                <PageSubtitle>Escolha os dias para treinar enviaremos o lembrete</PageSubtitle>
            </PageTitleContainer>
        </ScrollablePageWrapper>
    );
}
