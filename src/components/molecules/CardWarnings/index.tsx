import { ContainerStyle, TextSubTitle, TextSubtitleBody, TextSeeMore } from './style';

interface ICardWarnings {
  textSubTitle: string;
  textSubtitleBody: string;
  textSeeMore: string;
}

export default function CardWarnings({
  textSubTitle,
  textSubtitleBody,
  textSeeMore,
}: ICardWarnings) {
  return (
    <ContainerStyle>
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
