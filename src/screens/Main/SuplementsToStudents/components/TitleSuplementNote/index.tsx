import { View, Text, Image } from 'native-base';

interface ITitleSuplementNotes {
    image: string | null;
    suplement: string;
    // description: string;
    // price: number;
    duration: number;
}

export default function TitleSuplementNotes({
    image,
    suplement,
    // description,
    // price,
    duration,
}: ITitleSuplementNotes) {
    return (
        <>
            <View
                w={'100%'}
                mt={4}
                flexDirection={'row'}
                bgColor={'white'}
                borderRadius={8}
                shadow={1}>
                <Image
                    source={image ? { uri: image } : require('@/assets/nutrientes.webp')}
                    alt="Alternate Text"
                    size="96px"
                    resizeMode="cover"
                    borderLeftRadius={8}
                />

                <View ml={4}>
                    <Text
                        fontWeight={500}
                        mt={2}
                        fontSize={16}
                        lineHeight={16}
                        flexWrap={'wrap'}
                        w={'80%'}
                        flexGrow={0.5}
                        letterSpacing={1}>
                        {suplement}
                    </Text>
                    {/* <Text flexGrow={1} fontSize={12} mt={2} lineHeight={12} letterSpacing={1}>
                        {description}
                    </Text> */}
                    <Text
                        fontSize={14}
                        lineHeight={14}
                        letterSpacing={1}
                        fontWeight={500}
                        mb={2}
                        color={'green.500'}>
                        Duration: {duration} {duration > 1 ? 'dias' : 'dia'}
                    </Text>
                </View>
            </View>
            <View w={'100%'} backgroundColor={'gray.100'} mt={4} p={3} borderRadius={8} shadow={1}>
                <Text
                    w={'100%'}
                    fontSize={14}
                    lineHeight={14}
                    letterSpacing={1}
                    fontWeight={500}
                    color={'black'}>
                    Notas
                </Text>
                <Text
                    mt={2}
                    fontSize={12}
                    lineHeight={12}
                    letterSpacing={1}
                    fontWeight={400}
                    flexWrap={'wrap'}>
                    Clique no aluno para enviar o suplemento para ele.
                </Text>
            </View>
        </>
    );
}
