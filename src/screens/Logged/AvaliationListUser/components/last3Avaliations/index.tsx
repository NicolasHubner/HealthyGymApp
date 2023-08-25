import { View, Text, Image, useTheme, Pressable } from 'native-base';
import { CardHistoricProps } from '../cardHistoric';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FineShapeFromApi } from '@/types/fineshape/FineShape';

interface Last3AvaliationsProps extends CardHistoricProps {}

export default function Last3Avaliations({ data }: Last3AvaliationsProps) {
    const { colors } = useTheme();

    const handleFirstAvaliation = (dataDay: { attributes: FineShapeFromApi }) => {
        if (dataDay) {
            return {
                name: new Date(dataDay.attributes.createdAt || '').getDate(),
                month: format(new Date(dataDay.attributes.createdAt || ''), 'LLL', {
                    locale: ptBR,
                }).toUpperCase(),
                year: format(new Date(dataDay.attributes.createdAt || ''), 'yyyy', {
                    locale: ptBR,
                }).toUpperCase(),
            };
        } else {
            return {
                name: '',
                month: '',
                year: '',
            };
        }
    };

    return (
        <>
            <View flexDir={'row'} paddingY={2} height={'201px'} justifyContent={'center'}>
                <Pressable w={'45%'} h={'201px'} mr={4}>
                    <View
                        bg={colors.green[500]}
                        borderRadius={10}
                        shadow={1}
                        h={'100%'}
                        p={4}
                        overflow={'hidden'}
                        alignItems={'center'}
                        justifyContent={'flex-start'}>
                        <View flexDir={'row'} alignItems={'center'} justifyContent={'center'}>
                            <Text bold fontSize={'55px'} color={'white'}>
                                {handleFirstAvaliation(data[0]).name}
                            </Text>
                            <View justifyContent={'center'} ml={1} flexDir={'column'}>
                                <Text bold fontSize={'20px'} color={'white'} mb={-1}>
                                    {handleFirstAvaliation(data[0]).month}
                                </Text>
                                <Text fontSize={'20px'} color={'white'}>
                                    {handleFirstAvaliation(data[0]).year}
                                </Text>
                            </View>
                        </View>
                        <Image
                            source={require('@/assets/HistoricAvaliations/Character.png')}
                            alt="character"
                            width={133}
                            height={315}
                            position={'absolute'}
                            bottom={-200}
                            right={5}
                            zIndex={-1}
                        />
                    </View>
                </Pressable>

                <View w={'48%'} flexDir={'column'} justifyContent={'space-between'} h={'201px'}>
                    <View
                        height={'92px'}
                        w={'100%'}
                        shadow={1}
                        bgColor={colors.green[500]}
                        borderRadius={10}
                        flexDir={'row'}
                        alignItems={'center'}
                        paddingX={8}>
                        <View flexDir={'column'} alignItems={'center'}>
                            <Text
                                bold
                                fontSize={'32px'}
                                color={'white'}
                                textAlign={'center'}
                                mb={-3}>
                                {handleFirstAvaliation(data[1]).name}
                            </Text>
                            <Text fontSize={'20px'} color={'white'} textAlign={'center'}>
                                {handleFirstAvaliation(data[1]).month}
                            </Text>
                        </View>

                        <Image
                            source={require('@/assets/HistoricAvaliations/weight.png')}
                            alt="Vector"
                            position={'absolute'}
                            right={5}
                        />
                    </View>
                    <View
                        height={'92px'}
                        w={'100%'}
                        shadow={1}
                        bgColor={colors.green[500]}
                        borderRadius={10}
                        flexDir={'row'}
                        alignItems={'center'}
                        paddingX={8}>
                        <View flexDir={'column'} alignItems={'center'}>
                            <Text
                                bold
                                fontSize={'32px'}
                                color={'white'}
                                textAlign={'center'}
                                mb={-3}>
                                {handleFirstAvaliation(data[2]).name}
                            </Text>
                            <Text fontSize={'20px'} color={'white'} textAlign={'center'}>
                                {handleFirstAvaliation(data[2]).month}
                            </Text>
                        </View>

                        <Image
                            source={require('@/assets/HistoricAvaliations/heart.png')}
                            alt="Vector"
                            position={'absolute'}
                            right={5}
                        />
                    </View>
                </View>
            </View>
        </>
    );
}
