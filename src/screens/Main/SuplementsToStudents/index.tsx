import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { Text, FlatList } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useDebounce } from '@/hooks/useDebounce';
import { useCallback, useEffect, useState } from 'react';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { UserDetails } from '@/types/coach/Students';
import { Skeleton } from '@/components/atoms/Skeleton';
import {
    ICardsStudents,
    RenderCardStudents,
    RenderCardStudentsProps,
} from './components/RenderCardStudent';
import { InputsStudents } from './components/InputsStudents';
import { useTheme } from 'styled-components';
import TitleSuplementNotes from './components/TitleSuplementNote';
import { ModalSuplement } from './components/Modal';

interface IPAramsSuplement {
    name: string;
    image: string | null;
    id: number;
    duration: number;
}

export default function SuplementsToStudents() {
    const { params } = useRoute();

    const { name: suplement, image, duration, id } = params?.dataSuplement as IPAramsSuplement;

    const { token, email } = useSelector((state: RootState) => state.user);

    const [isOpen, setIsOpen] = useState(false);

    const [dataStudents, setDataStudents] = useState<RenderCardStudentsProps[]>([]);

    const [modalData, setModalData] = useState<ICardsStudents | null>(null);

    const [qntity, setQntity] = useState(1);

    const { colors } = useTheme();

    const HandleSearch = useDebounce((text: string) => {
        console.log(text);
    }, 500);

    const handlePressModal = useCallback(
        ({
            nameStudent,
            imageStudent,
            emailStudent,
            goalStudent,
            id: IdStudent,
        }: ICardsStudents) => {
            const dataModal = {
                nameStudent,
                imageStudent,
                emailStudent,
                goalStudent,
                id: IdStudent,
            };

            setModalData(dataModal);
            setIsOpen(true);
        },
        []
    );

    const getStudentsByCoach = useCallback(async () => {
        try {
            const headers = generateAuthHeaders(token!);
            const { data } = await api.get(`/fine-shapes?filters[coach][email][$eq]=${email}`, {
                headers,
            });

            const users = await api.get('/users?populate[user_profile][populate]=photo.media', {
                headers,
            });

            // Criar arrays com os dados dos alunos vindo da API FINESHAPE

            const emailStudent = data?.data?.map((item: any) => item?.attributes?.email);

            const studentsFromCoach = users?.data?.filter((item: any) =>
                emailStudent?.includes(item?.email)
            );

            const studentsFromCoachWithPhoto = studentsFromCoach?.map((item: UserDetails) => {
                return {
                    nameStudent: item.name,
                    imageStudent: item.user_profile
                        ? item.user_profile.photo?.formats?.thumbnail?.url
                        : null,
                    emailStudent: item.email,
                    goalStudent: item.goal_type,
                    id: item.id,
                    handlePressModal: handlePressModal,
                };
            });
            setDataStudents(studentsFromCoachWithPhoto as RenderCardStudentsProps[]);
        } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getStudentsByCoach();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PageWrapper>
                <InputsStudents HandleSearch={HandleSearch} />

                <TitleSuplementNotes
                    image={image}
                    suplement={suplement}
                    duration={duration}
                    // description={description}
                    // price={price}
                />

                <Text
                    w={'100%'}
                    fontWeight={500}
                    fontSize={'20px'}
                    ml={4}
                    lineHeight={'20px'}
                    letterSpacing={'0.14px'}
                    mt={2}>
                    Alunos
                </Text>

                {dataStudents.length > 0 && (
                    <FlatList
                        data={dataStudents}
                        style={{ width: '100%', flexGrow: 1 }}
                        renderItem={({ item }) => RenderCardStudents(item)}
                        keyExtractor={item => item.id?.toString() || ''}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 36,
                        }}
                    />
                )}
                {dataStudents.length === 0 && (
                    <FlatList
                        data={Array.from({ length: 10 })}
                        style={{ width: '100%', flexGrow: 1 }}
                        renderItem={() => (
                            <Skeleton width={'100%'} height={96} marginTop={8} borderRadius={16} />
                        )}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 36,
                        }}
                    />
                )}
            </PageWrapper>

            <ModalSuplement
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                suplement={suplement}
                image={image}
                modalData={modalData}
                setQntity={setQntity}
                qntity={qntity}
                colors={colors}
                idSuplement={id}
            />
        </>
    );
}
