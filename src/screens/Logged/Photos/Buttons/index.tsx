import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { ButtonsPhoto, Container, TextButton } from './style';

export default function Buttons() {
    const { colors } = useTheme();
    return (
        <Container>
            <TouchableOpacity>
                <ButtonsPhoto color={colors.green[500]}>
                    <TextButton>Continuar</TextButton>
                </ButtonsPhoto>
            </TouchableOpacity>
            <TouchableOpacity>
                <ButtonsPhoto color={'transparent'} colorBorder={colors.gray[300]}>
                    <TextButton>Ainda tenho que me preparar</TextButton>
                </ButtonsPhoto>
            </TouchableOpacity>
        </Container>
    );
}
