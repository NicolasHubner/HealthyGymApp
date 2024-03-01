import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { RootState } from '@/store';
import { Text, Divider, FlatList } from 'native-base';
import { useSelector } from 'react-redux';
import { CardsSuplements } from './components/CardsSuplements';
import { useMemo } from 'react';

export default function SuplementStudentNotification() {
    const { suplements } = useSelector((state: RootState) => state.user);

    const dividerMemoized = useMemo(() => <Divider my={2} w={'100%'} />, []);

    return (
        <PageWrapper edges={['left', 'right']} padding={0} styles={{ paddingTop: 0 }}>
            <Text
                fontFamily={'Rubik_500Medium'}
                fontSize={22}
                color={'#000000'}
                textAlign={'left'}
                w={'100%'}
                mt={0}
                pl={4}>
                Suplemento Indicados
            </Text>
            <Divider my={2} w={'96%'} />

            <FlatList
                w={'96%'}
                data={suplements}
                renderItem={({ item }) => (
                    <CardsSuplements
                        name={item.attributes.Suplement.data.attributes.Name}
                        durations_days={item.attributes.Suplement.data.attributes.Duration_days}
                        quantity={item.attributes.Quantity}
                        image={
                            item.attributes.Suplement.data.attributes.Image.data[0].attributes
                                .formats.thumbnail.url
                        }
                        id={item.id}
                        status={item.attributes.Status}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => dividerMemoized}
            />
        </PageWrapper>
    );
}
