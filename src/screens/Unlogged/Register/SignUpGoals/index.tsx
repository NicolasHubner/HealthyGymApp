import React, { useEffect, useState } from 'react';

import { Button } from '@/components/atoms/Button';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { CardsGoals } from '@/components/molecules/CardGoals';

import { UserGoal, userGoalOptions } from '@/helpers/constants/goals';
import { useSelector, useDispatch } from 'react-redux';

import {
  ButtonContainer,
  ContainerCards,
  SubtitleContainerCreate,
  SubtitleContainerHelp,
  SubtitleCreate,
  SubtitleHelp,
} from './style';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@/routes/routes_names';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { setUserInfo } from '@/store/user';

export function SignUpGoals() {
  const dispatch = useDispatch();
  const [selectedGoalCard, setSelectedGoalCard] = useState<string | undefined>(undefined);

  const navigation = useNavigation<INavigation>();

  const navigateToNextScreen = () => {
    const goal = {
      goal: selectedGoalCard,
    };
    dispatch(setUserInfo(goal as any));
    navigation.navigate(RouteNames.auth.register.nutri);
  };
  // // console.log(user);

  return (
    <PageWrapper>
      <SubtitleContainerCreate>
        <SubtitleCreate>Qual é o teu objetivo?</SubtitleCreate>
      </SubtitleContainerCreate>

      <SubtitleContainerHelp>
        <SubtitleHelp>Isso nos ajudará a escolher o melhor programa para você</SubtitleHelp>
      </SubtitleContainerHelp>

      <ContainerCards>
        {userGoalOptions.map((goal, index) => (
          <CardsGoals
            key={index}
            onPress={() => setSelectedGoalCard(goal.id)}
            selected={selectedGoalCard === goal.id}
            intensity={goal.intensity}
            title={goal.title}
            subtitle={goal.subtitle}
            image={goal.image}
          />
        ))}
      </ContainerCards>

      <ButtonContainer>
        <Button
          isDisabled={selectedGoalCard === undefined}
          label="Cadastrar"
          onPress={navigateToNextScreen}
        />
      </ButtonContainer>
    </PageWrapper>
  );
}
