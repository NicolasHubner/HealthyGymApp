import { ContainerStyle, TextSubTitle, TextSubtitleBody, TextSeeMore } from './style';

interface ICardWarnings {
  textSubTitle: string;
  textSubtitleBody: string;
  textSeeMore: string;
  marginTop?: number;
}

export default function CardWarnings({
  textSubTitle,
  textSubtitleBody,
  textSeeMore,
  marginTop = 24,
}: ICardWarnings) {
  return (
    <ContainerStyle marginTop={marginTop}>
      <TextSubTitle>{textSubTitle}</TextSubTitle>
      <TextSubtitleBody>{textSubtitleBody}</TextSubtitleBody>
      <TextSeeMore
        onPress={() => {
          console.log('Ver mais');
        }}>
        {textSeeMore}
      </TextSeeMore>
    </ContainerStyle>
  );
}
