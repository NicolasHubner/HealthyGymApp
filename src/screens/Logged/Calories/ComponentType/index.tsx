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
    value: number;
    unit: string;
    percentage: number;
}

export default function ComponentType() {
    const mockData: IComponentType[] = [
        {
            id: 1,
            colorSquare: '#1F87FE',
            title: 'Gordura',
            value: 100,
            unit: 'g',
            percentage: 32,
        },
        {
            id: 2,
            colorSquare: '#7265E3',
            title: 'Proteínas',
            value: 90,
            unit: 'g',
            percentage: 40,
        },
        {
            id: 3,
            colorSquare: '#90D692',
            title: 'Carbo',
            value: 100,
            unit: 'g',
            percentage: 28,
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
