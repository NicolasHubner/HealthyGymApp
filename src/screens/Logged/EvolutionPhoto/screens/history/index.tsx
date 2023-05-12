import { Button } from '@/components/atoms/Button';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { useDebounce } from '@/hooks/useDebounce';
import { RouteNames } from '@/routes/routes_names';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { EvolutionPhotoHistory, EvolutionPhotoHistoryResponse } from '@/types/evolution/Evolution';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useNavigation } from '@react-navigation/native';

import { useCallback, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSelector } from 'react-redux';
import { CompareInfoSection } from '../../components/CompareInfoSection';
import { HistoryList } from '../../components/HistoryList';

import { SearchUserInput, Title } from './styles';

type EvolutionPhotoHistoryApi = EvolutionPhotoHistory | undefined;

type RegisterIndexToCompare = { antes?: number; depois?: number };

export function EvolutionPhotoHistoryScreen() {
    const [searchedTerm, setSearchedTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedEvaluationIndex, setSelectedEvaluationIndex] = useState<number | undefined>(
        undefined
    );
    const [evolutionPhotoHistory, setEvolutionPhotoHistory] = useState<EvolutionPhotoHistory[]>(
        [] as EvolutionPhotoHistory[]
    );
    const [pageInfo, setPageInfo] = useState({
        next: 1,
        count: 1,
    });
    const [registersIndexToCompare, setRegistersIndexToCompare] = useState<RegisterIndexToCompare>({
        antes: undefined,
        depois: undefined,
    });

    const { navigate, goBack } = useNavigation<FineShapeScreenNavigation>();
    const { token, id } = useSelector((state: RootState) => state.user);

    const handleChangeInputValue = (text: string) => {
        setSearchedTerm(text);
    };
    const debounce = useDebounce(handleChangeInputValue);

    const getHistoryList = useCallback(
        async (page = 1, pageCount = 1) => {
            if (page > pageCount) return;

            try {
                const headers = generateAuthHeaders(token!);
                const response = await api.get<EvolutionPhotoHistoryResponse>(
                    `/evolution-photos?populate=user&filters[user][id]=${id}&sort[0]=datetime:desc`,
                    {
                        headers,
                    }
                );

                const newEvolutionPhotos = response?.data?.data ?? [];

                setEvolutionPhotoHistory(current => [...current, ...newEvolutionPhotos]);
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
        [token, id]
    );

    const fetchMore = useCallback(
        async (nextPage = 1, totalPages = 1) => {
            if (nextPage >= totalPages) return;
            await getHistoryList(nextPage + 1, totalPages);
        },
        [getHistoryList]
    );

    const listSearched = useCallback((term: string, list: EvolutionPhotoHistoryApi[]) => {
        return list?.filter(
            item =>
                item?.attributes?.user?.data?.attributes?.name
                    ?.toLowerCase()
                    .includes(term?.toLowerCase().trim()) ||
                item?.attributes?.user?.data?.attributes?.email
                    ?.toLowerCase()
                    .includes(term?.toLowerCase().trim())
        );
    }, []);

    const handleSelectRegistersToCompare = useCallback((index?: number) => {
        if (typeof index !== 'number') return;

        setRegistersIndexToCompare(current => {
            if (current?.antes === index) return { ...current, antes: undefined };
            if (current?.depois === index) return { ...current, depois: undefined };
            if (current?.antes === undefined) return { ...current, antes: index };
            if (current?.depois === undefined) return { ...current, depois: index };
            if (current?.antes === index && current?.depois === index) return current;
            return current;
        });
    }, []);

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
                    height: '100%',
                }}>
                <Title>Registros de evolução</Title>

                <SearchUserInput
                    placeholder="Pesquise por nome ou email"
                    onChangeText={debounce}
                    style={{
                        marginTop: 12,
                    }}
                />

                <View style={{ height: '100%' }}>
                    <HistoryList
                        evolutionPhotoHistory={evolutionPhotoHistory}
                        fetchMore={fetchMore}
                        loading={loading}
                        pageInfo={pageInfo}
                        handleSelectRegistersToCompare={handleSelectRegistersToCompare}
                        selectedEvaluationIndex={selectedEvaluationIndex}
                        setSelectedEvaluationIndex={setSelectedEvaluationIndex}
                        listSearched={listSearched}
                        searchedTerm={searchedTerm}
                        registersIndexToCompare={registersIndexToCompare}
                    />

                    <CompareInfoSection
                        evolutionPhotoHistory={evolutionPhotoHistory}
                        registersIndexToCompare={registersIndexToCompare}
                    />
                    <View style={{ gap: 12 }}>
                        <Pressable>
                            <Button
                                label="Registrar novas fotos"
                                fullWidth
                                onPress={() => navigate(RouteNames.logged.photos)}
                            />
                        </Pressable>
                        <Pressable>
                            <Button
                                // isDisabled={typeof selectedEvaluationIndex === 'undefined'}
                                isDisabled
                                label="Ver detalhes"
                                fullWidth
                                onPress={() =>
                                    // navigate(RouteNames.logged.fineshape.result, {
                                    //     evaluation: evolutionPhotoHistory[selectedEvaluationIndex!],
                                    // })
                                    undefined
                                }
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollablePageWrapper>
    );
}
