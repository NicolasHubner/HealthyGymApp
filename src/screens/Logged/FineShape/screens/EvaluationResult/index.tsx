import { BackHandler, Share } from 'react-native';

import { PageWrapper, ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import AvatarImg from '@/assets/no-user.jpg';

import {
    CardMetabolismTitle,
    Content,
    Header,
    HeaderContent,
    MetabolismSubTitle,
    MetabolismTitlteKcal,
    Section,
    SectionTitle,
    UserDescription,
    UserDescriptionText,
    UserImage,
    UserName,
    ViewCardMetabolism,
} from './styles';
import { Last6Months } from './components/Last6Months';
import { StatusWeigth } from './components/StatusWeigth';
import { ImportValues } from './components/ImportantsValues';
import { ImportantsSizes } from './components/ImportantsSizes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
// import { api } from '@/services/api';
import { FineShapeEvaluationDetail, FineShapeFromApi } from '@/types/fineshape/FineShape';
import { verificarSituacaoPeso } from './helpers/calculateMass';
import { calcularIntervaloEMusculo } from './helpers/calculateMuscule';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';

import { Skeleton } from '@/components/atoms/Skeleton';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { CommonPageHeader } from '@/components/refactor/CommonPageHeader';
import { Button } from '@/components/atoms/Button';

import { Text, View } from 'native-base';

interface StatusMetabolismProps {
    color: string;
    bgColor: string;
    text: string;
    ideal: string;
}
interface RouteParams {
    params?: {
        evaluation?: FineShapeFromApi;
        goBackScreen?: string;
    };
}

export function EvaluationResult() {
    const [fineShapeDetails, setFineShapeDetails] = useState<FineShapeEvaluationDetail>(
        {} as FineShapeEvaluationDetail
    );
    const [loading, setLoading] = useState(true);

    const { token, isCoach, email } = useSelector((state: RootState) => state.user);

    const { navigate } = useNavigation<INavigation>();

    const navigation = useNavigation();

    const { params }: RouteParams = useRoute();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            // navigate(RouteNames.logged.fineshape.history);
            return true;
        });
    }, [navigate]);
    // console.log(navigation.getParent());

    const genre = useMemo(
        () => (fineShapeDetails?.user?.gender === 'M' ? 'masculino' : 'feminino'),
        [fineShapeDetails]
    );
    const metabolismStatus = useMemo(
        () =>
            ({
                color: '#27B22B',
                bgColor: '#E2FFE3',
                text: '1600',
                ideal: '1500 à 1764 Kcal',
            } as StatusMetabolismProps),
        []
    );
    // console.log(isCoach);

    const getUserWeightHistory = useCallback(
        async (mail: string) => {
            try {
                const headers = generateAuthHeaders(token!);
                const { data } = await api.get(
                    `/fine-shapes?filters[email]=${mail}&sort[0]=createdAt:desc`,
                    { headers }
                );

                if (!data || data?.data?.length <= 0) return;

                setFineShapeDetails(current => ({
                    ...current,
                    user: {
                        ...current.user,
                        name: data?.data[0]?.attributes?.name,
                        email: data?.data[0]?.attributes?.email,
                        age: data?.data[0]?.attributes?.age,
                        height: data?.data[0]?.attributes?.height,
                        visceralFat: data?.data[0]?.attributes?.visceral_fat,
                        bellySize: data?.data[0]?.attributes?.belly,
                        bodyFat: data?.data[0]?.attributes?.body_fat,
                        bustSize: data?.data[0]?.attributes?.chest,
                        waistSize: data?.data[0]?.attributes?.waist,
                        gender: data?.data[0].attributes?.gender,
                        bodyAge: data?.data[0].attributes?.body_age,
                        weight: data?.data[0].attributes?.weight,
                        imc: data?.data[0].attributes?.imc,
                        basalMetabolism: data?.data[0].attributes?.rm,
                        bodyMass: data?.data[0].attributes?.muscle,
                    },
                }));

                setLoading(false);
            } catch (err: any) {
                console.error(
                    'Ocorreu um erro ao buscar o histórico de pesos do usuário avaliado',
                    err.response.data
                );
            }
        },
        [token]
    );

    // Caso for usuário normal
    useEffect(() => {
        if (!isCoach) {
            async function getFineShapeDetails() {
                await getUserWeightHistory(email!);
                // setLoading(false);
            }
            getFineShapeDetails();
        }
    }, [getUserWeightHistory, email, isCoach]);

    useEffect(() => {
        if (params && params?.evaluation) {
            setFineShapeDetails({
                id: params?.evaluation?.id,
                user: {
                    name: params?.evaluation?.name,
                    email: params?.evaluation?.email,
                    age: params?.evaluation?.age,
                    height: params?.evaluation?.height,
                    visceralFat: params?.evaluation?.visceral_fat,
                    bellySize: params?.evaluation?.belly,
                    bodyFat: params?.evaluation?.body_fat,
                    bustSize: params?.evaluation?.chest,
                    bodyMass: params?.evaluation?.muscle,
                    waistSize: params?.evaluation?.waist,
                    gender: params?.evaluation?.gender,
                    bodyAge: params?.evaluation?.body_age,
                    weight: params?.evaluation?.weight,
                    imc: params?.evaluation?.imc,
                    basalMetabolism: params?.evaluation?.rm,
                },
            });
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        if (fineShapeDetails?.id && fineShapeDetails?.user?.email && isCoach) {
            getUserWeightHistory(fineShapeDetails?.user?.email);
        }
        //Se colocar a variável fineShapeDetails, ele vai ficar em loop infinito
    }, [getUserWeightHistory, fineShapeDetails?.id, fineShapeDetails?.user?.email, isCoach]);

    if (loading) {
        return (
            <PageWrapper styles={{ flex: 1 }}>
                <Skeleton height={200} borderRadius={16} />

                <View style={{ marginTop: 24, width: '100%', gap: 12 }}>
                    <Skeleton width="100%" height={36} borderRadius={16} />
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}>
                        <Skeleton width="30%" height={250} borderRadius={16} />
                        <Skeleton width="30%" height={250} borderRadius={16} />
                        <Skeleton width="30%" height={250} borderRadius={16} />
                    </View>
                    <Skeleton width="100%" height={36} borderRadius={16} />
                    <Skeleton height={200} borderRadius={16} />
                </View>
            </PageWrapper>
        );
    }
    if (!loading && !fineShapeDetails?.user?.name && !isCoach) {
        return (
            <>
                <CommonPageHeader
                    title="Avaliação"
                    float
                    onPress={() => {
                        if (!isCoach) {
                            navigate(RouteNames.logged.home);
                        } else {
                            navigate(RouteNames.logged.fineshape.history);
                        }
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        alignSelf: 'center',
                    }}>
                    <Text
                        fontFamily={'Rubik_500Medium'}
                        fontSize={16}
                        color={'#000'}
                        textAlign={'center'}>
                        Você não realizou nenhuma avaliação ainda. Entre em contato com um coach
                        para realizar sua avaliação.
                    </Text>
                </View>
            </>
        );
    }

    return (
        <>
            <CommonPageHeader
                title="Avaliação"
                float
                onPress={() => {
                    if (!isCoach) {
                        navigate(RouteNames.logged.home);
                    } else {
                        navigate(RouteNames.logged.fineshape.history);
                    }
                }}
            />
            <ScrollablePageWrapper
                padding={0}
                edges={['left', 'bottom', 'right']}
                bottomSpacing={60}
                styles={{ paddingTop: 76 }}>
                <Header>
                    <HeaderContent>
                        <UserImage source={AvatarImg} />
                        <UserDescription>
                            <UserName numberOfLines={1}>
                                {fineShapeDetails?.user?.name ?? 'Nome do avaliado'}
                            </UserName>
                            <UserDescriptionText numberOfLines={1} style={{ width: '97%' }}>
                                {fineShapeDetails?.user?.email ?? 'Email inválido'}
                            </UserDescriptionText>
                            <View style={{ flexDirection: 'row', gap: 6 }}>
                                <UserDescriptionText>
                                    {fineShapeDetails?.user?.age ?? 0} anos
                                </UserDescriptionText>
                                <UserDescriptionText>•</UserDescriptionText>
                                <UserDescriptionText>
                                    {((fineShapeDetails?.user?.height ?? 1) / 100).toFixed(2)}m
                                </UserDescriptionText>
                            </View>
                        </UserDescription>
                    </HeaderContent>
                </Header>

                <Content>
                    <Last6Months
                        emailUser={fineShapeDetails?.user?.email ?? ''}
                        // imc={finsShapeDetailsMemo?.imc as number[]}
                        // weight={finsShapeDetailsMemo?.weight as number[]}
                        // body_age={finsShapeDetailsMemo?.bodyAge as number[]}
                        // month={finsShapeDetailsMemo?.month as number[]}
                    />

                    <StatusWeigth
                        status={
                            verificarSituacaoPeso(
                                genre,
                                fineShapeDetails?.user?.age ?? 0,
                                fineShapeDetails?.user?.bodyFat ?? 0
                            ).situacao
                        }
                        gender={genre}
                    />

                    <ImportValues
                        massMuscule={calcularIntervaloEMusculo(
                            genre,
                            fineShapeDetails?.user?.age ?? 1,
                            fineShapeDetails?.user?.bodyMass ?? 1
                        )}
                        massFat={verificarSituacaoPeso(
                            genre,
                            fineShapeDetails?.user?.age ?? 1,
                            fineShapeDetails?.user?.bodyFat ?? 1
                        )}
                        visceralFat={fineShapeDetails?.user?.visceralFat ?? 1}
                        fat={fineShapeDetails?.user?.bodyFat ?? 1}
                    />

                    <ImportantsSizes
                        waist={fineShapeDetails?.user?.waistSize ?? 1}
                        belly={fineShapeDetails?.user?.bellySize ?? 1}
                        chest={fineShapeDetails?.user?.bustSize ?? 1}
                        gender={genre}
                    />

                    <Section>
                        <SectionTitle>Metabolismo basal</SectionTitle>

                        <MetabolismSubTitle>
                            Calorias usada para atividades básicas
                        </MetabolismSubTitle>

                        <ViewCardMetabolism color={metabolismStatus.bgColor}>
                            <CardMetabolismTitle color={metabolismStatus.color}>
                                {fineShapeDetails?.user?.basalMetabolism ?? 0}
                                <MetabolismTitlteKcal color={metabolismStatus.color}>
                                    {' '}
                                    Kcal
                                </MetabolismTitlteKcal>
                            </CardMetabolismTitle>
                        </ViewCardMetabolism>
                    </Section>

                    {isCoach && (
                        <Button
                            label="Compartilhar"
                            onPress={() => {
                                Share.share({
                                    message: `
                                Ola ${fineShapeDetails?.user?.name}, tudo bem? 🤗\n\n📲🌟 Descubra o CrossLifers - o aplicativo criado especialmente para acompanhar e potencializar o seu progresso no mundo fitness ! 🌍💙\n\n🔗 Baixe agora mesmo:\nAppleStore: https://apps.apple.com/br/app/crosslifers/id6447020889?l=en-GB\nPlayStore: https://play.google.com/store/apps/details?id=com.anonymous.CrossLife\n\nJunte-se a nós e embarque nessa jornada do mundo Fitness! 🚀✨ #CrossLifers #Saúdavel #VidaFitness`,
                                });
                            }}
                            fullWidth
                        />
                    )}
                </Content>
            </ScrollablePageWrapper>
        </>
    );
}
