import { FineShapeFromApi } from '@/types/fineshape/FineShape';
import { useTheme } from 'styled-components';
import { View, Text, Divider } from 'native-base';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { memo, Fragment } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface CardHistoricProps {
    data: {
        attributes: FineShapeFromApi;
    }[];
}

const CardHistoric = ({ data }: CardHistoricProps) => {
    const { colors } = useTheme();

    return (
        <>
            {data?.map((item, i) => (
                <Fragment key={i}>
                    <TouchableOpacity onPress={() => console.log(i)}>
                        <View
                            alignItems={'center'}
                            style={{
                                borderRadius: 10,
                                padding: 8,
                                marginVertical: 8,
                                width: '90%',
                                flexDirection: 'row',
                            }}>
                            <View
                                flexDir={'column'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                borderWidth={1}
                                borderColor={colors.green[700]}
                                borderRadius={8}
                                paddingX={4}
                                paddingY={1}>
                                <Text style={{ color: colors.green[700] }} bold fontSize={'32px'}>
                                    {new Date(item?.attributes.createdAt || '').getDate()}
                                </Text>
                                <Text style={{ color: colors.green[700] }} fontSize={'20px'}>
                                    {format(new Date(item?.attributes.createdAt || ''), 'LLL', {
                                        locale: ptBR,
                                    }).toUpperCase()}
                                </Text>
                            </View>
                            <View
                                flexDir={'column'}
                                justifyContent={'center'}
                                ml={4}
                                flexGrow={1}
                                alignItems={'flex-start'}>
                                <Text
                                    fontSize={'14px'}
                                    color={colors.gray[600]}
                                    fontWeight={300}
                                    letterSpacing={'0.2px'}>
                                    <AntDesign name="user" size={16} color={colors.green[600]} />
                                    {'  '}
                                    {item.attributes.coach &&
                                    item.attributes.coach.data?.attributes.name?.length! > 0
                                        ? `Coach ${item.attributes.coach.data?.attributes.name}`
                                        : 'Sem avaliador'}
                                </Text>

                                <View flexDir={'row'} alignItems={'center'} mt={2}>
                                    <Text
                                        fontSize={'14px'}
                                        color={colors.gray[600]}
                                        fontWeight={300}
                                        letterSpacing={'0.2px'}
                                        mt={2}>
                                        <FontAwesome5
                                            name="weight"
                                            size={16}
                                            color={colors.green[600]}
                                        />
                                        {'  '}
                                        {item.attributes.weight} kg |{' '}
                                    </Text>

                                    <Text
                                        fontSize={'14px'}
                                        color={colors.gray[600]}
                                        fontWeight={300}
                                        letterSpacing={'0.2px'}
                                        mt={2}>
                                        <MaterialCommunityIcons
                                            name="arm-flex"
                                            size={16}
                                            color={colors.green[600]}
                                        />{' '}
                                        MM: {item.attributes.muscle}
                                    </Text>
                                </View>

                                <View flexDir={'row'} alignItems={'center'} mt={2}>
                                    <Text
                                        fontSize={'14px'}
                                        color={colors.gray[600]}
                                        fontWeight={300}
                                        letterSpacing={'0.2px'}
                                        mt={2}>
                                        <FontAwesome5
                                            name="percent"
                                            size={16}
                                            color={colors.green[600]}
                                        />
                                        {'  '} BF: {item.attributes.body_fat} |{' '}
                                    </Text>

                                    <Text
                                        fontSize={'14px'}
                                        color={colors.gray[600]}
                                        fontWeight={300}
                                        letterSpacing={'0.2px'}
                                        mt={2}>
                                        GV: {item.attributes.visceral_fat} |{' '}
                                    </Text>
                                </View>
                            </View>

                            <View paddingRight={4}>
                                <AntDesign name="right" size={20} color={colors.green[700]} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {!(data.length - 1 === i) && <Divider w={'90%'} />}
                </Fragment>
            ))}
        </>
    );
};

const memoCardHistoric = memo(CardHistoric);

export { memoCardHistoric as CardHistoric };
