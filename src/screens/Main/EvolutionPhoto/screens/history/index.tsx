import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { useDebounce } from '@/hooks/useDebounce';
import { RouteNames } from '@/routes/routes_names';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { EvolutionPhotoHistory, EvolutionPhotoHistoryResponse } from '@/types/evolution/Evolution';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useNavigation } from '@react-navigation/native';

import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { HistoryList } from '../../components/HistoryList';

import { AntDesign } from '@expo/vector-icons';
import { ButtonCreateNewRegister, InsightsButton, InsightsText, Title } from './styles';
import { CompareInfoSection } from '../../components/CompareInfoSection';
import { throwWarningToast } from '@/helpers/functions/handleToast';

type EvolutionPhotoHistoryApi = EvolutionPhotoHistory | undefined;

type RegisterIndexToCompare = { antes?: number; depois?: number };

export function EvolutionPhotoHistoryScreen() {
    const [searchedTerm, setSearchedTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedEvolutionPhotoId, setSelectedEvolutionPhotoId] = useState<number | undefined>(
        undefined
    );

    const [isComparing, setIsComparing] = useState(false);

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
                // const response = await api.get<EvolutionPhotoHistoryResponse>(
                //     `/evolution-photos?populate=user&filters[user][id]=${id}&sort[0]=datetime:desc`,
                //     {
                //         headers,
                //     }
                // );
                const responseTest = await api.get<EvolutionPhotoHistoryResponse>(
                    `/evolution-photo-v2s?populate=user&populate=side_photo&populate=front_photo&populate=back_photo&filters[user][id]=${id}&sort[0]=datetime:desc`,
                    {
                        headers,
                    }
                );

                const newEvolutionPhotos = responseTest?.data?.data ?? [];

                setEvolutionPhotoHistory(current => [...current, ...newEvolutionPhotos]);
                setPageInfo({
                    next: responseTest?.data?.meta?.pagination?.page ?? 1,
                    count: responseTest?.data?.meta?.pagination?.pageCount ?? 1,
                });
            } catch (err: any) {
                console.error('Ocorreu um erro buscar o histórico de avaliações', err?.message);
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

    const handleSelectRegistersToCompare = useCallback((photoId?: number) => {
        if (typeof photoId !== 'number') return;

        setRegistersIndexToCompare(current => {
            if (current?.antes === photoId) return { ...current, antes: undefined };
            if (current?.depois === photoId) return { ...current, depois: undefined };
            if (current?.antes === undefined) return { ...current, antes: photoId };
            if (current?.depois === undefined) return { ...current, depois: photoId };
            if (current?.antes === photoId && current?.depois === photoId) return current;
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

    const handleNavigateToCompareScreen = useCallback(() => {
        if (!registersIndexToCompare?.antes || !registersIndexToCompare?.depois) {
            throwWarningToast({
                title: 'Selecione dois registros para comparar',
                message: 'Selecione um registro antes e um registro depois',
            });
            return;
        }
        navigate(RouteNames.logged.evolutionPhotos.compare, {
            evolutionPhotoBefore: evolutionPhotoHistory?.find(
                item => item.id === registersIndexToCompare?.antes!
            ),
            evolutionPhotoAfter: evolutionPhotoHistory?.find(
                item => item.id === registersIndexToCompare?.depois!
            ),
        });
    }, [evolutionPhotoHistory, navigate, registersIndexToCompare]);

    return (
        <>
            <PageWrapper bottomSpacing={130} styles={{ flex: 1 }}>
                <View
                    style={{
                        width: '100%',
                        paddingTop: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <HeaderGoBackButton canGoBack onPress={() => goBack()} />
                    <InsightsButton onPress={() => setIsComparing(!isComparing)}>
                        <InsightsText>{!isComparing ? 'Comparação' : 'Cancelar'}</InsightsText>
                    </InsightsButton>
                </View>
                <View
                    style={{
                        paddingTop: 12,
                        position: 'relative',
                        flex: 1,
                        height: '100%',
                        width: '100%',
                    }}>
                    <Title>Registros de evolução</Title>

                    {/* <SearchUserInput
                    placeholder="Pesquise por nome ou email"
                    onChangeText={debounce}
                    style={{
                        marginTop: 12,
                    }}
                /> */}

                    <View style={{ height: '100%' }}>
                        <HistoryList
                            evolutionPhotoHistory={evolutionPhotoHistory}
                            fetchMore={fetchMore}
                            loading={loading}
                            pageInfo={pageInfo}
                            handleSelectRegistersToCompare={handleSelectRegistersToCompare}
                            selectedEvaluationIndex={selectedEvolutionPhotoId}
                            setSelectedEvolutionPhotoId={setSelectedEvolutionPhotoId}
                            listSearched={listSearched}
                            searchedTerm={searchedTerm}
                            registersIndexToCompare={registersIndexToCompare}
                            isComparing={isComparing}
                        />
                        {/* <View style={{ gap: 12 }}> */}
                        {/* <Pressable>
                            <Button
                                label="Registrar novas fotos"
                                fullWidth
                                onPress={() => navigate(RouteNames.logged.photos)}
                            />
                        </Pressable> */}
                        {/* </View> */}
                    </View>
                </View>
            </PageWrapper>

            {isComparing && (
                <ButtonCreateNewRegister onPress={handleNavigateToCompareScreen}>
                    <AntDesign name="arrowright" size={32} color="white" />
                </ButtonCreateNewRegister>
            )}
            {!isComparing && (
                <ButtonCreateNewRegister onPress={() => navigate(RouteNames.logged.photos)}>
                    <AntDesign name="plus" size={32} color="white" />
                </ButtonCreateNewRegister>
            )}
        </>
    );
}
