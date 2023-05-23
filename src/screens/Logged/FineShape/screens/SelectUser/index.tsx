import { Button } from '@/components/atoms/Button';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { initialBlankFineShapeState } from '@/helpers/constants/fineShape';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { useDebounce } from '@/hooks/useDebounce';
import { RouteNames } from '@/routes/routes_names';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { setFineShapeIntoState } from '@/store/fineshape';
import { UserFromApi } from '@/types/user';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SearchUserInput, Title, UserCard, UserEmail, UserName } from './styles';

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

    const { token } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();
    const { navigate } = useNavigation<FineShapeScreenNavigation>();

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
            const { data } = await api.get<UserFromUserListApi[]>('/users', { headers });

            setUsersList(data);
        } catch (err) {
            console.error('Ocorreu um erro ao obter a lista de usuários', err);
        }
    }, [token]);

    const handleChangeInputValue = (text: string) => {
        setSearchedUserTerm(text);
    };

    const debounce = useDebounce(handleChangeInputValue);

    const fillStoreWithUserInfo = useCallback(() => {
        if (selectedUser) {
            const user = usersList?.find(item => item.id === selectedUser);

            dispatch(
                setFineShapeIntoState({
                    id: user?.id ?? undefined,
                    userWeight: user?.weight ?? 0,
                    userHeight: user?.height ?? 0,
                    todayDate: format(new Date(), 'dd-MM-yyyy').replaceAll('-', '/'),
                })
            );
        }
    }, [dispatch, selectedUser, usersList]);

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
                                fillStoreWithUserInfo();
                                if (selectedUser !== undefined) {
                                    navigate(RouteNames.logged.fineshape.question, {
                                        selectedUserForEvaluation: usersList?.find(
                                            item => item.id === selectedUser
                                        ),
                                        step: 0,
                                    });
                                } else {
                                    dispatch(setFineShapeIntoState(initialBlankFineShapeState));

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
