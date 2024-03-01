import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { INutrients } from '../../Details';
import { ButtonAddGreen, ButtonAddText, ButtonContainer } from './style';

interface IProps {
    macro: INutrients;
}

const ButtonsDetails = ({ macro }: IProps) => {
    const navigator = useNavigation() as INavigation;

    const handlePreparedFood = () => {
        navigator.navigate(RouteNames.logged.calories, {
            from: 'food',
            food: macro,
        });
    };

    return (
        <ButtonContainer>
            {/* <TouchableOpacity>
                <ButtonAdd>
                    <ButtonAddText>Adicionar à lista de Compras</ButtonAddText>
                </ButtonAdd>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={handlePreparedFood}>
                <ButtonAddGreen>
                    <ButtonAddText color="#FFF">Preparei essa refeição</ButtonAddText>
                </ButtonAddGreen>
            </TouchableOpacity>
        </ButtonContainer>
    );
};

const memoButtons = React.memo(ButtonsDetails);
export { memoButtons as ButtonsDetails };
