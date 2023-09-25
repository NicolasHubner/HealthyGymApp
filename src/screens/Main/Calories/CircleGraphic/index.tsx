import * as ProgressCircle from 'react-native-progress';
import { SubTitleGraphic, TextGraphic, ViewTextGraphic } from './style';
import { Graphics } from './style';

interface CircleGraphicProps {
    macro: {
        protein: number;
        carbohydrates: number;
        fat: number;
    };
    total: {
        protein: number;
        carbohydrates: number;
        fat: number;
    };
}

export default function CircleGraphic({ macro, total }: CircleGraphicProps) {
    const goalCaloriesPercentage = () => {
        const totalCaloriesGoal = total.protein * 4 + total.carbohydrates * 4 + total.fat * 9;
        const totalCalories = macro.protein * 4 + macro.carbohydrates * 4 + macro.fat * 9;

        const calories =
            totalCaloriesGoal <= 0 || isNaN(totalCalories / totalCaloriesGoal)
                ? '0'
                : ((totalCalories / totalCaloriesGoal) * 100).toFixed(0);

        return `${calories}%`;
    };

    return (
        <Graphics>
            <ProgressCircle.Circle
                showsText={false}
                thickness={12}
                borderWidth={0}
                animated={true}
                unfilledColor={'#F4F6FA'}
                color={'#1F87FE'}
                strokeCap="round"
                progress={isNaN(macro.fat / total.fat) ? 0 : macro.fat / total.fat}
                size={210}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ProgressCircle.Circle
                    showsText={false}
                    thickness={12}
                    borderWidth={0}
                    animated={true}
                    unfilledColor={'#F4F6FA'}
                    color={'#AF8EFF'}
                    strokeCap="round"
                    progress={
                        isNaN(macro.protein / total.protein) ? 0 : macro.protein / total.protein
                    }
                    size={180}
                    style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ProgressCircle.Circle
                        showsText={false}
                        thickness={12}
                        borderWidth={0}
                        animated={true}
                        unfilledColor={'#F4F6FA'}
                        color={'#90D692'}
                        strokeCap="round"
                        progress={
                            isNaN(macro.carbohydrates / total.carbohydrates)
                                ? 0
                                : macro.carbohydrates / total.carbohydrates
                        }
                        size={150}
                        style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {total?.protein !== 0 && (
                            <ViewTextGraphic>
                                <TextGraphic>{goalCaloriesPercentage()}</TextGraphic>
                                <SubTitleGraphic>das metas diárias</SubTitleGraphic>
                            </ViewTextGraphic>
                        )}
                    </ProgressCircle.Circle>
                </ProgressCircle.Circle>
            </ProgressCircle.Circle>
        </Graphics>
    );
}
