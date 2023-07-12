import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import notifee, {
    TriggerType,
    AndroidImportance,
    EventType,
    TimestampTrigger,
    RepeatFrequency,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ITrainNotification {
    navigate: INavigation;
}

export function TrainNotification({ navigate }: ITrainNotification) {
    const trainNotification = async () => {
        try {
            await notifee.requestPermission();
            // console.log('ronaldo');
            const channelId = await notifee.createChannel({
                id: 'train-reminder',
                name: 'Train Reminder',
                sound: 'default',
                vibration: true,
                importance: AndroidImportance.HIGH,
                lights: true,
            });

            const date = new Date();
            date.setHours(15);
            date.setMinutes(0);
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
                    title: 'Vamos treinar agora campeão? 🏋️‍♂️',
                    body: 'Vamos treinar e não se esqueça de marcar no aplicativo!',
                    android: {
                        channelId,
                        autoCancel: false,
                        showTimestamp: true,
                    },
                    data: {
                        id: 'train-reminder',
                    },
                },
                trigger
            );

            notifee.onBackgroundEvent(async ({ type, detail }) => {
                if (
                    type === EventType.PRESS &&
                    detail.notification?.data &&
                    detail.notification?.data.id === 'train-reminder'
                ) {
                    // console.log('Evento de pressionar notificação de água');
                    navigate.navigate(RouteNames.logged.trainDays);
                }
            });
            notifee.onForegroundEvent(async ({ type, detail }) => {
                if (
                    type === EventType.PRESS &&
                    detail.notification?.data &&
                    detail.notification?.data.id === 'train-reminder'
                ) {
                    // console.log('Evento de pressionar notificação de água');
                    navigate.navigate(RouteNames.logged.trainDays);
                }
            });

            AsyncStorage.setItem('@CrossLifeApp/train-reminder-launch', 'true');
        } catch (err) {
            console.error('Ocorreu um erro ao definir um lembrete de beber água', err);
        }
    };

    const verifyIfTrainReminderIsSet = async () => {
        const trainReminder = await AsyncStorage.getItem('@CrossLifeApp/train-reminder-launch');

        if (!trainReminder || JSON.parse(trainReminder) === false) {
            trainNotification();
        }
    };

    return {
        verifyIfTrainReminderIsSet,
        trainNotification,
    };
}
