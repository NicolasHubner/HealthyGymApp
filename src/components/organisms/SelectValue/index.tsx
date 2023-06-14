import Picker from '@ouroboros/react-native-picker';

import { useTheme } from 'styled-components';

interface SelectValuesProps {
    onChanged: React.Dispatch<React.SetStateAction<string>>;
    value: string;
    selectValues: Array<{ value: string; text: string }>;
}

export function SelectValue({ onChanged, value, selectValues }: SelectValuesProps) {
    const { colors, font_family } = useTheme();

    return (
        <Picker
            onChanged={onChanged}
            options={selectValues}
            style={{
                fontFamily: font_family.regular,
                color: colors.black,
                fontSize: 13,
                letterSpacing: 0.5,
            }}
            value={value}
        />
    );
}
