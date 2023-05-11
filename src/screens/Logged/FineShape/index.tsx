import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable, Text, View } from 'react-native';
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

export interface FineShapePageProps {
    title: string;
    placeholder: string;
    step: number;
}

type UserFromUserListApi = UserFromApi & { id: number };

export function FineShapeBaseQuestionary() {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [finished, setFinished] = useState(false);
    const [usersList, setUsersList] = useState<UserFromUserListApi[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserFromUserListApi | undefined>(undefined);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [searchedUserTerm, setSearchedUserTerm] = useState('');

    const { id, token } = useSelector((state: RootState) => state.user);
    const fineShapeStore = useSelector((state: RootState) => state.fineshape);
    const dispatch = useDispatch();
    const { navigate } = useNavigation<INavigation>();

    const maxSteps = FineShapeScreens?.length - 1 ?? 1;

    const getUserList = useCallback(async () => {
        setLoadingUsers(true);

        try {
            // lista de usuários
            const headers = generateAuthHeaders(token!);
            const { data } = await api.get<UserFromUserListApi[]>('/users', { headers });

            setUsersList(data);
        } catch (err) {
            console.error('Ocorreu um erro ao obter a lista de usuários', err);
        } finally {
            setLoadingUsers(false);
        }
    }, [token]);

    const handleNavigateToNextStep = useCallback(() => {
        if (inputValue === '' || inputValue.length <= 0 || finished) return;

        dispatch(setFineshapInfo({ [FineShapeScreens[currentStep].id]: inputValue }));

        if (currentStep >= maxSteps) {
            setFinished(true);
        } else {
            setCurrentStep(current => (current === maxSteps ? current : current + 1));
            setInputValue('');
        }
    }, [maxSteps, dispatch, currentStep, inputValue, finished]);

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
        if (typeof fineShapeStore[`${FineShapeScreens[currentStep].id}`] !== 'undefined') {
            setInputValue(String(fineShapeStore[`${FineShapeScreens[currentStep].id}`]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    useEffect(() => {
        dispatch(setFineshapInfo({ userId: id! }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            <Input
                                placeholder={FineShapeScreens[currentStep].placeholder}
                                keyboardType={FineShapeScreens[currentStep].keyboardType}
                                onChangeText={text => setInputValue(text)}
                                value={inputValue}
                            />
                        </View>

                        <View style={{ marginTop: 'auto' }}>
                            <Button
                                label={FineShapeScreens[currentStep].buttonText}
                                fullWidth
                                onPress={handleNavigateToNextStep}
                                isDisabled={inputValue === '' || inputValue.length < 0}
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
                        loadingUsers={loadingUsers}
                        selectedUser={selectedUser}
                    />
                )}
            </Container>
        </PageWrapper>
    );
}
