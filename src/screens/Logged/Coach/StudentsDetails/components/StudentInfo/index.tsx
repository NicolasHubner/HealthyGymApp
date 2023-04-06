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
import { StudentDetails } from '@/types/coach/Students';

interface StudentInfoProps {
    user: StudentDetails;
}

export function StudentInfo({ user }: StudentInfoProps) {
    return (
        <Container>
            <Title>Aluno</Title>

            <Content>
                <ContentHeader>
                    <StudentImage source={{ uri: 'https://fakeimg.pl/300/' }} />
                    <StudentName>{user?.name ?? 'Nome do aluno'}</StudentName>
                    <StudentUsername
                        name={user?.email ?? 'aluno@email.com'}
                        verified={!user?.blocked ?? true}
                    />
                </ContentHeader>

                <View style={{ paddingVertical: 24 }}>
                    <Divider />
                </View>

                <ContentInfo user={user} />

                <View style={{ paddingVertical: 24 }}>
                    <Divider />
                </View>

                <Observations />
            </Content>
        </Container>
    );
}
