import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Progress } from '../../components/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';

import { FineShapeScreens } from '@/screens';

import { setFineshapInfo } from '@/store/fineshape';

import { UserFromApi } from '@/types/user';

import { KeyboardAvoidingView, View } from 'react-native';
import { Container, Input, Title } from './styles';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RouteNames } from '@/routes/routes_names';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { api } from '@/services/api';
import { parseEvaluationDataToApi } from '../../utils/parseEvaluationToApi';
import { throwErrorToast } from '@/helpers/functions/handleToast';
import { Platform } from 'react-native';

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

    const dispatch = useDispatch();
    const { user, fineshape: fineShapeState } = useSelector((state: RootState) => state);
    const { token } = user;

    const { navigate } = useNavigation<FineShapeScreenNavigation>();
    const { params }: FineShapeQuestionParams = useRoute();

    const maxSteps = useMemo(() => FineShapeScreens?.length - 1 ?? 1, []);
    const fineShapeScreenStep = useMemo(
        () => (typeof params?.step !== 'undefined' ? params.step : 0),
        [params?.step]
    );

    const sendUsersToApi = useCallback(async () => {
        try {
            dispatch(setFineshapInfo({ coachId: user?.id! }));

            const headers = generateAuthHeaders(token!);
            const evaluationDataForApi = parseEvaluationDataToApi(fineShapeState);
            const { data } = await api.post(
                '/fine-shapes',
                { data: evaluationDataForApi },
                { headers }
            );

            navigate(RouteNames.logged.fineshape.result, {
                evaluation: data?.data,
                userEmail: params?.selectedUserForEvaluation?.email,
                goBackScreen: RouteNames.logged.fineshape.history,
            });

            setFineshapInfo({});
        } catch (err) {
            throwErrorToast({
                title: 'Erro ao enviar dados',
                message: 'Ocorreu um erro ao enviar os dados da avaliação',
            });
            console.error('Ocorreu um erro ao enviar os dados da avaliação', err);
        }
    }, [token, fineShapeState, navigate, user.id, dispatch, params?.selectedUserForEvaluation]);

    const handleGoBackButton = useCallback(() => {
        if (fineShapeScreenStep > 0) {
            return navigate(RouteNames.logged.fineshape.question, {
                step: fineShapeScreenStep - 1,
                selectedUserForEvaluation: params?.selectedUserForEvaluation,
            });
        }

        return navigate(RouteNames.logged.fineshape.initial);
    }, [fineShapeScreenStep, navigate, params?.selectedUserForEvaluation]);

    useEffect(() => {
        let screenId = FineShapeScreens[fineShapeScreenStep]?.id;

        if (params?.selectedUserForEvaluation === undefined) {
            setInputValue('');
            return;
        }

        if (fineShapeState[screenId]) {
            setInputValue(String(fineShapeState[screenId]));
            return;
        }

        if (params?.selectedUserForEvaluation !== undefined) {
            setInputValue(
                // @ts-ignore
                params?.selectedUserForEvaluation[screenId]
            );
            dispatch(
                setFineshapInfo({
                    [screenId]:
                        // @ts-ignore
                        params?.selectedUserForEvaluation[screenId],
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <PageWrapper>
                <Container>
                    <View style={{ position: 'absolute', top: 24, left: 4 }}>
                        <HeaderGoBackButton canGoBack onPress={handleGoBackButton} />
                    </View>

                    <Progress currentStep={fineShapeScreenStep} maxSteps={maxSteps} />
                    <View style={{ marginTop: 'auto' }}>
                        <Title>{FineShapeScreens[fineShapeScreenStep]?.title}</Title>
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Input
                            autoCapitalize="sentences"
                            placeholder={
                                FineShapeScreens[fineShapeScreenStep]?.placeholder ??
                                'Digite o texto aqui'
                            }
                            keyboardType={
                                FineShapeScreens[fineShapeScreenStep]?.keyboardType ?? 'default'
                            }
                            maxLength={FineShapeScreens[fineShapeScreenStep]?.maxLength ?? 70}
                            value={
                                FineShapeScreens[fineShapeScreenStep]?.mask
                                    ? FineShapeScreens[fineShapeScreenStep].mask!(inputValue)
                                    : inputValue
                            }
                            onChangeText={text => setInputValue(text)}
                        />
                    </View>

                    <View style={{ marginTop: 'auto' }}>
                        <Button
                            label={'Continuar'}
                            fullWidth
                            isDisabled={inputValue.length <= 0}
                            onPress={() => {
                                dispatch(
                                    setFineshapInfo({
                                        [FineShapeScreens[fineShapeScreenStep]?.id]: inputValue,
                                    })
                                );

                                if (fineShapeScreenStep + 1 > FineShapeScreens.length - 1) {
                                    sendUsersToApi();
                                } else {
                                    navigate(RouteNames.logged.fineshape.question, {
                                        step: fineShapeScreenStep + 1,
                                        selectedUserForEvaluation:
                                            params?.selectedUserForEvaluation,
                                    });
                                }
                            }}
                        />
                    </View>
                </Container>
            </PageWrapper>
        </KeyboardAvoidingView>
    );
}
