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
import { useState } from 'react';

interface StatusMetabolismProps {
    color: string;
    bgColor: string;
    text: string;
    ideal: string;
}

export function EvaluationResult() {
    const [statusMetabolism, setStatusMetabolism] = useState<StatusMetabolismProps>({
        color: '#27B22B',
        bgColor: '#E2FFE3',
        text: '1600',
        ideal: '1500 à 1764 Kcal',
    });

    return (
        <ScrollablePageWrapper padding={0}>
            <Header>
                <PageTitle>Minha avaliação</PageTitle>

                <HeaderContent>
                    <UserImage source={AvatarImg} />
                    <UserDescription>
                        <UserName numberOfLines={1}>
                            Carla Martins de Vasconcellos Almeida Barcelos Linhares
                        </UserName>
                        <UserDescriptionText>carla.martins@gmail.com</UserDescriptionText>
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            <UserDescriptionText>29 anos</UserDescriptionText>
                            <UserDescriptionText>•</UserDescriptionText>
                            <UserDescriptionText>1.60m</UserDescriptionText>
                        </View>
                    </UserDescription>
                </HeaderContent>
            </Header>

            <Content>
                <Last6Months />

                <StatusWeigth />

                <ImportValues />

                <ImportantsSizes />

                <Section>
                    <SectionTitle>Metabolismo basal</SectionTitle>

                    <MetabolismSubTitle>Calorias usada para atividades básicas</MetabolismSubTitle>

                    <ViewCardMetabolism color={statusMetabolism.bgColor}>
                        <CardMetabolismTitle color={statusMetabolism.color}>
                            {statusMetabolism.text}
                            <MetabolismTitlteKcal color={statusMetabolism.color}>
                                Kcal
                            </MetabolismTitlteKcal>
                        </CardMetabolismTitle>

                        <MetabolismIdealText color={statusMetabolism.color}>
                            Ideal: {statusMetabolism.ideal}
                        </MetabolismIdealText>
                    </ViewCardMetabolism>
                </Section>
            </Content>
        </ScrollablePageWrapper>
    );
}
