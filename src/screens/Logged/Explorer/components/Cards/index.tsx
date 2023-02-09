import { Card, ContainerCards } from './style';

export default function Cards() {
    return (
        <ContainerCards
            contentContainerStyle={{
                alignItems: 'center',
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Card />
            <Card />
            <Card />
        </ContainerCards>
    );
}
