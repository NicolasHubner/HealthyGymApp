import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { StudentCard } from '@/components/molecules/StudentCard';
import { Header } from '@/components/organisms/Header';
import { View } from 'react-native';

import { Title } from './styles';

const mockedUser = {
    avatar: 'https://fakeimg.pl/72/',
    name: 'Pedro Henrique',
    objective: 'Perder peso',
    username: 'usuario',
    isVerified: true,
    level: Math.floor(Math.random() * 1000),
};

export function Students() {
    return (
        <ScrollablePageWrapper bottomSpacing>
            <Header />

            <Title>Alunos</Title>

            <View style={{ gap: 16, marginTop: 18 }}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <StudentCard key={index} user={mockedUser} />
                ))}
            </View>
        </ScrollablePageWrapper>
    );
}
