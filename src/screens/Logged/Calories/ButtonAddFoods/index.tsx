import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonText, Container } from './style';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';

export default function ButtonAddFoods() {
    const navigator = useNavigation() as INavigation;

    function handleAddFood() {
        console.log('Adicionar alimento');
        navigator.navigate(RouteNames.logged.home);
    }
    return (
        <TouchableOpacity onPress={handleAddFood}>
            <Container>
                <Ionicons name="nutrition" size={16} color="white" />
                <ButtonText>Concluir</ButtonText>
            </Container>
        </TouchableOpacity>
    );
}
