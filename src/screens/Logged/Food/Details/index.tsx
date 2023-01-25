import React, { useEffect, useState } from 'react';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import FavoriteFood from '@/components/molecules/FavoriteFood';
import {
  ButtonShare,
  ButtonViewIngredients,
  ContainerViewIngredients,
  IconFire,
  ImageTop,
  InfoNutritionContainer,
  InfoNutritionTitle,
  NameFood,
  ShareIcon,
  TextIngredients,
  TextKcal,
  TextKcalUnit,
  TextTitle,
  ViewContainer,
  ViewKcal,
  ViewKcalAndTime,
  ViewTitle,
} from './style';
import ImageBacon from '@/assets/Img.png';
import { DropDown } from './Components/DropDown';
import { DividerComponent } from '@/components/atoms/Divider';

const foods = [
  {
    id: 1,
    name: '1  |  Servindo(60g)',
  },
  {
    id: 2,
    name: '2  |  Servindo(120g)',
  },
  {
    id: 3,
    name: '3  |  Servindo(180g)',
  },
];

export default function FoodsDetails() {
  const navigator = useNavigation() as INavigation;
  const [favorited, setFavorited] = useState(false);
  const [nameFood, setNameFood] = useState('Ovos, bacon e tomate temperado');
  const [food, setFood] = useState(foods[0].name);

  useEffect(() => {
    navigator.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <FavoriteFood favorited={favorited} setFavorited={setFavorited} />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorited]);
  console.log(food);
  return (
    <ScrollablePageWrapper padding={false}>
      <ImageTop source={ImageBacon} />
      <ViewContainer>
        <ViewTitle>
          <TextTitle>Nutrição</TextTitle>
        </ViewTitle>
        <ViewTitle>
          <NameFood>{nameFood}</NameFood>
        </ViewTitle>
        <ViewKcalAndTime>
          <ViewKcal>
            <IconFire name="fire" size={32} />
            <TextKcal>345</TextKcal>
            <TextKcalUnit>kcal</TextKcalUnit>
          </ViewKcal>
        </ViewKcalAndTime>
        <DropDown setFood={setFood} food={food} foods={foods} />
        <ContainerViewIngredients>
          <ButtonShare>
            <ShareIcon name="share" size={24} />
          </ButtonShare>
          <ButtonViewIngredients>
            <TextIngredients>Ver igredientes</TextIngredients>
          </ButtonViewIngredients>
        </ContainerViewIngredients>
        <DividerComponent />
        <InfoNutritionContainer>
          <InfoNutritionTitle>Informação nutricional</InfoNutritionTitle>
        </InfoNutritionContainer>
      </ViewContainer>
    </ScrollablePageWrapper>
  );
}
