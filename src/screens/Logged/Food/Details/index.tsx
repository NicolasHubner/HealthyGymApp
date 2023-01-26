import React, { useEffect, useState } from 'react';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import FavoriteFood from '@/components/molecules/FavoriteFood';
import {
  ButtonShare,
  ButtonViewIngredients,
  ContainerViewIngredients,
  InfoNutritionContainer,
  InfoNutritionTitle,
  PartNutritionText,
  PartNutritionValue,
  ShareIcon,
  SquareColor,
  TextIngredients,
  ViewCircle,
  ViewContainer,
  ViewDetailsNutrition,
  ViewPartNutrition,
  ViewTitlePartNutrition,
} from './style';
import { DropDown } from './Components/DropDown';
import { DividerComponent } from '@/components/atoms/Divider';
import FoodsTopDetails from '@/components/organisms/FoodsDetails';
import ProgressBarCircle from '@/components/molecules/ProgressBarCircle';

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
  const [food, setFood] = useState(foods[0].name);
  const [nameFood, setNameFood] = useState('Ovos, bacon e tomate temperado');

  useEffect(() => {
    navigator.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <FavoriteFood favorited={favorited} setFavorited={setFavorited} />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorited]);
  // console.log(food);
  return (
    <ScrollablePageWrapper padding={false}>
      <FoodsTopDetails nameFood={nameFood} />
      <ViewContainer>
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
        <ViewCircle>
          <ProgressBarCircle color="#90D692" progress={0.78} text="Carbo" />
          <ProgressBarCircle color="#AF8EFF" progress={0.13} text="Proteína" />
          <ProgressBarCircle color="#1F87FE" progress={0.09} text="Gordura" />
        </ViewCircle>

        <ViewDetailsNutrition>
          <ViewPartNutrition>
            <ViewTitlePartNutrition>
              <SquareColor color="#AF8EFF" />
              <PartNutritionText>Proteína</PartNutritionText>
              <PartNutritionValue>4g</PartNutritionValue>
            </ViewTitlePartNutrition>
            <DividerComponent marginTop={5} />
          </ViewPartNutrition>

          <ViewPartNutrition>
            <ViewTitlePartNutrition>
              <SquareColor color="#90D692" />
              <PartNutritionText>Carbo</PartNutritionText>
              <PartNutritionValue>44g</PartNutritionValue>
            </ViewTitlePartNutrition>
            <DividerComponent marginTop={5} />
          </ViewPartNutrition>

          <ViewPartNutrition>
            <ViewTitlePartNutrition>
              <SquareColor color="#1F87FE" />
              <PartNutritionText>Gordura</PartNutritionText>
              <PartNutritionValue>2g</PartNutritionValue>
            </ViewTitlePartNutrition>
            <DividerComponent marginTop={5} />
          </ViewPartNutrition>
        </ViewDetailsNutrition>
      </ViewContainer>
    </ScrollablePageWrapper>
  );
}
