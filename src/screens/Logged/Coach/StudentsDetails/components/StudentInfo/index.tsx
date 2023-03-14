import { View } from 'react-native';

import { ContentInfo } from '../ContentInfo';
import { Observations } from '../Observations';
import { StudentUsername } from '@/components/atoms/StudentUsername';

import {
    Container,
    Content,
    ContentHeader,
    Divider,
    StudentImage,
    StudentName,
    Title,
} from './styles';

export function StudentInfo() {
    return (
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

                <Observations />
            </Content>
        </Container>
    );
}
