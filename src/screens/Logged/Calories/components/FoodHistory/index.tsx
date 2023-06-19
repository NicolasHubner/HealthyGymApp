import { HStack, Text, View, VStack } from 'native-base';

import { FullHistoryFoodHistory } from '@/types/food/FoodHistory';
import { format } from 'date-fns';

interface FoodHistoryProps {
    foodList: FullHistoryFoodHistory[];
}

export function FoodHistory({ foodList }: FoodHistoryProps) {
    if (!foodList) return <></>;

    return (
        <VStack style={{ gap: 8 }}>
            {foodList.map((item, index) => (
                <View
                    key={index}
                    flexDir="row"
                    style={{ gap: 12 }}
                    borderTopWidth={index <= 0 ? '0px' : '1px'}
                    borderColor="gray.500"
                    pt={index <= 0 ? '0px' : '16px'}>
                    {item?.food?.createdAt && (
                        <View
                            flexDir="column"
                            borderWidth="1px"
                            borderColor="gray.700"
                            borderRadius="6px"
                            px="8px"
                            alignItems="center"
                            justifyContent="center"
                            style={{ gap: 4 }}>
                            <Text>{format(new Date(item?.food?.createdAt), 'dd/MM')}</Text>
                            <View h="1px" w="100%" bg="green.700" />
                            <Text fontSize={'15px'} fontWeight="bold" color="text.primary">
                                {new Date(item?.food?.createdAt).getHours()}h
                            </Text>
                            <Text fontSize={'15px'} fontWeight="bold" color="text.primary">
                                {new Date(item?.food?.createdAt).getMinutes()}m
                            </Text>
                        </View>
                    )}
                    <View w="100%" style={{ gap: 4 }}>
                        <Text
                            fontSize={'15px'}
                            numberOfLines={1}
                            maxW="75%"
                            textTransform="capitalize">
                            {item?.food?.title ?? 'Vazio'}
                        </Text>
                        <VStack
                            pt="2px"
                            borderTopWidth="1px"
                            borderColor="gray.100"
                            style={{ gap: 2 }}>
                            <HStack style={{ gap: 2 }}>
                                <HStack alignItems="center" style={{ gap: 2 }}>
                                    <View w="8px" h="8px" borderRadius="2px" bg="blue.600" />
                                    <Text>Gordura</Text>
                                </HStack>
                                <Text fontWeight="medium">{item?.food?.fat ?? ''}g</Text>
                            </HStack>

                            <HStack style={{ gap: 2 }}>
                                <HStack alignItems="center" style={{ gap: 2 }}>
                                    <View w="8px" h="8px" borderRadius="2px" bg="indigo.500" />
                                    <Text>Proteína</Text>
                                </HStack>
                                <Text fontWeight="medium">{item?.food?.protein ?? ''}g</Text>
                            </HStack>

                            <HStack style={{ gap: 2 }}>
                                <HStack alignItems="center" style={{ gap: 2 }}>
                                    <View w="8px" h="8px" borderRadius="2px" bg="green.500" />
                                    <Text>Carbo</Text>
                                </HStack>
                                <Text fontWeight="medium">{item?.food?.carbohydrate ?? ''}g</Text>
                            </HStack>
                        </VStack>
                    </View>
                </View>
            ))}
        </VStack>
    );
}
