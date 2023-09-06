import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { Input } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { FlatList } from 'react-native-gesture-handler';
import { CardsSuplements } from './components/cardSuplements';

const DATA_MOCKUP = [
    {
        id: 0,
        name: 'Whey Protein',
        description: 'Proteína do soro do leite',
        image: null,
        price: 50.0,
    },
    {
        id: 1,
        name: 'BCAA',
        description: 'Aminoácidos essenciais',
        image: null,
        price: 50.0,
    },
    {
        id: 2,
        name: 'Creatina',
        description: 'Aminoácidos essenciais',
        image: null,
        price: 50.0,
    },
    {
        id: 3,
        name: 'Creatina',
        description: 'Aminoácidos essenciais',
        image: null,
        price: 50.0,
    },
    {
        id: 4,
        name: 'Durateston',
        description: 'Aminoácidos essenciais',
        image: null,
        price: 50.0,
    },
    {
        id: 5,
        name: 'Durateston',
        description: 'Aminoácidos essenciais',
        image: null,
        price: 50.0,
    },
    {
        id: 6,
        name: 'Durateston',
        description: 'Aminoácidos essenciais',
        image: null,
        price: 50.0,
    },
];
export default function Suplements() {
    const { colors } = useTheme();
    return (
        <PageWrapper edges={['top', 'left', 'right']}>
            <Input
                placeholder="Buscar suplemento.."
                placeholderTextColor={colors.gray[500]}
                w={'100%'}
                fontSize={14}
                h={'48px'}
                selectionColor={colors.gray[500]}
                cursorColor={colors.gray[500]}
                lineHeight={16}
                borderRadius={16}
                color={colors.gray[500]}
                focusOutlineColor={colors.green[500]}
                bgColor={'#FFFFFF'}
                mt={12}
                leftElement={
                    <Feather
                        name="search"
                        size={24}
                        color={colors.gray[500]}
                        style={{ marginLeft: 12 }}
                    />
                }
            />

            <FlatList
                style={{ marginTop: 16, width: '100%' }}
                data={DATA_MOCKUP}
                renderItem={({ item }) => (
                    <CardsSuplements
                        // key={item.id + item.name}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        image={item.image}
                        price={item.price}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    // padding: 16,
                    paddingBottom: 72,
                }}
            />
        </PageWrapper>
    );
}
