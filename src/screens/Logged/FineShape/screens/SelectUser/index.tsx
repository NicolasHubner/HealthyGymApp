import { Button } from '@/components/atoms/Button';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { useDebounce } from '@/hooks/useDebounce';
import { RouteNames } from '@/routes/routes_names';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { UserFromApi } from '@/types/user';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { initialBlankFineShapeState } from '@/helpers/constants/fineShape';
import { setFineShapeIntoState } from '@/store/fineshape';

import { SearchUserInput, Title, UserCard, UserEmail, UserName } from './styles';
import { PersonFineShape } from '@/types/fineshape/FineShape';

type UserFromUserListApi = UserFromApi & { id: number };

// interface SelectUserProps {
//     selectedUser?: UserFromUserListApi;
//     searchedUserTerm?: string;
//     usersList?: UserFromUserListApi[];
//     loadingUsers?: boolean;
//     setSelectedUser: (user?: UserFromUserListApi) => void;
//     setSearchedUserTerm: (term: string) => void;
//     setCurrentStep: (step: number) => void;
// }

export function SelectUser() {
    const [usersList, setUsersList] = useState<UserFromUserListApi[]>([] as UserFromUserListApi[]);
    const [searchedUserTerm, setSearchedUserTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<number | undefined>(undefined);

    const { token, email } = useSelector((state: RootState) => state.user);

    const { navigate } = useNavigation<FineShapeScreenNavigation>();

    const dispatch = useDispatch();

    const renderedUsersList = useMemo(
        () =>
            searchedUserTerm && searchedUserTerm?.length > 0
                ? usersList?.filter(
                      item =>
                          item.email?.toLowerCase().includes(searchedUserTerm.toLowerCase()) ||
                          item.name?.toLowerCase().includes(searchedUserTerm.toLowerCase())
                  )
                : usersList,
        [searchedUserTerm, usersList]
    );

    const getUsersFromApi = useCallback(async () => {
        try {
            // lista de usuários
            const headers = generateAuthHeaders(token!);
            // const { data } = await api.get(
            //     `/user-coaches?populate=user&filters[coach][email][$eq]=${email}`,
            //     { headers }
            // );
            const { data } = await api.get(`/fine-shapes?filters[coach][email][$eq]=${email}`, {
                headers,
            });
            let userList = data?.data?.map((item: any) => ({
                ...item?.attributes,
                id: item?.id,
            })) as PersonFineShape[];

            let userNoRepeaped = userList.reduce((acc, obj) => {
                const isDuplicate = acc.some(
                    (item: PersonFineShape) => item.name === obj.name || item.email === obj.email
                );

                if (!isDuplicate) {
                    (acc as PersonFineShape[]).push(obj);
                }

                return acc;
            }, []);

            userNoRepeaped.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });

            setUsersList(userNoRepeaped);
            // console.log('userNoRepeaped', userNoRepeaped.length);
        } catch (err) {
            console.error('Ocorreu um erro ao obter a lista de usuários', err);
        }
    }, [token, email]);

    const handleChangeInputValue = (text: string) => {
        setSearchedUserTerm(text);
    };

    const debounce = useDebounce(handleChangeInputValue);

    const handleGoBackToHomeScreen = useCallback(() => {
        navigate(RouteNames.logged.home);
    }, [navigate]);

    const renderEmptyUsersList = useCallback(() => {
        // if (loadingUsers) {
        //     return (
        //         <>
        //             {Array.from({ length: 8 }).map((_, index) => (
        //                 <Skeleton key={index} height={60} borderRadius={16} />
        //             ))}
        //         </>
        //     );
        // }

        return <Text>Nenhum usuário encontrado</Text>;
    }, []);

    const renderListItem = useCallback(
        ({ item, index }: { item: UserFromUserListApi; index: number }) => (
            <Pressable onPress={() => setSelectedUser(item?.id)}>
                <UserCard
                    key={index}
                    selected={
                        typeof selectedUser !== 'undefined'
                            ? usersList?.find(user => user.id === selectedUser)?.email ===
                              item.email
                            : false
                    }>
                    <UserName>{item?.name}</UserName>
                    <UserEmail>{item?.email}</UserEmail>
                </UserCard>
            </Pressable>
        ),
        [selectedUser, usersList]
    );

    useEffect(() => {
        getUsersFromApi();
    }, [getUsersFromApi]);

    useEffect(() => {
        dispatch(setFineShapeIntoState(initialBlankFineShapeState));
    }, [dispatch]);

    return (
        <PageWrapper
            bottomSpacing
            styles={{
                paddingTop: 40,
                flex: 1,
            }}>
            <View style={{ position: 'absolute', top: 16, left: 12, flexDirection: 'row' }}>
                <HeaderGoBackButton canGoBack onPress={handleGoBackToHomeScreen} />
                <View style={{ marginLeft: 12 }}>
                    <Title>Nova avaliação</Title>
                    <UserEmail>Selecione um usuário para avaliar:</UserEmail>
                </View>
            </View>
            <View style={{ position: 'relative', flex: 1, paddingTop: 30 }}>
                <SearchUserInput
                    placeholder="Pesquise pelo nome ou email do usuário"
                    onChangeText={debounce}
                />

                <View style={{ height: '100%', paddingTop: 12 }}>
                    <Pressable
                        onPress={() =>
                            typeof selectedUser !== 'undefined'
                                ? setSelectedUser(undefined)
                                : undefined
                        }>
                        <UserCard
                            style={{ marginBottom: 12 }}
                            selected={selectedUser === undefined}>
                            <UserName>Outro</UserName>
                            <UserEmail>Avaliação em branco</UserEmail>
                        </UserCard>
                    </Pressable>
                    <View
                        style={{
                            paddingBottom: 12,
                            flex: 1,
                        }}>
                        <FlatList
                            ListEmptyComponent={renderEmptyUsersList}
                            contentContainerStyle={{ gap: 12 }}
                            data={renderedUsersList}
                            renderItem={renderListItem}
                        />
                    </View>
                    <View style={{ marginTop: 'auto' }}>
                        <Button
                            label="Continuar"
                            fullWidth
                            onPress={() => {
                                if (selectedUser !== undefined) {
                                    navigate(RouteNames.logged.fineshape.question, {
                                        selectedUserForEvaluation: usersList?.find(
                                            item => item.id === selectedUser
                                        ),
                                        step: 0,
                                    });
                                } else {
                                    navigate(RouteNames.logged.fineshape.question, {
                                        selectedUserForEvaluation: undefined,
                                        step: 0,
                                    });
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        </PageWrapper>
    );
}
