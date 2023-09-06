import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { Input } from 'native-base';

interface InputsStudentsProps {
    HandleSearch: (text: string) => void;
}

export const InputsStudents = ({ HandleSearch }: InputsStudentsProps) => {
    const { colors } = useTheme();

    return (
        <Input
            placeholder="Buscar Aluno.."
            placeholderTextColor={colors.gray[500]}
            w={'100%'}
            h={'48px'}
            fontSize={14}
            onChangeText={text => HandleSearch(text)}
            selectionColor={colors.gray[500]}
            cursorColor={colors.gray[500]}
            lineHeight={16}
            borderRadius={16}
            color={colors.gray[500]}
            focusOutlineColor={colors.green[500]}
            bgColor={'#FFFFFF'}
            mt={10}
            leftElement={
                <Feather
                    name="search"
                    size={24}
                    color={colors.gray[500]}
                    style={{ marginLeft: 12 }}
                />
            }
        />
    );
};
