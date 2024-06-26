import notifee, {
    TriggerType,
    AndroidImportance,
    TimestampTrigger,
    RepeatFrequency,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TrainNotification() {
    const trainNotification = async () => {
        try {
            await notifee.requestPermission();
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
                timestamp: date.getTime(),
                // timestamp: Date.now() + 1000 * 2,
                repeatFrequency: RepeatFrequency.DAILY,
            };

            await notifee.createTriggerNotification(
                {
                    title: 'Vamos treinar agora? 🏋️‍♂️',
                    body: 'Vamos treinar e não se esqueça de marcar no aplicativo!',
                    android: {
                        channelId,
                        autoCancel: false,
                        showTimestamp: true,
                        pressAction: {
                            id: 'train-reminder',
                            launchActivity: 'default',
                        },
                    },
                    ios: {
                        categoryId: 'train-reminder',
                        sound: 'default',
                        launchImageName: 'train-reminder',
                    },
                    data: {
                        id: 'train-reminder',
                    },
                },
                trigger
            );

            AsyncStorage.setItem('@CrossLifeApp/train-reminder', 'true');
        } catch (err) {
            console.error('Ocorreu um erro ao definir um lembrete de treino', err);
        }
    };

    const verifyIfTrainReminderIsSet = async () => {
        const trainReminder = await AsyncStorage.getItem('@CrossLifeApp/train-reminder');

        if (!trainReminder || JSON.parse(trainReminder) === false) {
            await trainNotification();
        }
    };

    return {
        verifyIfTrainReminderIsSet,
        trainNotification,
    };
}
