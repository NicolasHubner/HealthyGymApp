import { useNavigation } from '@react-navigation/native';

import { cards } from './helpers/cards';
import { INavigation } from '@/helpers/interfaces/INavigation';

import {
    Cards,
    ContainerCards,
    CardTitle,
    CardTitleAtts,
    AttView,
    CardTitleAttsUnit,
    CardAttTime,
} from './styles';
import { handleGraphics } from './helpers/conditionalGraphics';

export function MetricsInfographic() {
    const navigator = useNavigation() as INavigation;

    return (
        <ContainerCards>
            {cards.map((card, index) => (
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
