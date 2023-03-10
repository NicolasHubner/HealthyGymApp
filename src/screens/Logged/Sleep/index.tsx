import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import notifee, { Notification, RepeatFrequency, TriggerType } from '@notifee/react-native';

import { TimePicker } from './components/TimePicker';
import { Button } from '@/components/atoms/Button';
import { BackButton } from '@/components/molecules/BackButton';

import { INavigation } from '@/helpers/interfaces/INavigation';
import { throwSuccessToast } from '@/helpers/functions/handleToast';

import cloudImage from '@/assets/Sleep/sleep.png';

import {
    BackArrow,
    ButtonContainer,
    PageContainer,
    PageSubtitle,
    PageTitle,
    PageTitleContainer,
    SleepImage,
} from './styles';

export function Sleep() {
    const [fadeAnim, _] = useState(new Animated.Value(0));
    const [hour, setHour] = useState(23);
    const [minutes, setMinutes] = useState(30);

    const { canGoBack, goBack } = useNavigation<INavigation>();

    const defineAlarmByNotification = async () => {
        const channelId = await notifee.createChannel({
            id: 'reminder',
            name: 'Lembretes',
        });

        const reminder: Notification = {
            id: 'sleep-time',
            title: 'Hora de dormir!',
            body: 'Você deve dormir agora para ter uma boa noite de sono.',
            android: {
                channelId,
                sound: 'default',
                timestamp: Date.now(),
            },
            ios: {
                categoryId: 'reminder',
                sound: 'default',
            },
        };

        const date = new Date(Date.now());
        date.setHours(hour + 3);
        date.setMinutes(minutes);
        date.setSeconds(0);

        await notifee.createTriggerNotification(reminder, {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(),
            repeatFrequency: RepeatFrequency.DAILY,
        });
    };

    const handleSetReminder = async () => {
        try {
            throwSuccessToast({
                title: 'Lembrete definido 🕙',
                message: `Você será lembrado de dormir às ${hour}:${minutes}!`,
            });

            await defineAlarmByNotification();

            if (canGoBack()) {
                return goBack();
            }
        } catch (err) {
            console.error('Ocorreu um erro ao definir o alarme para dormir.', err);
        }
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Animated.View
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, opacity: fadeAnim }}>
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

                <ButtonContainer>
                    <Button label="Definir lembrete" onPress={() => handleSetReminder()} />
                </ButtonContainer>
            </PageContainer>
        </Animated.View>
    );
}
