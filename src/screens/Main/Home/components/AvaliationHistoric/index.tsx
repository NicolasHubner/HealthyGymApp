import { View, Text, Image, Pressable } from 'native-base';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { FineShapeFromApi } from '@/types/fineshape/FineShape';
import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/services/api';
import { setUserCoach } from '@/store/user';

interface HistoricAvaliationProps {
    data: FineShapeFromApi;
}

export const HistoricAvaliation = ({ data: DataUser }: HistoricAvaliationProps) => {
    const { colors } = useTheme();

    const { token, coachData } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();

    const headers = generateAuthHeaders(token!);

    const navigator = useNavigation<INavigation>();

    const getPhotoCoach = useCallback(async () => {
        if (DataUser) {
            const idCoach = DataUser.coach.data?.id;

            if (idCoach) {
                try {
                    const coachPhoto = api.get(
                        `/user-profiles?populate=photo&filters[user][id][$eq]=${idCoach}&sort=datetime:DESC&pagination[limit]=1`,
                        {
                            headers,
                        }
                    );

                    const dataCoach = api.get(`/users/${idCoach}`, {
                        headers,
                    });

                    const [photo, data] = await Promise.all([coachPhoto, dataCoach]);

                    if (data.data.length > 0) {
                        dispatch(
                            setUserCoach({
                                id: idCoach,
                                phone: data.data[0].attributes.phone,
                                email: data.data[0].attributes.email,
                                name: data.data[0].attributes.name,
                            })
                        );
                    }

                    if (photo.data.data.length > 0) {
                        dispatch(
                            setUserCoach({
                                imageProfile:
                                    photo.data.data[0].attributes.photo.data.attributes.url,
                            })
                        );
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DataUser, headers]);

    useEffect(() => {
        getPhotoCoach();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAvaliationDate = useCallback((date: string) => {
        const dateAvaliation = new Date(date);
        const limitDateAvaliation = new Date(dateAvaliation);

        // Adiciona 15 dias à data de avaliação
        limitDateAvaliation.setDate(dateAvaliation.getDate() + 15);

        // Verifica se a data resultante ultrapassou o final do mês
        if (limitDateAvaliation.getDate() < dateAvaliation.getDate()) {
            // Se sim, ajusta o mês
            limitDateAvaliation.setMonth(dateAvaliation.getMonth() + 1);
        }

        const returnDate =
            (limitDateAvaliation.getDate() < 10
                ? '0' + limitDateAvaliation.getDate()
                : limitDateAvaliation.getDate()) +
            '/' +
            (limitDateAvaliation.getMonth() + 1 < 10
                ? '0' + (limitDateAvaliation.getMonth() + 1)
                : limitDateAvaliation.getMonth() + 1);

        const currentDate = new Date();
        const timeDifference = limitDateAvaliation.getTime() - currentDate.getTime();
        const diffDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (diffDays <= 0)
            return {
                date: `Avaliação vencida em ${returnDate}`,
                colorBg: '#EB5757',
            };
        if (diffDays <= 3)
            return {
                date: `Avaliação válida até ${returnDate}`,
                colorBg: '#F2994A',
            };
        return {
            date: `Avaliação válida até ${returnDate}`,
            colorBg: '#589A5A',
        };
    }, []);

    if (DataUser) {
        return (
            <Pressable
                style={{ width: '100%', alignItems: 'center' }}
                onPress={() =>
                    navigator.navigate(RouteNames.logged.listUserAvaliations, {
                        data: DataUser,
                        photoCoach: coachData?.imageProfile || '',
                    })
                }>
                <View
                    width={'96%'}
                    h={'144px'}
                    backgroundColor={colors.white}
                    borderRadius={16}
                    shadow={1}
                    mt={4}
                    paddingX={4}
                    paddingY={4}
                    flexDir={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    overflow={'hidden'}>
                    <View
                        flexDirection={'column'}
                        alignItems={'flex-start'}
                        justifyContent={'space-between'}
                        height={'100%'}>
                        <View
                            backgroundColor={handleAvaliationDate(DataUser.createdAt || '').colorBg}
                            borderRadius={16}
                            paddingY={1}
                            paddingX={3}>
                            <Text fontSize={'sm'} color={colors.white}>
                                {handleAvaliationDate(DataUser.createdAt || '').date}
                            </Text>
                        </View>
                        <View>
                            <Text
                                fontSize={'16px'}
                                fontWeight={'bold'}
                                color={colors.black}
                                lineHeight={'16px'}
                                letterSpacing={0.8}>
                                Histórico de avaliações
                            </Text>
                            <Text fontSize={'xs'} color={colors.gray[600]}>
                                {DataUser.coach
                                    ? `Coach ${DataUser.coach.data?.attributes.name}`
                                    : 'Coach'}
                            </Text>
                        </View>

                        <View alignItems={'center'} justifyContent={'center'} flexDirection={'row'}>
                            <Text color={colors.green[900]} mr={1}>
                                Ver todas as avaliações
                            </Text>
                            <AntDesign name="right" size={16} color={colors.green[900]} />
                        </View>
                    </View>
                    <View marginRight={2}>
                        <Image
                            source={
                                coachData?.imageProfile && coachData?.imageProfile.length > 0
                                    ? { uri: coachData?.imageProfile }
                                    : require('@/assets/no-user.jpg')
                            }
                            alt="Avatar"
                            size={'md'}
                            borderRadius={50}
                            backgroundColor={'black'}
                            style={{ borderWidth: 4, borderColor: colors.green[500] }}
                        />
                    </View>
                    <Image
                        source={require('@/assets/HistoricAvaliations/Vector_300.png')}
                        alt="Vector"
                        width={'100%'}
                        height={'50%'}
                        position={'absolute'}
                        bottom={-5}
                        right={0}
                        zIndex={-1}
                        style={{ transform: [{ rotate: '-3deg' }] }}
                    />
                </View>
            </Pressable>
        );
    }
    return <></>;
};
