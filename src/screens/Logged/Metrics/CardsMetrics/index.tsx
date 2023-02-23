import {
    Cards,
    ContainerCards,
    CardTitle,
    CardTitleAtts,
    AttView,
    CardTitleAttsUnit,
    CardAttTime,
    Graphics,
    ImageGraphics,
} from './style';
import * as ProgressCircle from 'react-native-progress';
import { FontAwesome5 } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';
import { RouteNames } from '@/routes/routes_names';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
    color: string;
    title: string;
    atts: string;
    atributes?: string;
    attTime: string;
    routes: string;
}

//ADAPTAR LINHA CONFORME CRIAÇÂO DAS TELAS

const CardsArray: CardProps[] = [
    {
        color: '#90D692',
        title: 'Calorias',
        atts: '500',
        atributes: 'kcal',
        attTime: '3d',
        routes: 'Home',
    },
    {
        color: '#589A5A',
        title: 'Peso',
        atts: '58',
        atributes: 'kg',
        attTime: '3d',
        routes: RouteNames.logged.measures,
    },
    {
        color: '#1F87FE',
        title: 'Água',
        atts: '750',
        atributes: 'ml',
        attTime: '2h',
        routes: RouteNames.logged.water,
    },
    {
        color: '#4C5980',
        title: 'Treinos',
        atts: '42%',
        attTime: '1d',
        routes: RouteNames.logged.metrics.train,
    },
];

const handleGraphics = (title: string) => {
    switch (title) {
        case 'Calorias':
            return (
                <Graphics>
                    <ProgressCircle.Circle
                        showsText={false}
                        color="white"
                        progress={0.5}
                        borderWidth={0}
                        size={80}
                        thickness={20}
                        unfilledColor="#51B655"
                    />
                </Graphics>
            );
        case 'Treinos':
            return (
                <Graphics>
                    <ProgressCircle.Circle
                        showsText={true}
                        color="#8C80F8"
                        progress={0.42}
                        borderWidth={0}
                        size={80}
                        thickness={12}
                        strokeCap="round"
                        unfilledColor="rgba(45, 49, 66, 0.2)"
                        formatText={() => {
                            return <FontAwesome5 name="walking" size={32} color="white" />;
                        }}
                    />
                </Graphics>
            );
        case 'Água':
            return (
                <Graphics>
                    <ImageGraphics source={require('@/assets/Metrics/glassWater.png')} />
                </Graphics>
            );
        case 'Peso':
            return (
                <Graphics>
                    <ImageGraphics
                        style={{ resizeMode: 'contain', width: scale(100) }}
                        source={require('@/assets/Metrics/weight.png')}
                    />
                </Graphics>
            );
    }
};

export default function CardsMetrics() {
    const navigator = useNavigation() as INavigation;
    return (
        <ContainerCards>
            {CardsArray.map((card, index) => (
                <Cards
                    key={index}
                    color={card.color}
                    onPress={() => {
                        navigator.navigate(card.routes);
                    }}>
                    <CardTitle>{card.title}</CardTitle>
                    {handleGraphics(card.title)}
                    <AttView>
                        <CardTitleAtts>{card.atts}</CardTitleAtts>
                        {card.atributes && <CardTitleAttsUnit>{card.atributes}</CardTitleAttsUnit>}
                    </AttView>
                    <CardAttTime>Atualização {card.attTime}</CardAttTime>
                </Cards>
            ))}
        </ContainerCards>
    );
}
