import { useState } from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@/components/atoms/Button';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import trainDays from '@/assets/Sleep/train-days.png';
import { weekDays } from './utils/weekDays';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';

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

export function TrainDays() {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const { navigate } = useNavigation<INavigation>();

    const handleSelectedDays = (day: string) => {
        const findedDay = selectedDays.findIndex(selectedDay => selectedDay === day);

        if (findedDay === -1) {
            setSelectedDays(current => [...current, day]);
        } else {
            setSelectedDays(current => current.filter(selectedDay => selectedDay !== day));
        }
    };

    const handleNavigate = () => {
        if (selectedDays.length === 0) {
            return;
        }

        navigate(RouteNames.logged.sleep);
    };

    return (
        <ScrollablePageWrapper padding={28} styles={{ flex: 1 }}>
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
                <Button
                    isDisabled={selectedDays.length <= 0}
                    label="Definir lembrete"
                    onPress={() => handleNavigate()}
                />
            </ButtonContainer>
        </ScrollablePageWrapper>
    );
}
