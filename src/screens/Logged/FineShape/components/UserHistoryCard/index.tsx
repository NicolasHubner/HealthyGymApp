import { FineShapeFromApi } from '@/types/fineshape/FineShape';
import { View } from 'react-native';
import { Container, DateContainer, DateDay, DateMonth, UserEmail, UserName } from './styles';
import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UserCardProps {
    user?: FineShapeFromApi;
    selectedId?: number;
}

export function UserCard({ user, selectedId }: UserCardProps) {
    const { colors } = useTheme();

    const evaluationDate = useMemo(
        () => ({
            day: new Date(user?.createdAt ?? new Date()).getDate(),
            month: format(new Date(user?.createdAt ?? new Date()), 'MMM', { locale: ptBR }),
        }),
        [user?.createdAt]
    );

    const formatPhone = (phone: string) => {
        const onlyNumbers = phone.replace(/\D/g, '');
        const ddd = onlyNumbers.slice(0, 2);
        const firstPart = onlyNumbers.slice(2, 7);
        const secondPart = onlyNumbers.slice(7, 11);

        return `(${ddd}) ${firstPart}-${secondPart}`;
    };

    return (
        <Container selected={selectedId === user?.id}>
            <DateContainer>
                <DateDay>{String(evaluationDate.day).padStart(2, '0')}</DateDay>
                <DateMonth>{evaluationDate.month}</DateMonth>
            </DateContainer>
            <View style={{ gap: 4 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                    }}>
                    <AntDesign name="user" size={16} color={colors.green[700]} />
                    <UserName numberOfLines={1} style={{ width: '75%' }}>
                        {user?.name ?? 'Nome do usuário'}
                    </UserName>
                </View>
                {!!user?.phone && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <FontAwesome name="whatsapp" size={16} color={colors.green[700]} />
                        <UserEmail>{formatPhone(user?.phone)}</UserEmail>
                    </View>
                )}
                {!!user?.email && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <MaterialCommunityIcons
                            name="email-outline"
                            size={16}
                            color={colors.green[700]}
                        />
                        <UserEmail numberOfLines={1} style={{ width: '75%' }}>
                            {user?.email}
                        </UserEmail>
                    </View>
                )}
            </View>
            <View style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}>
                <Entypo name="chevron-right" color={colors.green[700]} size={28} />
            </View>
        </Container>
    );
}
