import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonText, Container } from './style';
import { Ionicons } from '@expo/vector-icons';

export default function ButtonAddFoods() {
    return (
        <TouchableOpacity>
            <Container>
                <Ionicons name="nutrition" size={16} color="white" />
                <ButtonText>Adicionar Refeição</ButtonText>
            </Container>
        </TouchableOpacity>
    );
}
