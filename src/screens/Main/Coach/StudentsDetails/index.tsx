import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { StudentInfo } from './components/StudentInfo';
import { Notions } from './components/Notions';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Header } from '@/components/organisms/Header';
// import { SuggestionCarrousel } from '@/components/organisms/SuggestionCarrousel';
import { MetricsInfographic } from '@/components/organisms/MetricsInfographic';
import { DailyCalendar } from '@/components/organisms/DailyCalendar';

import { Title } from './styles';
import { useRoute } from '@react-navigation/native';
import { StudentDetails } from '@/types/coach/Students';
import { Notion } from '@/types/coach/Notions';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Divider, Modal, Text, View } from 'native-base';
import { MetricsSkeleton } from '@/components/organisms/MetricsInfographic/components/MetricsSkeleton';
import { ContainerCards } from '@/components/organisms/MetricsInfographic/styles';
import { formatDateToApi } from '@/helpers/functions/formatDateToApi';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { api } from '@/services/api';
import { throwSuccessToast } from '@/helpers/functions/handleToast';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    ArrayGoals,
    RenderCard,
    setNameGoals,
} from './components/StudentInfo/helpers/functionGoals';

const studentLevels = [
    { value: 'iniciante', text: 'Iniciante' },
    { value: 'intermediario', text: 'Intermediario' },
    { value: 'avançado', text: 'Avançado' },
];

export function StudentsDetails() {
    const [studentLevel, setStudentLevel] = useState('iniciante');
    const [studentInfo, setStudentInfo] = useState<StudentDetails>({} as StudentDetails);
    const [selectedDateForMetrics, setSelectedDateForMetrics] = useState(new Date());
    // const [notions, setNotions] = useState<Notion[] | undefined>(undefined);
    const [loadingMetricsForSelectedDate, setLoadingMetricsForSelectedDate] = useState(false);

    const [modal, setModal] = useState(false);

    const { token } = useSelector((state: RootState) => state.user);

    const { colors } = useTheme();
    const { params }: any = useRoute();

    const handleChangeSelectedDateForMetrics = useCallback((date: Date) => {
        setSelectedDateForMetrics(date);
    }, []);

    useEffect(() => {
        if (params && params?.data) {
            setStudentInfo(params.data);
        }
    }, [params]);

    const parseDataToSendToApi = useCallback((note: Notion) => {
        return {
            data: note,
        };
    }, []);
    const saveNotions = useCallback(
        async (notion: Notion) => {
            if (!token) return;
            try {
                const dataToSend = parseDataToSendToApi(notion);
                const headers = generateAuthHeaders(token!);

                await api.post('/notes-histories', dataToSend, { headers });

                throwSuccessToast({
                    title: 'Anotação salva com sucesso!',
                    message: 'A anotação foi salva com sucesso!',
                });
            } catch (error: any) {
                console.error('Error on save notion: ', error.response.data);
            }
        },
        [parseDataToSendToApi, token]
    );

    useEffect(() => {
        if (studentInfo.objective && studentInfo?.objective?.length > 0) {
            setStudentLevel(setNameGoals(studentInfo.objective || ''));
        }
    }, [studentInfo]);

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollablePageWrapper padding={0} edges={['left', 'right', 'top']}>
                    <View style={{ paddingHorizontal: 28, paddingTop: 24 }}>
                        <Header />
                    </View>

                    <StudentInfo user={studentInfo} />

                    <View
                        mt="32px"
                        style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            width: '100%',
                            paddingHorizontal: 20,
                        }}>
                        <Title>Métricas do Aluno</Title>
                    </View>

                    <View mt="24px" w="100%" py={8} bgColor={colors.green[500]}>
                        <DailyCalendar setDateForParent={handleChangeSelectedDateForMetrics} />
                    </View>

                    <View
                        style={{ width: '100%', backgroundColor: colors.white, paddingBottom: 48 }}>
                        <View
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                paddingHorizontal: 16,
                                marginTop: 28,
                            }}>
                            {loadingMetricsForSelectedDate ? (
                                <ContainerCards>
                                    <MetricsSkeleton />
                                </ContainerCards>
                            ) : (
                                <MetricsInfographic
                                    userIdParam={(studentInfo?.id as number) ?? undefined}
                                    dateForMetrics={formatDateToApi(selectedDateForMetrics)}
                                    weight={studentInfo?.weight ?? 0}
                                    height={studentInfo?.height ?? 0}
                                />
                            )}
                        </View>

                        <View
                            style={{
                                width: '100%',
                                paddingHorizontal: 16,
                                marginTop: 35,
                            }}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    gap: 10,
                                    borderRadius: 8,
                                    backgroundColor: colors.gray[200],
                                    alignItems: 'center',
                                    paddingHorizontal: 16,
                                    paddingVertical: 12,
                                }}
                                onPress={() => {
                                    setModal(true);
                                }}>
                                <MaterialIcons name="group" size={20} color={colors.gray[600]} />
                                <Text
                                    fontFamily={'Rubik_500Medium'}
                                    fontSize={14}
                                    letterSpacing={0.5}
                                    color={colors.black}>
                                    {studentLevel}
                                </Text>
                                <View style={{ marginLeft: 'auto' }}>
                                    <MaterialIcons
                                        name="keyboard-arrow-down"
                                        size={20}
                                        color={colors.gray[600]}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 44 }}>
                            <Notions
                                studentInfo={studentInfo}
                                createNotion={saveNotions}
                                date={selectedDateForMetrics}
                                studentLevel={studentLevel}
                            />
                        </View>
                    </View>

                    {/* <View style={{ marginVertical: 44 }}>
                <SuggestionCarrousel />
            </View> */}
                </ScrollablePageWrapper>
            </KeyboardAvoidingView>

            <Modal
                isOpen={modal}
                onClose={() => {
                    setModal(false);
                }}
                animationPreset="fade"
                avoidKeyboard={true}
                style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}
                closeOnOverlayClick={true}>
                <View
                    style={{
                        width: '100%',
                        height: '50%',
                        backgroundColor: colors.white,
                        borderTopLeftRadius: 32,
                        borderTopRightRadius: 32,
                    }}>
                    <Modal.CloseButton mr={4} mt={4} />

                    <Modal.Body safeAreaTop mt={8}>
                        <View>
                            {ArrayGoals.map((item, index) => (
                                <>
                                    <RenderCard
                                        item={item}
                                        index={index}
                                        setModal={setModal}
                                        setStudentLevel={setStudentLevel}
                                    />
                                    {index !== 3 && <Divider />}
                                </>
                            ))}
                        </View>
                    </Modal.Body>
                </View>
            </Modal>
        </>
    );
}
