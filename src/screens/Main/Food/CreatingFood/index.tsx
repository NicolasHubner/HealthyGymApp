import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { KeyboardAvoidingContainer } from '@/components/molecules/ScreenWrapper/styles';
import CreateFoodInput from './components/Inputs';
import { useEffect, useState } from 'react';
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
import { AntDesign } from '@expo/vector-icons';

import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { generateRandomUuid } from '@/helpers/functions/generateUuid';

import { useNavigation, useRoute } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';

import { throwSuccessToast } from '@/helpers/functions/handleToast';
import { RootState } from '@/store';
import { Button, View, Text } from 'native-base';
import { useTheme } from 'styled-components';

import { getPhotoCameraRoll, pickImageUserProfile } from '@/helpers/functions/photos/getPhotos';

import { Entypo } from '@expo/vector-icons';

export interface FoodTypesProps {
    name: string;
    id: string;
}

interface IParams {
    title?: string;
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

    const [loading, setLoading] = useState<boolean>(false);

    const { colors } = useTheme();

    const navigator = useNavigation() as INavigation;
    const { params } = useRoute() as { params: IParams };

    useEffect(() => {
        if (params && params.title) {
            setFoodName(params.title);
        }
    }, [params]);
    const { gender, goal_type, token } = useSelector((state: RootState) => state.user);

    // const navigate = useNavigation() as INavigation;
    const [type, setType] = useState<string>('1');

    const handleCreateFood = async () => {
        setLoading(true);
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
                goal_type: 'any',
                gender: 'A',
                food_type: 7, // food_type: Custom
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

            await api.post('/foods?populate=image', formData, {
                headers,
            });

            navigator.navigate(RouteNames.logged.home);

            throwSuccessToast({
                title: 'Refeição criada com sucesso!',
                message:
                    'Sua refeição foi criada com sucesso, agora você pode visualizar ela na tela de refeições diárias.',
            });
        } catch (err: any) {
            console.error('Ocorreu um erro ao enviar a imagem do alimento.', err);
        } finally {
            setLoading(false);
        }
    };

    // const FoodTypes = [
    //     {
    //         name: 'Café da manhã',
    //         id: (1).toString(),
    //     },
    //     {
    //         name: 'Meio da manhã',
    //         id: (2).toString(),
    //     },
    //     {
    //         name: 'Almoço',
    //         id: (3).toString(),
    //     },
    //     {
    //         name: 'Café da tarde',
    //         id: (4).toString(),
    //     },
    //     {
    //         name: 'Jantar',
    //         id: (5).toString(),
    //     },
    //     {
    //         name: 'Ceia',
    //         id: (6).toString(),
    //     },
    // ];

    const handlePhoto = async () => {
        const newPhoto = await pickImageUserProfile();

        if (newPhoto) {
            setPhoto(newPhoto);
        }
    };

    const handlePhotoCameraRoll = async () => {
        const newPhoto = await getPhotoCameraRoll();

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

                    {/* <Select
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
                    </Select> */}

                    <View mt={4} flexDirection={'row'} justifyContent={'space-around'}>
                        <Button
                            onPress={handlePhoto}
                            bgColor={colors.green[700]}
                            rounded={8}
                            w={'43%'}
                            maxWidth={180}>
                            <Text
                                fontFamily={'Rubik_400Regular'}
                                fontSize={14}
                                color={'#fff'}
                                w={'100%'}>
                                <Entypo name="camera" size={16} color="white" />
                                {'  '}Tirar Foto
                            </Text>
                        </Button>

                        <Button
                            onPress={handlePhotoCameraRoll}
                            bgColor={colors.green[700]}
                            rounded={8}
                            w={'43%'}
                            maxWidth={180}>
                            <Text
                                fontFamily={'Rubik_400Regular'}
                                fontSize={14}
                                color={'#fff'}
                                w={'100%'}>
                                <Entypo name="folder-images" size={16} color="white" />
                                {'  '}Foto da Galeria
                            </Text>
                        </Button>
                    </View>

                    <ContainerPhoto>
                        {!photo ? (
                            <TextPhoto>Adicione uma Foto</TextPhoto>
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

                    <ButtonCreateFood
                        bgColor={photo.length === 0 ? '#ccc' : null}
                        disabled={loading || photo.length === 0}
                        onPress={handleCreateFood}>
                        <TextButtonCreateFood>Criar refeição</TextButtonCreateFood>
                    </ButtonCreateFood>
                </ContainerCreatingFood>
            </ScrollablePageWrapper>
        </KeyboardAvoidingContainer>
    );
}
