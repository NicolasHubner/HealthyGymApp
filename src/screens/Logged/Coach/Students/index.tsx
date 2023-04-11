import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Skeleton } from '@/components/atoms/Skeleton';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { StudentCard } from '@/components/molecules/StudentCard';
import { Header } from '@/components/organisms/Header';

import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { CoachStudentsResponse, StudentDetails } from '@/types/coach/Students';
import { RootState } from '@/store';
import { api } from '@/services/api';

import { EmptyListText, Title } from './styles';

export function Students() {
    const [students, setStudents] = useState<StudentDetails[]>([]);
    const [loading, setLoading] = useState(true);

    const { token, email } = useSelector((state: RootState) => state.user);

    const renderStudentCard = ({ item }: { item: StudentDetails }) => {
        const parsedRenderInfo = {
            ...item,
            name: item?.name ?? 'Nome do aluno',
            objective: item?.objective ?? 'moderate-cardio',
            username: item?.email ?? '@usuario',
            isVerified: item?.blocked ?? false,
            level: item?.level ?? 1,
        };

        return <StudentCard key={item.id} user={parsedRenderInfo} />;
    };

    const renderEmptyList = () => {
        return (
            <>
                {loading ? (
                    <>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} height={96} borderRadius={16} />
                        ))}
                    </>
                ) : (
                    <View>
                        <EmptyListText>Você ainda não possui alunos cadastrados.</EmptyListText>
                    </View>
                )}
            </>
        );
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
            gender: student.attributes.gender,
            objective: student.attributes.goal_type,
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
        setLoading(true);

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
        } finally {
            setLoading(false);
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

            <View style={{ paddingHorizontal: 27, width: '100%' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 48,
                    }}>
                    <Title>Alunos</Title>
                </View>

                <View style={{ gap: 16, marginTop: 18, width: '100%', flex: 1 }}>
                    <FlatList
                        nestedScrollEnabled
                        contentContainerStyle={{ gap: 12 }}
                        data={students}
                        ListEmptyComponent={renderEmptyList}
                        renderItem={renderStudentCard}
                    />
                </View>
            </View>
        </ScrollablePageWrapper>
    );
}
