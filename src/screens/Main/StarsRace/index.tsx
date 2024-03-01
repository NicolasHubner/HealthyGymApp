import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { FlatList, Skeleton, Text, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Subtitle } from '@/screens/Main/StarsRace/components/Subtitle';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Confetti from '@/assets/svg/confetti.svg';
import { StudentsCoachComponent } from '@/screens/Main/StarsRace/components/StudentsCoachComponent';
import { DateCalendarInput } from '@/components/organisms/DateCalendarInput';
import { throwErrorToast } from '@/helpers/functions/handleToast';

type User = {
    birthdate: string;
    email: string;
    gender: 'M' | 'F' | 'NB' | string; // Allows for potential future non-binary option
    goal_type: string;
    height: number;
    id: number;
    is_coach: boolean | null; // Explicitly define null as an option
    name: string;
    phone: string;
    stars: number;
    username: string;
    weight: number;
};

const dateNowMinus7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
export default function StarRace() {
    const [initialDate, setInitialDate] = useState(dateNowMinus7Days);
    const [lastDate, setLastDate] = useState(new Date(Date.now()));

    const [students, setStudents] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { token, id: userId } = useSelector((state: RootState) => state.user);

    const formattedInitialDate = initialDate.toISOString().split('T')[0];
    const formattedLastDate = lastDate.toISOString().split('T')[0];

    useEffect(() => {
        if (initialDate.getTime() > lastDate.getTime()) {
            setInitialDate(lastDate);

            throwErrorToast({
                title: 'Data inválida',
                message: 'A data inicial não pode ser maior que a data final',
            });
        }
    }, [initialDate, lastDate]);

    const getUserFromStarRace = useCallback(async () => {
        setIsLoading(true);

        try {
            const headers = generateAuthHeaders(token!);
            const { data } = (await api.get(
                `/stars-race/${userId}/${formattedInitialDate}/${formattedLastDate}`,
                {
                    headers,
                }
            )) as { data: User[] };
            setStudents(data);
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }, [formattedInitialDate, formattedLastDate, token, userId]);

    useEffect(() => {
        getUserFromStarRace();
    }, [formattedInitialDate, formattedLastDate]);

    const ArrayWith10Items = Array.from({ length: 10 }, (_, i) => i + 1);
    return (
        <PageWrapper edges={['left', 'right']} padding={0}>
            <Confetti
                opacity={0.5}
                width={'100%'}
                style={{ position: 'absolute', top: 180, zIndex: -1 }}
            />

            <Confetti
                opacity={0.5}
                width={'100%'}
                style={{ position: 'absolute', top: 460, right: 20, zIndex: -1 }}
            />

            <Confetti
                opacity={0.5}
                width={'100%'}
                style={{ position: 'absolute', top: 660, zIndex: -1 }}
            />
            <Subtitle />

            <View
                alignItems={'center'}
                flexDir={'row'}
                w={'100%'}
                bgColor={'white'}
                opacity={0.9}
                py={3}
                mx={8}
                // borderRadius={16}
                shadow={4}
                justifyContent={'space-evenly'}>
                <DateCalendarInput
                    title={'Início'}
                    setDateForParent={setInitialDate}
                    initialDate={initialDate}
                />
                <DateCalendarInput
                    title={'Final'}
                    setDateForParent={setLastDate}
                    initialDate={lastDate}
                />
            </View>

            {!isLoading && students.length > 0 && (
                <FlatList
                    style={{ width: '100%', minHeight: 800 }}
                    contentContainerStyle={{ alignItems: 'center', paddingTop: 12 }}
                    data={students}
                    renderItem={({ item, index }) => (
                        <StudentsCoachComponent {...item} index={index} />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            )}

            {isLoading && (
                <FlatList
                    style={{ width: '100%' }}
                    data={ArrayWith10Items}
                    renderItem={() => (
                        <Skeleton
                            borderRadius={16}
                            height={'80px'}
                            w={'90%'}
                            my={2}
                            px={2}
                            alignSelf={'center'}
                        />
                    )}
                />
            )}

            {!isLoading && students.length === 0 && (
                <Text
                    alignSelf={'center'}
                    fontWeight={400}
                    w={'90%'}
                    textAlign={'center'}
                    marginTop={32}
                    fontSize={'18px'}>
                    Nenhum aluno encontrado, comece a adicionar alunos para a corrida de estrelas!
                </Text>
            )}
        </PageWrapper>
    );
}
