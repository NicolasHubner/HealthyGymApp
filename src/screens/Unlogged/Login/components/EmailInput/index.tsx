import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { InputContainer, Inputs } from '../../style';

export const renderEmailInput = ({
    onChange,
    value,
}: Partial<ControllerRenderProps<FieldValues, string>>) => (
    <InputContainer>
        <MaterialCommunityIcons
            name="email-outline"
            size={17}
            color="#7B6F72"
            style={{ position: 'absolute', left: 30, zIndex: 1 }}
        />
        <Inputs
            onChangeText={onChange}
            placeholder="Email"
            value={value.toLowerCase()}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
        />
    </InputContainer>
);
