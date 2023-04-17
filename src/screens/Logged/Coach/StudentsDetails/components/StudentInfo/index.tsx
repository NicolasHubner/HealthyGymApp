import { View } from 'react-native';

import { ContentInfo } from '../ContentInfo';
import { Observations } from '../Observations';
import { StudentUsername } from '@/components/atoms/StudentUsername';

import AvatarMascImg from '@/assets/avatar_masc.png';
import AvatarFemImg from '@/assets/Avatar.png';

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
                    <StudentImage source={user?.gender === 'F' ? AvatarFemImg : AvatarMascImg} />
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
