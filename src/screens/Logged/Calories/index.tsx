import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IFoodDataPost } from '../Food/Daily/helpers/functions';
import ButtonAddFoods from './ButtonAddFoods';
import CircleGraphic from './CircleGraphic';
import ComponentType from './ComponentType';
import {
    getTodayCaloriesConsumed,
    getTodayProteinCarboFatConsumed,
} from './helpers/handleCalories';
import { TopSubtitle, TopSubtitleBold, TopTitle } from './style';

export default function Calories() {
    const { params } = useRoute() as any;

    const [calories, setCalories] = useState(500);
    const [buttonAdd, setButtonAdd] = useState(true);

    const { goals, token, id } = useSelector((state: RootState) => state.user);

    // const dispatch = useDispatch();

    const [macroNutrients, setMacroNutrients] = useState({
        protein: 0,
        carbohydrates: 0,
        fat: 0,
    });

    const { food } = params;

    const getFoodHistory = async () => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const foodHistory = await api.get(
                `/food-histories?filters[user][id][$eq]=${id}&populate=food`,
                { headers }
            );
            setCalories(getTodayCaloriesConsumed(foodHistory.data));

            const { protein, carbo, fat } = getTodayProteinCarboFatConsumed(foodHistory.data);

            setMacroNutrients({ protein, carbohydrates: carbo, fat });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFoodHistory();
    }, []);

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
        <ScrollablePageWrapper edges={['top', 'left', 'right']}>
            <TopTitle>Dose Diária</TopTitle>
            <TopSubtitle>
                Hoje você consumiu até agora <TopSubtitleBold>{calories} cal</TopSubtitleBold>
            </TopSubtitle>

            <CircleGraphic macro={macroNutrients} total={totalMacroNutrients} />

            <ComponentType macro={macroNutrients} total={totalMacroNutrients} />

            {buttonAdd && <ButtonAddFoods data={food as IFoodDataPost} />}
        </ScrollablePageWrapper>
    );
}
