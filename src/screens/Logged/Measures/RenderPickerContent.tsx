import { Text, View } from 'react-native';
import { InsertMeasuresText, WeightTextSmall } from './style';

interface RenderPickerContentProps {
    weight: number;
}

export function RenderPickerContent({ weight }: RenderPickerContentProps) {
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        fontFamily: 'Rubik_700Bold',
                        color: '#2c2c2c',
                        letterSpacing: 0.5,
                        fontSize: 48,
                    }}>
                    {weight}
                </Text>
                <WeightTextSmall>kg</WeightTextSmall>
            </View>
            <InsertMeasuresText>Insira seu peso atual</InsertMeasuresText>
        </View>
    );
}
