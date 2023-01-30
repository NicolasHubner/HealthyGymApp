import { useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { CardIngredientItem } from '@/components/atoms/CardIngredientItem';
import { DividerComponent } from '@/components/atoms/Divider';

import {
  CardIngredientsList,
  CardRecipeArrow,
  CardRecipeContainer,
  CardRecipeText,
  CardRecipseInfoWrapper,
  Container,
  ContainerGradient,
  IngredientsImage,
  SeparatorMessage,
  SeparatorMessageContainer,
} from './styles';

import ImageBacon from '@/assets/Img.png';

const DATA = [0, 1, 2, 3, 4, 5];

export function ShoppingList() {
  const renderItem = useCallback(() => <CardIngredientItem quantity={4} ingredient="Ovos" />, []);

  const renderSeparator = useCallback(() => <DividerComponent marginTop={0} />, []);

  return (
    <Container>
      <ContainerGradient />
      <IngredientsImage source={ImageBacon} />

      <CardRecipeContainer>
        <CardRecipseInfoWrapper>
          <CardRecipeText>6</CardRecipeText>
          <CardRecipeText>receitas</CardRecipeText>
        </CardRecipseInfoWrapper>
        <CardRecipeArrow />
      </CardRecipeContainer>

      <SeparatorMessageContainer>
        <SeparatorMessage>Ingredientes que você precisa</SeparatorMessage>
      </SeparatorMessageContainer>

      <CardIngredientsList>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => String(item)}
          ItemSeparatorComponent={renderSeparator}
        />
      </CardIngredientsList>
    </Container>
  );
}
