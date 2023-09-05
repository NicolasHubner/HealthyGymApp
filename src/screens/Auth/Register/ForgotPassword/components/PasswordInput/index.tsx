import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { AntDesign, Entypo } from '@expo/vector-icons';

import { InputContainer, Inputs } from '../../style';
import { useState } from 'react';

interface RenderPasswordInputProps extends Partial<ControllerRenderProps<FieldValues, string>> {
    placeholder?: string;
}

export const renderPasswordInput = ({
    onChange,
    value,
    placeholder = 'Senha',
}: RenderPasswordInputProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputContainer>
            <AntDesign
                name="lock"
                size={24}
                color="#7B6F72"
                style={{ position: 'absolute', left: 32, zIndex: 1 }}
            />
            <Inputs
                onChangeText={onChange}
                secureTextEntry={!showPassword}
                placeholder={placeholder}
                value={value}
            />
            <Entypo
                onPress={() => setShowPassword(current => !current)}
                name={!showPassword ? 'eye' : 'eye-with-line'}
                size={17}
                color="#7B6F72"
                style={{ position: 'absolute', right: 40, zIndex: 1 }}
            />
        </InputContainer>
    );
};
