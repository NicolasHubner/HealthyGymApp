import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { AntDesign, Entypo } from '@expo/vector-icons';

import { InputContainer, Inputs } from '../../style';

interface RenderPasswordInputProps extends Partial<ControllerRenderProps<FieldValues, string>> {
    statusPassword: boolean;
    setStatusPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const renderPasswordInput = ({
    onChange,
    value,
    statusPassword,
    setStatusPassword,
}: RenderPasswordInputProps) => (
    <InputContainer>
        <AntDesign
            name="lock"
            size={17}
            color="#7B6F72"
            style={{ position: 'absolute', left: 30, zIndex: 1 }}
        />
        <Inputs
            onChangeText={onChange}
            secureTextEntry={statusPassword}
            placeholder="Senha"
            value={value}
        />
        <Entypo
            onPress={() => setStatusPassword(current => !current)}
            name={statusPassword ? 'eye' : 'eye-with-line'}
            size={17}
            color="#7B6F72"
            style={{ position: 'absolute', right: 40, zIndex: 1 }}
        />
    </InputContainer>
);
