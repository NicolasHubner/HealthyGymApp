import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { throwSuccessToast } from '@/helpers/functions/handleToast';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ButtonAddFoods from './ButtonAddFoods';
import CircleGraphic from './CircleGraphic';
import ComponentType from './ComponentType';
import { TopSubtitle, TopSubtitleBold, TopTitle } from './style';

export default function Calories() {
    const { params } = useRoute() as any;

    const [calories, setCalories] = useState(500);
    const [buttonAdd, setButtonAdd] = useState(true);

    useEffect(() => {
        if (params.from && params.from !== 'metrics') {
            const { food } = params;
            setTimeout(() => {
                setMacroNutrients({
                    protein: food.protein + macroNutrients.protein,
                    carbohydrates: food.carbohydrates + macroNutrients.carbohydrates,
                    fat: food.fat + macroNutrients.fat,
                });
                setCalories(food.calories + calories);
                throwSuccessToast({
                    title: 'Alimento adicionado',
                    message: `${food.name} foi adicionado aos seus gráficos! Para concluir essa ação, clique no botão "Concluir"`,
                    showTime: 7000,
                });
            }, 1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    useEffect(() => {
        if (params.from && params.from === 'metrics') {
            setButtonAdd(false);
        }
    }, [params.from]);

    const [macroNutrients, setMacroNutrients] = useState({
        protein: 120,
        carbohydrates: 230,
        fat: 30,
    });

    const [totalMacroNutrients, setTotalMacroNutrients] = useState({
        protein: 300,
        carbohydrates: 500,
        fat: 100,
    });

    return (
        <ScrollablePageWrapper edges={['top', 'left', 'right']}>
            <TopTitle>Dose Diária</TopTitle>
            <TopSubtitle>
                Hoje você consumiu até agora <TopSubtitleBold>{calories} cal</TopSubtitleBold>
            </TopSubtitle>

            <CircleGraphic macro={macroNutrients} total={totalMacroNutrients} />

            <ComponentType macro={macroNutrients} total={totalMacroNutrients} />

            {buttonAdd && <ButtonAddFoods />}
        </ScrollablePageWrapper>
    );
}
