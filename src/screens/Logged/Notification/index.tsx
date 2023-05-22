import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { useState } from 'react';
import {
    CardSubTitle,
    CardTextContainer,
    CardTitle,
    ContainerNotification,
    NotifcationCard,
    TitleContainer,
    TitleScreen,
} from './style';
import { useTheme } from 'styled-components';
import { clearUserDataFromStorage } from '@/utils/handleStorage';
import { useDispatch } from 'react-redux';
import { clearUserInfo } from '@/store/user';
import { RouteNames } from '@/routes/routes_names';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { Ionicons } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';

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

    return (
        <PageWrapper bottomSpacing styles={{ flex: 1 }}>
            <View style={{ width: '100%' }}>
                <HeaderGoBackButton onPress={() => navigator.goBack()} />
            </View>

            <TitleContainer style={{ marginTop: 12 }}>
                <TitleScreen>Meu perfil</TitleScreen>
                <Pressable onPress={handleSignOff} style={{ marginLeft: 'auto' }}>
                    <Ionicons name="exit-outline" size={scale(32)} color={colors.green[700]} />
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
                            width33={false}
                            mgTop={0}
                            size={54}
                            source={item.source}
                        />
                        <CardTextContainer>
                            <CardTitle>{item.name}</CardTitle>
                            <CardSubTitle>{item.description}</CardSubTitle>
                        </CardTextContainer>
                    </NotifcationCard>
                ))}
            </ContainerNotification>

            {/* <TouchableOpacity style={{ marginBottom: 40 }} onPress={handleSignOff}>
                <View style={{ backgroundColor: colors.green[700], borderRadius: 8, padding: 8 }}>
                    <CardTitle style={{ color: colors.white }}>Deslogar</CardTitle>
                </View>
            </TouchableOpacity> */}
        </PageWrapper>
    );
}
