import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { useDebounce } from '@/hooks/useDebounce';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { setFineshapInfo } from '@/store/fineshape';
import { UserFromApi } from '@/types/user';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, FlatList, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SearchUserInput, Title, UserCard, UserEmail, UserName } from './styles';

type UserFromUserListApi = UserFromApi & { id: number };

const mockedArray = Array.from({ length: 20 }).map((_, index) => index);
const pageSize = 25;

export function EvaluationHistory() {
    const [searchedTerm, setSearchedTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [evaluationsList, setEvaluationsList] = useState(mockedArray);
    const [pageInfo, setPageInfo] = useState({
        next: 1,
        count: 1,
    });

    const { token } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleChangeInputValue = (text: string) => {
        setSearchedTerm(text);
    };

    const debounce = useDebounce(handleChangeInputValue);

    const getHistoryList = useCallback(
        async (type: 'first' | 'refetch' = 'first') => {
            if (pageInfo.next > pageInfo.count) return;

            try {
                const headers = generateAuthHeaders(token!);
                const response = await api.get(`/fine-shapes?pagination[page]=${pageInfo?.next}`, {
                    headers,
                });

                if (type === 'first') {
                    setEvaluationsList(mockedArray ?? []);
                } else {
                    setEvaluationsList(current => [...current, ...mockedArray]);
                }

                if (type === 'first') {
                    setPageInfo(current => ({
                        ...current,
                        count: response?.data?.meta?.pagination?.pageCount,
                    }));
                } else {
                    setPageInfo(current => ({
                        ...current,
                        next: current.next + 1,
                    }));
                }
            } catch (err: any) {
                console.log('Ocorreu um erro buscar o histórico de avaliações', err?.message);
            } finally {
                setLoading(false);
            }
        },
        [token, pageInfo?.next]
    );

    const fetchMore = useCallback(async () => {
        await getHistoryList('refetch');
    }, [getHistoryList]);

    const renderEmptyUsersList = useCallback(() => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} height={60} borderRadius={16} />
                    ))}
                </>
            );
        }

        return <Text>Nenhum usuário encontrado</Text>;
    }, [loading]);

    useEffect(() => {
        console.log({ pageInfo });
    }, [pageInfo]);

    useEffect(() => {
        getHistoryList();
    }, [getHistoryList]);

    return (
        <PageWrapper>
            <View
                style={{
                    paddingBottom: 120,
                    position: 'relative',
                    height: '100%',
                }}>
                {/* <Title></Title> */}

                <SearchUserInput
                    placeholder="Pesquise por nome, email ou data"
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
                            height: '100%',
                        }}>
                        <FlatList
                            data={
                                searchedTerm && searchedTerm?.length > 0
                                    ? evaluationsList
                                    : evaluationsList
                            }
                            contentContainerStyle={{ gap: 12 }}
                            onEndReached={fetchMore}
                            onEndReachedThreshold={0.3}
                            ListEmptyComponent={renderEmptyUsersList}
                            renderItem={({ item, index }) => (
                                <Pressable key={item} onPress={() => undefined}>
                                    <UserCard key={index} selected={false}>
                                        <UserName>Nome do usuário</UserName>
                                        <UserEmail>Email do usuário</UserEmail>
                                        <UserEmail>Data da avaliação</UserEmail>
                                    </UserCard>
                                </Pressable>
                            )}
                        />
                    </View>
                    <Pressable>
                        <Button label="Continuar" fullWidth onPress={() => undefined} />
                    </Pressable>
                </View>
            </View>
        </PageWrapper>
    );
}
