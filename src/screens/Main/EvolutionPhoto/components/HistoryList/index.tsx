import { Skeleton } from '@/components/atoms/Skeleton';
import { EvolutionPhotoHistory } from '@/types/evolution/Evolution';
import { format } from 'date-fns';
import { useCallback } from 'react';
import { FlatList, Pressable, Dimensions } from 'react-native';
import { Text, View } from 'react-native';

import { Checkbox, UserCard, UserEmail, UserName } from './styles';

const { height } = Dimensions.get('window');

import { MaterialIcons } from '@expo/vector-icons';
import { lightTheme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';

type EvolutionPhotoHistoryApi = EvolutionPhotoHistory | undefined;

interface HistoryListProps {
    searchedTerm: string;
    evolutionPhotoHistory: EvolutionPhotoHistory[];
    pageInfo: any;
    loading: boolean;
    selectedEvaluationIndex?: number;
    fetchMore: (next: number, count: number) => Promise<void>;
    setSelectedEvolutionPhotoId: React.Dispatch<React.SetStateAction<number | undefined>>;
    handleSelectRegistersToCompare: (index: number) => void;
    registersIndexToCompare: {
        antes?: number;
        depois?: number;
    };
    listSearched: (term: string, list: EvolutionPhotoHistoryApi[]) => any;
    isComparing?: boolean;
}

export function HistoryList({
    evolutionPhotoHistory,
    listSearched,
    pageInfo,
    searchedTerm,
    fetchMore,
    loading,
    setSelectedEvolutionPhotoId,
    registersIndexToCompare,
    selectedEvaluationIndex,
    handleSelectRegistersToCompare,
    isComparing,
}: HistoryListProps) {
    const verifyIfCheckboxIsChecked = (index: number) =>
        registersIndexToCompare?.antes === index || registersIndexToCompare?.depois === index;

    const { navigate } = useNavigation<FineShapeScreenNavigation>();

    const renderEmptyUsersList = useCallback(() => {
        if (loading) {
            return (
                <>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} height={100} borderRadius={16} />
                    ))}
                </>
            );
        }
        return <Text>Nenhum registro encontrado</Text>;
    }, [loading]);

    return (
        <View
            style={{
                paddingBottom: 12,
                paddingTop: 12,
                flexGrow: 1,
                minHeight: height * 0.8,
                // backgroundColor: 'red',
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
                renderItem={({ item }: { item: EvolutionPhotoHistory }) => (
                    <View>
                        <Pressable
                            key={item?.id}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                backgroundColor: lightTheme.colors.white,
                                borderRadius: 16,
                                paddingHorizontal: 16,
                                paddingVertical: 12,
                            }}
                            onPress={() => {
                                !isComparing &&
                                    navigate(RouteNames.logged.evolutionPhotos.compare, {
                                        evolutionPhotoBefore: evolutionPhotoHistory.find(
                                            i => i.id === item.id
                                        ),
                                    });
                                isComparing && handleSelectRegistersToCompare(Number(item?.id));
                            }}>
                            <UserCard
                                key={item?.id}
                                selected={item?.id === selectedEvaluationIndex}>
                                <UserName>
                                    {item?.attributes?.user?.data?.attributes?.name ?? ''}
                                </UserName>
                                <UserEmail>
                                    {item?.attributes?.user?.data?.attributes?.email ??
                                        'E-mail inválido'}
                                </UserEmail>
                                <UserEmail>
                                    {/* @ts-ignore */}
                                    {format(
                                        new Date(item?.attributes?.createdAt ?? new Date()),
                                        'dd/MM/yyyy'
                                    )}
                                </UserEmail>
                            </UserCard>
                            {!isComparing ? (
                                <MaterialIcons
                                    name="arrow-forward-ios"
                                    size={24}
                                    color="black"
                                    style={{ marginHorizontal: 8 }}
                                />
                            ) : (
                                <Checkbox
                                    value={verifyIfCheckboxIsChecked(Number(item?.id))}
                                    onValueChange={() =>
                                        handleSelectRegistersToCompare(Number(item?.id))
                                    }
                                />
                            )}
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );
}
