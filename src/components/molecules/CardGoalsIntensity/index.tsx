import { Container, Icon } from './styles';

interface CardGoalsIntensityProps {
    intensity: number;
}

export function CardGoalsIntensity({ intensity }: CardGoalsIntensityProps) {
    return (
        <Container>
            {Array.from({ length: 3 }, (_, index) => (
                <Icon key={index} name="fire" size={22} isActive={index < intensity} />
            ))}
        </Container>
    );
}
