import React, { useState } from 'react';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import {
    ButtonContainer,
    ContainerCards,
    SubtitleContainerCreate,
    SubtitleContainerHelp,
    SubtitleCreate,
    SubtitleHelp,
} from './style';
import { CardsGoals } from '@/components/organisms/CardGoals';
import { Button } from '@/components/atoms/Button';

export function SignUpGoals() {
    const [selected, setCardSelected] = useState<number | null>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    return (
        <PageWrapper>
            <SubtitleContainerCreate>
                <SubtitleCreate>Qual é o teu objetivo?</SubtitleCreate>
            </SubtitleContainerCreate>
            <SubtitleContainerHelp>
                <SubtitleHelp>Isso nos ajudará a escolher o melhor programa para você</SubtitleHelp>
            </SubtitleContainerHelp>
            <ContainerCards>
                <CardsGoals onPress={() => setCardSelected(0)} selected={selected === 0 && true} />
                <CardsGoals onPress={() => setCardSelected(1)} selected={selected === 1 && true} />
                <CardsGoals onPress={() => setCardSelected(2)} selected={selected === 2 && true} />
            </ContainerCards>
            <ButtonContainer>
                <Button isDisabled={selected === null} label="Cadastrar" onPress={() => {}} />
            </ButtonContainer>
        </PageWrapper>
    );
}
