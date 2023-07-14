import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { HomeOptionsForCoach } from './components/HomeForCoach';
import { HomeOptionsForNormalUser } from './components/HomeForUser';
import { DividerComponent } from '@/components/atoms/Divider';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import CardWarnings from '@/components/molecules/CardWarnings';
import { Header } from '@/components/organisms/Header';

import { RootState } from '@/store';

import { OptionsContainer, TitleNavigationApp, TitleNavigationContainer } from './styles';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { sentPhotos } from './helpers/sentPhotos';
import { FoodsNotification } from '@/helpers/functions/notifications';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { WaterNotification } from '@/helpers/functions/notifications/water';
import notifee, {
    AndroidImportance,
    EventType,
    RepeatFrequency,
    TriggerType,
} from '@notifee/react-native';
import { TrainNotification } from '@/helpers/functions/notifications/train';
import { Button } from '@/components/atoms/Button';
import { RouteNames } from '@/routes/routes_names';
import { HandlersNotifee } from '@/helpers/functions/notifications/handlers';

const cardWarningsPattern = {
    user: {
        title: 'Este é seu estilo',
        text: 'Aqui você consegue gerenciar, editar e visualizar toda sua rotina de treino.',
        button: 'Ver mais',
    },
    coach: {
        title: 'Seu painel administrativo',
        text: 'Aqui você consegue gerenciar, editar e visualizar toda sua rotina adm e comerciais',
        button: 'Ver mais',
    },
};

export function Home() {
    const [userRole, setUserRole] = useState<'user' | 'coach'>('user');
    const [homeOptions, setHomeOptions] = useState<'user' | 'coach'>('user');
    const navigate = useNavigation() as INavigation;

    const { isCoach, token, goal_type } = useSelector((state: RootState) => state.user);
    const headers = generateAuthHeaders(token!);

    useEffect(() => {
        if (isCoach && userRole === 'user') {
            setUserRole('coach');
            setHomeOptions('coach');
            return;
        }

        if (userRole === 'coach') setUserRole('user');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCoach]);

    useEffect(() => {
        sentPhotos({ headers });
    }, [headers]);

    useEffect(() => {
        HandlersNotifee({ navigate });
    }, [goal_type, navigate]);

    useEffect(() => {
        const handlers = async () => {
            await Promise.all([
                FoodsNotification({
                    goal_type: goal_type || '',
                    navigate: navigate,
                }).getLunchReminder(),
                WaterNotification({ navigate }).verifyIfWaterReminderIsSet(),
                TrainNotification({ navigate }).verifyIfTrainReminderIsSet(),
            ]);

            await HandlersNotifee({ navigate });
        };
        handlers();
    }, [navigate, goal_type]);
    // useEffect(() => {
    //     const getAllNotifications = async () => {
    //         notifee.getTriggerNotifications().then(async notification => {
    //             console.log('notification', JSON.stringify(notification, null, 2));
    //             console.log('notification', notification.length);
    //             // console.log('notification', notification.length);
    //         });
    //     };
    //     getAllNotifications();
    // // }, []);

    async function teste() {
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            sound: 'default',
            vibration: true,
            importance: AndroidImportance.HIGH,
            lights: true,
        });

        await notifee.createTriggerNotification(
            {
                title: 'My notification title',
                body: 'My notification body',
                android: {
                    channelId,
                    autoCancel: true,
                    showTimestamp: true,
                    // asForegroundService: true,
                    pressAction: {
                        id: 'lanche6',
                        launchActivity: 'default',
                    },
                },
                ios: {
                    sound: 'default',
                    categoryId: 'lanche6',
                    launchImageName: 'food',
                    foregroundPresentationOptions: {
                        alert: true,
                        badge: true,
                        sound: true,
                    },
                },
            },
            {
                type: TriggerType.TIMESTAMP,
                timestamp: Date.now() + 1000 * 3,
                repeatFrequency: RepeatFrequency.DAILY,
            }
        );
        // notifee.onBackgroundEvent(async ({ type, detail }) => {
        //     // console.log('type', type);
        //     // console.log('detail', detail);
        //     if (type === EventType.PRESS) {
        //         if (
        //             detail.pressAction?.id === 'teste' &&
        //             detail.notification?.ios?.categoryId === 'teste'
        //         ) {
        //             // Alert.alert('teste', 'teste');
        //             navigate.navigate(RouteNames.logged.explorer);
        //         }
        //     }
        // });

        // notifee.onForegroundEvent(async ({ type, detail }) => {
        //     // console.log('type', type);
        //     if (type === EventType.PRESS) {
        //         // Alert.alert('detail', JSON.stringify(detail, null, 2));
        //         if (detail.notification?.ios?.categoryId === 'teste') {
        //             // Alert.alert('teste', 'teste');
        //             navigate.navigate(RouteNames.logged.explorer);
        //         }
        //         // console.log('detail', detail);
        //         // console.log('detail', det
        //     }
        // });
        return;
    }

    return (
        <ScrollablePageWrapper bottomSpacing>
            <Header />

            <CardWarnings
                textSubTitle={cardWarningsPattern[userRole].title}
                textSubtitleBody={cardWarningsPattern[userRole].text}
                textSeeMore={cardWarningsPattern[userRole].button}
            />
            <DividerComponent />

            <TitleNavigationContainer>
                <TitleNavigationApp>Navegue pelo app</TitleNavigationApp>
                {/* {userRole === 'coach' && (
                    <Pressable
                        onPress={() =>
                            setHomeOptions(prev => (prev === 'user' ? 'coach' : 'user'))
                        }>
                        <View
                            flexDir="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ gap: 4 }}>
                            <AntDesign name="retweet" size={12} />
                            <Text fontSize="12px">
                                {homeOptions === 'coach' ? 'Coach' : 'Aluno'}
                            </Text>
                        </View>
                    </Pressable>
                )} */}
                <Button
                    onPress={() => teste()}
                    label="Last T"
                    // style={{ width: 100, height: 100, backgroundColor: 'red' }}
                    fullWidth={false}
                />
            </TitleNavigationContainer>

            <OptionsContainer style={{ rowGap: 16 }}>
                {homeOptions === 'coach' ? <HomeOptionsForCoach /> : <HomeOptionsForNormalUser />}
            </OptionsContainer>
        </ScrollablePageWrapper>
    );
}
