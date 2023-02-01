import React, { useState } from 'react';

import { PageWrapper, ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
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
import { FlashList } from '@shopify/flash-list';

import { useTheme } from 'styled-components';

import peixeImg from '@/assets/peixe.png';
import { foodRestrictionsList } from '@/helpers/constants/nutri';
import { CheckboxEvent } from 'expo-checkbox';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@/routes/routes_names';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/user';

export function SignUpNutri() {
  const navigator = useNavigation() as INavigation;
  const [restrictionsList, setRestrictionsList] = useState<string[]>(['Leite']);
  const dispatch = useDispatch();

  const { colors } = useTheme();

  const handleRestrictionsList = async (restriction: string) => {
    // event.stopPropagation();
    if (restrictionsList.includes(restriction)) {
      setRestrictionsList(current => current.filter(item => item !== restriction));
    } else {
      setRestrictionsList(current => [...current, restriction]);
    }
    console.log(restriction);
    // return setRestrictionsList(current => {
    //   if (current.includes(restriction)) {
    //     return current.filter(item => item !== restriction);
    //   }

    //   return [...current, restriction];
    // });
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
  const handleFinishRegister = () => {
    const newData = { foodRestrictions: restrictionsList } as any;
    dispatch(setUserInfo(newData));
    navigator.navigate(RouteNames.auth.register.finishRegister);
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
