import { DividerComponent } from '@/components/atoms/Divider';
import {
    Container,
    PercentengeValue,
    Square,
    TitleComponent,
    TypeContainer,
    ValueComponent,
    ViewItens,
    ViewText,
} from './style';

interface IComponentType {
    id: number;
    colorSquare: string;
    title: string;
    value: string;
    unit: string;
    percentage: string;
}

interface ComponentTypeProps {
    macro: {
        protein: number;
        carbohydrates: number;
        fat: number;
    };
    total: {
        protein: number;
        carbohydrates: number;
        fat: number;
    };
}

export default function ComponentType({ macro, total }: ComponentTypeProps) {
    const mockData: IComponentType[] = [
        {
            id: 1,
            colorSquare: '#1F87FE',
            title: 'Gordura',
            value: macro.fat.toFixed(0),
            unit: 'g',
            percentage: ((macro.fat / total.fat) * 100).toFixed(0),
        },
        {
            id: 2,
            colorSquare: '#7265E3',
            title: 'Proteínas',
            value: macro.protein.toFixed(0),
            unit: 'g',
            percentage: ((macro.protein / total.protein) * 100).toFixed(0),
        },
        {
            id: 3,
            colorSquare: '#90D692',
            title: 'Carbo',
            value: macro.carbohydrates.toFixed(0),
            unit: 'g',
            percentage: ((macro.carbohydrates / total.carbohydrates) * 100).toFixed(0),
        },
    ];

    return (
        <Container>
            {mockData.map(item => (
                <ViewItens key={item.id}>
                    <TypeContainer>
                        <Square color={item.colorSquare} />
                        <ViewText>
                            <TitleComponent>{item.title}</TitleComponent>
                            <ValueComponent>
                                {item.value} {item.unit}
                            </ValueComponent>
                        </ViewText>
                        <PercentengeValue>{item.percentage}%</PercentengeValue>
                    </TypeContainer>
                    <DividerComponent />
                </ViewItens>
            ))}
        </Container>
    );
}
