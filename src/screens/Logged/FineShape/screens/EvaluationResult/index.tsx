import { View } from 'react-native';

import { PageWrapper, ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import AvatarImg from '@/assets/no-user.png';

import {
    CardMetabolismTitle,
    Content,
    Header,
    HeaderContent,
    MetabolismIdealText,
    MetabolismSubTitle,
    MetabolismTitlteKcal,
    PageTitle,
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
import { calcularMetabolismoBasal } from './helpers/calculateMetabolism';
import { verificarSituacaoPeso } from './helpers/calculateMass';
import { calcularIntervaloEMusculo } from './helpers/calculateMuscule';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';

import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { Skeleton } from '@/components/atoms/Skeleton';

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

    const { token } = useSelector((state: RootState) => state.user);
    const { goBack, navigate } = useNavigation();

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

    const { params }: RouteParams = useRoute();

    const getUserWeightHistory = useCallback(
        async (email: string) => {
            try {
                const headers = generateAuthHeaders(token!);
                // const { data } = await api.get(
                //     `/weight-histories?filters[user][email]=${email}&sort[0]=datetime:desc`,
                //     { headers }
                // );

                const { data } = await api.get(
                    `/fine-shapes?filters[email]=${email}&sort[0]=datetime:desc`,
                    { headers }
                );

                if (!data || data?.data?.length <= 0) return;

                // console.log('data', data?.data);
                // if (data) {
                setFineShapeDetails(current => ({
                    ...current,
                    histories: {
                        ...current.histories,
                        weight: data?.data.map(
                            (item: { attributes: { weight: number } }) => item?.attributes?.weight
                        ),
                        bodyAge: data?.data.map(
                            (item: { attributes: { body_age: number } }) =>
                                item?.attributes?.body_age
                        ),
                        imc: data?.data.map(
                            (item: { attributes: { imc: number } }) => item?.attributes?.imc
                        ),
                        month: data?.data.map((item: { attributes: { createdAt: string } }) =>
                            new Date(item.attributes.createdAt).getMonth()
                        ),
                    },
                }));
                // }
                //     user: {
                //         ...current.user,
                //         name: data[0]?.name,
                //         email: data[0]?.email,
                //         age: differenceInCalendarYears(
                //             new Date(),
                //             new Date(data[0]?.birthdate ?? new Date())
                //         ),
                //         height: data[0]?.height,
                //     },
                // }));
            } catch (err: any) {
                // console.error(
                //     'Ocorreu um erro ao buscar o histórico de pesos do usuário avaliado',
                //     err?.message
                // );
                console.error(
                    'Ocorreu um erro ao buscar o histórico de pesos do usuário avaliado',
                    err.response.data
                );
            }
        },
        [token]
    );

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
        if (fineShapeDetails?.id && fineShapeDetails?.user?.email) {
            getUserWeightHistory(fineShapeDetails?.user?.email);
        }
        //Se colocar a variável fineShapeDetails, ele vai ficar em loop infinito
    }, [getUserWeightHistory, fineShapeDetails?.id, fineShapeDetails?.user?.email]);

    // const colorBackGround = useMemo(() => {
    //     const result = calcularMetabolismoBasal({
    //         peso: fineShapeDetails?.user?.weight ?? 0,
    //         sexo: genre,
    //         idade: fineShapeDetails?.user?.age ?? 0,
    //     });
    // }, [fineShapeDetails, genre]);

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
    return (
        <ScrollablePageWrapper padding={0}>
            <Header>
                <View style={{ width: '100%' }}>
                    <HeaderGoBackButton
                        canGoBack
                        onPress={() =>
                            // @ts-ignore
                            params?.goBackScreen ? navigate(params?.goBackScreen) : goBack()
                        }
                    />
                </View>
                <PageTitle>Minha avaliação</PageTitle>

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
                {/* {fineShapeDetails?.histories?.weight &&
                fineShapeDetails?.histories?.weight?.length > 0 ? (
                    <Last6Months
                        isOneData={false}
                        weight={fineShapeDetails?.histories?.weight as number[]}
                        imc={fineShapeDetails?.histories?.imc as number[]}
                        height={fineShapeDetails?.user?.height as number}
                        // body_age={fineShapeDetails?.histories?.body_age as number[]}
                    />
                ) : ( */}
                {fineShapeDetails?.histories?.weight &&
                    fineShapeDetails?.histories?.weight?.length > 0 && (
                        <Last6Months
                            weight={fineShapeDetails?.histories.weight as number[]}
                            imc={fineShapeDetails.histories.imc as number[]}
                            body_age={fineShapeDetails.histories.bodyAge as number[]}
                            month={fineShapeDetails.histories.month as string[]}
                        />
                    )}
                {/* )} */}

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

                    <MetabolismSubTitle>Calorias usada para atividades básicas</MetabolismSubTitle>

                    <ViewCardMetabolism color={metabolismStatus.bgColor}>
                        <CardMetabolismTitle color={metabolismStatus.color}>
                            {/* {calcularMetabolismoBasal({
                                peso: fineShapeDetails?.user?.weight ?? 0,
                                sexo: genre,
                                idade: fineShapeDetails?.user?.age ?? 0,
                            })} */}
                            {fineShapeDetails?.user?.basalMetabolism ?? 0}
                            <MetabolismTitlteKcal color={metabolismStatus.color}>
                                {' '}
                                Kcal
                            </MetabolismTitlteKcal>
                        </CardMetabolismTitle>

                        {/* <MetabolismIdealText color={metabolismStatus.color}>
                            Ideal: {metabolismStatus.ideal}
                        </MetabolismIdealText> */}
                    </ViewCardMetabolism>
                </Section>
            </Content>
        </ScrollablePageWrapper>
    );
}
