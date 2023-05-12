import { Skeleton } from '@/components/atoms/Skeleton';
import { EvolutionPhotoHistory } from '@/types/evolution/Evolution';
import { format } from 'date-fns';
import { useCallback } from 'react';
import { FlatList, Pressable } from 'react-native';
import { Text, View } from 'react-native';

import { UserCard, UserEmail, UserName, Checkbox } from './styles';

type EvolutionPhotoHistoryApi = EvolutionPhotoHistory | undefined;

interface HistoryListProps {
    searchedTerm: string;
    evolutionPhotoHistory: EvolutionPhotoHistory[];
    pageInfo: any;
    loading: boolean;
    selectedEvaluationIndex?: number;
    fetchMore: (next: number, count: number) => Promise<void>;
    setSelectedEvaluationIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
    handleSelectRegistersToCompare: (index: number) => void;
    registersIndexToCompare: {
        antes?: number;
        depois?: number;
    };
    listSearched: (term: string, list: EvolutionPhotoHistoryApi[]) => any;
}

export function HistoryList({
    evolutionPhotoHistory,
    listSearched,
    pageInfo,
    searchedTerm,
    fetchMore,
    loading,
    setSelectedEvaluationIndex,
    registersIndexToCompare,
    selectedEvaluationIndex,
    handleSelectRegistersToCompare,
}: HistoryListProps) {
    const verifyIfCheckboxIsChecked = (index: number) =>
        registersIndexToCompare?.antes === index || registersIndexToCompare?.depois === index;

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

    return (
        <View
            style={{
                paddingBottom: 12,
                paddingTop: 12,
                flexGrow: 1,
                maxHeight: 350,
            }}>
            <FlatList
                data={
                    searchedTerm && searchedTerm?.length > 0
                        ? listSearched(searchedTerm, evolutionPhotoHistory) ?? []
                        : evolutionPhotoHistory ?? []
                }
                nestedScrollEnabled
                contentContainerStyle={{ gap: 12 }}
                onEndReached={() => fetchMore(pageInfo.next, pageInfo.count)}
                onEndReachedThreshold={0.1}
                ListEmptyComponent={renderEmptyUsersList}
                renderItem={({ item, index }) => (
                    <View>
                        <Pressable
                            key={index}
                            style={{ flexDirection: 'row', position: 'relative' }}
                            onPress={() =>
                                setSelectedEvaluationIndex(current =>
                                    current !== index ? index : undefined
                                )
                            }>
                            <UserCard key={index} selected={index === selectedEvaluationIndex}>
                                <UserName>
                                    {item?.attributes?.user?.data?.attributes?.name ?? ''}
                                </UserName>
                                <UserEmail>
                                    {item?.attributes?.user?.data?.attributes?.email ??
                                        'E-mail inválido'}
                                </UserEmail>
                                <UserEmail>
                                    {format(new Date(item?.attributes?.createdAt), 'dd/MM/yyyy')}
                                </UserEmail>
                            </UserCard>
                        </Pressable>
                        <View
                            style={{
                                width: 24,
                                height: 24,
                                position: 'absolute',
                                right: 16,
                                top: 16,
                                borderRadius: 6,
                            }}>
                            <Checkbox
                                value={verifyIfCheckboxIsChecked(index)}
                                onValueChange={() => handleSelectRegistersToCompare(index)}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
