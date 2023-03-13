import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { StudentCard } from '@/components/molecules/StudentCard';
import { Header } from '@/components/organisms/Header';

import { Title } from './styles';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';

const mockedUser = {
    avatar: 'https://fakeimg.pl/72/',
    name: 'Pedro Henrique',
    objective: 'Perder peso',
    username: 'usuario',
    isVerified: true,
    level: 0,
};

export function Students() {
    const { navigate } = useNavigation<INavigation>();

    const handleNavigateToStudentDetails = () => {
        navigate(RouteNames.logged.coach.studentDetails);
    };

    return (
        <ScrollablePageWrapper bottomSpacing padding={0}>
            <View style={{ paddingHorizontal: 30, paddingTop: 50 }}>
                <Header />
            </View>

            <View style={{ paddingHorizontal: 27 }}>
                <Title>Alunos</Title>

                <View style={{ gap: 16, marginTop: 18, width: '100%' }}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        // <TouchableOpacity key={index} onPress={handleNavigateToStudentDetails}>
                        <StudentCard key={index} user={mockedUser} />
                        // </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollablePageWrapper>
    );
}
