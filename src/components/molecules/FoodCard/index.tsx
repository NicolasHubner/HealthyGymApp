import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { IFood } from '@/screens/Logged/Food/Daily/helpers/functions';
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

export function FoodCard({ data }: { data: IFood }) {
    const imageEmoji = 'happy';

    const { navigate } = useNavigation() as INavigation;

    const { title, calorie, image } = data.attributes;

    return (
        <TouchableOpacity
            onPress={() =>
                navigate(RouteNames.logged.food.details.initial, {
                    data,
                })
            }>
            <BoxCard>
                <BoxCardImageContainer>
                    <BoxCardImage
                        source={
                            image?.data !== null && image
                                ? {
                                      uri: image.data[0].attributes.url,
                                  }
                                : require('@/assets/food_healthy.jpg')
                        }
                    />

                    <BoxCardEmojiContainer>
                        <BoxCardEmoji name={imageEmoji} />
                    </BoxCardEmojiContainer>
                    {imageEmoji !== 'happy' && (
                        <BoxCardEmojiText>Carboidrato alto!</BoxCardEmojiText>
                    )}
                </BoxCardImageContainer>

                <BoxCardInfo>
                    <BoxCardTitle>{title}</BoxCardTitle>
                    <BoxCardKcal>{calorie} kcal</BoxCardKcal>
                </BoxCardInfo>
            </BoxCard>
        </TouchableOpacity>
    );
}
