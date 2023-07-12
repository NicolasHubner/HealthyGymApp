import { INavigation } from '@/helpers/interfaces/INavigation';
import notifee, {
    TriggerType,
    AndroidImportance,
    EventType,
    TimestampTrigger,
    RepeatFrequency,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Water } from './constants/water';

interface IWaterNotification {
    navigate: INavigation;
}

export function WaterNotification({ navigate }: IWaterNotification) {
    const sendWaterReminder = async () => {
        try {
            await notifee.requestPermission();
            // console.log('ronaldo');
            const channelId = await notifee.createChannel({
                id: 'water-reminder',
                name: 'Water Reminder',
                sound: 'default',
                vibration: true,
                importance: AndroidImportance.HIGH,
                lights: true,
            });

            for (let i = 0; i < Water.length; i++) {
                const date = new Date();
                date.setHours(Water[i].hour);
                date.setMinutes(Water[i].minute);

                if (date.getTime() < Date.now()) {
                    date.setDate(date.getDate() + 1);
                }

                const trigger: TimestampTrigger = {
                    type: TriggerType.TIMESTAMP,
                    timestamp: date.getTime() + 1000 * 10,
                    repeatFrequency: RepeatFrequency.DAILY,
                };

                await notifee.createTriggerNotification(
                    {
                        title: 'Lembrete de beber água 💦',
                        body: 'Esse é um lembrete para você beber água. Hidrate-se!',
                        android: {
                            channelId,
                            autoCancel: false,
                            showTimestamp: true,
                        },
                        data: {
                            id: 'water-reminder',
                        },
                    },
                    trigger
                );
            }

            notifee.onBackgroundEvent(async ({ type, detail }) => {
                if (
                    type === EventType.PRESS &&
                    detail.notification?.data &&
                    detail.notification?.data.id === 'water-reminder'
                ) {
                    // console.log('Evento de pressionar notificação de água');
                    navigate.navigate('Water');
                }
            });
            notifee.onForegroundEvent(async ({ type, detail }) => {
                if (
                    type === EventType.PRESS &&
                    detail.notification?.data &&
                    detail.notification?.data.id === 'water-reminder'
                ) {
                    // console.log('Evento de pressionar notificação de água');
                    navigate.navigate('Water');
                }
            });

            AsyncStorage.setItem('@CrossLifeApp/water-reminder-launch', 'true');
        } catch (err) {
            console.error('Ocorreu um erro ao definir um lembrete de beber água', err);
        }
    };

    const verifyIfWaterReminderIsSet = async () => {
        const waterReminderLaunch = await AsyncStorage.getItem(
            '@CrossLifeApp/water-reminder-launch'
        );

        if (!waterReminderLaunch || JSON.parse(waterReminderLaunch) === false) {
            sendWaterReminder();
        }
    };

    return {
        verifyIfWaterReminderIsSet,
        sendWaterReminder,
    };
}
