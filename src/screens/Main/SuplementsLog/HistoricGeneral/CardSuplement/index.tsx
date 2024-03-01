import React, { Fragment, useCallback } from 'react';

import { SuplementHistoriesFromApi } from '@/types/suplement/SuplementHistories';
import { View, Text, Image } from 'native-base';
import { useTheme } from 'styled-components';

interface PercentegeProps {
    dateCreate: string;
    duration: number;
    quantity: number;
    status: string;
}

interface CardSuplementLogProps {
    suplement: SuplementHistoriesFromApi;
}

export const CardSuplementLog = ({ suplement }: CardSuplementLogProps) => {
    const supplementData = {
        dateCreate: suplement.attributes.datetime,
        duration: suplement.attributes.Suplement.data.attributes.Duration_days,
        quantity: suplement.attributes.Quantity,
        status: suplement.attributes.Status,
    };

    const { colors } = useTheme();

    const percentegeSuplement = useCallback(
        ({ dateCreate, duration, quantity, status }: PercentegeProps) => {
            const today = new Date();

            if (status === 'Rejeitado')
                return {
                    percentege: 0,
                    color: '#EB5757',
                    diffDays: 0,
                };

            let color = 'green';

            const dateCreated = new Date(dateCreate);

            const dateToFinish = new Date(
                dateCreated.setDate(dateCreated.getDate() + duration * quantity)
            );

            let diff = (dateToFinish.getTime() - today.getTime()) / (1000 * 3600 * 24);

            let percentege = Math.round((diff * 100) / (duration * quantity));

            if (percentege > 50) {
                color = '#589A5A';
            } else if (percentege > 25) {
                color = '#F2C94C';
            } else {
                color = '#EB5757';
            }

            if (diff <= 0) {
                color = '#EB5757';
                diff = 0;
                percentege = 0;
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

    const percentageData = percentegeSuplement(supplementData);
    const isPercentageNonZero = percentageData.percentege !== 0;

    return (
        <Fragment>
            <View flexDir={'row'} alignItems={'center'} mt={3}>
                <View>
                    <Image
                        source={{
                            uri: suplement.attributes.Suplement.data.attributes.Image.data[0]
                                .attributes.formats.thumbnail.url,
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
                                suplement.attributes.User.data.attributes.user_profile.data !== null
                                    ? {
                                          uri: suplement.attributes.User.data.attributes
                                              .user_profile.data.attributes.photo.data.attributes
                                              .formats.thumbnail.url,
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
                            backgroundColor={percentegeSuplement(supplementData).color}
                            h={'24px'}
                            w={percentegeSuplement(supplementData).percentege + '%'}
                            borderRadius={8}
                        />

                        <Text
                            position={'absolute'}
                            left={6}
                            fontWeight={400}
                            fontSize={'12px'}
                            color={'white'}>
                            {isPercentageNonZero ? (
                                <>
                                    {percentageData.percentege + '%'} - {percentageData.diffDays}{' '}
                                    dias restantes
                                </>
                            ) : (
                                'Finalizado'
                            )}
                        </Text>
                    </View>
                </View>
            </View>
        </Fragment>
    );
};
