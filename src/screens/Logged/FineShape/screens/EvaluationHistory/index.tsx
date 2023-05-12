import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { useDebounce } from '@/hooks/useDebounce';
import { RouteNames } from '@/routes/routes_names';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { FineShapeFromApi, FineShapeResponse } from '@/types/fineshape/FineShape';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { SearchUserInput, Title, UserCard, UserEmail, UserName } from './styles';

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

    const { navigate, goBack } = useNavigation<FineShapeScreenNavigation>();
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

                const newArray = (response?.data?.data ?? [])?.map(item => item?.attributes) ?? [];

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

    const listSearched = useCallback((term: string, list: FineShapeApi[]) => {
        return list?.filter(
            item =>
                item?.name?.toLowerCase().includes(term?.toLowerCase().trim()) ||
                item?.email?.toLowerCase().includes(term?.toLowerCase().trim())
        );
    }, []);

    const renderEmptyUsersList = useCallback(() => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} height={100} borderRadius={16} />
                    ))}
                </>
            );
        }
        return <Text>Nenhum usuário encontrado</Text>;
    }, [loading]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) getHistoryList();
        return () => {
            isMounted = false;
        };
    }, [getHistoryList]);

    return (
        <ScrollablePageWrapper bottomSpacing>
            <View style={{ width: '100%', paddingTop: 12 }}>
                <HeaderGoBackButton canGoBack onPress={() => goBack()} />
            </View>
            <View
                style={{
                    paddingTop: 12,
                    position: 'relative',
                    flex: 1,
                }}>
                <Title>Lista de avaliações</Title>

                <SearchUserInput
                    placeholder="Pesquise por nome ou email"
                    onChangeText={debounce}
                    style={{
                        marginTop: 12,
                    }}
                />

                <View style={{ height: '100%' }}>
                    <View
                        style={{
                            paddingBottom: 12,
                            paddingTop: 12,
                            maxHeight: 450,
                        }}>
                        <FlatList
                            data={
                                searchedTerm && searchedTerm?.length > 0
                                    ? listSearched(searchedTerm, evaluationsList) ?? []
                                    : evaluationsList ?? []
                            }
                            nestedScrollEnabled
                            contentContainerStyle={{ gap: 12 }}
                            onEndReached={() => fetchMore(pageInfo.next, pageInfo.count)}
                            onEndReachedThreshold={0.1}
                            ListEmptyComponent={renderEmptyUsersList}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    key={index}
                                    onPress={() => setSelectedEvaluationIndex(index)}>
                                    <UserCard
                                        key={index}
                                        selected={index === selectedEvaluationIndex}>
                                        <UserName>{item?.name}</UserName>
                                        <UserEmail>{item?.email ?? 'E-mail inválido'}</UserEmail>
                                        <UserEmail>
                                            {/** @ts-ignore */}
                                            {format(new Date(item?.createdAt), 'dd/MM/yyyy')}
                                        </UserEmail>
                                    </UserCard>
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
                                        evaluation: evaluationsList[selectedEvaluationIndex!],
                                    })
                                }
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollablePageWrapper>
    );
}
