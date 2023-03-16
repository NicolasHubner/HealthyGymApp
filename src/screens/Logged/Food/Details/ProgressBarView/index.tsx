import ProgressBarCircle from '@/components/molecules/ProgressBarCircle';
import { INutrients } from '..';
import { ViewCircle } from './style';

interface IProgressBarView {
    macro: INutrients;
}
export default function ProgressBarView({ macro }: IProgressBarView) {
    return (
        <ViewCircle>
            <ProgressBarCircle
                colorUnfilled="#90d6924e"
                color="#90D692"
                progress={macro.carbohydrates / macro.total}
                text="Carbo"
            />
            <ProgressBarCircle
                colorUnfilled="#b08eff42"
                color="#AF8EFF"
                progress={macro.protein / macro.total}
                text="Proteína"
            />
            <ProgressBarCircle
                colorUnfilled="#1f87fe47"
                color="#1F87FE"
                progress={macro.fat / macro.total}
                text="Gordura"
            />
        </ViewCircle>
    );
}
