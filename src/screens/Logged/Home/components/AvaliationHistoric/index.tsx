import { View, Text, Image, Pressable } from 'native-base';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { FineShapeFromApi } from '@/types/fineshape/FineShape';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { differenceInDays } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';

interface HistoricAvaliationProps {
    data: FineShapeFromApi;
}

export const HistoricAvaliation = ({ data }: HistoricAvaliationProps) => {
    const { colors } = useTheme();

    const [loading, setLoading] = useState(true);

    const navigator = useNavigation<INavigation>();

    useEffect(() => {
        if (data) setLoading(false);
    }, [data]);

    const handleAvaliationDate = useCallback((date: string) => {
        const dateAvaliation = new Date(date);

        const limitDateAvaliation = new Date(dateAvaliation.getDate() + 15);

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

    if (loading) return <ActivityIndicator size="large" color={colors.green[500]} />;

    if (data && loading === false) {
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
                            backgroundColor={handleAvaliationDate(data.createdAt || '').colorBg}
                            borderRadius={16}
                            paddingY={1}
                            paddingX={3}>
                            <Text fontSize={'sm'} color={colors.white}>
                                {handleAvaliationDate(data.createdAt || '').date}
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
                                {data.coach ? `Coach ${data.coach.data?.attributes.name}` : 'Coach'}
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
                            source={require('@/assets/Avatar.png')}
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
