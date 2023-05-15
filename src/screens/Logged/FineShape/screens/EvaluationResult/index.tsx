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
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
// import { api } from '@/services/api';
import { FineShapeFromApi, PersonFineShape } from '@/types/fineshape/FineShape';
import { calcularMetabolismoBasal } from './helpers/calculateMetabolism';
import { verificarSituacaoPeso } from './helpers/calculateMass';
import { calcularIntervaloEMusculo } from './helpers/calculateMuscule';
import { useRoute } from '@react-navigation/native';

interface StatusMetabolismProps {
    color: string;
    bgColor: string;
    text: string;
    ideal: string;
}

// const initiatePerson: PersonFineShape = {
//     name: '',
//     phone: '',
//     genre: '',
//     etnia: '',
//     endereco: '',
//     complement: '',
//     cep: '',
//     data_nasc: '',
//     city: '',
//     state: '',
//     email: '',
//     isPhoneWhatsapp: false,
//     cpf: '',
//     weight: 0,
//     height: 0,
//     age: 0,
//     waist: 0,
//     belly: 0,
//     chest: 0,
//     imc: 0,
//     body_fat: 0,
//     body_age: 0,
//     muscle: 0,
//     visceral_fat: 0,
//     rm: 0,
// };

const initiatePerson: PersonFineShape = {
    name: 'John Doe',
    phone: '555-555-5555',
    genre: 'M',
    etnia: 'branca',
    endereco: '123 Main St',
    complement: 'Apt 1',
    cep: '12345-678',
    data_nasc: '01/01/1990',
    city: 'Anytown',
    state: 'CA',
    email: 'johndoe@example.com',
    isPhoneWhatsapp: true,
    cpf: '123.456.789-00',
    weight: 75.4,
    height: 175,
    age: 31,
    waist: 85,
    belly: 90,
    chest: 95,
    imc: 24.6,
    body_fat: 18,
    body_age: 28,
    muscle: 25,
    visceral_fat: 10,
    rm: 30,
};
interface RouteParams {
    params?: {
        evaluation?: FineShapeFromApi;
    };
}

export function EvaluationResult() {
    const { token, id } = useSelector((state: RootState) => state.user);

    const [person, setPerson] = useState<FineShapeFromApi | undefined>(undefined);
    // useEffect(() => {
    //     async function getMetabolism() {
    //         const res = await api.get(`fine-shapes`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         console.log(res.data.data);
    //     }
    //     getMetabolism();
    // }, [token, id]);

    const [statusMetabolism, setStatusMetabolism] = useState<StatusMetabolismProps>({
        color: '#27B22B',
        bgColor: '#E2FFE3',
        text: '1600',
        ideal: '1500 à 1764 Kcal',
    });

    const { params }: RouteParams = useRoute();

    const genre = useMemo(() => (person?.gender === 'M' ? 'masculino' : 'feminino'), [person]);

    useEffect(() => {
        if (params && params?.evaluation) {
            console.log({ evaluation: params.evaluation });
            setPerson(params.evaluation);
        }
    }, [params]);

    useEffect(() => {
        if (person) {
            console.log({ person });
        }
    }, [person]);

    return (
        <ScrollablePageWrapper padding={0}>
            <Header>
                <PageTitle>Minha avaliação</PageTitle>

                <HeaderContent>
                    <UserImage source={AvatarImg} />
                    <UserDescription>
                        <UserName numberOfLines={1}>{person?.name ?? 'Nome do avaliado'}</UserName>
                        <UserDescriptionText>
                            {person?.email ?? 'Email inválido'}
                        </UserDescriptionText>
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            <UserDescriptionText>{person?.age ?? 0} anos</UserDescriptionText>
                            <UserDescriptionText>•</UserDescriptionText>
                            <UserDescriptionText>
                                {(person?.height ?? 1) / 100}m
                            </UserDescriptionText>
                        </View>
                    </UserDescription>
                </HeaderContent>
            </Header>

            <Content>
                <Last6Months />

                <StatusWeigth
                    status={
                        verificarSituacaoPeso(genre, person?.age ?? 0, person?.body_fat ?? 0)
                            .situacao
                    }
                />

                <ImportValues
                    massMuscule={calcularIntervaloEMusculo(
                        genre,
                        person?.age ?? 1,
                        person?.muscle ?? 1
                    )}
                    massFat={verificarSituacaoPeso(genre, person?.age ?? 1, person?.body_fat ?? 1)}
                    visceralFat={person?.visceral_fat ?? 1}
                    fat={person?.body_fat ?? 1}
                />

                <ImportantsSizes
                    waist={person?.waist ?? 1}
                    belly={person?.belly ?? 1}
                    chest={person?.chest ?? 1}
                />

                <Section>
                    <SectionTitle>Metabolismo basal</SectionTitle>

                    <MetabolismSubTitle>Calorias usada para atividades básicas</MetabolismSubTitle>

                    <ViewCardMetabolism color={statusMetabolism.bgColor}>
                        <CardMetabolismTitle color={statusMetabolism.color}>
                            {calcularMetabolismoBasal({
                                peso: person?.weight ?? 0,
                                sexo: genre,
                                idade: person?.age ?? 0,
                            })}
                            <MetabolismTitlteKcal color={statusMetabolism.color}>
                                Kcal
                            </MetabolismTitlteKcal>
                        </CardMetabolismTitle>

                        {/* <MetabolismIdealText color={statusMetabolism.color}>
                            Ideal: {statusMetabolism.ideal}
                        </MetabolismIdealText> */}
                    </ViewCardMetabolism>
                </Section>
            </Content>
        </ScrollablePageWrapper>
    );
}
