import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { KeyboardAvoidingContainer } from '@/components/molecules/ScreenWrapper/styles';
import CreateFoodInput from './components/Inputs';
import { useState } from 'react';
import {
    ButtonCreateFood,
    CloseIcon,
    ContainerCreatingFood,
    ContainerPhoto,
    ImageFood,
    TextButtonCreateFood,
    TextPhoto,
} from './style';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
// import { ListViewBase } from 'react-native';
import { CheckIcon, Select } from 'native-base';
import { lightTheme } from '@/styles/theme';
import { pickImage } from '../../PhotoPicks/helpers/pickImage';
// import * as yup from 'yup';
import { AntDesign } from '@expo/vector-icons';
import { generateRandomUuid } from '@/helpers/functions/generateUuid';

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
    const [photo, setPhoto] = useState<string>('');

    const { gender, goal_type, token } = useSelector((state: RootState) => state.user);

    // const navigate = useNavigation() as INavigation;
    const [type, setType] = useState<string>('1');

    const handleCreateFood = async () => {
        try {
            const formData = new FormData();
            const blob = await fetch(photo).then(r => r.blob());

            const data = {
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
            };

            formData.append('data', JSON.stringify(data));
            formData.append('files.image', {
                uri: photo,
                name: `${generateRandomUuid()}-${blob.size}.${blob.type.replace('image/', '')}`,
                type: blob.type,
            } as any);

            const headers = generateAuthHeaders(token!, {
                'Content-Type': 'multipart/form-data',
                Accept: '*/*',
            });
            const res = await api.post('/foods?populate=image', formData, {
                headers,
            });

            console.log(JSON.stringify(res.data, null, 2));
        } catch (err: any) {
            console.log('Ocorreu um erro ao enviar a imagem do alimento.', err);
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

    const handlePhoto = async () => {
        const newPhoto = await pickImage();

        if (newPhoto) {
            setPhoto(newPhoto);
        }
    };

    return (
        <KeyboardAvoidingContainer>
            <ScrollablePageWrapper
                padding={1}
                bottomSpacing
                // edges={['left', 'right']}
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
                        rounded={8}
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

                    <ContainerPhoto>
                        {!photo ? (
                            <TextPhoto onPress={handlePhoto}>Adicionar Foto</TextPhoto>
                        ) : (
                            <>
                                <CloseIcon onPress={() => setPhoto('')}>
                                    <AntDesign name="close" size={24} color="#fff" />
                                </CloseIcon>
                                <ImageFood
                                    source={{
                                        uri: photo,
                                    }}
                                />
                            </>
                        )}
                    </ContainerPhoto>

                    <ButtonCreateFood onPress={handleCreateFood}>
                        <TextButtonCreateFood>Criar refeição</TextButtonCreateFood>
                    </ButtonCreateFood>
                </ContainerCreatingFood>
            </ScrollablePageWrapper>
        </KeyboardAvoidingContainer>
    );
}
