import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Progress } from '../../components/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';

import { UserFromApi } from '@/types/user';

import { KeyboardAvoidingView, View } from 'react-native';
import { Container, ErrorMessage, Input, InsightsButton, InsightsText, Title } from './styles';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RouteNames } from '@/routes/routes_names';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { parseEvaluationDataToApi } from '../../utils/parseEvaluationToApi';
import { throwErrorToast } from '@/helpers/functions/handleToast';
import { Platform } from 'react-native';
import { FineShape } from '@/types/fineshape/FineShape';
import { format } from 'date-fns';
import { api } from '@/services/api';
import { setFineShapeIntoState } from '@/store/fineshape';
import { initialBlankFineShapeState } from '@/helpers/constants/fineShape';

import { FineShapeScreens } from '../index';

export interface FineShapePageProps {
    title: string;
    placeholder: string;
    step: number;
}

type UserFromUserListApi = UserFromApi & { id: number };

interface FineShapeQuestionParams extends RouteProp<ParamListBase, string> {
    params?: {
        step: number;
        selectedUserForEvaluation?: UserFromUserListApi;
    };
}

export function FineShapeQuestion() {
    const [inputValue, setInputValue] = useState('');
    const [fineShapeStep, setFineShapeStep] = useState(0);

    const { user, fineshape: fineShapeState } = useSelector((state: RootState) => state);
    const { token } = user;

    const dispatch = useDispatch();

    const { navigate } = useNavigation<FineShapeScreenNavigation>();
    const { params }: FineShapeQuestionParams = useRoute();

    // console.log(JSON.stringify(fineShapeState, null, 2));

    useEffect(() => {
        const getUserFromApi = async () => {
            let email = '';
            if (params?.selectedUserForEvaluation?.email) {
                email = params?.selectedUserForEvaluation?.email;
            }
            if (fineShapeState.email) {
                email = fineShapeState.email;
            }

            try {
                const headers = generateAuthHeaders(token!);
                // console.log('ronlado');
                const { data } = await api.get(`/fine-shapes?filters[email]=${email}`, {
                    headers,
                });
                const u = data?.data[0]?.attributes;
                // console.log('user', JSON.stringify(u, null, 2));
                if (u) {
                    dispatch(
                        setFineShapeIntoState({
                            userAddress: u.address,
                            userCity: u.city,
                            userCpf: u.cpf,
                            userState: u.state,
                            userCep: u.zip,
                            userHeight: u.height,
                            userAge: u.age,
                            userWeight: u.weight,
                            phone: u.phone,
                            email: u.email,
                            name: u.name,
                            birthdate: parseBirthdateFromApi(u.birthdate),
                            userAddressComplement: u.complement,
                            gender: u.gender === 'M' ? 'Masculino' : 'Feminino',
                            todayDate: format(new Date(), 'dd/MM/yyyy'),
                        })
                    );
                }
            } catch (err) {
                console.error(err);
            }
        };
        getUserFromApi();
    }, [dispatch, fineShapeState.email, params?.selectedUserForEvaluation?.email, token]);

    const maxSteps = useMemo(
        () => (FineShapeScreens?.length ? FineShapeScreens?.length - 1 : 1),
        []
    );

    const sendUsersToApi = useCallback(
        async (info: FineShape) => {
            try {
                const headers = generateAuthHeaders(token!);
                const evaluationDataForApi = parseEvaluationDataToApi({
                    ...info,
                    coachId: user?.id,
                });

                const { data } = await api.post(
                    '/fine-shapes?populate=coach',
                    { data: evaluationDataForApi },
                    { headers }
                );

                navigate(RouteNames.logged.fineshape.result, {
                    evaluation: {
                        ...data?.data?.attributes,
                        id: data?.data?.id,
                    },
                    userEmail: params?.selectedUserForEvaluation?.email,
                    goBackScreen: RouteNames.logged.fineshape.history,
                });

                dispatch(setFineShapeIntoState(initialBlankFineShapeState));
            } catch (err: any) {
                throwErrorToast({
                    title: 'Erro ao enviar dados',
                    message: 'Ocorreu um erro ao enviar os dados da avaliação',
                });
                console.error(
                    'Ocorreu um erro ao enviar os dados da avaliação',
                    JSON.stringify(err.response, null, 2)
                );
            }
        },
        [token, navigate, params?.selectedUserForEvaluation, dispatch, user?.id]
    );

    const parseBirthdateFromApi = (birthdate?: string | null) => {
        if (!birthdate) return '';

        const [year, month, day] = birthdate.split('-');

        return `${day}/${month}/${year}`;
    };

    const parseUserFromParamsToFineShape = useCallback(
        (userParam: UserFromUserListApi): FineShape => {
            return {
                coachId: user?.id,
                name: userParam?.name,
                birthdate: parseBirthdateFromApi(userParam?.birthdate),
                email: userParam?.email,
                gender: userParam?.gender?.toLowerCase() === 'm' ? 'Masculino' : 'Feminino',
                phone: userParam?.phone,
                todayDate: format(new Date(), 'dd/MM/yyyy'),
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const handleGoBackButton = useCallback(() => {
        if (fineShapeStep > 0) {
            return setFineShapeStep(current => current - 1);
        }

        return navigate(RouteNames.logged.fineshape.initial);
    }, [fineShapeStep, navigate]);

    useEffect(() => {
        let isMounted = true;

        if (params?.selectedUserForEvaluation && isMounted) {
            dispatch(
                setFineShapeIntoState({
                    ...parseUserFromParamsToFineShape(params.selectedUserForEvaluation!),
                })
            );
        } else if (params?.selectedUserForEvaluation === undefined) {
            dispatch(setFineShapeIntoState(initialBlankFineShapeState));
        }

        return () => {
            isMounted = false;
        };
    }, [params?.selectedUserForEvaluation, parseUserFromParamsToFineShape, dispatch]);

    useEffect(() => {
        let screenId = FineShapeScreens[fineShapeStep]?.id;
        if (fineShapeState[screenId] === undefined) {
            setInputValue('');
        } else {
            // @ts-ignore
            setInputValue(fineShapeState[screenId]);
        }
    }, [fineShapeStep, fineShapeState]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <PageWrapper>
                <Container>
                    <View
                        style={{
                            position: 'absolute',
                            top: 6,
                            left: 4,
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <HeaderGoBackButton canGoBack onPress={handleGoBackButton} />
                        <InsightsButton
                            onPress={() => {
                                navigate(RouteNames.logged.fineshape.initial);
                                dispatch(setFineShapeIntoState(initialBlankFineShapeState));
                            }}>
                            <InsightsText>Cancelar</InsightsText>
                        </InsightsButton>
                    </View>

                    <View>
                        <Progress currentStep={fineShapeStep ?? 0} maxSteps={maxSteps ?? 1} />
                    </View>

                    <View style={{ marginTop: 'auto' }}>
                        <Title>{FineShapeScreens[fineShapeStep]?.title}</Title>
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Input
                            autoCapitalize="sentences"
                            placeholder={
                                FineShapeScreens[fineShapeStep]?.placeholder ??
                                'Digite o texto aqui'
                            }
                            keyboardType={
                                FineShapeScreens[fineShapeStep]?.keyboardType ?? 'default'
                            }
                            maxLength={FineShapeScreens[fineShapeStep]?.maxLength ?? 70}
                            value={FineShapeScreens[fineShapeStep].mask(inputValue).masked}
                            onChangeText={text => setInputValue(text)}
                        />
                        {FineShapeScreens[fineShapeStep].mask(inputValue).error && (
                            <ErrorMessage>
                                {FineShapeScreens[fineShapeStep].mask(inputValue).message}
                            </ErrorMessage>
                        )}
                    </View>

                    <View style={{ marginTop: 'auto' }}>
                        <Button
                            label={'Continuar'}
                            fullWidth
                            isDisabled={FineShapeScreens[fineShapeStep].mask(inputValue).error}
                            onPress={async () => {
                                if (fineShapeStep + 1 > FineShapeScreens.length - 1) {
                                    dispatch(
                                        setFineShapeIntoState({
                                            [FineShapeScreens[fineShapeStep]?.id]: inputValue,
                                        })
                                    );
                                    sendUsersToApi({
                                        ...fineShapeState,
                                        [FineShapeScreens[fineShapeStep]?.id]: inputValue,
                                    });
                                } else {
                                    dispatch(
                                        setFineShapeIntoState({
                                            [FineShapeScreens[fineShapeStep]?.id]: inputValue,
                                        })
                                    );
                                    setFineShapeStep(current => current + 1);
                                }
                            }}
                        />
                    </View>
                </Container>
            </PageWrapper>
        </KeyboardAvoidingView>
    );
}
