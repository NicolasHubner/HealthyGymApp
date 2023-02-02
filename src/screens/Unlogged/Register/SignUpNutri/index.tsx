import React, { useState } from 'react';

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Button } from '@/components/atoms/Button';
import { NutriBanner } from '@/assets/nutri_banner';
import {
  ButtonContainer,
  CardCheckbox,
  CardContainer,
  CardImage,
  CardText,
  RestrictionsList,
  Title,
} from './styles';

import { useTheme } from 'styled-components';

import peixeImg from '@/assets/peixe.png';
import { foodRestrictionsList } from '@/helpers/constants/nutri';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@/routes/routes_names';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/user';
import { RootState } from '@/store';
import { api } from '@/services/api';

export function SignUpNutri() {
  const navigator = useNavigation() as INavigation;
  const [restrictionsList, setRestrictionsList] = useState<string[]>([]);
  const dispatch = useDispatch();

  const userState = useSelector((state: RootState) => state.user);

  const { colors } = useTheme();

  const handleRestrictionsList = async (restriction: string) => {
    if (restrictionsList.includes(restriction)) {
      setRestrictionsList(current => current.filter(item => item !== restriction));
    } else {
      setRestrictionsList(current => [...current, restriction]);
    }
  };

  console.log(restrictionsList);

  const renderItem = (item: { title: any }, index: React.Key | null | undefined) => {
    return (
      <CardContainer key={index}>
        <CardImage source={peixeImg} />
        <CardText>{item?.title ?? 'Item'}</CardText>
        <CardCheckbox
          value={restrictionsList.includes(item?.title)}
          onValueChange={() => handleRestrictionsList(item?.title)}
          color={restrictionsList.includes(item?.title) ? colors.green[500] : undefined}
        />
      </CardContainer>
    );
  };

  const handleFinishRegister = async () => {
    try {
      const userDataForRegister = {
        username: userState.email,
        email: userState.email,
        password: userState.passwordForRegister,
        birthdate: userState.birthdate,
        gender: userState.gender,
        goal_type: userState.goal_type,
        name: userState.name,
        phone: userState.phone,
        weight: userState.weight,
        height: userState.height,
      };

      const response = await api.post('auth/local/register', userDataForRegister);

      const { jwt, user } = response.data;

      const userInfoAfterRegister = {
        ...user,
        token: jwt,
        passwordForRegister: undefined,
      };

      dispatch(setUserInfo(userInfoAfterRegister));

      navigator.navigate(RouteNames.auth.register.finishRegister);
    } catch (err: any) {
      if (err?.response?.status === 400) {
        return console.error('Cadastros com esse e-mail não estão disponíveis.');
      }

      console.error('Ocorreu um erro ao realizar o cadastro.', err);
    }
  };
  return (
    <ScrollablePageWrapper>
      <NutriBanner />
      <Title>Alguma restrição alimentar?</Title>

      <RestrictionsList>
        {foodRestrictionsList.map((item, index) => {
          return renderItem(item, index);
        })}
      </RestrictionsList>

      <ButtonContainer>
        <Button onPress={handleFinishRegister} label="Cadastrar" />
      </ButtonContainer>
    </ScrollablePageWrapper>
  );
}
