import React from 'react';
import { scale } from 'react-native-size-matters';

import Picker from '@ouroboros/react-native-picker';

import { useTheme } from 'styled-components';

const pickerValues = [
    { value: 'M', text: 'Masculino' },
    { value: 'F', text: 'Feminino' },
];
interface DropDownProps {
    setGender: React.Dispatch<React.SetStateAction<string>>;
    gender: string;
}

export function NewDropDown({ setGender, gender }: DropDownProps) {
    const { colors, font_family } = useTheme();

    return (
        <Picker
            onChanged={setGender}
            options={pickerValues}
            style={{
                fontFamily: font_family.regular,
                color: colors.blue_metal[300],
                fontSize: scale(13),
                letterSpacing: 0.5,
            }}
            value={gender}
        />
    );
}
