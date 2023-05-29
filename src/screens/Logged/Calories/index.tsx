import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { IFoodDataPost } from '../Food/Daily/helpers/functions';
import ButtonAddFoods from './ButtonAddFoods';
import CircleGraphic from './CircleGraphic';
import ComponentType from './ComponentType';
import {
    getTodayCaloriesConsumed,
    getTodayProteinCarboFatConsumed,
} from './helpers/handleCalories';
import {
    FoodListCard,
    FoodListCardHourWrapper,
    FoodListCardProperty,
    FoodListCardPropertyWrapper,
    FoodListCardPropKey,
    FoodListCardTitle,
    FoodListContainer,
    TopSubtitle,
    TopSubtitleBold,
    TopTitle,
    VerticalDivider,
} from './style';

interface FoodList {
    title: string;
    calorie: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    createdAt: string;
}

export default function Calories() {
    const { params } = useRoute() as any;

    const [calories, setCalories] = useState(500);
    const [buttonAdd, setButtonAdd] = useState(true);
    const [foodList, setFoodList] = useState<FoodList[]>([]);

    const { goals, token, id } = useSelector((state: RootState) => state.user);

    const [macroNutrients, setMacroNutrients] = useState({
        protein: 0,
        carbohydrates: 0,
        fat: 0,
    });

    const { food } = params;

    const getFoodHistory = useCallback(async () => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const foodHistory = await api.get(
                `/food-histories?filters[user][id][$eq]=${id}&populate=food&populate=user`,
                { headers }
            );
            setFoodList(
                foodHistory?.data?.data?.map((item: any) => ({
                    ...item?.attributes?.food?.data?.attributes,
                    createdAt: item?.attributes?.createdAt,
                })) ?? []
            );

            setCalories(getTodayCaloriesConsumed(foodHistory.data));

            const { protein, carbo, fat } = getTodayProteinCarboFatConsumed(foodHistory.data);

            setMacroNutrients({ protein, carbohydrates: carbo, fat });
        } catch (err) {
            console.error('Ocorreu um erro ao buscar o histórico de alimentação', err);
        }
    }, [id, token]);

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

    const [totalMacroNutrients, setTotalMacroNutrients] = useState({
        protein: 300,
        carbohydrates: 500,
        fat: 100,
    });

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

                    <View style={{ width: '100%', marginTop: 16 }}>
                        {foodList?.map((item, index) => (
                            <FoodListCard key={item.title ?? index}>
                                <FoodListCardTitle numberOfLines={2}>
                                    {item.title ?? 'Vazio'}
                                </FoodListCardTitle>
                                <FoodListCardHourWrapper>
                                    <FoodListCardPropKey>
                                        {format(new Date(item.createdAt), 'dd/MM')} às{' '}
                                        {new Date(item.createdAt).getHours()}:
                                        {new Date(item.createdAt).getMinutes()}
                                    </FoodListCardPropKey>
                                </FoodListCardHourWrapper>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 8,
                                    }}>
                                    <FoodListCardPropertyWrapper>
                                        <FoodListCardProperty>
                                            {item.carbohydrate ?? ''}g
                                        </FoodListCardProperty>
                                        <FoodListCardPropKey>Carbo</FoodListCardPropKey>
                                    </FoodListCardPropertyWrapper>

                                    <VerticalDivider />

                                    <FoodListCardPropertyWrapper>
                                        <FoodListCardProperty>
                                            {item.fat ?? ''}g
                                        </FoodListCardProperty>
                                        <FoodListCardPropKey>Gordura</FoodListCardPropKey>
                                    </FoodListCardPropertyWrapper>

                                    <VerticalDivider />

                                    <FoodListCardPropertyWrapper>
                                        <FoodListCardProperty>
                                            {item.protein ?? ''}g
                                        </FoodListCardProperty>
                                        <FoodListCardPropKey>Proteína</FoodListCardPropKey>
                                    </FoodListCardPropertyWrapper>

                                    <VerticalDivider />

                                    <FoodListCardPropertyWrapper>
                                        <FoodListCardProperty>
                                            {item.calorie ?? ''}
                                        </FoodListCardProperty>
                                        <FoodListCardPropKey>Calorias</FoodListCardPropKey>
                                    </FoodListCardPropertyWrapper>
                                </View>
                            </FoodListCard>
                        ))}
                    </View>
                </FoodListContainer>
            )}
        </ScrollablePageWrapper>
    );
}
