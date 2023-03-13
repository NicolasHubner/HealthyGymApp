import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import { IStudentCardUser } from '@/helpers/interfaces/IStudentCard';

import { Container, Divider, InfoContent, InfoList, InfoTitle, InfoValue } from './styles';

interface ExpandedInfoProps {
    // user: IStudentCardUser;
    isExpanded: boolean;
}

export function ExpandedInfo({ isExpanded = true }: ExpandedInfoProps) {
    const maxHeight = useRef(new Animated.Value(0)).current;

    const { navigate } = useNavigation<INavigation>();

    const handleNavigateToUserDetails = () => {
        navigate(RouteNames.logged.coach.studentDetails);
    };

    useEffect(() => {
        Animated.timing(maxHeight, {
            toValue: isExpanded ? 1000 : 0,
            duration: 750,
            useNativeDriver: false,
            delay: 0,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
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
                        <InfoValue>72Kg</InfoValue>
                    </InfoContent>

                    <InfoContent>
                        <InfoTitle>Altura</InfoTitle>
                        <InfoValue>1,72M</InfoValue>
                    </InfoContent>

                    <InfoContent>
                        <InfoTitle>Engajamento</InfoTitle>
                        <InfoValue>250416</InfoValue>
                    </InfoContent>

                    <InfoContent>
                        <InfoTitle>Suplementa</InfoTitle>
                        <InfoValue>Sim</InfoValue>
                    </InfoContent>

                    <InfoContent>
                        <InfoTitle>Matrícula</InfoTitle>
                        <InfoValue>Ok</InfoValue>
                    </InfoContent>
                </InfoList>

                <Divider />

                <InfoList>
                    <InfoContent>
                        <InfoTitle>Endereço</InfoTitle>
                        <InfoValue>Endereço</InfoValue>
                    </InfoContent>

                    <InfoContent>
                        <InfoTitle>Telefone</InfoTitle>
                        <InfoValue>(31) 98765-4321</InfoValue>
                    </InfoContent>
                </InfoList>
            </TouchableOpacity>
        </Container>
    );
}
