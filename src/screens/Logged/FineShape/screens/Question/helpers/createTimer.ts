import notifee, { TriggerType, AndroidImportance, TimestampTrigger } from '@notifee/react-native';

interface CreatTimer12DaysProps {
    studentName: string;
}

export const CreatTimer12Days = async ({ studentName }: CreatTimer12DaysProps) => {
    const newDate = new Date();

    newDate.setDate(newDate.getDate() + 12);

    try {
        await notifee.requestPermission();
        const channelId = await notifee.createChannel({
            id: `12 Days-${studentName}`,
            name: `12 Days-${studentName}`,
            sound: 'default',
            vibration: true,
            importance: AndroidImportance.HIGH,
            lights: true,
        });

        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: newDate.getTime(),
        };

        await notifee.createTriggerNotification(
            {
                title: `Hora de avaliar novamente a pessoa: ${studentName}!`,
                body: 'Já se passaram 12 dias desde a última avaliação. Vamos lá?',
                android: {
                    channelId,
                    autoCancel: false,
                    showTimestamp: true,
                    pressAction: {
                        id: 'ava',
                        launchActivity: 'default',
                    },
                },
                ios: {
                    categoryId: `12-Days-${studentName}`,
                    sound: 'default',
                    launchImageName: '12-Days',
                },
                data: {
                    id: `12-Days-${studentName}`,
                },
            },
            trigger
        );
    } catch (error) {
        console.error('Ocorreu um erro ao criar a notificação de 12 dias: ', error);
    }
};
