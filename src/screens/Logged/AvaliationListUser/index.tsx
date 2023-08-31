import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { CommonPageHeader } from '@/components/refactor/CommonPageHeader';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { RootState } from '@/store';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text } from 'native-base';
import { useSelector } from 'react-redux';
import {
    HeaderContent,
    UserImage,
    UserDescription,
    UserDescriptionText,
    Header,
} from '../FineShape/screens/EvaluationResult/styles';
import { UserName } from '../FineShape/screens/SelectUser/styles';
import AvatarImg from '@/assets/no-user.jpg';
import Last3Avaliations from './components/last3Avaliations';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { FineShapeFromApi } from '@/types/fineshape/FineShape';
import { Skeleton } from '@/components/atoms/Skeleton';
import { CardHistoric } from './components/cardHistoric';
import { Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

interface HistoricAvaliationProps {
    attributes: FineShapeFromApi;
}

interface IParams {
    data: FineShapeFromApi;
    photoCoach: string;
}

export default function AvaliationListUser() {
    const { isCoach, imageProfile, name, email, height, birthdate, token } = useSelector(
        (state: RootState) => state.user
    );

    const { params } = useRoute() as { params: IParams };

    const { colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [dataUser, setUserAvaliations] = useState<HistoricAvaliationProps[]>([]);

    const handlePressWpp = useCallback(async () => {
        const suported = await Linking.openURL(
            `https://wa.me/${dataUser[0].attributes.coach.data?.attributes.phone}?text=Ei+55${dataUser[0].attributes.coach.data?.attributes.phone}%2C+tudo+bem%3F+Podemos+marcar+uma+avalia%C3%A7%C3%A3o%3F`
        );

        if (suported) {
            await Linking.openURL(
                `https://wa.me/${dataUser[0].attributes.coach.data?.attributes.phone}?text=Ei+55${dataUser[0].attributes.coach.data?.attributes.phone}%2C+tudo+bem%3F+Podemos+marcar+uma+avalia%C3%A7%C3%A3o%3F`
            );
        } else {
            console.error('Não foi possível abrir o link');
        }
    }, [dataUser]);

    const getLastAvaliation = useCallback(async () => {
        setLoading(true);
        const headers = generateAuthHeaders(token!);
        try {
            const { data } = await api.get(
                `/fine-shapes?populate=coach&filters[email]=${email?.toLowerCase()}&sort=createdAt:desc`,
                {
                    headers,
                }
            );
            setUserAvaliations(data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [email, token]);

    useEffect(() => {
        getLastAvaliation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { navigate } = useNavigation<INavigation>();

    console.log(params);
    return (
        <>
            <CommonPageHeader
                title="Histórico de avaliações"
                float
                onPress={() => {
                    if (!isCoach) {
                        navigate(RouteNames.logged.home);
                    } else {
                        navigate(RouteNames.logged.fineshape.history);
                    }
                }}
            />

            <ScrollablePageWrapper
                padding={0}
                edges={['left', 'bottom', 'right']}
                styles={{ paddingTop: 76 }}
                bottomSpacing={70}>
                <Header>
                    <HeaderContent>
                        <UserImage
                            source={!params.photoCoach ? AvatarImg : { uri: params.photoCoach }}
                        />
                        <UserDescription>
                            <UserName style={{ color: '#FFFFFF' }} numberOfLines={1}>
                                {params.data.coach.data?.attributes.name ?? 'Nome do avaliado'}
                            </UserName>
                            <UserDescriptionText numberOfLines={1} style={{ width: '97%' }}>
                                {params.data.coach.data?.attributes.email ?? 'Email inválido'}
                            </UserDescriptionText>
                            {/* <View style={{ flexDirection: 'row', gap: 6 }}>
                                <UserDescriptionText>
                                    {differenceInYears(new Date(), new Date(birthdate!)) ?? 0} anos
                                </UserDescriptionText>
                                <UserDescriptionText>•</UserDescriptionText>
                                <UserDescriptionText>{height?.toFixed(2)}m</UserDescriptionText>
                            </View> */}
                        </UserDescription>

                        <View w={'25%'} alignItems={'center'}>
                            <TouchableOpacity onPress={() => handlePressWpp()}>
                                <FontAwesome name="whatsapp" size={48} color={colors.white} />
                            </TouchableOpacity>

                            <Text
                                fontSize={'10px'}
                                fontFamily={'Rubik_400Regular'}
                                letterSpacing={'0.2px'}
                                color={colors.white}
                                mt={2}>
                                Fale com coach!
                            </Text>
                        </View>
                    </HeaderContent>
                </Header>
                {!loading && dataUser.length >= 3 && (
                    <>
                        <View w={'90%'} mt={4}>
                            <Text bold fontSize={'20px'}>
                                3 últimas avaliações
                            </Text>
                            <Last3Avaliations data={dataUser.slice(0, 3)} />
                        </View>
                    </>
                )}
                {loading && (
                    <Skeleton height={210} borderRadius={10} width={'90%'} marginTop={16} />
                )}

                {!loading && dataUser.length < 3 && (
                    <>
                        <View w={'90%'} mt={6}>
                            <Text bold fontSize={'20px'} textAlign={'left'}>
                                Histórico
                            </Text>
                        </View>
                        <CardHistoric data={dataUser.slice(0, dataUser.length)} />
                    </>
                )}

                {!loading && dataUser.length > 3 && (
                    <>
                        <View w={'90%'} mt={6}>
                            <Text bold fontSize={'20px'} textAlign={'left'}>
                                Históricos
                            </Text>
                        </View>
                        <CardHistoric data={dataUser.slice(3, dataUser.length)} />
                    </>
                )}

                {loading && (
                    <View w={'90%'} h={'300px'}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} height={120} borderRadius={10} marginTop={8} />
                        ))}
                    </View>
                )}
            </ScrollablePageWrapper>
        </>
    );
}
