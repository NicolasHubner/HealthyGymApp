import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { FoodHistory as FoodHistoryType } from '@/types/food/FoodHistory';
import { useRoute } from '@react-navigation/native';
import { isToday } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { IFoodDataPost } from '../Food/Daily/helpers/functions';
import ButtonAddFoods from './ButtonAddFoods';
import CircleGraphic from './CircleGraphic';
import { FoodHistory } from './components/FoodHistory';
import ComponentType from './ComponentType';
import {
    getTodayCaloriesConsumed,
    getTodayProteinCarboFatConsumed,
} from './helpers/handleCalories';
import { FoodListContainer, TopSubtitle, TopSubtitleBold, TopTitle } from './style';

export default function Calories() {
    const [totalMacroNutrients, setTotalMacroNutrients] = useState({
        protein: 300,
        carbohydrates: 500,
        fat: 100,
    });
    const [macroNutrients, setMacroNutrients] = useState({
        protein: 0,
        carbohydrates: 0,
        fat: 0,
    });

    const [calories, setCalories] = useState(500);
    const [buttonAdd, setButtonAdd] = useState(true);
    const [foodList, setFoodList] = useState<FoodHistoryType[]>([]);

    const { goals, token, id } = useSelector((state: RootState) => state.user);

    const { params } = useRoute() as any;
    const { food, userIdParam } = params;

    const getFoodHistory = useCallback(async () => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const foodHistory = await api.get(
                `/food-histories?filters[user][id][$eq]=${
                    userIdParam ?? id
                }&populate=food&populate=user&sort=datetime:desc&pagination[limit]=20`,
                { headers }
            );

            const parsedFoodHistory =
                foodHistory?.data?.data?.map((item: any) => ({
                    ...item?.attributes?.food?.data?.attributes,
                    datetime: item?.attributes?.datetime,
                    createdAt: item?.attributes?.datetime,
                })) ?? [];

            const todayFoodIngested =
                parsedFoodHistory?.filter((item: any) =>
                    isToday(new Date(item?.datetime ?? Date.now()))
                ) ?? [];

            setFoodList(todayFoodIngested);
            setCalories(getTodayCaloriesConsumed(foodHistory.data));
            const { protein, carbo, fat } = getTodayProteinCarboFatConsumed(foodHistory.data);
            setMacroNutrients({ protein, carbohydrates: carbo, fat });
        } catch (err) {
            console.error('Ocorreu um erro ao buscar o histórico de alimentação', err);
        }
    }, [id, token, userIdParam]);

    useEffect(() => {
        getFoodHistory();
    }, [getFoodHistory]);

    useEffect(() => {
        if (params.from && params.from !== 'metrics') {
            setTimeout(() => {
                setMacroNutrients(prev => ({
                    protein: prev.protein + food.protein,
                    carbohydrates: prev.carbohydrates + food.carbohydrates,
                    fat: prev.fat + food.fat,
                }));

                setCalories(prev => prev + food.calories);
                // throwSuccessToast({
                //     title: 'Alimento adicionado',
                //     message: `${food.name} foi adicionado aos seus gráficos! Para concluir essa ação, clique no botão "Concluir"`,
                //     showTime: 7000,
                // });
            }, 1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    useEffect(() => {
        if (params.from && params.from === 'metrics') {
            setButtonAdd(false);
        }
    }, [params.from]);

    useEffect(() => {
        if (goals) {
            setTotalMacroNutrients({
                protein: goals.proteinToIngest as number,
                carbohydrates: goals.carbsToIngest as number,
                fat: goals.fatToIngest as number,
            });
        }
    }, [goals]);

    return (
        <ScrollablePageWrapper bottomSpacing>
            <TopTitle>Dose Diária</TopTitle>
            <TopSubtitle>
                Hoje você consumiu até agora <TopSubtitleBold>{calories} cal</TopSubtitleBold>
            </TopSubtitle>

            <CircleGraphic macro={macroNutrients} total={totalMacroNutrients} />

            <ComponentType macro={macroNutrients} total={totalMacroNutrients} />

            {buttonAdd && <ButtonAddFoods data={food as IFoodDataPost} />}

            {foodList?.length > 0 && (
                <FoodListContainer>
                    <TopSubtitle>Refeições feitas hoje</TopSubtitle>

                    <View style={{ width: '100%', marginTop: 16, gap: 8 }}>
                        <FoodHistory foodList={foodList} />
                    </View>
                </FoodListContainer>
            )}
        </ScrollablePageWrapper>
    );
}
