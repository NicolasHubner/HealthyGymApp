import { Button } from '@/components/atoms/Button';
import { DividerComponent } from '@/components/atoms/Divider';
import FavoriteFood from '@/components/molecules/FavoriteFood';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import FoodsTopDetails from '@/components/organisms/FoodsDetails';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Switch } from 'react-native';
import {
    ButtonAdd,
    ButtonAddText,
    ButtonContainer,
    ContainerIngredientsView,
    IngredientNumber,
    IngredientText,
    IngredientView,
    ModePrepareText,
    ModePrepareView,
    StepsText,
    SubtitleIngredientsText,
    TitleIngredientsText,
    TypeDietText,
    TypeDietView,
    ViewIngredients,
    ViewTypeDiet,
} from './style';

const typeDiet = [
    {
        name: 'Cetogênica',
        color: '#FCDDEC',
    },
    {
        name: 'Sem Glúten',
        color: '#D7ECD8',
    },
];

const ingredients = [
    {
        name: 'Ovos',
        quantity: '2',
    },
    {
        name: 'Fatias de Bacon',
        quantity: '4',
    },
    {
        name: 'Tomate maduros',
        quantity: '2',
    },
];

export default function FoodsDetailsIngredient() {
    const navigator = useNavigation() as INavigation;
    const [nameFoods, _] = useState('Ovos, bacon e tomate temperado');
    const [headerShown, setHeaderShown] = useState(true);
    const [favorited, setFavorited] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        navigator.setOptions({
            headerShown: headerShown,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerShown]);
    useEffect(() => {
        navigator.setOptions({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <FavoriteFood favorited={favorited} setFavorited={setFavorited} />,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorited]);
    return (
        <ScrollablePageWrapper setHeaderShown={setHeaderShown} padding={false}>
            <FoodsTopDetails nameFood={nameFoods} />
            <ViewTypeDiet>
                {typeDiet.map((item, index) => (
                    <TypeDietView key={index} bgColor={item.color}>
                        <TypeDietText>{item.name}</TypeDietText>
                    </TypeDietView>
                ))}
            </ViewTypeDiet>
            <ModePrepareView>
                <ModePrepareText>Modo de Preparo</ModePrepareText>
                <Switch
                    trackColor={{ false: '#767577', true: '#589A5A' }}
                    thumbColor={isEnabled ? '#EADDFF' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                />
            </ModePrepareView>
            <ContainerIngredientsView>
                <TitleIngredientsText>Ingredientes</TitleIngredientsText>
                <SubtitleIngredientsText>
                    Nós ajustamos estas quantidades às suas necessidades
                </SubtitleIngredientsText>
                <SubtitleIngredientsText>Tamanho da Receita: M</SubtitleIngredientsText>
                <DividerComponent />
                <ViewIngredients>
                    {ingredients.map((item, index) => (
                        <IngredientView key={index}>
                            <IngredientNumber>{item.quantity}</IngredientNumber>
                            <IngredientText>{item.name}</IngredientText>
                        </IngredientView>
                    ))}
                </ViewIngredients>
                <StepsText>Tempere os tomates com sal e pimenta do reino</StepsText>
            </ContainerIngredientsView>
            <ButtonContainer>
                <ButtonAdd>
                    <ButtonAddText>Adicionar à lista de Compras</ButtonAddText>
                </ButtonAdd>
                <Button onPress={() => console.log('ronaldo')} label={'Preparei essa refeição'} />
            </ButtonContainer>
        </ScrollablePageWrapper>
    );
}
