import React, { useEffect, useState } from 'react';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import FavoriteFood from '@/components/molecules/FavoriteFood';
import {
    ButtonShare,
    ButtonViewIngredients,
    ContainerViewIngredients,
    InfoNutritionContainer,
    InfoNutritionTitle,
    PartNutritionText,
    PartNutritionValue,
    ShareIcon,
    SquareColor,
    SubNutritionText,
    SubNutritionValue,
    TextIngredients,
    ViewContainer,
    ViewDetailsNutrition,
    ViewKey,
    ViewPartNutrition,
    ViewSubNutrition,
    ViewSubNutritionTitle,
    ViewTitlePartNutrition,
} from './style';
import { DropDown } from './Components/DropDown';
import { DividerComponent } from '@/components/atoms/Divider';
import FoodsTopDetails from '@/components/organisms/FoodsDetails';
import CardWarnings from '@/components/molecules/CardWarnings';
import { RouteNames } from '@/routes/routes_names';
import ProgressBarView from './ProgressBarView';
import InfoNutrional from './InfoNutrional';

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
}

export default function FoodsDetails() {
    const navigator = useNavigation() as INavigation;
    const [favorited, setFavorited] = useState(false);
    const [food, setFood] = useState(foods[0].name);
    const [nameFood, _] = useState('Ovos, bacon e tomate temperado');
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
    });

    //Use Effect that is going to update the macro nutrients
    // useEffect(() => {
    //     //Chamada de API
    //     setMacroNutrients({
    //         protein: 4,
    //         carbohydrates: 44,
    //         fat: 2,
    //         total: 50,
    //     });
    // }, [food]);

    useEffect(() => {
        navigator.setOptions({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <FavoriteFood favorited={favorited} setFavorited={setFavorited} />,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorited]);
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
            <FoodsTopDetails nameFood={nameFood} />
            <ViewContainer>
                <DropDown setFood={setFood} food={food} foods={foods} />

                <ProgressBarView macro={macroNutrients} />

                <ContainerViewIngredients>
                    <ButtonShare>
                        <ShareIcon name="share" size={24} />
                    </ButtonShare>
                    <ButtonViewIngredients
                        onPress={() =>
                            navigator.navigate(RouteNames.logged.food.details.ingredients, {
                                food: macroNutrients,
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
