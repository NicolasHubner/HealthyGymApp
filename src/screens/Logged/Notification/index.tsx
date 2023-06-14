import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { useState } from 'react';
import {
    CardSubTitle,
    CardTextContainer,
    CardTitle,
    ConfirmButton,
    ConfirmButtonText,
    ConfirmInput,
    ConfirmTextMessage,
    ContainerNotification,
    NotifcationCard,
    RemoveAccountContainer,
    RemoveAccountTitle,
    TitleContainer,
    TitleScreen,
} from './style';
import { useTheme } from 'styled-components';
import { clearUserDataFromStorage } from '@/utils/handleStorage';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from '@/store/user';
import { RouteNames } from '@/routes/routes_names';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { Linking, Pressable, View } from 'react-native';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Spinner } from 'native-base';
import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';

interface INotification {
    id: number;
    name: string;
    description: string;
    iconName?: string;
    typeIcon?: string;
    route?: string;
    bgColor?: string;
    source?: any;
}

export default function Notification() {
    const [showModal, setShowModal] = useState(false);
    const [confirmedExclusion, setConfirmedExclusion] = useState(false);
    const [loadingExclusion, setLoadingExclusion] = useState(false);

    const { id, token } = useSelector((state: RootState) => state.user);
    const { colors } = useTheme();
    const navigator = useNavigation() as INavigation;

    const [notification, _] = useState<INotification[]>([
        {
            id: 1,
            name: 'Vamos fazer suas fotos',
            description: 'Com essas fotos conseguiremos ver sua evolução',
            iconName: 'camera',
            typeIcon: 'Entypo',
            bgColor: '#FD5977',
            route: RouteNames.logged.photos,
        },
    ]);

    const dispatch = useDispatch();

    const handleSignOff = async () => {
        await clearUserDataFromStorage();
        await dispatch(clearUserInfo());
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
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Remover conta</Modal.Header>
                    <Modal.Body>
                        <ConfirmTextMessage>
                            Digite a palavra "Confirmo" para excluir a conta.
                        </ConfirmTextMessage>
                        <ConfirmInput
                            onChangeText={e => {
                                if (e.toLowerCase() === 'confirmo' && !confirmedExclusion) {
                                    setConfirmedExclusion(true);
                                }

                                if (e.toLowerCase() !== 'confirmo' && confirmedExclusion) {
                                    setConfirmedExclusion(false);
                                }
                            }}
                        />
                        <ConfirmButton disabled={!confirmedExclusion} onPress={handleRemoveAccount}>
                            <ConfirmButtonText>
                                {loadingExclusion ? <Spinner color="#fefefe" /> : 'Confirmar'}
                            </ConfirmButtonText>
                        </ConfirmButton>
                    </Modal.Body>
                </Modal.Content>
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
                                // mgTop={0}
                                size={60}
                                source={item.source}
                            />
                            <CardTextContainer>
                                <CardTitle>{item.name}</CardTitle>
                                <CardSubTitle>{item.description}</CardSubTitle>
                            </CardTextContainer>
                        </NotifcationCard>
                    ))}
                    <NotifcationCard
                        style={{
                            marginTop: 16,
                            borderTopWidth: 1,
                            paddingTop: 16,
                            borderTopColor: colors.gray[300],
                        }}
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
                <RemoveAccountContainer style={{ marginTop: 8 }}>
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
