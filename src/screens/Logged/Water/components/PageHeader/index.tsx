import { View } from 'react-native';
import { WaterInfoContainer, WaterInfoCount, WaterInfoText } from './styles';

interface PageHeaderProps {
    waterQuantity: number;
}

export function PageHeader({ waterQuantity }: PageHeaderProps) {
    const formatCorrectlyWaterQuantity = (quantity: number) => {
        if (quantity < 1) {
            return `${(quantity * 1000).toFixed(0)}ml`;
        }

        return `${quantity.toFixed(1)}L`;
    };

    return (
        <WaterInfoContainer>
            <WaterInfoText>Hoje você bebeu</WaterInfoText>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <WaterInfoCount>{formatCorrectlyWaterQuantity(waterQuantity)}</WaterInfoCount>
                <WaterInfoText>de água💧</WaterInfoText>
            </View>
        </WaterInfoContainer>
    );
}
