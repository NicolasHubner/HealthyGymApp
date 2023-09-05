import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import {
    ButtonAdd,
    ContainerScrollFoods,
    Content,
    Input,
    InputContainer,
    InputSearchIcon,
    TextAddFood,
    TextNoFood,
} from './style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FoodBoxContent } from '@/components/organisms/FoodBoxContent';
import { IFood } from '../Daily/helpers/functions';
import { useCallback, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Platform, View } from 'react-native';
import { RouteNames } from '@/routes/routes_names';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { KeyboardAvoidingView } from 'native-base';

interface RouteProps {
    title?: string;
    data: IFood[];
}

export default function SearchFood() {
    const { params } = useRoute() as { params: RouteProps };

    const navigate = useNavigation() as INavigation;

    const [searchedText, setSearchedText] = useState<string>('');

    const handlePlaceHolder = () => {
        // if (params?.title) {
        //     return `Pesquise por ${params.title.toLowerCase()}...`;
        // }
        return 'Pesquise por sua refeição';
    };

    const handleSearch = (text: string) => {
        setSearchedText(text);
    };

    const debounce = useDebounce(handleSearch);

    const getListItemsBySearchedTerm = useCallback((term: string, list: IFood[]) => {
        return list?.filter(item =>
            item?.attributes.title?.toLowerCase().includes(term?.toLowerCase().trim())
        );
    }, []);

    return (
        <KeyboardAvoidingView
            flex={1}
            behavior={Platform.select({
                ios: 'padding',
                android: 'height',
            })}>
            <PageWrapper styles={{ padding: 0 }} marginTop={0} edges={['left', 'right']}>
                <InputContainer>
                    <InputSearchIcon />
                    <Input onChangeText={debounce} placeholder={handlePlaceHolder()} />
                </InputContainer>

                <ContainerScrollFoods>
                    <Content>
                        {getListItemsBySearchedTerm(searchedText, params.data).length !== 0 ? (
                            <FoodBoxContent
                                title={params?.title as string}
                                data={
                                    searchedText.length > 0 && params?.data
                                        ? getListItemsBySearchedTerm(searchedText, params?.data)
                                        : params?.data
                                }
                            />
                        ) : (
                            <View>
                                <TextNoFood style={{ marginTop: 24 }}>
                                    Nenhum alimento encontrado, deseja criar o alimento?
                                </TextNoFood>
                                <ButtonAdd
                                    onPress={() =>
                                        navigate.navigate(RouteNames.logged.food.creatingFood, {
                                            title: searchedText,
                                        })
                                    }>
                                    <TextAddFood>Adicionar alimento</TextAddFood>
                                </ButtonAdd>
                            </View>
                        )}
                    </Content>
                </ContainerScrollFoods>
            </PageWrapper>
        </KeyboardAvoidingView>
    );
}
