import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { StudentCard } from '@/components/molecules/StudentCard';
import { Header } from '@/components/organisms/Header';

import { Title } from './styles';
import { useCallback, useEffect, useState } from 'react';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { CoachStudentsResponse, StudentDetails } from '@/types/coach/Students';

export function Students() {
    const [students, setStudents] = useState<StudentDetails[]>([]);

    const { token, email } = useSelector((state: RootState) => state.user);

    const renderStudentCard = ({ item }: { item: StudentDetails }) => {
        const parsedRenderInfo = {
            ...item,
            avatar: 'https://fakeimg.pl/72/',
            name: item?.name ?? 'Nome do aluno',
            objective: item?.objective ?? 'Objetivo do aluno',
            username: item?.email ?? '@usuario',
            isVerified: item?.blocked ?? false,
            level: item?.level ?? 1,
        };

        return <StudentCard key={item.id} user={parsedRenderInfo} />;
    };

    const parseUsersFromApiToStudents = useCallback((users: CoachStudentsResponse) => {
        const studentsFromApi = users?.data?.map(info => info?.attributes?.user?.data);
        const parsedStudents: StudentDetails[] = studentsFromApi?.map(student => ({
            id: student.id,
            email: student.attributes.email,
            weight: student.attributes.weight,
            height: student.attributes.height,
            name: student.attributes.name,
            blocked: student.attributes.blocked,
            phone: student.attributes.phone,
            objective: undefined,
            comments: undefined,
            avatar: undefined,
            engagement: undefined,
            level: undefined,
            metrics: undefined,
            monthlyFeeStatus: undefined,
            registerId: undefined,
            supplement: undefined,
        }));

        return parsedStudents;
    }, []);

    const getStudentsByCoach = useCallback(async () => {
        try {
            const headers = generateAuthHeaders(token!);
            const { data } = await api.get<CoachStudentsResponse>(
                `/user-coaches?populate=coach&populate=user&filters[coach][email][$eq]=${email}`,
                { headers }
            );

            const parsedStudents = parseUsersFromApiToStudents(data);
            setStudents(parsedStudents);
        } catch (err) {
            console.error('Ocorreu um erro ao buscar a lista de alunos', err);
        }
    }, [email, token, parseUsersFromApiToStudents]);

    useEffect(() => {
        getStudentsByCoach();
    }, [getStudentsByCoach]);

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
                        data={students}
                        renderItem={renderStudentCard}
                    />
                </View>
            </View>
        </ScrollablePageWrapper>
    );
}
