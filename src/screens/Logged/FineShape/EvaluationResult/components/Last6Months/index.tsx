import { View } from 'react-native';
import { Section, SectionTitle } from '../../styles';
import { TextPressables, ViewBox, ViewBoxSelection } from './style';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from 'styled-components';

export const Last6Months: React.FC = () => {
    enum Status {
        weight,
        imc,
        age,
    }

    const [status, setStatus] = useState<Status>(Status.weight);
    const { colors } = useTheme();

    return (
        <Section>
            <SectionTitle>Últimos 6 meses</SectionTitle>
            <View />
            <ViewBoxSelection>
                <ViewBox
                    onPress={() => setStatus(Status.weight)}
                    bgColor={status === Status.weight ? colors.blue[400] : ''}>
                    <FontAwesome5 name="weight" size={22} color="#fff" />
                    <TextPressables>Peso</TextPressables>
                </ViewBox>

                <ViewBox
                    onPress={() => setStatus(Status.imc)}
                    bgColor={status === Status.imc ? colors.green[700] : ''}>
                    <FontAwesome name="heartbeat" size={22} color="#fff" />
                    <TextPressables>IMC</TextPressables>
                </ViewBox>

                <ViewBox
                    onPress={() => setStatus(Status.age)}
                    bgColor={status === Status.age ? colors.purple[100] : ''}>
                    <FontAwesome name="birthday-cake" size={22} color="#fff" />
                    <TextPressables>Idade Cor.</TextPressables>
                </ViewBox>
            </ViewBoxSelection>
        </Section>
    );
};
