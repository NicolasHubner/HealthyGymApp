import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonText, Container } from './style';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { IFoodDataPost } from '../../Food/Daily/helpers/functions';
import { useSelector } from 'react-redux';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { throwErrorToast } from '@/helpers/functions/handleToast';

interface IButtonAddFoods {
    data: IFoodDataPost;
}

export default function ButtonAddFoods({ data }: IButtonAddFoods) {
    const navigator = useNavigation() as INavigation;
    const { id: userId, token } = useSelector((state: RootState) => state.user);

    async function handleAddFood() {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const newData = {
            data: {
                datetime: new Date(),
                food: data.id,
                user: userId,
            },
        };
        try {
            const res = await api.post('/food-histories', newData, { headers });
            if (res.status === 200) {
                navigator.navigate(RouteNames.logged.home);
            }
        } catch (error) {
            // console.log(error.response.data);
            throwErrorToast({
                title: 'Erro ao adicionar alimento',
                message: 'Ocorreu um erro ao adicionar o alimento. Tente novamente mais tarde.',
            });
        }
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
