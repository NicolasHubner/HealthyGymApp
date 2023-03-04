import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { ButtonsPhoto, Container, TextButton } from './style';

export default function Buttons() {
    const { colors } = useTheme();

    const navigator = useNavigation() as INavigation;

    const handleButtonContinue = () => {
        navigator.navigate(RouteNames.logged.photopicker);
    };
    return (
        <Container>
            <TouchableOpacity onPress={handleButtonContinue}>
                <ButtonsPhoto color={colors.green[500]}>
                    <TextButton>Continuar</TextButton>
                </ButtonsPhoto>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigator.navigate(RouteNames.logged.home);
                }}>
                <ButtonsPhoto color={'transparent'} colorBorder={colors.gray[300]}>
                    <TextButton>Ainda tenho que me preparar</TextButton>
                </ButtonsPhoto>
            </TouchableOpacity>
        </Container>
    );
}
