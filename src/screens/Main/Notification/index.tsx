import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { useEffect, useState } from 'react';
import {
    CardSubTitle,
    CardTextContainer,
    CardTitle,
    ContainerNotification,
    NotifcationCard,
    RemoveAccountContainer,
    RemoveAccountTitle,
    TitleContainer,
    TitleScreen,
} from './style';
import { useTheme } from 'styled-components';
import { clearNotificationStorage, clearUserDataFromStorage } from '@/utils/handleStorage';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from '@/store/user';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { Linking, Pressable, View } from 'react-native';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from 'native-base';
import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { Divider } from '@/components/atoms/Divider/style';
import notifee from '@notifee/react-native';
import { Notifications } from './helpers/constants';
import { ModalDeleteAccount } from './components/ModalDeleteAccount';
import { RouteNames } from '@/routes/routes_names';
import { Order } from './helpers/interfaces';
interface INotification {
    id: number;
    name: string;
    description: string;
    iconName?: string;
    typeIcon?: string;
    route?: string;
    bgColor?: string;
    source?: any;
    notification?: number;
}

export default function Notification() {
    const [showModal, setShowModal] = useState(false);
    const [confirmedExclusion, setConfirmedExclusion] = useState(false);
    const [loadingExclusion, setLoadingExclusion] = useState(false);

    const { id, token, isCoach, suplements } = useSelector((state: RootState) => state.user);
    const { colors } = useTheme();
    const navigator = useNavigation() as INavigation;

    const [notification, setNotifications] = useState<INotification[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const value = isCoach === undefined ? false : isCoach;

        const notificationList = Notifications.filter(item => item.type === value)[0].data;

        if (!isCoach && suplements) {
            let newNotificationList = [
                ...notificationList,
                {
                    id: 2,
                    name: 'Suplementos Indicados',
                    description: 'Seu coach indicou alguns suplementos para você',
                    iconName: 'bell',
                    typeIcon: 'Feather',
                    bgColor: '#AFD5F0',
                    route: RouteNames.logged.suplementsStudent,
                    notification: suplements.filter(
                        (item: Order) => item.attributes.Status === 'Enviado'
                    ).length,
                },
            ];

            setNotifications(newNotificationList);
        } else {
            setNotifications(notificationList);
        }

        return () => {
            setNotifications([]);
        };
    }, [isCoach, suplements]);

    const handleSignOff = async () => {
        await notifee.cancelAllNotifications();

        await clearNotificationStorage();

        await clearUserDataFromStorage();
        dispatch(clearUserInfo());
    };

    const handleRemoveAccount = async () => {
        if (!confirmedExclusion) return;

        setLoadingExclusion(true);

        try {
            const headers = generateAuthHeaders(token!);
            await api.delete(`/users/${id}`, { headers });

            throwSuccessToast({
                title: 'Conta removida com sucesso',
                message: 'Sua conta foi excluída com sucesso. Vamos te redirecionar...',
            });

            setTimeout(() => {
                handleSignOff();
            }, 1000);
        } catch (err) {
            console.error('Ocorreu um erro ao tentar excluir a conta do usuário');
            throwErrorToast({
                title: 'Problema ao remover a conta',
                message: 'Ocorreu um erro ao tentar remover a conta. Por favor, tente novamente!',
            });
        } finally {
            setLoadingExclusion(false);
            setShowModal(false);
            setConfirmedExclusion(false);
        }
    };

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalDeleteAccount
                    handleRemoveAccount={handleRemoveAccount}
                    confirmedExclusion={confirmedExclusion}
                    setConfirmedExclusion={setConfirmedExclusion}
                    loadingExclusion={loadingExclusion}
                />
            </Modal>
            <PageWrapper bottomSpacing styles={{ flex: 1 }}>
                <View style={{ width: '100%' }}>
                    <HeaderGoBackButton onPress={() => navigator.goBack()} />
                </View>

                <TitleContainer style={{ marginTop: 12 }}>
                    <TitleScreen>Meu perfil</TitleScreen>
                    <Pressable onPress={handleSignOff} style={{ marginLeft: 'auto' }}>
                        <Ionicons name="exit-outline" size={24} color={colors.green[700]} />
                    </Pressable>
                </TitleContainer>
                <ContainerNotification>
                    {notification.map(item => (
                        <NotifcationCard
                            onPress={() => {
                                if (item.route) {
                                    navigator.navigate(item.route);
                                }
                            }}
                            key={item.id}>
                            <CardNavigationApp
                                route={item.route}
                                iconName={item.iconName}
                                typeIcon={item.typeIcon}
                                bgColor={item.bgColor}
                                isWidth33={true}
                                // mgTop={16}
                                notification={item.notification}
                                size={60}
                                source={item.source}
                            />
                            <CardTextContainer>
                                <CardTitle>{item.name}</CardTitle>
                                <CardSubTitle>{item.description}</CardSubTitle>
                            </CardTextContainer>
                        </NotifcationCard>
                    ))}

                    <Divider style={{ marginTop: 16 }} />

                    <NotifcationCard
                        style={[
                            {
                                // marginTop: 16,
                                paddingTop: 8,
                            },
                            isCoach && {
                                borderTopColor: !isCoach ? colors.gray[300] : 'transparent',
                                borderTopWidth: !isCoach ? 1 : 0,
                            },
                        ]}
                        onPress={() => Linking.openURL('https://crosslifers.com/suporte')}>
                        <CardNavigationApp
                            iconName="help"
                            typeIcon="Entypo"
                            bgColor={colors.blue[400]}
                            isWidth33={true}
                            // mgTop={0}
                            size={60}
                        />
                        <CardTextContainer>
                            <CardTitle>Precisa de ajuda?</CardTitle>
                            <CardSubTitle>
                                Clique aqui para entrar em contato com nosso suporte.
                            </CardSubTitle>
                        </CardTextContainer>
                    </NotifcationCard>
                    <NotifcationCard
                        style={{
                            marginTop: 16,
                            paddingBottom: 32,
                        }}
                        onPress={() =>
                            Linking.openURL(
                                `mailto:contato@crosslifers.com?subject=${encodeURIComponent(
                                    'Suporte'
                                )}&body=${encodeURIComponent(
                                    'Olá! Estou com problemas com o app e preciso de ajuda.\n\nMeu nome: \nMeu e-mail de contato: \nMeu telefone de contato com DDD: \nMeu dispositivo (iPhone ou Android): \nOs detalhes do problema que estou tendo: '
                                )}`
                            )
                        }>
                        <CardNavigationApp
                            iconName="email"
                            typeIcon="Entypo"
                            bgColor={colors.green[500]}
                            isWidth33={true}
                            // mgTop={0}
                            size={60}
                        />
                        <CardTextContainer>
                            <CardTitle>Email para contato</CardTitle>
                            <CardSubTitle>contato@crosslifers.com</CardSubTitle>
                        </CardTextContainer>
                    </NotifcationCard>
                </ContainerNotification>
                <RemoveAccountContainer style={{ alignItems: 'center', marginBottom: 0 }}>
                    <Pressable
                        style={{ width: 120, padding: 4 }}
                        onPress={() => setShowModal(true)}>
                        <RemoveAccountTitle>Excluir conta</RemoveAccountTitle>
                    </Pressable>
                </RemoveAccountContainer>
            </PageWrapper>
        </>
    );
}
