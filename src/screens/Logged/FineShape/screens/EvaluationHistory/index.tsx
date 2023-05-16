import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { useDebounce } from '@/hooks/useDebounce';
import { RouteNames } from '@/routes/routes_names';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { FineShapeFromApi, FineShapeResponse } from '@/types/fineshape/FineShape';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { UserCard } from '../../components/UserHistoryCard';

import { SearchUserInput, Title } from './styles';

type FineShapeApi = FineShapeFromApi | undefined;

export function EvaluationHistory() {
    const [searchedTerm, setSearchedTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedEvaluationIndex, setSelectedEvaluationIndex] = useState<number | undefined>(
        undefined
    );
    const [evaluationsList, setEvaluationsList] = useState<FineShapeApi[]>([] as FineShapeApi[]);
    const [pageInfo, setPageInfo] = useState({
        next: 1,
        count: 1,
    });

    const { navigate } = useNavigation<FineShapeScreenNavigation>();
    const { token } = useSelector((state: RootState) => state.user);

    const handleChangeInputValue = (text: string) => {
        setSearchedTerm(text);
    };
    const debounce = useDebounce(handleChangeInputValue);

    const getHistoryList = useCallback(
        async (page = 1, pageCount = 1) => {
            if (page > pageCount) return;

            try {
                const headers = generateAuthHeaders(token!);
                const response = await api.get<FineShapeResponse>(
                    `/fine-shapes?pagination[page]=${page}&populate=coach`,
                    {
                        headers,
                    }
                );

                /** @ts-ignore */
                const newArray: FineShapeApi[] = response?.data?.data?.map(item => ({
                    ...item?.attributes,
                    id: item?.id,
                }));

                setEvaluationsList(current => [...current, ...newArray]);
                setPageInfo({
                    next: response?.data?.meta?.pagination?.page ?? 1,
                    count: response?.data?.meta?.pagination?.pageCount ?? 1,
                });
            } catch (err: any) {
                console.log('Ocorreu um erro buscar o histórico de avaliações', err?.message);
            } finally {
                setLoading(false);
            }
        },
        [token]
    );

    const fetchMore = useCallback(
        async (nextPage = 1, totalPages = 1) => {
            if (nextPage >= totalPages) return;
            await getHistoryList(nextPage + 1, totalPages);
        },
        [getHistoryList]
    );

    const getListItemsBySearchedTerm = useCallback((term: string, list: FineShapeApi[]) => {
        return list?.filter(
            item =>
                item?.name?.toLowerCase().includes(term?.toLowerCase().trim()) ||
                item?.email?.toLowerCase().includes(term?.toLowerCase().trim()) ||
                item?.phone?.toLowerCase().includes(term?.toLowerCase().trim())
        );
    }, []);

    const renderEmptyUsersList = useCallback(() => {
        if (loading) {
            return (
                <View style={{ gap: 12 }}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} height={100} borderRadius={16} />
                    ))}
                </View>
            );
        }
        return <Text>Nenhum usuário encontrado</Text>;
    }, [loading]);

    const renderSeparatorComponent = useCallback(() => {
        return <View style={{ height: 1, backgroundColor: '#bbb', marginVertical: 6 }} />;
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) getHistoryList();
        return () => {
            isMounted = false;
        };
    }, [getHistoryList]);

    return (
        <PageWrapper bottomSpacing={100} styles={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <SearchUserInput
                    placeholder="Pesquise por nome, email ou telefone"
                    onChangeText={debounce}
                    style={{ marginBottom: 12 }}
                />

                <Title>Histórico</Title>

                <View style={{ height: '100%' }}>
                    <View
                        style={{
                            paddingBottom: 12,
                            paddingTop: 12,
                            flex: 1,
                        }}>
                        <FlatList
                            data={
                                searchedTerm && searchedTerm?.length > 0
                                    ? getListItemsBySearchedTerm(searchedTerm, evaluationsList) ??
                                      []
                                    : evaluationsList ?? []
                            }
                            nestedScrollEnabled
                            onEndReached={() => fetchMore(pageInfo.next, pageInfo.count)}
                            onEndReachedThreshold={0.1}
                            ListEmptyComponent={renderEmptyUsersList}
                            ItemSeparatorComponent={renderSeparatorComponent}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    key={index}
                                    onPress={() => setSelectedEvaluationIndex(Number(item!.id!))}>
                                    <UserCard user={item} selectedId={selectedEvaluationIndex} />
                                </Pressable>
                            )}
                        />
                    </View>
                    <View style={{ gap: 12 }}>
                        <Pressable>
                            <Button
                                label="Criar uma nova avaliação"
                                fullWidth
                                onPress={() => navigate(RouteNames.logged.fineshape.initial)}
                            />
                        </Pressable>
                        <Pressable>
                            <Button
                                isDisabled={typeof selectedEvaluationIndex === 'undefined'}
                                label="Ver detalhes"
                                fullWidth
                                onPress={() =>
                                    navigate(RouteNames.logged.fineshape.result, {
                                        userEmail: evaluationsList.find(
                                            item => item?.id === selectedEvaluationIndex
                                        )?.email,
                                        evaluation:
                                            evaluationsList.find(
                                                item => item?.id === selectedEvaluationIndex
                                            ) ?? evaluationsList[0],
                                    })
                                }
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </PageWrapper>
    );
}
