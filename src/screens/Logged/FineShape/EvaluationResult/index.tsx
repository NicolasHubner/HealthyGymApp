import { View } from 'react-native';

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

import AvatarImg from '@/assets/Avatar.png';

import {
    Content,
    Header,
    HeaderContent,
    PageTitle,
    Section,
    SectionTitle,
    UserDescription,
    UserDescriptionText,
    UserImage,
    UserName,
} from './styles';

export function EvaluationResult() {
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
                <Section>
                    <SectionTitle>Últimos 6 meses</SectionTitle>
                </Section>

                <Section>
                    <SectionTitle>Status de massa</SectionTitle>
                </Section>

                <Section>
                    <SectionTitle>Valores importantes</SectionTitle>
                </Section>

                <Section>
                    <SectionTitle>Medidas importantes</SectionTitle>
                </Section>

                <Section>
                    <SectionTitle>Metabolismo basal</SectionTitle>
                </Section>
            </Content>
        </ScrollablePageWrapper>
    );
}
