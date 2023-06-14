import { OmsAdvise } from '@/components/refactor/OmsAdvise';
import { View } from 'native-base';
import { ContainerStyle, TextSubTitle, TextSubtitleBody } from './style';

interface ICardWarnings {
    textSubTitle: string;
    textSubtitleBody: string;
    textSeeMore: string;
    marginTop?: number;
    omsAdvice?: boolean;
}

export default function CardWarnings({
    textSubTitle,
    textSubtitleBody,
    textSeeMore,
    marginTop = 24,
    omsAdvice = false,
}: ICardWarnings) {
    return (
        <ContainerStyle marginTop={marginTop}>
            <TextSubTitle>{textSubTitle}</TextSubTitle>
            <TextSubtitleBody>{textSubtitleBody}</TextSubtitleBody>
            {/* <TextSeeMore onPress={() => null}>{textSeeMore}</TextSeeMore> */}
            {omsAdvice && (
                <View mt="12px">
                    <OmsAdvise />
                </View>
            )}
        </ContainerStyle>
    );
}
