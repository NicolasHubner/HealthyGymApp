import { View } from 'react-native';

import { ContentInfo } from '../ContentInfo';
import { Observations } from '../Observations';
import { StudentUsername } from '@/components/atoms/StudentUsername';

import NoUserImg from '@/assets/no-user.jpg';

import { StudentDetails } from '@/types/coach/Students';

import {
    Container,
    Content,
    ContentHeader,
    Divider,
    StudentImage,
    StudentName,
    Title,
} from './styles';
import { Notion } from '@/types/coach/Notions';

interface StudentInfoProps {
    user: StudentDetails;
    notions?: Notion[];
}

export function StudentInfo({ user, notions }: StudentInfoProps) {
    return (
        <Container>
            <Title>Aluno</Title>

            <Content>
                <ContentHeader>
                    <StudentImage source={NoUserImg} />
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

                <Observations user={user} notions={notions} />
            </Content>
        </Container>
    );
}
