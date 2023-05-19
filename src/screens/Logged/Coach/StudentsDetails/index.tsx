import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components';

import { StudentInfo } from './components/StudentInfo';
import { Notions } from './components/Notions';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Header } from '@/components/organisms/Header';
// import { SuggestionCarrousel } from '@/components/organisms/SuggestionCarrousel';
import { MetricsInfographic } from '@/components/organisms/MetricsInfographic';
import { DailyCalendar } from '@/components/organisms/DailyCalendar';
import { SelectValue } from '@/components/organisms/SelectValue';

import { MaterialIcons } from '@expo/vector-icons';
import { Title } from './styles';
import { useRoute } from '@react-navigation/native';
import { StudentDetails } from '@/types/coach/Students';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notion } from '@/types/coach/Notions';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const studentLevels = [
    { value: 'iniciante', text: 'Iniciante' },
    { value: 'intermediario', text: 'Intermediario' },
    { value: 'avançado', text: 'Avançado' },
];

export function StudentsDetails() {
    const [studentLevel, setStudentLevel] = useState('iniciante');
    const [studentInfo, setStudentInfo] = useState<StudentDetails>({} as StudentDetails);
    const [selectedDateForMetrics, setSelectedDateForMetrics] = useState(new Date());
    const [notions, setNotions] = useState<Notion[] | undefined>(undefined);

    const { token } = useSelector((state: RootState) => state.user);

    const { colors } = useTheme();
    const { params }: any = useRoute();

    const handleChangeSelectedDateForMetrics = useCallback((date: Date) => {
        setSelectedDateForMetrics(date);
    }, []);

    const getMetricsForSelectedDate = useCallback(async () => {
        if (!studentInfo.id) return;
        // busca as metas pela data informada
        // aguardando alteração na API
        try {
            const dateForMetrics = `${selectedDateForMetrics.getFullYear()}-${String(
                selectedDateForMetrics.getMonth() + 1
            ).padStart(2, '0')}-${String(selectedDateForMetrics.getDate()).padStart(2, '0')}`;
            const headers = generateAuthHeaders(token!);

            const { data } = await api.get(`/full-histories/${studentInfo.id}/${dateForMetrics}`, {
                headers,
            });

            console.log(JSON.stringify(data, null, 2));
        } catch (err) {
            console.error('Ocorreu um erro ao buscar o histórico completo do usuário', err);
        }
    }, [studentInfo.id, selectedDateForMetrics, token]);

    const getNotionsFromStorage = useCallback(async () => {
        const storageNotions = await AsyncStorage.getItem('@CrossLife/notions');

        if (storageNotions) {
            setNotions(JSON.parse(storageNotions));
        }
    }, []);

    const saveNotionsIntoStorage = useCallback(async () => {
        if (!notions || notions?.length <= 0) return;

        await AsyncStorage.setItem('@CrossLife/notions', JSON.stringify(notions));
    }, [notions]);

    const saveNotions = useCallback((notion: Notion) => {
        setNotions(oldNotions => (!oldNotions ? [notion] : [...oldNotions, notion]));
    }, []);

    useEffect(() => {
        if (params && params?.data) {
            setStudentInfo(params.data);
        }
    }, [params]);

    useEffect(() => {
        getNotionsFromStorage();
    }, [getNotionsFromStorage]);

    useEffect(() => {
        if (notions && notions?.length > 0) {
            saveNotionsIntoStorage();
        }
    }, [notions, saveNotionsIntoStorage]);

    useEffect(() => {
        getMetricsForSelectedDate();
    }, [selectedDateForMetrics, getMetricsForSelectedDate]);

    return (
        <ScrollablePageWrapper bottomSpacing padding={0}>
            <View style={{ paddingHorizontal: 28, paddingTop: 24 }}>
                <Header />
            </View>

            <StudentInfo user={studentInfo} notions={notions} />

            <View
                style={{
                    marginTop: 64,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '100%',
                    paddingHorizontal: 20,
                }}>
                <Title>Métricas do Aluno</Title>
            </View>

            <View style={{ marginTop: 24 }}>
                <DailyCalendar setDateForParent={handleChangeSelectedDateForMetrics} />
            </View>

            <View style={{ width: '100%', backgroundColor: colors.white, paddingBottom: 48 }}>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        paddingHorizontal: 16,
                        marginTop: 28,
                    }}>
                    <MetricsInfographic userIdParam={studentInfo?.id ?? undefined} />
                </View>

                <View
                    style={{
                        width: '100%',
                        paddingHorizontal: 16,
                        marginTop: 35,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 10,
                            borderRadius: 8,
                            backgroundColor: colors.gray[200],
                            alignItems: 'center',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                        }}>
                        <MaterialIcons name="group" size={20} color={colors.gray[600]} />
                        <SelectValue
                            selectValues={studentLevels}
                            onChanged={setStudentLevel}
                            value={studentLevel}
                        />
                        <View style={{ marginLeft: 'auto' }}>
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={20}
                                color={colors.gray[600]}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 44 }}>
                    <Notions studentInfo={studentInfo} createNotion={saveNotions} />
                </View>
            </View>

            {/* <View style={{ marginVertical: 44 }}>
                <SuggestionCarrousel />
            </View> */}
        </ScrollablePageWrapper>
    );
}
