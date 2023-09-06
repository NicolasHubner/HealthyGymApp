import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Image, View, Text } from 'native-base';

export const CardsSuplements = ({
    name,
    description,
    image,
    id,
    price,
}: {
    name: string;
    description: string;
    image: string | null;
    price: number;
    id: number;
    disabled?: boolean;
}) => {
    const navigator = useNavigation() as INavigation;
    const dataToSend = {
        name: name,
        description: description,
        image: image,
        price: price,
        id: id,
    };

    return (
        <Pressable
            disabled={false}
            key={id + name}
            flexDir={'row'}
            w={'100%'}
            h={'96px'}
            onPress={() =>
                navigator.navigate(RouteNames.logged.coach.suplementToStudents, {
                    dataSuplement: dataToSend,
                })
            }
            mb={4}
            bgColor={'white'}
            borderRadius={16}>
            <Image
                source={image ? { uri: image } : require('@/assets/nutrientes.webp')}
                alt="Alternate Text"
                size="96px"
                resizeMode="cover"
                borderLeftRadius={16}
            />

            <View ml={4}>
                <Text fontWeight={500} mt={2} fontSize={16} lineHeight={16} letterSpacing={1}>
                    {name}
                </Text>
                <Text flexGrow={1} fontSize={12} mt={2} lineHeight={12} letterSpacing={1}>
                    {description}
                </Text>
                <Text
                    fontSize={14}
                    lineHeight={14}
                    letterSpacing={1}
                    fontWeight={500}
                    mb={2}
                    color={'green.500'}>
                    Preço: R${price.toFixed(2)}
                </Text>
            </View>
        </Pressable>
    );
};
