import { Ionicons, Entypo } from '@expo/vector-icons';

import { GraphicItem } from './styles';
import { useTheme } from 'styled-components';
import { Container, GraphContainer, GraphText } from './styles';

export function GraphicsList() {
    const { colors } = useTheme();

    return (
        <Container>
            <GraphContainer>
                <GraphicItem
                    unfilledColor={colors.green[300]}
                    color={colors.green[500]}
                    progress={0.5}
                    formatText={() => (
                        <Ionicons name="flame-sharp" color={colors.green[500]} size={24} />
                    )}
                />
                <GraphText>31 kcal</GraphText>
            </GraphContainer>
            {/* <GraphContainer>
                <GraphicItem
                    unfilledColor="rgba(175, 142, 255, 0.2)"
                    color="#AF8EFF"
                    progress={0.3}
                    formatText={() => <Ionicons name="location-sharp" color="#AF8EFF" size={24} />}
                />
                <GraphText>2 km</GraphText>
            </GraphContainer> */}
            <GraphContainer>
                <GraphicItem
                    unfilledColor="rgba(31, 135, 254, 0.2)"
                    color="#1F87FE"
                    progress={0.7}
                    formatText={() => <Entypo name="time-slot" color="#1F87FE" size={24} />}
                />
                <GraphText>50 min</GraphText>
            </GraphContainer>
        </Container>
    );
}
