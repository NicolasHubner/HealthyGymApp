import { FlatList } from 'react-native-gesture-handler';
import { SuggestionCard } from '@/components/molecules/SuggestionCard';

import { Container, Title } from './styles';
import { View } from 'react-native';

export function SuggestionCarrousel() {
    const renderSpaceOnFlatlistHeaderAndFooter = () => {
        return <View style={{ width: 20 }} />;
    };

    const renderSuggestionCard = () => {
        return <SuggestionCard />;
    };

    return (
        <Container>
            <Title>Sugestões para Marcelo</Title>

            <View style={{ paddingBottom: 24 }}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        height: '100%',
                        maxHeight: 280,
                    }}
                    data={Array.from({ length: 4 })}
                    ListHeaderComponent={renderSpaceOnFlatlistHeaderAndFooter}
                    ListFooterComponent={renderSpaceOnFlatlistHeaderAndFooter}
                    ItemSeparatorComponent={renderSpaceOnFlatlistHeaderAndFooter}
                    renderItem={renderSuggestionCard}
                />
            </View>
        </Container>
    );
}
