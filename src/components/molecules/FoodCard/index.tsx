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

  return (
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
  );
}
