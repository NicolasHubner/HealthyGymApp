import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { Input } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { FlatList } from 'react-native-gesture-handler';
import { CardsSuplements } from './components/cardSuplements';
import { useCallback, useEffect, useState } from 'react';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { SuplementsFromApi, SuplementsFromApiData } from '@/types/suplement/Suplements';
import { useDebounce } from '@/hooks/useDebounce';

export default function Suplements() {
    const { colors } = useTheme();

    const { token } = useSelector((state: RootState) => state.user);

    const [suplements, setSuplements] = useState<SuplementsFromApi[]>([]);

    const [search, setSearch] = useState<SuplementsFromApi[]>([]);

    const getSuplements = useCallback(async () => {
        try {
            const headers = generateAuthHeaders(token!);

            const { data } = (await api.get('/suplements?populate=Image', {
                headers,
            })) as SuplementsFromApiData;

            setSuplements(data.data);
            setSearch(data.data);
        } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getSuplements();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearchSuplement = useDebounce((text: string) => {
        if (text === '') {
            setSearch(suplements);
            return;
        }
        const filteredSuplement = suplements.filter(suplement =>
            (suplement.attributes.Name || '').toLowerCase().includes(text.toLowerCase())
        );
        setSearch(filteredSuplement);
    }, 500);
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
                onChangeText={text => handleSearchSuplement(text)}
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
                data={search}
                renderItem={({ item }) => (
                    <CardsSuplements
                        // key={item.id + item.name}
                        duration={item.attributes.Duration_days}
                        id={item.id}
                        name={item.attributes.Name}
                        // description={item.description}
                        image={item.attributes.Image.data[0].attributes.url}
                        // price={item.price}
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
