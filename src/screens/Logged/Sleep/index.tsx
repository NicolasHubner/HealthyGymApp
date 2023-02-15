import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Image, View } from 'react-native';

import trainDays from '@/assets/Sleep/train-days.png';

import {
    PageTitleContainer,
    PageTitle,
    PageSubtitle,
    DaysListTitle,
    DayName,
    DayList,
    WeekDay,
    DayListColumn,
    ButtonContainer,
    Checkbox,
} from './styles';
import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { weekDays } from './utils/weekDays';

export function Sleep() {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const handleSelectedDays = (day: string) => {
        const findedDay = selectedDays.findIndex(selectedDay => selectedDay === day);

        if (findedDay === -1) {
            setSelectedDays(current => [...current, day]);
        } else {
            setSelectedDays(current => current.filter(selectedDay => selectedDay !== day));
        }
    };

    return (
        <ScrollablePageWrapper padding={28}>
            <Image source={trainDays} />

            <PageTitleContainer>
                <PageTitle>Dias de treino</PageTitle>
                <View style={{ marginTop: 12 }}>
                    <PageSubtitle>Escolha os dias para treinar</PageSubtitle>
                    <PageSubtitle>e enviaremos o lembrete</PageSubtitle>
                </View>
            </PageTitleContainer>

            <DaysListTitle>
                {selectedDays.length > 0
                    ? `Dia selecionado (${selectedDays.length})`
                    : 'Escolha os dias'}
            </DaysListTitle>

            <DayList>
                <DayListColumn>
                    {Object.values(weekDays)
                        .slice(0, 4)
                        .map(day => (
                            <WeekDay key={day}>
                                <Checkbox
                                    onPress={() => handleSelectedDays(day)}
                                    textComponent={<DayName>{day}</DayName>}
                                />
                            </WeekDay>
                        ))}
                </DayListColumn>
                <DayListColumn>
                    {Object.values(weekDays)
                        .slice(4, 7)
                        .map(day => (
                            <WeekDay key={day}>
                                <Checkbox
                                    onPress={() => handleSelectedDays(day)}
                                    textComponent={<DayName>{day}</DayName>}
                                />
                            </WeekDay>
                        ))}
                </DayListColumn>
            </DayList>

            <ButtonContainer>
                <Button label="Definir lembrete" />
            </ButtonContainer>
        </ScrollablePageWrapper>
    );
}
