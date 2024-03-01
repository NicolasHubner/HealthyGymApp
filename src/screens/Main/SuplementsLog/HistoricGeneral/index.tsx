import { api } from '@/services/api';
import { RootState } from '@/store';
import { SuplementHistoriesFromApi } from '@/types/suplement/SuplementHistories';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { View, Text, Divider, FlatList } from 'native-base';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { CardSuplementLog } from './CardSuplement';
import { Skeleton } from '@/components/atoms/Skeleton';

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

    const DividerMemo = useMemo(() => <Divider mt={'16px'} h={'0.6px'} />, []);

    const SkeletonMemo = useMemo(
        () => <Skeleton width={'100%'} height={108} marginTop={16} borderRadius={16} />,
        []
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

            {!loading && (
                <FlatList
                    data={suplements}
                    renderItem={({ item }) => <CardSuplementLog key={item.id} suplement={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        // padding: 16,
                        paddingBottom: 160,
                    }}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => DividerMemo}
                    // ListEmptyComponent={() => SkeletonMemo}
                    getItemLayout={(_, index) => ({
                        length: 108,
                        offset: 108 * index,
                        index,
                    })}
                />
            )}
        </View>
    );
};
