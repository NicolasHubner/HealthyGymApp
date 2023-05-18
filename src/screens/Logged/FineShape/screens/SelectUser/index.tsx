import { Button } from '@/components/atoms/Button';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { useDebounce } from '@/hooks/useDebounce';
import { RouteNames } from '@/routes/routes_names';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { setFineshapInfo } from '@/store/fineshape';
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
                setFineshapInfo({
                    ...user,
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
        <PageWrapper styles={{ paddingTop: 64 }}>
            <View style={{ position: 'absolute', top: 24, left: 4 }}>
                <HeaderGoBackButton canGoBack onPress={handleGoBackToHomeScreen} />
            </View>
            <View style={{ paddingBottom: 60, position: 'relative' }}>
                <Title>Selecione um usuário para avaliar:</Title>

                <SearchUserInput
                    placeholder="Pesquise pelo nome ou email do usuário"
                    onChangeText={debounce}
                    style={{
                        marginTop: 12,
                    }}
                />

                <View style={{ paddingTop: 24 }}>
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
                            height: 400,
                            paddingBottom: 12,
                        }}>
                        <FlatList
                            ListEmptyComponent={renderEmptyUsersList}
                            contentContainerStyle={{ gap: 12 }}
                            data={renderedUsersList}
                            renderItem={renderListItem}
                        />
                    </View>
                    <Pressable>
                        <Button
                            label="Continuar"
                            fullWidth
                            onPress={() => {
                                fillStoreWithUserInfo();
                                if (typeof selectedUser !== 'undefined') {
                                    navigate(RouteNames.logged.fineshape.question, {
                                        selectedUserForEvaluation: usersList?.find(
                                            item => item.id === selectedUser
                                        ),
                                        step: 0,
                                    });
                                } else {
                                    navigate(RouteNames.logged.fineshape.question, {
                                        selectedUserForEvaluation: undefined,
                                    });
                                }
                            }}
                        />
                    </Pressable>
                </View>
            </View>
        </PageWrapper>
    );
}
