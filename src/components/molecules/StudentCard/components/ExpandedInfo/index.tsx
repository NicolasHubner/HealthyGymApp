import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

// import { IStudentCardUser } from '@/helpers/interfaces/IStudentCard';

import { Container, Divider, InfoContent, InfoList, InfoTitle, InfoValue } from './styles';

interface ExpandedInfoProps {
    // user: IStudentCardUser;
    isExpanded: boolean;
}

export function ExpandedInfo({ isExpanded = true }: ExpandedInfoProps) {
    const expandedInfoContainerHeight = useRef(new Animated.Value(0)).current;

    // height: expandedInfoContainerHeight.interpolate({
    //     inputRange: [0, 100],
    //     outputRange: [0, 100],
    // })

    useEffect(() => {
        Animated.timing(expandedInfoContainerHeight, {
            toValue: isExpanded ? 100 : 0,
            duration: 750,
            useNativeDriver: true,
            easing: Easing.elastic(1.5),
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    return (
        <Container
            style={{
                height: expandedInfoContainerHeight.interpolate({
                    inputRange: [0, 2],
                    outputRange: ['10%', '100%'],
                }),
            }}>
            <Divider />

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
        </Container>
    );
}
