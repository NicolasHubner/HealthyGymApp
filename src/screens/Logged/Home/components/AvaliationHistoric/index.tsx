import { View, Text, Image, Pressable } from 'native-base';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { FineShapeFromApi } from '@/types/fineshape/FineShape';
import { useCallback, useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useSelector } from 'react-redux';
import { api } from '@/services/api';

interface HistoricAvaliationProps {
    data: FineShapeFromApi;
}

export const HistoricAvaliation = ({ data: DataUser }: HistoricAvaliationProps) => {
    const { colors } = useTheme();

    const [photoCoach, setPhotoCoach] = useState<string>('');

    const { token } = useSelector((state: RootState) => state.user);

    const headers = generateAuthHeaders(token!);

    const navigator = useNavigation<INavigation>();

    const getPhotoCoach = useCallback(async () => {
        if (DataUser) {
            const idCoach = DataUser.coach.data?.id;

            if (idCoach) {
                try {
                    const { data } = await api.get(
                        `/user-profiles?populate=photo&filters[user][id][$eq]=${idCoach}&sort=datetime:DESC&pagination[limit]=1`,
                        {
                            headers,
                        }
                    );

                    if (data.data.length > 0) {
                        setPhotoCoach(data.data[0].attributes.photo.data.attributes.url);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }, [DataUser, headers]);

    useEffect(() => {
        getPhotoCoach();
    }, [getPhotoCoach]);

    const handleAvaliationDate = useCallback((date: string) => {
        const dateAvaliation = new Date(date);

        const limitDateAvaliation = new Date();

        limitDateAvaliation.setDate(dateAvaliation.getDate() + 15);

        const returnDate =
            (limitDateAvaliation.getDate() < 10
                ? '0' + limitDateAvaliation.getDate()
                : limitDateAvaliation.getDate()) +
            '/' +
            (limitDateAvaliation.getMonth() < 10
                ? '0' + (limitDateAvaliation.getMonth() + 1)
                : limitDateAvaliation.getMonth() + 1);

        const diffDays = Math.abs(differenceInDays(new Date(), dateAvaliation));

        if (diffDays > 15)
            return {
                date: `Avaliação vencida em ${returnDate}`,
                colorBg: '#EB5757',
            };
        if (diffDays >= 12 && diffDays < 15)
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
                onPress={() => navigator.navigate(RouteNames.logged.listUserAvaliations)}>
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
                                photoCoach.length > 0
                                    ? { uri: photoCoach }
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
