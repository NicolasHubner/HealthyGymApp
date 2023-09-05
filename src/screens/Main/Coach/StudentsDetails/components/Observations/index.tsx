import { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';

import { format } from 'date-fns/esm';

import { StudentDetails } from '@/types/coach/Students';
import { Notion } from '@/types/coach/Notions';

import {
    FlatlistFooter,
    ObservationBox,
    ObservationContent,
    ObservationDate,
    ObservationText,
    ObservationTitle,
} from './styles';

interface ObservationsProps {
    user: StudentDetails;
    notions?: Notion[];
}

export function Observations({ user, notions = [] }: ObservationsProps) {
    const [notionsFilteredByUser, setNotionsFilteredByUser] = useState<Notion[]>(notions);

    const renderItem = ({ item }: { item: Notion }) => {
        const date = item?.createdAt ? new Date(item?.createdAt) : new Date(Date.now());

        return (
            <View>
                <ObservationBox style={{ width: Dimensions.get('screen').width - 61 }}>
                    <ObservationText>{item?.notion ?? ''}</ObservationText>
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

    const filterNotionsByCoachStudent = useCallback(() => {
        const filteredNotions = notions?.filter(notion => notion.userId === user?.id);

        if (filteredNotions && filteredNotions.length > 0) {
            setNotionsFilteredByUser(filteredNotions);
        }
    }, [notions, user]);

    useEffect(() => {
        filterNotionsByCoachStudent();
    }, [notions, filterNotionsByCoachStudent]);

    return (
        <ObservationContent>
            <ObservationTitle>
                Observação{' '}
                {notionsFilteredByUser.length > 0 ? `(${notionsFilteredByUser.length})` : undefined}
            </ObservationTitle>

            <FlatList
                horizontal
                data={notionsFilteredByUser ?? []}
                ItemSeparatorComponent={renderSeparatorComponent}
                ListEmptyComponent={renderEmptyComponent}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <FlatlistFooter>
                {/* <View style={{ flexDirection: 'row', gap: 6 }}>
                    {DATA.map(item => (
                        <CarouselDot selected={true} key={item.id} />
                    ))}
                </View> */}

                {/* <View>
                    <ObservationDate>10/01/2023</ObservationDate>
                </View> */}
            </FlatlistFooter>
        </ObservationContent>
    );
}
