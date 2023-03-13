import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

// import { IStudentCardUser } from '@/helpers/interfaces/IStudentCard';

import { Container, Divider, InfoContent, InfoList, InfoTitle, InfoValue } from './styles';

interface ExpandedInfoProps {
    // user: IStudentCardUser;
    isExpanded: boolean;
}

export function ExpandedInfo({ isExpanded = true }: ExpandedInfoProps) {
    return (
        <Container>
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
