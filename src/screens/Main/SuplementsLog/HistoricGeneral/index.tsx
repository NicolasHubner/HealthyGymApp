import { Skeleton } from '@/components/atoms/Skeleton';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { SuplementHistoriesFromApi } from '@/types/suplement/SuplementHistories';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { View, Text, Divider, Image } from 'native-base';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

interface PercentegeProps {
    dateCreate: string;
    duration: number;
    quantity: number;
}

export const HistoricGeneral = () => {
    const [loading, setLoading] = useState(true);

    const { token, id: IdCoach } = useSelector((state: RootState) => state.user);

    const headers = generateAuthHeaders(token!);

    const { colors } = useTheme();

    const [suplements, setSuplements] = useState<SuplementHistoriesFromApi[]>([]);

    const getHistoricCoach = useCallback(async () => {
        try {
            const { data } = await api.get(
                `/suplement-histories?populate[0]=User.user_profile.photo.media&populate=Suplement.Image&filters[Coach][id][$eq]=${IdCoach}`,
                {
                    headers,
                }
            );
            setSuplements(data.data as SuplementHistoriesFromApi[]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [IdCoach, headers]);

    useEffect(() => {
        getHistoricCoach();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const percentegeSuplement = useCallback(
        ({ dateCreate, duration, quantity }: PercentegeProps) => {
            const today = new Date();

            let color = 'green';

            const dateCreated = new Date(dateCreate);

            const dateToFinish = new Date(
                dateCreated.setDate(dateCreated.getDate() + duration * quantity)
            );

            const diff = (dateToFinish.getTime() - today.getTime()) / (1000 * 3600 * 24);

            const percentege = Math.round((diff * 100) / (duration * quantity));

            if (percentege > 50) {
                color = '#589A5A';
            } else if (percentege > 25) {
                color = '#F2C94C';
            } else {
                color = '#EB5757';
            }

            return {
                percentege,
                color,
                diffDays: Math.round(diff),
            };
        },
        []
    );

    const handleStatus = useCallback(
        (status: string) => {
            switch (status) {
                case 'Comprado':
                    return colors.green[700];
                case 'Enviado':
                    return colors.orange[500];
                case 'Rejeitado':
                    return colors.red[500];
                default:
                    return colors.orange[500];
            }
        },
        [colors]
    );

    return (
        <View
            w={'98%'}
            // bgColor={'#FFFFFF'}
            borderRadius={16}
            px={2}
            py={4}
            pt={8}
            mt={4}
            flexDir={'column'}>
            <Text
                fontWeight={500}
                letterSpacing={2}
                fontSize={'14px'}
                textTransform={'uppercase'}
                color={colors.green[700]}
                textAlign={'left'}>
                Abastecimento Geral
            </Text>

            {!loading && suplements.length === 0 && (
                <>
                    <Text
                        fontWeight={400}
                        fontSize={'16px'}
                        color={colors.gray[500]}
                        textAlign={'center'}
                        mt={8}>
                        Nenhum suplemento enviado
                    </Text>
                </>
            )}

            {loading && suplements.length === 0 && (
                <>
                    <View mt={3}>
                        <Divider mt={'32px'} h={0.3} />
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Fragment key={index}>
                                <Skeleton
                                    key={index}
                                    width={'100%'}
                                    height={108}
                                    marginTop={16}
                                    borderRadius={16}
                                />

                                {index !== 5 && <Divider mt={'16px'} h={'0.6px'} />}
                            </Fragment>
                        ))}
                    </View>
                </>
            )}

            {!loading && suplements.length > 0 && <Divider mt={'32px'} h={0.3} />}

            {!loading &&
                suplements.length > 0 &&
                suplements.map((suplement, index) => (
                    <Fragment key={index}>
                        <View flexDir={'row'} alignItems={'center'} mt={3}>
                            <View>
                                <Image
                                    source={{
                                        uri: suplement.attributes.Suplement.data.attributes.Image
                                            .data[0].attributes.formats.thumbnail.url,
                                    }}
                                    alt={'Suplemento'}
                                    w={'96px'}
                                    h={'108px'}
                                    borderRadius={16}
                                    borderWidth={1.2}
                                    borderColor={colors.green[700]}
                                />
                                <View
                                    position={'absolute'}
                                    bottom={-2}
                                    right={-2}
                                    borderRadius={10}
                                    borderColor={'white'}
                                    borderWidth={2}>
                                    <Image
                                        source={
                                            suplement.attributes.User.data.attributes.user_profile
                                                .data !== null
                                                ? {
                                                      uri: suplement.attributes.User.data.attributes
                                                          .user_profile.data.attributes.photo.data
                                                          .attributes.formats.thumbnail.url,
                                                  }
                                                : require('@/assets/no-user.jpg')
                                        }
                                        alt={'Aluno'}
                                        size={'40px'}
                                        borderRadius={8}
                                    />
                                </View>
                            </View>

                            <View flexDir={'column'} w={'70%'} h={'100%'} pt={2} ml={2}>
                                <Text
                                    fontWeight={500}
                                    fontSize={'16px'}
                                    color={colors.black}
                                    lineHeight={'18px'}>
                                    {suplement.attributes.Suplement.data.attributes.Name} -{' '}
                                    {suplement.attributes.Quantity}
                                </Text>
                                <Text fontWeight={500} fontSize={'16px'} color={colors.gray[600]}>
                                    {suplement.attributes.User.data.attributes.name}
                                </Text>

                                <Text fontWeight={600} fontSize={'12px'} color={colors.gray[400]}>
                                    Status:{' '}
                                    <Text color={handleStatus(suplement.attributes.Status)}>
                                        {suplement.attributes.Status}
                                    </Text>
                                </Text>

                                <View
                                    bgColor={colors.gray[500]}
                                    borderRadius={8}
                                    py={1}
                                    mt={2}
                                    h={'24px'}
                                    alignItems={'flex-start'}
                                    justifyContent={'center'}>
                                    <View
                                        backgroundColor={
                                            percentegeSuplement({
                                                dateCreate: suplement.attributes.datetime,
                                                duration:
                                                    suplement.attributes.Suplement.data.attributes
                                                        .Duration_days,
                                                quantity: suplement.attributes.Quantity,
                                            }).color
                                        }
                                        h={'24px'}
                                        w={
                                            percentegeSuplement({
                                                dateCreate: suplement.attributes.datetime,
                                                duration:
                                                    suplement.attributes.Suplement.data.attributes
                                                        .Duration_days,
                                                quantity: suplement.attributes.Quantity,
                                            }).percentege + '%'
                                        }
                                        borderRadius={8}
                                    />
                                    <Text
                                        position={'absolute'}
                                        left={6}
                                        fontWeight={400}
                                        fontSize={'12px'}
                                        color={'white'}>
                                        {percentegeSuplement({
                                            dateCreate: suplement.attributes.datetime,
                                            duration:
                                                suplement.attributes.Suplement.data.attributes
                                                    .Duration_days,
                                            quantity: suplement.attributes.Quantity,
                                        }).percentege + '%'}{' '}
                                        -{' '}
                                        {
                                            percentegeSuplement({
                                                dateCreate: suplement.attributes.datetime,
                                                duration:
                                                    suplement.attributes.Suplement.data.attributes
                                                        .Duration_days,
                                                quantity: suplement.attributes.Quantity,
                                            }).diffDays
                                        }{' '}
                                        dias restantes
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {suplements.length - 1 !== index && <Divider mt={'16px'} h={'0.6px'} />}
                    </Fragment>
                ))}
        </View>
    );
};
