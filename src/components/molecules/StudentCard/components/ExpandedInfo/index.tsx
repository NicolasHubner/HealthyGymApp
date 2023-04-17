import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { IStudentCardUser } from '@/helpers/interfaces/IStudentCard';

import { Container, Divider, InfoContent, InfoList, InfoTitle, InfoValue } from './styles';
import { useTheme } from 'styled-components/native';
import { parseHeight } from '@/helpers/functions/metrics/parseHeight';

interface ExpandedInfoProps {
    user: IStudentCardUser;
    isExpanded: boolean;
}

interface INavigationWithParams {
    navigate: (routeName: string, params: { data: IStudentCardUser }) => void;
}

export function ExpandedInfo({ isExpanded = true, user }: ExpandedInfoProps) {
    const maxHeight = useRef(new Animated.Value(0)).current;

    const { navigate } = useNavigation<INavigationWithParams>();

    const { colors } = useTheme();

    const handleNavigateToUserDetails = () => {
        navigate(RouteNames.logged.coach.studentDetails, {
            data: user,
        });
    };

    const formatPhone = (phone: string) => {
        const ddd = phone.slice(0, 2);
        const firstPart = phone.slice(2, 7);
        const secondPart = phone.slice(7, 11);

        return `(${ddd}) ${firstPart}-${secondPart}`;
    };

    useEffect(() => {
        Animated.timing(maxHeight, {
            toValue: isExpanded ? 1000 : 0,
            duration: 750,
            useNativeDriver: false,
            delay: 0,
            easing: Easing.inOut(Easing.ease),
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    return (
        <Container style={{ maxHeight }}>
            <Divider />

            <TouchableOpacity onPress={handleNavigateToUserDetails}>
                <InfoList>
                    <InfoContent>
                        <InfoTitle>Matrícula</InfoTitle>
                        <InfoValue>250416</InfoValue>
                    </InfoContent>

                    <InfoContent>
                        <InfoTitle>Peso</InfoTitle>
                        <InfoValue>{user?.weight ?? 0}Kg</InfoValue>
                    </InfoContent>

                    <InfoContent>
                        <InfoTitle>Altura</InfoTitle>
                        <InfoValue>{parseHeight(user?.height)}</InfoValue>
                    </InfoContent>

                    {/* <InfoContent>
                        <InfoTitle>Engajamento</InfoTitle>
                        <InfoValue>{user?.engagement ?? 'Médio'}</InfoValue>
                    </InfoContent> */}

                    {/* <InfoContent>
                        <InfoTitle>Suplementa</InfoTitle>
                        <InfoValue>Sim</InfoValue>
                    </InfoContent> */}

                    <InfoContent>
                        <InfoTitle>Matrícula</InfoTitle>
                        <InfoValue>{user?.blocked ? 'Ativa' : 'Bloqueado'}</InfoValue>
                    </InfoContent>
                </InfoList>

                <Divider />

                <InfoList>
                    {/* <InfoContent>
                        <InfoTitle>Endereço</InfoTitle>
                        <InfoValue>Endereço</InfoValue>
                    </InfoContent> */}

                    <InfoContent>
                        <InfoTitle>Telefone</InfoTitle>
                        <InfoValue>{formatPhone(user?.phone ?? '')}</InfoValue>
                    </InfoContent>
                </InfoList>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
                    <Text
                        style={{
                            fontSize: 12,
                            color: colors.gray[600],
                            textDecorationLine: 'underline',
                        }}>
                        Clique para ver mais detalhes
                    </Text>
                </View>
            </TouchableOpacity>
        </Container>
    );
}
