import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { Text, View, Image, FlatList } from 'native-base';
import { useTheme } from 'styled-components';
import { useRoute } from '@react-navigation/native';
import { useDebounce } from '@/hooks/useDebounce';
import { useCallback, useEffect, useState } from 'react';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { UserDetails } from '@/types/coach/Students';
import { Skeleton } from '@/components/atoms/Skeleton';
import { ICardsStudents, rederCardStudents } from './components/RenderCardStudent';
import { InputsStudents } from './components/InputsStudents';

interface IPAramsSuplement {
    name: string;
    description: string;
    image: string | null;
    price: number;
    id: number;
}

export default function SuplementsToStudents() {
    const { params } = useRoute();

    const { name, description, image, price } = params?.dataSuplement as IPAramsSuplement;

    const { token, email } = useSelector((state: RootState) => state.user);

    const { colors } = useTheme();

    const HandleSearch = useDebounce((text: string) => {
        console.log(text);
    }, 500);

    const [dataStudents, setDataStudents] = useState<ICardsStudents[]>([]);

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
                };
            });
            setDataStudents(studentsFromCoachWithPhoto as ICardsStudents[]);
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
        <PageWrapper>
            <InputsStudents HandleSearch={HandleSearch} />

            <View
                w={'100%'}
                mt={4}
                flexDirection={'row'}
                bgColor={'white'}
                borderRadius={8}
                shadow={1}>
                <Image
                    source={image ? { uri: image } : require('@/assets/nutrientes.webp')}
                    alt="Alternate Text"
                    size="96px"
                    resizeMode="cover"
                    borderLeftRadius={8}
                />

                <View ml={4}>
                    <Text fontWeight={500} mt={2} fontSize={16} lineHeight={16} letterSpacing={1}>
                        {name}
                    </Text>
                    <Text flexGrow={1} fontSize={12} mt={2} lineHeight={12} letterSpacing={1}>
                        {description}
                    </Text>
                    <Text
                        fontSize={14}
                        lineHeight={14}
                        letterSpacing={1}
                        fontWeight={500}
                        mb={2}
                        color={'green.500'}>
                        Preço: R${price.toFixed(2)}
                    </Text>
                </View>
            </View>
            <View w={'100%'} backgroundColor={'gray.100'} mt={4} p={3} borderRadius={8} shadow={1}>
                <Text
                    w={'100%'}
                    fontSize={14}
                    lineHeight={14}
                    letterSpacing={1}
                    fontWeight={500}
                    color={'black'}>
                    Notas
                </Text>
                <Text
                    mt={2}
                    fontSize={12}
                    lineHeight={12}
                    letterSpacing={1}
                    fontWeight={400}
                    flexWrap={'wrap'}>
                    Clique no aluno para enviar o suplemento para ele.
                </Text>
            </View>
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
                    renderItem={({ item }) => rederCardStudents(item)}
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
    );
}
