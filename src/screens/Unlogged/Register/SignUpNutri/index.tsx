import React, { useState } from 'react';

import { PageWrapper } from '@/components/molecules/ScreenWrapper';
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

export function SignUpNutri() {
  const [restrictionsList, setRestrictionsList] = useState<string[]>(['Leite']);

  const { colors } = useTheme();

  const handleRestrictionsList = async (restriction: string, event: CheckboxEvent) => {
    event.stopPropagation();

    return setRestrictionsList(current => {
      if (current.includes(restriction)) {
        return current.filter(item => item !== restriction);
      }

      return [...current, restriction];
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <CardContainer>
        <CardImage source={peixeImg} />
        <CardText>{item?.title ?? 'Item'}</CardText>
        <CardCheckbox
          value={restrictionsList.includes(item?.title)}
          onChange={event => handleRestrictionsList(item?.title, event)}
          color={restrictionsList.includes(item?.title) ? colors.green[500] : undefined}
        />
      </CardContainer>
    );
  };

  return (
    <PageWrapper>
      <NutriBanner />
      <Title>Alguma restrição alimentar?</Title>

      <RestrictionsList>
        <FlashList
          data={foodRestrictionsList}
          renderItem={renderItem}
          estimatedItemSize={25}
          estimatedListSize={{ height: 250, width: 300 }}
          showsVerticalScrollIndicator={false}
          horizontal={false}
        />
      </RestrictionsList>

      <ButtonContainer>
        <Button label="Cadastrar" />
      </ButtonContainer>
    </PageWrapper>
  );
}
