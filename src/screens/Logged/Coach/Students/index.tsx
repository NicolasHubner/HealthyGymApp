import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Skeleton } from '@/components/atoms/Skeleton';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { StudentCard } from '@/components/molecules/StudentCard';
import { Header } from '@/components/organisms/Header';

import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { StudentDetails, UserDetails } from '@/types/coach/Students';
import { RootState } from '@/store';
import { api } from '@/services/api';

import { EmptyListText, Title } from './styles';
import { FineShapeFromApi } from '@/types/fineshape/FineShape';
import { generateRandomUuid } from '@/helpers/functions/generateUuid';
import { Input } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useDebounce } from '@/hooks/useDebounce';
import { useFocusEffect } from '@react-navigation/native';

export function Students() {
    const [students, setStudents] = useState<StudentDetails[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState<StudentDetails[]>([]);

    const { token, email } = useSelector((state: RootState) => state.user);

    const renderStudentCard = ({ item }: { item: StudentDetails }) => {
        const parsedRenderInfo = {
            ...item,
            name: item?.name ?? 'Nome do aluno',
            objective: item?.objective ?? 'moderate-cardio',
            username: item?.email ?? '@usuario',
            isVerified: item?.isVerified ?? false,
            level: item?.level ?? 1,
            imageProfile: item?.imageProfile ?? undefined,
        };

        return <StudentCard user={parsedRenderInfo} />;
    };

    const renderEmptyList = () => {
        return (
            <>
                {loading ? (
                    <>
                        {Array.from({ length: 5 }).map((_, index) => (
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

    const parseUsersFromApiToStudents = useCallback((users: UserDetails[], verified: boolean) => {
        // const studentsFromApi = users?.data?.map(info => info?.attributes?.user?.data);
        // console.log('users', users);
        const parsedStudents: StudentDetails[] = users.map((student, i) => ({
            id: student.id,
            email: student.email,
            weight: student.weight,
            height: student.height,
            name: student.name,
            blocked: student.blocked,
            phone: student.phone,
            gender: student.gender,
            objective: student.goal_type,
            comments: undefined,
            avatar: undefined,
            engagement: undefined,
            level: undefined,
            metrics: undefined,
            monthlyFeeStatus: undefined,
            registerId: undefined,
            notions: undefined,
            imageProfile: student?.user_profile?.photo?.formats.thumbnail?.url,
            supplement: undefined,
            isVerified: verified,
        }));

        return parsedStudents;
    }, []);

    const parseUsersNotVerifiedFromApiToStudents = useCallback((users: FineShapeFromApi[]) => {
        const parsedStudents: StudentDetails[] = users.map(student => ({
            id: generateRandomUuid(),
            email: student.email,
            weight: student.weight,
            height: student.height,
            name: student.name,
            blocked: undefined,
            phone: student.phone,
            gender: student.gender,
            objective: 'Não cadastrado',
            comments: undefined,
            avatar: undefined,
            notions: undefined,
            engagement: undefined,
            level: undefined,
            metrics: undefined,
            monthlyFeeStatus: undefined,
            registerId: undefined,
            supplement: undefined,
            isVerified: false,
        }));

        return parsedStudents;
    }, []);

    const getStudentsByCoach = useCallback(async () => {
        setLoading(true);
        // console.log('os guri', email);
        try {
            let studentsArray = [];
            const headers = generateAuthHeaders(token!);
            // const { data } = await api.get<CoachStudentsResponse>(
            //     `/user-coaches?populate=user&filters[coach][email][$eq]=${email}`,
            //     { headers }
            // ); populate=user&filters[coach][]
            const { data } = await api.get(`/fine-shapes?filters[coach][email][$eq]=${email}`, {
                headers,
            });

            const users = await api.get('/users?populate[user_profile][populate]=photo.media', {
                headers,
            });

            // const users = await api.get('/user-profiles?populate=user&populate=photo', {
            //     headers,
            // });

            // const hubnerUser = users.data.filter(item => item?.email === 'hubnersantos@aol.com');
            // // console.log('usersProfile', JSON.stringify(users.data, null, 2));
            // console.log('hubncUser', JSON.stringify(hubnerUser[0], null, 1));
            // //
            // Criar arrays com os dados dos alunos vindo da API FINESHAPE
            const fineShapesStudents = data?.data?.map((item: any) => item?.attributes);

            const emailStudent = data?.data?.map((item: any) => item?.attributes?.email);

            //
            // Verificar quais são os alunos cadastrados na plataforma
            const studentsFromCoach = users?.data?.filter((item: any) =>
                emailStudent?.includes(item?.email)
            );

            //
            // Verificar quais alunso não estão cadastrados na plataforma
            const onlyEmails = studentsFromCoach?.map((item: any) => item?.email) as string[];

            const restStudentsFromCoach = emailStudent.filter(
                (item: string) => !onlyEmails?.includes(item)
            ) as string[];

            const usersNotVerified = fineShapesStudents.filter((item: FineShapeFromApi) =>
                restStudentsFromCoach?.includes(item?.email as string)
            ) as FineShapeFromApi[];

            const parsedStudents = parseUsersFromApiToStudents(studentsFromCoach, true);

            studentsArray = [...parsedStudents];

            const parsedStudentsNotVerified =
                parseUsersNotVerifiedFromApiToStudents(usersNotVerified);

            studentsArray = [...studentsArray, ...parsedStudentsNotVerified];

            studentsArray.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

            // console.log('studeascascsantsArray', JSON.stringify(studentsArray, null, 2));
            setStudents(studentsArray);
            setSearch(studentsArray);
        } catch (err) {
            console.error('Ocorreu um erro ao buscar a lista de alunos', err);
        } finally {
            setLoading(false);
        }
    }, [email, parseUsersFromApiToStudents, parseUsersNotVerifiedFromApiToStudents, token]);

    useFocusEffect(
        useCallback(() => {
            getStudentsByCoach();

            return () => {
                setTimeout(() => {
                    setStudents([]);
                    setSearch([]);
                }, 1000);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    const handleSearchStudent = useDebounce((text: string) => {
        if (text === '') {
            setStudents(search);
            return;
        }
        const filteredStudents = students.filter(student =>
            (student.name || '').toLowerCase().includes(text.toLowerCase())
        );
        // console.log('filteredStudents', filteredStudents);
        setSearch(filteredStudents);
    }, 500);
    return (
        <PageWrapper bottomSpacing styles={{ flex: 1, width: '100%' }}>
            <View style={{ paddingTop: 8 }}>
                <Header />
            </View>

            <View style={{ width: '100%', flex: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 8,
                        width: '100%',
                    }}>
                    <Title>Alunos</Title>
                </View>

                <Input
                    placeholder="Pesquisar Aluno"
                    variant="filled"
                    width="100%"
                    borderRadius={16}
                    mt={2}
                    // mb={2}
                    bg="gray.200"
                    _hover={{ bg: 'gray.200' }}
                    _focus={{ bg: 'gray.200' }}
                    InputLeftElement={
                        <AntDesign
                            name="search1"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }}
                        />
                    }
                    onChangeText={text => {
                        handleSearchStudent(text);
                    }}
                />

                <View style={{ paddingTop: 8, height: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            nestedScrollEnabled
                            key={generateRandomUuid()}
                            contentContainerStyle={{ gap: 12, paddingBottom: 24, paddingTop: 12 }}
                            data={search}
                            ListEmptyComponent={renderEmptyList}
                            renderItem={renderStudentCard}
                            keyExtractor={item => item.id as string}
                        />
                    </View>
                </View>
            </View>
        </PageWrapper>
    );
}
