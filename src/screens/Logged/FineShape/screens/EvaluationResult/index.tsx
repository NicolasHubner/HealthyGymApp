import { View } from 'react-native';

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import AvatarImg from '@/assets/Avatar.png';

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
import { useRoute } from '@react-navigation/native';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { UserFromApi as IUserFromApi } from '@/types/user';
import { differenceInCalendarYears } from 'date-fns';

interface StatusMetabolismProps {
    color: string;
    bgColor: string;
    text: string;
    ideal: string;
}
interface RouteParams {
    params?: {
        evaluation?: FineShapeFromApi;
        userEmail?: string;
    };
}

type UserFromApi = IUserFromApi & { id: number };

export function EvaluationResult() {
    const { token } = useSelector((state: RootState) => state.user);

    const [fineShapeDetails, setFineShapeDetails] = useState<FineShapeEvaluationDetail>(
        {} as FineShapeEvaluationDetail
    );
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
                const { data } = await api.get(
                    `weight-histories?filters[user][email]=${email}&sort[0]=datetime:desc`,
                    { headers }
                );

                console.log(JSON.stringify(data, null, 2));
            } catch (err: any) {
                console.log(
                    'Ocorreu um erro ao buscar o histórico de pesos do usuário avaliado',
                    err?.message
                );
            }
        },
        [token]
    );

    const getUserDataByEmail = useCallback(
        async (email: string) => {
            try {
                const headers = generateAuthHeaders(token!);
                const { data } = await api.get<UserFromApi[]>(`/users?filters[email]=${email}`, {
                    headers,
                });

                if (!data || data?.length <= 0) return;

                if (data?.length > 0) {
                    setFineShapeDetails(current => ({
                        ...current,
                        histories: {
                            ...current.histories,
                        },
                        user: {
                            ...current.user,
                            name: data[0]?.name,
                            email: data[0]?.email,
                            age: differenceInCalendarYears(
                                new Date(),
                                new Date(data[0]?.birthdate ?? new Date())
                            ),
                            height: data[0]?.height,
                        },
                    }));
                }
            } catch (err: any) {
                console.log(
                    'Ocorreu um erro ao buscar o histórico de pesos do usuário avaliado',
                    err?.message
                );
            }
        },
        [token]
    );

    useEffect(() => {
        console.log(JSON.stringify(fineShapeDetails, null, 2));
    }, [fineShapeDetails]);

    useEffect(() => {
        if (params && params?.evaluation && !params?.userEmail) {
            setFineShapeDetails({
                user: {
                    name: params?.evaluation?.name,
                    email: params?.evaluation?.email,
                    age: params?.evaluation?.age,
                    height: params?.evaluation?.height,
                    visceralFat: params?.evaluation?.visceral_fat,
                    bellySize: params?.evaluation?.belly,
                    bodyFat: params?.evaluation?.body_fat,
                    bustSize: params?.evaluation?.chest,
                    waistSize: params?.evaluation?.waist,
                    gender: params?.evaluation?.gender,
                },
            });
        }
    }, [params]);

    useEffect(() => {
        if (params?.userEmail) {
            getUserDataByEmail(params?.userEmail);
            getUserWeightHistory(params?.userEmail);
        }
    }, [params?.userEmail, getUserWeightHistory, getUserDataByEmail]);

    return (
        <ScrollablePageWrapper padding={0}>
            <Header>
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
                                {(fineShapeDetails?.user?.height ?? 1) / 100}m
                            </UserDescriptionText>
                        </View>
                    </UserDescription>
                </HeaderContent>
            </Header>

            <Content>
                {fineShapeDetails?.histories?.weight &&
                    fineShapeDetails?.histories?.weight?.length > 0 && <Last6Months />}

                <StatusWeigth
                    status={
                        verificarSituacaoPeso(
                            genre,
                            fineShapeDetails?.user?.age ?? 0,
                            fineShapeDetails?.user?.bodyFat ?? 0
                        ).situacao
                    }
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
                />

                <Section>
                    <SectionTitle>Metabolismo basal</SectionTitle>

                    <MetabolismSubTitle>Calorias usada para atividades básicas</MetabolismSubTitle>

                    <ViewCardMetabolism color={metabolismStatus.bgColor}>
                        <CardMetabolismTitle color={metabolismStatus.color}>
                            {calcularMetabolismoBasal({
                                peso: fineShapeDetails?.user?.weight ?? 0,
                                sexo: genre,
                                idade: fineShapeDetails?.user?.age ?? 0,
                            })}
                            <MetabolismTitlteKcal color={metabolismStatus.color}>
                                {' '}
                                Kcal
                            </MetabolismTitlteKcal>
                        </CardMetabolismTitle>

                        <MetabolismIdealText color={metabolismStatus.color}>
                            Ideal: {metabolismStatus.ideal}
                        </MetabolismIdealText>
                    </ViewCardMetabolism>
                </Section>
            </Content>
        </ScrollablePageWrapper>
    );
}
