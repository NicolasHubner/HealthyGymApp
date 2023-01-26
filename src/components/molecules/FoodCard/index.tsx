import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  BoxCard,
  BoxCardEmoji,
  BoxCardEmojiContainer,
  BoxCardEmojiText,
  BoxCardImage,
  BoxCardImageContainer,
  BoxCardInfo,
  BoxCardKcal,
  BoxCardTitle,
} from './styles';

export function FoodCard() {
  const imageEmoji = 'happy';

  const { navigate } = useNavigation() as INavigation;

  return (
    <TouchableOpacity onPress={() => navigate(RouteNames.logged.food.shoppingList)}>
      <BoxCard>
        <BoxCardImageContainer>
          <BoxCardImage source={{ uri: 'https://fakeimg.pl/300x300/' }} />

          <BoxCardEmojiContainer>
            <BoxCardEmoji name={imageEmoji} />
          </BoxCardEmojiContainer>
          {imageEmoji !== 'happy' && <BoxCardEmojiText>Carboidrato alto!</BoxCardEmojiText>}
        </BoxCardImageContainer>

        <BoxCardInfo>
          <BoxCardTitle>Salada com trigo e ovo branch</BoxCardTitle>
          <BoxCardKcal>200 kcal</BoxCardKcal>
        </BoxCardInfo>
      </BoxCard>
    </TouchableOpacity>
  );
}
