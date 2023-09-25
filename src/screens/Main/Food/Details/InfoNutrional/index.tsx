import { DividerComponent } from '@/components/atoms/Divider';
import React from 'react';
import { INutrients } from '..';
import { SquareColor } from '../style';
import {
    ViewDetailsNutrition,
    ViewPartNutrition,
    ViewTitlePartNutrition,
    PartNutritionText,
    PartNutritionValue,
} from './style';

interface IProps {
    macroNutrients: INutrients;
}

function InfoNutrional({ macroNutrients }: IProps) {
    return (
        <ViewDetailsNutrition>
            <ViewPartNutrition>
                <ViewTitlePartNutrition>
                    <SquareColor color="#AF8EFF" />
                    <PartNutritionText>Proteína</PartNutritionText>
                    <PartNutritionValue>{macroNutrients.protein}g</PartNutritionValue>
                </ViewTitlePartNutrition>
                <DividerComponent marginTop={5} />
            </ViewPartNutrition>

            <ViewPartNutrition>
                <ViewTitlePartNutrition>
                    <SquareColor color="#90D692" />
                    <PartNutritionText>Carbo</PartNutritionText>
                    <PartNutritionValue>{macroNutrients.carbohydrates}g</PartNutritionValue>
                </ViewTitlePartNutrition>
                <DividerComponent marginTop={5} />
                {/* <ViewSubNutrition>
            {foodCarbo.map((item, i) => (
                <ViewKey key={i}>
                    <ViewSubNutritionTitle>
                        <SubNutritionText>{item.name}</SubNutritionText>
                        <SubNutritionValue>{item.value}</SubNutritionValue>
                    </ViewSubNutritionTitle>
                    <DividerComponent width={'95%'} marginTop={5} />
                </ViewKey>
            ))}
        </ViewSubNutrition> */}
            </ViewPartNutrition>

            <ViewPartNutrition>
                <ViewTitlePartNutrition>
                    <SquareColor color="#1F87FE" />
                    <PartNutritionText>Gordura</PartNutritionText>
                    <PartNutritionValue>{macroNutrients.fat}g</PartNutritionValue>
                </ViewTitlePartNutrition>
                <DividerComponent marginTop={5} />
                {/* <ViewSubNutrition>
            {foodFat.map((item, i) => (
                <View key={i}>
                    <ViewSubNutritionTitle>
                        <SubNutritionText>{item.name}</SubNutritionText>
                        <SubNutritionValue>{item.value}</SubNutritionValue>
                    </ViewSubNutritionTitle>
                    <DividerComponent width={'95%'} marginTop={5} />
                </View>
            ))}
        </ViewSubNutrition> */}
            </ViewPartNutrition>
        </ViewDetailsNutrition>
    );
}

const memoizedInfoNutrional = React.memo(InfoNutrional);
export default memoizedInfoNutrional;
