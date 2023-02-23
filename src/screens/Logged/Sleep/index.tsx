import { useState } from 'react';
import { View, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TimePicker } from './components/TimePicker';
import { PageContainer } from './components/PageContainer';
import { Button } from '@/components/atoms/Button';
import { BackButton } from '@/components/molecules/BackButton';

import { INavigation } from '@/helpers/interfaces/INavigation';

import cloudImage from '@/assets/Sleep/sleep.png';

import {
    AddAlarmContainer,
    AddAlarmText,
    AlarmSwitch,
    BackArrow,
    ButtonContainer,
    PageSubtitle,
    PageTitle,
    PageTitleContainer,
    SleepImage,
} from './styles';

export function Sleep() {
    const [alarmSelected, setAlarmSelected] = useState(true);

    const [hour, setHour] = useState(4);
    const [minutes, setMinutes] = useState(0);

    const { canGoBack, goBack } = useNavigation<INavigation>();

    const handleSelectAlarm = () => {
        setAlarmSelected(current => !current);
    };

    const handleSetReminder = () => {
        if (canGoBack()) {
            return goBack();
        }
    };

    const onTouchStart = (event: GestureResponderEvent) => {
        console.log({ event: event.nativeEvent.pageY });
    };

    return (
        <View
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }}
            onTouchStart={onTouchStart}>
            <PageContainer>
                <BackButton>
                    <BackArrow />
                </BackButton>

                <SleepImage source={cloudImage} resizeMethod="auto" resizeMode="contain" />

                <PageTitleContainer>
                    <PageTitle>Que horas você gostaria de dormir?</PageTitle>
                    <PageSubtitle>
                        Defina um lembrete para alertá-lo em que ponto você deve dormir
                    </PageSubtitle>
                </PageTitleContainer>

                <TimePicker
                    hour={hour}
                    minutes={minutes}
                    setHour={setHour}
                    setMinutes={setMinutes}
                />

                <AddAlarmContainer>
                    <AddAlarmText>Adicionar som de alarme</AddAlarmText>
                    <AlarmSwitch
                        value={alarmSelected}
                        onChange={handleSelectAlarm}
                        thumbColor={alarmSelected ? '#EADDFF' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                    />
                </AddAlarmContainer>

                <ButtonContainer>
                    <Button label="Definir lembrete" onPress={() => handleSetReminder()} />
                </ButtonContainer>
            </PageContainer>
        </View>
    );
}
