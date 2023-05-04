import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { setFineshapInfo } from '@/store/fineshape';
import { UserFromApi } from '@/types/user';
import { format } from 'date-fns';
import { useCallback } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { SearchUserInput, Title, UserCard, UserEmail, UserName } from './styles';

type UserFromUserListApi = UserFromApi & { id: number };

interface SelectUserProps {
    selectedUser?: UserFromUserListApi;
    searchedUserTerm?: string;
    usersList?: UserFromUserListApi[];
    loadingUsers?: boolean;
    setSelectedUser: (user?: UserFromUserListApi) => void;
    setSearchedUserTerm: (term: string) => void;
    setCurrentStep: (step: number) => void;
}

export function SelectUser({
    selectedUser,
    setSelectedUser,
    setSearchedUserTerm,
    searchedUserTerm,
    usersList,
    loadingUsers,
    setCurrentStep,
}: SelectUserProps) {
    const dispatch = useDispatch();

    const handleChangeInputValue = (text: string) => {
        setSearchedUserTerm(text);
    };

    const debounce = useDebounce(handleChangeInputValue);

    const fillStoreWithUserInfo = useCallback(() => {
        dispatch(
            setFineshapInfo({
                userName: selectedUser?.name ?? '',
                userEmail: selectedUser?.email ?? '',
                userId: selectedUser?.id ?? 0,
                userWeight: selectedUser?.weight ?? 0,
                userHeight: selectedUser?.height ?? 0,
                userPhone: selectedUser?.phone ?? '',
                userBirthdate: selectedUser?.birthdate ?? '',
                todayDate: format(new Date(), 'dd-MM-yyyy').replaceAll('-', '/'),
            })
        );
    }, [dispatch, selectedUser]);

    const renderEmptyUsersList = useCallback(() => {
        if (loadingUsers) {
            return (
                <>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} height={60} borderRadius={16} />
                    ))}
                </>
            );
        }

        return <Text>Nenhum usuário encontrado</Text>;
    }, [loadingUsers]);

    return (
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
                <Pressable onPress={() => setSelectedUser(undefined)}>
                    <UserCard style={{ marginBottom: 12 }} selected={selectedUser === undefined}>
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
                        data={
                            searchedUserTerm && searchedUserTerm?.length > 0
                                ? usersList?.filter(
                                      item =>
                                          item.email
                                              ?.toLowerCase()
                                              .includes(searchedUserTerm.toLowerCase()) ||
                                          item.name
                                              ?.toLowerCase()
                                              .includes(searchedUserTerm.toLowerCase())
                                  )
                                : usersList
                        }
                        contentContainerStyle={{ gap: 12 }}
                        ListEmptyComponent={renderEmptyUsersList}
                        renderItem={({ item, index }) => (
                            <Pressable onPress={() => setSelectedUser(item)}>
                                <UserCard key={index} selected={selectedUser?.email === item.email}>
                                    <UserName>{item.name}</UserName>
                                    <UserEmail>{item.email}</UserEmail>
                                </UserCard>
                            </Pressable>
                        )}
                    />
                </View>
                <Pressable>
                    <Button
                        label="Continuar"
                        fullWidth
                        onPress={() => {
                            fillStoreWithUserInfo();
                            setCurrentStep(1);
                        }}
                    />
                </Pressable>
            </View>
        </View>
    );
}
