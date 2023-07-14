import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import notifee, {
    AndroidImportance,
    EventType,
    RepeatFrequency,
    TimestampTrigger,
    TriggerType,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { foods4, foods6 } from './constants/foods';

interface FoodNotificationProps {
    goal_type: string;
    navigate: INavigation;
}

export function FoodsNotification({ goal_type, navigate }: FoodNotificationProps) {
    const FoodNotification = async () => {
        try {
            await notifee.requestPermission();

            const channelId = await notifee.createChannel({
                id: 'food-reminder',
                name: 'Food Reminder',
                sound: 'default',
                vibration: true,
                importance: AndroidImportance.HIGH,
                lights: true,
            });
            // console.log('gols', goal_type);
            if (goal_type === 'moderate-cardio' || goal_type === 'advanced-cardio') {
                for (let i = 0; i < foods4.length; i++) {
                    const date = new Date();
                    date.setHours(foods4[i].hour);
                    date.setMinutes(foods4[i].minute);

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
                            title: foods4[i].title,
                            body: foods4[i].body,
                            android: {
                                channelId,
                                autoCancel: true,
                                showTimestamp: true,
                                pressAction: {
                                    id: 'lanche4',
                                    launchActivity: 'default',
                                },
                            },
                            ios: {
                                categoryId: 'lanche4',
                            },
                            data: {
                                id: 'lanche4',
                            },
                        },
                        trigger
                    );
                    notifee.onForegroundEvent(async ({ type, detail }) => {
                        if (type === EventType.PRESS) {
                            if (
                                detail.pressAction?.id === 'lanche4' ||
                                detail.notification?.ios?.categoryId === 'lanche4'
                            ) {
                                navigate.navigate(RouteNames.logged.food.daily);
                            }
                        }
                    });
                    notifee.onBackgroundEvent(async ({ type, detail }) => {
                        if (type === EventType.PRESS) {
                            if (
                                detail.pressAction?.id === 'lanche4' ||
                                detail.notification?.ios?.categoryId === 'lanche4'
                            ) {
                                navigate.navigate(RouteNames.logged.food.daily);
                            }
                        }
                    });
                }
                AsyncStorage.setItem('@CrossLifeApp/lunch-reminder', 'true');
            }
            if (goal_type === 'strength-muscle') {
                console.log('entrou');
                for (let i = 0; i < foods6.length; i++) {
                    const date = new Date();
                    date.setHours(foods6[i].hour);
                    date.setMinutes(foods6[i].minute);

                    if (date.getTime() < Date.now()) {
                        date.setDate(date.getDate() + 1);
                    }

                    const trigger: TimestampTrigger = {
                        type: TriggerType.TIMESTAMP,
                        timestamp: date.getTime(),
                        repeatFrequency: RepeatFrequency.DAILY,
                    };

                    await notifee.createTriggerNotification(
                        {
                            title: foods6[i].title,
                            body: foods6[i].body,
                            android: {
                                channelId,
                                autoCancel: true,
                                showTimestamp: true,
                                pressAction: {
                                    id: 'lanche6',
                                    launchActivity: 'default',
                                },
                            },
                            ios: {
                                categoryId: 'lanche6',
                            },
                            data: {
                                id: 'lanche6',
                            },
                        },
                        trigger
                    );
                    notifee.onForegroundEvent(async ({ type, detail }) => {
                        if (type === EventType.PRESS) {
                            if (
                                detail.pressAction?.id === 'lanche6' ||
                                detail.notification?.ios?.categoryId === 'lanche6'
                            ) {
                                navigate.navigate(RouteNames.logged.food.daily);
                            }
                        }
                    });
                    notifee.onBackgroundEvent(async ({ type, detail }) => {
                        if (type === EventType.PRESS) {
                            if (
                                detail.pressAction?.id === 'lanche6' ||
                                detail.notification?.ios?.categoryId === 'lanche6'
                            ) {
                                navigate.navigate(RouteNames.logged.food.daily);
                            }
                        }
                    });
                }
                AsyncStorage.setItem('@CrossLifeApp/lunch-reminder', 'true');
            }
        } catch (error) {
            console.error('Ocorreu erro ao criar treino', error);
        }
    };

    async function getLunchReminder() {
        const lunchReminderLaunch = await AsyncStorage.getItem('@CrossLifeApp/lunch-reminder');
        console.log('lunchReminderLaunch', lunchReminderLaunch);
        if (!lunchReminderLaunch || JSON.parse(lunchReminderLaunch) === false) {
            console.log('notificacao enviada');
            await FoodNotification();
        }
    }

    return {
        FoodNotification,
        getLunchReminder,
    };
}
