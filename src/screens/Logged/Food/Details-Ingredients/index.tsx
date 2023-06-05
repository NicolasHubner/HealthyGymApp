import { Button } from '@/components/atoms/Button';
import { DividerComponent } from '@/components/atoms/Divider';
import FavoriteFood from '@/components/molecules/FavoriteFood';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import FoodsTopDetails from '@/components/organisms/FoodsDetails';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { Routes } from '@/routes';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation, useRoute } from '@react-navigation/native';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Switch } from 'react-native';
import { IFood, IIngredient } from '../Daily/helpers/functions';
import { INutrients } from '../Details';
import { ButtonsDetails } from './Buttons';
import {
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

export default function FoodsDetailsIngredient() {
    const navigator = useNavigation() as INavigation;
    const [headerShown, setHeaderShown] = useState(true);
    const [favorited, setFavorited] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const [ingre, setIngredients] = useState<string[]>([]);

    const [prepation, setPreparation] = useState<string[]>([]);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const { params } = useRoute();
    const memoFoods = useMemo(() => {
        const { food } = params as { food: INutrients };
        return food;
    }, [params]);

    const memoData = useMemo(() => {
        const { data } = params as { data: IFood };
        return data;
    }, [params]);

    const memoIngredients = useMemo(() => {
        const ingredients = memoData.attributes.ingredients?.data as IIngredient[];

        const ingredientsArray = ingredients.reduce((acc, item) => {
            const ingredient = item.attributes.ingredient;
            return [...acc, ingredient];
        }, [] as string[]);
        return ingredientsArray;
    }, []);

    // const memoizedFavorite = useCallback(
    //     () => <FavoriteFood favorited={favorited} setFavorited={setFavorited} />,
    //     [favorited]
    // );

    useEffect(() => {
        navigator.setOptions({
            headerShown: headerShown,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerShown]);

    // useEffect(() => {
    //     navigator.setOptions({
    //         headerRight: memoizedFavorite,
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [favorited]);

    useEffect(() => {
        const prep = memoData.attributes.preparation_method.split('\n');
        setPreparation(prep);
        setIngredients(memoIngredients);
    }, [memoData, memoIngredients]);

    return (
        <ScrollablePageWrapper
            edges={['right', 'left']}
            setHeaderShown={setHeaderShown}
            padding={0}>
            <FoodsTopDetails data={memoData} />

            <ViewTypeDiet>
                {/* {typeDiet.map((item, index) => (
                    <TypeDietView key={index} bgColor={item.color}>
                        <TypeDietText>{item.name}</TypeDietText>
                    </TypeDietView>
                ))} */}
            </ViewTypeDiet>

            {/* <ModePrepareView>
                <ModePrepareText>Modo de Preparo</ModePrepareText>
                <Switch
                    trackColor={{ false: '#767577', true: '#589A5A' }}
                    thumbColor={isEnabled ? '#EADDFF' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                />
            </ModePrepareView> */}

            <ContainerIngredientsView>
                {ingre.length > 0 && (
                    <>
                        <TitleIngredientsText>Ingredientes</TitleIngredientsText>
                        <SubtitleIngredientsText>
                            Nós ajustamos estas quantidades às suas necessidades
                        </SubtitleIngredientsText>
                        {/* <SubtitleIngredientsText>Tamanho da Receita: M</SubtitleIngredientsText> */}
                        <DividerComponent />
                        <ViewIngredients>
                            {ingre.map((item, index) => (
                                <IngredientView key={index}>
                                    {/* <IngredientNumber>{item.quantity}</IngredientNumber> */}
                                    {/* <IngredientText>{item.name}</IngredientText> */}
                                    <IngredientText>- {item}</IngredientText>
                                </IngredientView>
                            ))}
                        </ViewIngredients>
                    </>
                )}

                {/* <DividerComponent /> */}
                <TitleIngredientsText>Preparo</TitleIngredientsText>
                <ViewIngredients>
                    {prepation.map((item, index) => (
                        <IngredientView key={index}>
                            {/* <IngredientNumber>{item.quantity}</IngredientNumber> */}
                            {/* <IngredientText>{item.name}</IngredientText> */}
                            <IngredientText>{item}</IngredientText>
                        </IngredientView>
                    ))}
                </ViewIngredients>
                {/* <StepsText>Tempere os tomates com sal e pimenta do reino</StepsText> */}
            </ContainerIngredientsView>

            <ButtonsDetails macro={memoFoods} />
        </ScrollablePageWrapper>
    );
}
