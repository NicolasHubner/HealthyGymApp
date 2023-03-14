import { View, FlatList, Dimensions } from 'react-native';

import {
    CarouselDot,
    FlatlistFooter,
    ObservationBox,
    ObservationContent,
    ObservationDate,
    ObservationText,
    ObservationTitle,
} from './styles';

const DATA = Array.from({ length: 3 }).map((_, i) => i);

export function Observations() {
    return (
        <ObservationContent>
            <ObservationTitle>Observação</ObservationTitle>

            <FlatList
                horizontal
                data={DATA}
                ItemSeparatorComponent={() => <View style={{ width: 11 }} />}
                showsHorizontalScrollIndicator={false}
                renderItem={() => (
                    <ObservationBox style={{ width: Dimensions.get('screen').width - 61 }}>
                        <ObservationText>
                            Mussum Ipsum, cacilds vidis litro abertis, idolum. Admodum accumsan
                            disputationi eu sit, outis. Vide electram sadipscing et per. Mé faiz
                            elemun elementum girarzis, nisi eros vermeio.
                        </ObservationText>
                    </ObservationBox>
                )}
            />

            <FlatlistFooter>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                    {DATA.map(item => (
                        <CarouselDot selected={item === 0} key={item} />
                    ))}
                </View>

                <View>
                    <ObservationDate>10/01/2023</ObservationDate>
                </View>
            </FlatlistFooter>
        </ObservationContent>
    );
}
