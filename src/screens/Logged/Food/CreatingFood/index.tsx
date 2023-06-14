import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { KeyboardAvoidingContainer } from '@/components/molecules/ScreenWrapper/styles';
import CreateFoodInput from './components/Inputs';
import { useState } from 'react';
import { ButtonCreateFood, ContainerCreatingFood, TextButtonCreateFood } from './style';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
// import { ListViewBase } from 'react-native';
import { CheckIcon, Select } from 'native-base';
import { lightTheme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';

export interface FoodTypesProps {
    name: string;
    id: string;
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

    const navigate = useNavigation() as INavigation;
    // const [type, setType] = useState<FoodTypesProps>({
    //     name: 'Café da manhã',
    //     id: (1).toString(),
    // });
    const [type, setType] = useState<string>('1');

    // console.log(type);
    const handleCreateFood = async () => {
        const newFood = {
            data: {
                title: foodName,
                preparation_method: preparationMethod,
                time: Number(String(time).replace(',', '.')).toPrecision(1),
                calorie: calories,
                carbohydrate: carbohydrates,
                protein: proteins,
                fat: fats,
                goal_type: goal_type,
                gender: gender,
                food_type: Number(type),
                // food_type: type === 'Meio da manhã' ? 'Meio da manhã(COLAÇÃO)' : type,
            },
        };
        try {
            const headers = generateAuthHeaders(token!);
            await api.post('/foods', newFood, { headers });
            // console.log(res.data);
            navigate.navigate(RouteNames.logged.home);
        } catch (err: any) {
            console.error(err?.response.data.error.details);
        }
    };

    const FoodTypes = [
        {
            name: 'Café da manhã',
            id: (1).toString(),
        },
        {
            name: 'Meio da manhã',
            id: (2).toString(),
        },
        {
            name: 'Almoço',
            id: (3).toString(),
        },
        {
            name: 'Café da tarde',
            id: (4).toString(),
        },
        {
            name: 'Jantar',
            id: (5).toString(),
        },
        {
            name: 'Ceia',
            id: (6).toString(),
        },
    ];

    // const Selected = (ItemValue: string): FoodTypesProps => {
    //     const res = FoodTypes.find(item => item.id === ItemValue);
    //     return res;
    // };
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
                        error={
                            foodName.length < 3 && foodName.length > 0
                                ? 'Nome deverá ter no mínimo 3 caracteres longo'
                                : undefined
                        }
                    />
                    <CreateFoodInput
                        placeholder="Modo de preparo"
                        onChangeText={text => setPreparationMethod(text)}
                        value={preparationMethod}
                        maxLength={9999}
                        multiline={true}
                        error={
                            preparationMethod.length < 15 && preparationMethod.length > 0
                                ? 'Modo de preparo deverá ter no mínimo 15 caracteres longo, tente explicar ao máximo'
                                : undefined
                        }
                    />
                    <CreateFoodInput
                        placeholder="Tempo de preparo (Em minutos)"
                        onChangeText={text => setTime(text)}
                        value={time}
                        maxLength={50}
                        keyboardType="numeric"
                        // error={time.length < 3 && time.length > 0 ? 'Informe o tempo' : undefined}
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

                    {/* <ContainerCheckBoxes>
                        {FoodTypes.map((item, index) => (
                            <CheckBoxTypes
                                key={index}
                                setState={setType}
                                state={type}
                                name={item}
                            />
                        ))}
                    </ContainerCheckBoxes> */}
                    {/* <ListViewBase
                        data={FoodTypes}
                        renderItem={({ item }) => (
                            <CheckBoxTypes setState={setType} state={type} name={item} />
                        )} */}
                    <Select
                        selectedValue={type}
                        minWidth="200"
                        accessibilityLabel="Choose Food Type"
                        placeholder="Choose Food Type"
                        _selectedItem={{
                            bg: lightTheme.colors.gray[100],
                            endIcon: (
                                <CheckIcon backgroundColor={lightTheme.colors.gray[100]} size="5" />
                            ),
                        }}
                        style={{ backgroundColor: lightTheme.colors.gray[100], paddingLeft: 16 }}
                        fontFamily={'Rubik_400Regular'}
                        fontSize={'14px'}
                        color={lightTheme.colors.blue_metal[100]}
                        mt={4}
                        onValueChange={itemValue => setType(itemValue)}>
                        {FoodTypes.map((item, index) => (
                            <Select.Item label={item.name} value={item.id} key={index} />
                        ))}
                    </Select>

                    <ButtonCreateFood onPress={handleCreateFood}>
                        <TextButtonCreateFood>Criar refeição</TextButtonCreateFood>
                    </ButtonCreateFood>
                </ContainerCreatingFood>
            </ScrollablePageWrapper>
        </KeyboardAvoidingContainer>
    );
}
