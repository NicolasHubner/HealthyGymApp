import { useMemo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { CardIconText, CardIconView, CardLabel } from './style';
import { CardView } from '../style';

interface IMiniCard {
    label: string;
    icon: string;
    quantity: number;
    type: 'height' | 'meals';
}

export const MiniCard = ({ label, icon, quantity, type }: IMiniCard) => {
    const color = '#90D692';

    const formatHeight = useMemo(() => {
        if (type === 'height') {
            const parsedQuantity = String(quantity);
            return parsedQuantity.substring(0, 1) + ',' + parsedQuantity.substring(1, 3);
        }

        return quantity;
    }, [quantity, type]);

    return (
        <CardView style={{ width: '45%' }} height={120}>
            <CardIconView>
                {icon === 'height' && (
                    <MaterialCommunityIcons name="human-male-height" size={24} color={color} />
                )}
                {icon === 'restaurant' && (
                    <MaterialIcons name="restaurant" size={24} color={color} />
                )}
                <CardIconText>{formatHeight}</CardIconText>
            </CardIconView>
            <CardLabel>{label}</CardLabel>
        </CardView>
    );
};
