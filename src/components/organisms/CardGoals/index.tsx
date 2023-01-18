import { Card } from './style';
import React from 'react';

interface CardsGoalsProps {
    selected?: boolean;
    onPress: () => void;
}

export const CardsGoals = ({ selected, onPress }: CardsGoalsProps) => {
    return (
        <Card
            onPress={onPress}
            style={{
                borderColor: selected ? '#589A5A' : '#E5E5E5',
                borderWidth: selected ? 2 : 1,
            }}
        />
    );
};