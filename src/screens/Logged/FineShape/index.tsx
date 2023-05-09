import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SelectUser } from './components/SelectUser';
import { Progress } from './components/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';

import { FineShapeScreens } from '@/screens';

import { RootState } from '@/store';
import { setFineshapInfo } from '@/store/fineshape';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { api } from '@/services/api';

import { UserFromApi } from '@/types/user';

import { Container, Input, Title } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { mask, unMask } from 'react-native-mask-text';

export interface FineShapePageProps {
    title: string;
    placeholder: string;
    step: number;
}

type UserFromUserListApi = UserFromApi & { id: number };

export function FineShapeBaseQuestionary() {
    const [currentStep, setCurrentStep] = useState(0);
    const [finished, setFinished] = useState(false);
    const [usersList, setUsersList] = useState<UserFromUserListApi[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserFromUserListApi | undefined>(undefined);
    const [searchedUserTerm, setSearchedUserTerm] = useState('');

    const { id, token } = useSelector((state: RootState) => state.user);
    const fineShapeStore = useSelector((state: RootState) => state.fineshape);
    const dispatch = useDispatch();
    const { navigate } = useNavigation<INavigation>();

    const { control, watch, setValue } = useForm();

    const maxSteps = useMemo(() => FineShapeScreens?.length - 1 ?? 1, []);

    const getUserList = useCallback(async () => {
        try {
            // lista de usuários
            const headers = generateAuthHeaders(token!);
            const { data } = await api.get<UserFromUserListApi[]>('/users', { headers });

            setUsersList(data);
        } catch (err) {
            console.error('Ocorreu um erro ao obter a lista de usuários', err);
        }
    }, [token]);

    const handleNavigateToNextStep = useCallback(() => {
        if (
            watch(FineShapeScreens[currentStep].id) === '' ||
            watch(FineShapeScreens[currentStep].id)?.length <= 0 ||
            finished
        )
            return;

        dispatch(
            setFineshapInfo({
                [FineShapeScreens[currentStep].id]: watch(FineShapeScreens[currentStep].id),
            })
        );

        if (currentStep >= maxSteps) {
            setFinished(true);
        } else {
            setCurrentStep(current => (current === maxSteps ? current : current + 1));
        }
    }, [maxSteps, dispatch, currentStep, watch, finished]);

    const handleNavigateToPrevStep = useCallback(() => {
        setCurrentStep(current => (current <= 1 ? 1 : current - 1));
    }, []);

    const handleGoBackToHomeScreen = useCallback(() => {
        navigate(RouteNames.logged.home);
    }, [navigate]);

    useEffect(() => {
        getUserList();
    }, [getUserList]);

    useEffect(() => {
        dispatch(setFineshapInfo({ userId: selectedUser?.id ?? undefined }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (typeof fineShapeStore[`${FineShapeScreens[currentStep].id}`] !== 'undefined') {
            setValue(
                FineShapeScreens[currentStep].id,
                String(fineShapeStore[`${FineShapeScreens[currentStep].id}`])
            );
        } else {
            setValue(FineShapeScreens[currentStep].id, '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    const formatarTelefone = (input: string) => {
        let numero = input.replace(/\D/g, ''); // Remove caracteres não numéricos
        numero = numero.substring(0, 11); // Limita o número a 11 dígitos

        if (numero.length > 0) {
            numero = '(' + numero.substring(0, 2) + ') ' + numero.substring(2);

            if (numero.length > 9) {
                numero = numero.substring(0, 9) + '-' + numero.substring(9);
            }
        }

        return numero;
    };

    return (
        <PageWrapper>
            <Container>
                {!finished && (
                    <View style={{ position: 'absolute', top: 24, left: 4 }}>
                        <HeaderGoBackButton
                            canGoBack
                            onPress={
                                currentStep > 1
                                    ? handleNavigateToPrevStep
                                    : handleGoBackToHomeScreen
                            }
                        />
                    </View>
                )}

                {finished && (
                    <View>
                        <Text>Parabéns!</Text>
                        <Pressable onPress={() => navigate(RouteNames.logged.home)}>
                            <Text>Voltar à home</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setCurrentStep(1);
                                setFinished(false);
                            }}>
                            <Text> Voltar ao início do fine shape</Text>
                        </Pressable>
                    </View>
                )}

                {currentStep > 0 && (
                    <>
                        <Progress currentStep={currentStep} maxSteps={maxSteps} />

                        <View style={{ marginTop: 'auto' }}>
                            <Title>{FineShapeScreens[currentStep].title}</Title>
                        </View>

                        <View style={{ marginTop: 'auto' }}>
                            <Controller
                                name={FineShapeScreens[currentStep].id}
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, onBlur, value } }) => {
                                    console.log({
                                        value,
                                        masked: mask(
                                            value,
                                            'SSSSSSSSSSSSSSSSSSSS SSSSSSSSSSSSSSSSSSSS SSSSSSSSSSSSSSSSSSSS SSSSSSSSSSSSSSSSSSSS',
                                            'custom',
                                            {},
                                            'words'
                                        ),
                                    });

                                    return (
                                        <TextInput
                                            autoCapitalize="sentences"
                                            placeholder={FineShapeScreens[currentStep].placeholder}
                                            keyboardType={
                                                FineShapeScreens[currentStep].keyboardType
                                            }
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={text => {
                                                console.log({
                                                    text,
                                                    masked: formatarTelefone(text),
                                                });
                                            }}
                                            // value={inputValue}
                                            // mask={FineShapeScreens[currentStep].mask ?? undefined}
                                        />
                                    );
                                }}
                            />
                        </View>

                        <View style={{ marginTop: 'auto' }}>
                            <Button
                                label={FineShapeScreens[currentStep].buttonText}
                                fullWidth
                                onPress={handleNavigateToNextStep}
                                isDisabled={
                                    watch(FineShapeScreens[currentStep].id) === '' ||
                                    watch(FineShapeScreens[currentStep].id)?.length < 0
                                }
                            />
                        </View>
                    </>
                )}

                {currentStep === 0 && (
                    <SelectUser
                        setCurrentStep={setCurrentStep}
                        setSearchedUserTerm={setSearchedUserTerm}
                        searchedUserTerm={searchedUserTerm}
                        usersList={usersList}
                        setSelectedUser={setSelectedUser}
                        selectedUser={selectedUser}
                    />
                )}
            </Container>
        </PageWrapper>
    );
}
