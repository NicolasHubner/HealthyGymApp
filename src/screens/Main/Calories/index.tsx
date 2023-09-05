import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { getGoalsUser } from '@/helpers/functions/goals/goals_type';
import { getCaloriesConsumedFromFullHistory } from '@/helpers/functions/metrics/handleMetrics';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { FullHistoryFoodHistory } from '@/types/food/FoodHistory';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { IFoodDataPost } from '../Food/Daily/helpers/functions';
import ButtonAddFoods from './ButtonAddFoods';
import CircleGraphic from './CircleGraphic';
import { FoodHistory } from './components/FoodHistory';
import ComponentType from './ComponentType';
import { getTodayProteinCarboFatConsumed } from './helpers/handleCalories';
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
    const [foodList, setFoodList] = useState<FullHistoryFoodHistory[]>([]);
    const [studentInfo, setStudentInfo] = useState(undefined);

    const { goals, token, id } = useSelector((state: RootState) => state.user);

    const { params } = useRoute() as any;
    const { food, userIdParam } = params;

    const getFoodHistory = useCallback(async () => {
        try {
            const headers = generateAuthHeaders(token!);

            const newDateToApi = new Date();
            const dateToApi = `${newDateToApi.getFullYear()}-${
                newDateToApi.getMonth() < 10
                    ? `0${newDateToApi.getMonth() + 1}`
                    : `${newDateToApi.getMonth() + 1}`
            }-${
                newDateToApi.getDate() < 10
                    ? `0${newDateToApi.getDate()}`
                    : `${newDateToApi.getDate()}`
            }`;

            const { data } = await api.get(
                `/full-histories/${userIdParam ? userIdParam : id}/${dateToApi}`,
                { headers }
            );

            setStudentInfo(data?.user ?? undefined);
            setFoodList((data?.['food-history'] as FullHistoryFoodHistory[]) ?? []);
            setCalories(getCaloriesConsumedFromFullHistory(data?.['food-history'] ?? []));
            const { protein, carbo, fat } = getTodayProteinCarboFatConsumed(
                data?.['food-history'] ?? []
            );
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

    useEffect(() => {
        if (studentInfo) {
            const { carbo_burn, fat_burn, protein_burn } = getGoalsUser(studentInfo);
            setTotalMacroNutrients({
                protein: protein_burn as number,
                carbohydrates: carbo_burn as number,
                fat: fat_burn as number,
            });
        }
    }, [studentInfo]);

    return (
        <ScrollablePageWrapper bottomSpacing>
            <TopTitle>Dose Diária</TopTitle>
            {userIdParam ? (
                <TopSubtitle>
                    Hoje, o aluno consumiu <TopSubtitleBold>{calories} cal</TopSubtitleBold>
                </TopSubtitle>
            ) : (
                <TopSubtitle>
                    Hoje você consumiu até agora <TopSubtitleBold>{calories} cal</TopSubtitleBold>
                </TopSubtitle>
            )}

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
