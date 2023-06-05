import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { KeyboardAvoidingContainer } from '@/components/molecules/ScreenWrapper/styles';
import CreateFoodInput from './components/Inputs';
import { useState } from 'react';
import {
    ButtonCreateFood,
    ContainerCheckBoxes,
    ContainerCreatingFood,
    TextButtonCreateFood,
} from './style';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import CheckBoxTypes from './components/checkBoxTypes';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';

export interface FoodTypesProps {
    name: string;
    id: number;
}

export default function CreatingFood() {
    const [foodName, setFoodName] = useState<string>('');
    const [preparationMethod, setPreparationMethod] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [calories, setCalories] = useState<string>('');
    const [carbohydrates, setCarbohydrates] = useState<string>('');
    const [proteins, setProteins] = useState<string>('');
    const [fats, setFats] = useState<string>('');

    const { gender, goal_type, token } = useSelector((state: RootState) => state.user);

    const [type, setType] = useState<FoodTypesProps>({
        name: 'Café da manhã',
        id: 1,
    });

    const handleCreateFood = async () => {
        const newFood = {
            data: {
                title: foodName,
                preparation_method: preparationMethod,
                time: time,
                calorie: calories,
                carbohydrate: carbohydrates,
                protein: proteins,
                fat: fats,
                goal_type: goal_type,
                gender: gender,
                food_type: type.id,
                // food_type: type === 'Meio da manhã' ? 'Meio da manhã(COLAÇÃO)' : type,
            },
        };
        try {
            const headers = generateAuthHeaders(token!);
            const res = await api.post('/foods', newFood, { headers });
            // console.log(res.data);
        } catch (err) {
            console.error(err.response.data.error.details);
        }
    };

    const FoodTypes = [
        {
            name: 'Café da manhã',
            id: 1,
        },
        {
            name: 'Meio da manhã',
            id: 2,
        },
        {
            name: 'Almoço',
            id: 3,
        },
        {
            name: 'Café da tarde',
            id: 4,
        },
        {
            name: 'Jantar',
            id: 5,
        },
        {
            name: 'Ceia',
            id: 6,
        },
    ];

    return (
        <KeyboardAvoidingContainer>
            <ScrollablePageWrapper
                padding={0}
                bottomSpacing
                styles={{
                    paddingHorizontal: scale(16),
                }}>
                <ContainerCreatingFood>
                    <CreateFoodInput
                        placeholder="Nome da refeição"
                        onChangeText={text => setFoodName(text)}
                        value={foodName}
                        maxLength={50}
                    />
                    <CreateFoodInput
                        placeholder="Modo de preparo"
                        onChangeText={text => setPreparationMethod(text)}
                        value={preparationMethod}
                        maxLength={9999}
                        multiline={true}
                    />
                    <CreateFoodInput
                        placeholder="Tempo de preparo"
                        onChangeText={text => setTime(text)}
                        value={time}
                        maxLength={50}
                        keyboardType="numeric"
                    />
                    <CreateFoodInput
                        placeholder="Calorias"
                        onChangeText={text => setCalories(text)}
                        value={calories}
                        maxLength={50}
                        keyboardType="numeric"
                    />
                    <CreateFoodInput
                        placeholder="Carboidratos"
                        onChangeText={text => setCarbohydrates(text)}
                        value={carbohydrates}
                        maxLength={50}
                        keyboardType="numeric"
                    />
                    <CreateFoodInput
                        placeholder="Proteínas"
                        onChangeText={text => setProteins(text)}
                        value={proteins}
                        maxLength={50}
                        keyboardType="numeric"
                    />
                    <CreateFoodInput
                        placeholder="Gorduras"
                        onChangeText={text => setFats(text)}
                        value={fats}
                        maxLength={50}
                        keyboardType="numeric"
                    />

                    <ContainerCheckBoxes>
                        {FoodTypes.map((item, index) => (
                            <CheckBoxTypes
                                key={index}
                                setState={setType}
                                state={type}
                                name={item}
                            />
                        ))}
                    </ContainerCheckBoxes>

                    <ButtonCreateFood onPress={handleCreateFood}>
                        <TextButtonCreateFood>Criar refeição</TextButtonCreateFood>
                    </ButtonCreateFood>
                </ContainerCreatingFood>
            </ScrollablePageWrapper>
        </KeyboardAvoidingContainer>
    );
}
