import { View } from 'react-native';

import { StudentUsername } from '@/components/atoms/StudentUsername';

import {
    Container,
    Divider,
    Image,
    Info,
    LevelValueContainer,
    LevelTitle,
    LevelValue,
    Name,
    ObjectiveLabel,
    ObjectiveValue,
    UserLevel,
} from './styles';

interface StudentCardProps {
    user: {
        avatar: string;
        name: string;
        objective: string;
        username: string;
        isVerified: boolean;
        level: number;
    };
}

export function StudentCard({ user }: StudentCardProps) {
    return (
        <Container>
            <Image source={{ uri: 'https://fakeimg.pl/72/' }} />

            <Info>
                <Name>{user.name ?? 'Usuário'}</Name>
                <View style={{ flexDirection: 'row', gap: 4, marginTop: 'auto' }}>
                    <ObjectiveLabel>Objetivo:</ObjectiveLabel>
                    <ObjectiveValue>{user.objective ?? 'Perder peso'}</ObjectiveValue>
                </View>
                <View style={{ marginTop: 'auto' }}>
                    <StudentUsername name={user.username ?? 'usuario'} />
                </View>
            </Info>

            <Divider />

            <UserLevel>
                <LevelTitle>Nível</LevelTitle>
                <LevelValueContainer>
                    {/* <LevelValue>{user.level ?? 0}</LevelValue> */}
                    <LevelValue>{Math.floor(Math.random() * 1000)}</LevelValue>
                </LevelValueContainer>
            </UserLevel>
        </Container>
    );
}
