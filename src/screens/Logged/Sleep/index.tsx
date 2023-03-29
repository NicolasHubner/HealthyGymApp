import { useEffect, useState } from 'react';
import { Animated, KeyboardAvoidingView, Platform, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import notifee, { Notification, RepeatFrequency, TriggerType } from '@notifee/react-native';

import { TimePicker } from './components/TimePicker';
import { Button } from '@/components/atoms/Button';
// import { BackButton } from '@/components/molecules/BackButton';

import { INavigation } from '@/helpers/interfaces/INavigation';
import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';

import cloudImage from '@/assets/Sleep/sleep.png';
import ArrowDown from '@/assets/svg/arrow-down.svg';

import {
    // BackArrow,
    ButtonContainer,
    PageContainer,
    PageSubtitle,
    PageTitle,
    PageTitleContainer,
    SleepImage,
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Sleep() {
    const [fadeAnim, _] = useState(new Animated.Value(0));
    const [hour, setHour] = useState(23);
    const [minutes, setMinutes] = useState(30);

    const { canGoBack, goBack } = useNavigation<INavigation>();

    const renderTimeParsed = (hourParam: number, minutesParam: number) => {
        return `${String(hourParam).padStart(2, '0')}:${String(minutesParam).padStart(2, '0')}`;
    };

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

    const getSleepTimeFromStorage = async () => {
        try {
            const sleepTime = await AsyncStorage.getItem('@CrossLifeApp/sleep-time');

            if (sleepTime) {
                const [hourFromStorage, minutesFromStorage] = sleepTime?.split(':');
                setHour(Number(hourFromStorage) ?? 23);
                setMinutes(Number(minutesFromStorage) ?? 0);
            }
        } catch (err) {
            console.error('Ocorreu um erro ao buscar o horário de dormir.', err);
        }
    };

    const handleSetReminder = async () => {
        try {
            await defineAlarmByNotification();

            await AsyncStorage.setItem('@CrossLifeApp/sleep-time', renderTimeParsed(hour, minutes));

            throwSuccessToast({
                title: 'Lembrete definido 🕙',
                message: `Você será lembrado de dormir às ${renderTimeParsed(hour, minutes)}`,
            });

            if (canGoBack()) {
                return goBack();
            }
        } catch (err) {
            console.error('Ocorreu um erro ao definir o alarme para dormir.', err);
            throwErrorToast({
                title: 'Lembrete não definido ❌',
                message: 'Ocorreu um erro ao definir o horário de dormir. Tente novamente!',
            });
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

    useEffect(() => {
        getSleepTimeFromStorage();
    }, []);

    return (
        <Animated.View
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, opacity: fadeAnim }}>
            <KeyboardAvoidingView
                style={{ flex: 1, width: '100%', alignItems: 'center' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <PageContainer>
                    {/* <TouchableOpacity onPress={handleGoBack}>
                    <View style={{ backgroundColor: 'red', width: 32 }}>
                        <BackArrow />
                    </View>
                </TouchableOpacity> */}
                    <View
                        style={{
                            position: 'absolute',
                            top: 32,
                            left: 24,
                            zIndex: 10,
                        }}>
                        <TouchableOpacity onPress={() => goBack()}>
                            <ArrowDown />
                        </TouchableOpacity>
                    </View>

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
            </KeyboardAvoidingView>
        </Animated.View>
    );
}
