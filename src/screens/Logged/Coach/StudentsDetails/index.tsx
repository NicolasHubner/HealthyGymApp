import { View } from 'react-native';

import { ContentInfo } from './components/ContentInfo';
import { StudentUsername } from '@/components/atoms/StudentUsername';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Header } from '@/components/organisms/Header';

import {
    Container,
    Content,
    ContentHeader,
    Divider,
    ObservationBox,
    ObservationContent,
    ObservationText,
    ObservationTitle,
    StudentImage,
    StudentName,
    Title,
} from './styles';

export function StudentsDetails() {
    return (
        <ScrollablePageWrapper bottomSpacing padding={0}>
            <View style={{ paddingHorizontal: 28 }}>
                <Header />
            </View>

            <Container>
                <Title>Aluno</Title>

                <Content>
                    <ContentHeader>
                        <StudentImage source={{ uri: 'https://fakeimg.pl/300/' }} />
                        <StudentName>Marcelo Tavares</StudentName>
                        <StudentUsername name="chaufinna" />
                    </ContentHeader>

                    <View style={{ paddingVertical: 24 }}>
                        <Divider />
                    </View>

                    <ContentInfo />

                    <View style={{ paddingVertical: 24 }}>
                        <Divider />
                    </View>

                    <ObservationContent>
                        <ObservationTitle>Observação</ObservationTitle>

                        <ObservationBox>
                            <ObservationText>
                                Mussum Ipsum, cacilds vidis litro abertis, idolum. Admodum accumsan
                                disputationi eu sit, outis. Vide electram sadipscing et per. Mé faiz
                                elemun elementum girarzis, nisi eros vermeio.
                            </ObservationText>
                        </ObservationBox>
                    </ObservationContent>
                </Content>
            </Container>
        </ScrollablePageWrapper>
    );
}
