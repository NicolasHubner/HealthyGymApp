import React from 'react';
import { CheckBoxTouchable, TextCheckBox } from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FoodTypesProps } from '../..';

interface CheckBoxTypesProps {
    setState: React.Dispatch<React.SetStateAction<FoodTypesProps>>;
    state: FoodTypesProps;
    name: FoodTypesProps;
}

export default function CheckBoxTypes({ setState, state, name }: CheckBoxTypesProps) {
    return (
        <CheckBoxTouchable onPress={() => setState(name)}>
            <MaterialCommunityIcons
                name={state.name === name.name ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={24}
                color={state.name === name.name ? '#90D692' : '#7B6F72'}
            />
            <TextCheckBox>{name.name}</TextCheckBox>
        </CheckBoxTouchable>
    );
}
