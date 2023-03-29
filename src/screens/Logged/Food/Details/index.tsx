import React, { useEffect, useState } from 'react';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import FavoriteFood from '@/components/molecules/FavoriteFood';
import {
    ButtonShare,
    ButtonViewIngredients,
    ContainerViewIngredients,
    InfoNutritionContainer,
    InfoNutritionTitle,
    ShareIcon,
    TextIngredients,
    ViewContainer,
} from './style';
import { DropDown } from './Components/DropDown';
import { DividerComponent } from '@/components/atoms/Divider';
import FoodsTopDetails from '@/components/organisms/FoodsDetails';
import CardWarnings from '@/components/molecules/CardWarnings';
import { RouteNames } from '@/routes/routes_names';
import ProgressBarView from './ProgressBarView';
import InfoNutrional from './InfoNutrional';
import { IFood } from '../Daily/helpers/functions';

const foods = [
    {
        id: 1,
        name: '1     |     Servindo(60g)',
    },
    {
        id: 2,
        name: '2     |     Servindo(120g)',
    },
    {
        id: 3,
        name: '3     |     Servindo(180g)',
    },
];

export interface INutrients {
    protein: number;
    carbohydrates: number;
    fat: number;
    total: number;
    calories: number;
    name: string;
    id: number;
}

export default function FoodsDetails() {
    const { params } = useRoute();
    const data = params?.data as IFood;

    const { title, calorie, protein, fat, carbohydrate } = data.attributes;
    const { id } = data;

    const navigator = useNavigation() as INavigation;

    const [favorited, setFavorited] = useState(false);
    const [food, setFood] = useState(foods[0].name);

    const [headerShown, setHeaderShown] = useState(true);

    // const [foodCarbo, __] = useState([
    //     {
    //         name: 'Fibras',
    //         value: '4g',
    //     },
    //     {
    //         name: 'Açúcares',
    //         value: '40g',
    //     },
    // ]);
    // const [foodFat, ___] = useState([
    //     {
    //         name: 'Gorduras saturadas',
    //         value: '1.2g',
    //     },
    //     {
    //         name: 'Gorduras insaturas',
    //         value: '0.8g',
    //     },
    // ]);

    const [macroNutrients, setMacroNutrients] = useState<INutrients>({
        protein: 4,
        carbohydrates: 44,
        fat: 2,
        total: 50,
        calories: 100,
        name: 'Ovos, bacon e tomate temperado',
        id: 1,
    });

    // Use Effect that is going to update the macro nutrients
    useEffect(() => {
        //Chamada de API
        setMacroNutrients({
            protein: protein,
            carbohydrates: carbohydrate,
            fat: fat,
            total: protein + carbohydrate + fat,
            calories: calorie,
            name: title,
            id: id,
        });
    }, [protein, carbohydrate, fat, calorie, title, id]);

    // useEffect(() => {
    //     navigator.setOptions({
    //         // eslint-disable-next-line react/no-unstable-nested-components
    //         headerRight: () => <FavoriteFood favorited={favorited} setFavorited={setFavorited} />,
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [favorited]);
    useEffect(() => {
        navigator.setOptions({
            headerShown: headerShown,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerShown]);

    return (
        <ScrollablePageWrapper
            edges={['right', 'left']}
            setHeaderShown={setHeaderShown}
            padding={0}>
            <FoodsTopDetails data={data} />
            <ViewContainer>
                {/* <DropDown setFood={setFood} food={food} foods={foods} /> */}

                <ProgressBarView macro={macroNutrients} />

                <ContainerViewIngredients>
                    {/* <ButtonShare>
                        <ShareIcon name="share" size={24} />
                    </ButtonShare> */}
                    <ButtonViewIngredients
                        onPress={() =>
                            navigator.navigate(RouteNames.logged.food.details.ingredients, {
                                food: macroNutrients,
                                data: data,
                            })
                        }>
                        <TextIngredients>Ver igredientes</TextIngredients>
                    </ButtonViewIngredients>
                </ContainerViewIngredients>

                <DividerComponent />

                <InfoNutritionContainer>
                    <InfoNutritionTitle>Informação nutricional</InfoNutritionTitle>
                </InfoNutritionContainer>

                <InfoNutrional macroNutrients={macroNutrients} />

                <CardWarnings
                    textSubTitle="Sugestão"
                    textSubtitleBody="Se você tem alergia ao glúten ou está procurando reduzir o trigo."
                    textSeeMore="Ver mais"
                />
            </ViewContainer>
        </ScrollablePageWrapper>
    );
}
