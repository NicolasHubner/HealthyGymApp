import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { StudentCard } from '@/components/molecules/StudentCard';
import { Header } from '@/components/organisms/Header';

import { Title } from './styles';

const mockedUser = {
    avatar: 'https://fakeimg.pl/72/',
    name: 'Pedro Henrique',
    objective: 'Perder peso',
    username: 'usuario',
    isVerified: true,
    level: 0,
};

export function Students() {
    const renderStudentCard = ({ item }: any) => <StudentCard key={item} user={mockedUser} />;

    return (
        <ScrollablePageWrapper bottomSpacing padding={0}>
            <View style={{ paddingHorizontal: 30, paddingTop: 50 }}>
                <Header />
            </View>

            <View style={{ paddingHorizontal: 27 }}>
                <Title>Alunos</Title>

                <View style={{ gap: 16, marginTop: 18, width: '100%' }}>
                    <FlatList
                        nestedScrollEnabled
                        contentContainerStyle={{ gap: 12 }}
                        data={Array.from({ length: 2 })}
                        renderItem={renderStudentCard}
                    />
                </View>
            </View>
        </ScrollablePageWrapper>
    );
}
