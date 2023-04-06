import { generateRandomUuid } from '@/helpers/functions/generateUuid';
import { StudentDetails } from '@/types/coach/Students';
import { View, FlatList, Dimensions, Text } from 'react-native';
import { format } from 'date-fns/esm';
import { ptBR } from 'date-fns/locale';

import {
    CarouselDot,
    FlatlistFooter,
    ObservationBox,
    ObservationContent,
    ObservationDate,
    ObservationText,
    ObservationTitle,
} from './styles';

const DATA = [
    {
        id: generateRandomUuid(),
        comment: '1. Lorem ipsum dolor sit amet...',
        createdAt: '2023-03-10T23:33:20.246Z',
    },
    {
        id: generateRandomUuid(),
        comment: '2. Lorem ipsum dolor sit amet...',
        createdAt: '2023-03-17T23:33:20.246Z',
    },
    {
        id: generateRandomUuid(),
        comment: '3. Lorem ipsum dolor sit amet...',
        createdAt: '2023-04-06T23:33:20.246Z',
    },
];

interface ObservationsProps {
    user: StudentDetails;
}

export function Observations({ user }: ObservationsProps) {
    const renderItem = ({ item, index }: { item: any; index: number }) => {
        const date = item?.createdAt ? new Date(item?.createdAt) : new Date(Date.now());

        return (
            <View>
                <ObservationBox style={{ width: Dimensions.get('screen').width - 61 }}>
                    <ObservationText>{`${index}: ${item?.comment}` ?? 'Teste'}</ObservationText>
                </ObservationBox>
                <View style={{ marginLeft: 'auto', paddingTop: 4 }}>
                    <ObservationDate>{format(date, 'dd/MM/yyyy') ?? ''}</ObservationDate>
                </View>
            </View>
        );
    };

    const renderSeparatorComponent = () => {
        return <View style={{ width: 11 }} />;
    };

    const renderEmptyComponent = () => {
        return (
            <View style={{ paddingVertical: 12 }}>
                <ObservationText>Nenhuma observação cadastrada.</ObservationText>
            </View>
        );
    };

    return (
        <ObservationContent>
            <ObservationTitle>Observação</ObservationTitle>

            <FlatList
                horizontal
                data={DATA}
                ItemSeparatorComponent={renderSeparatorComponent}
                ListEmptyComponent={renderEmptyComponent}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <FlatlistFooter>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                    {DATA.map(item => (
                        <CarouselDot selected={true} key={item.id} />
                    ))}
                </View>

                {/* <View>
                    <ObservationDate>10/01/2023</ObservationDate>
                </View> */}
            </FlatlistFooter>
        </ObservationContent>
    );
}
