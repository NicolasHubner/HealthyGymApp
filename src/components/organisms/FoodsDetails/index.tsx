import React from 'react';
import {
    ImageTop,
    ViewTips,
    TextTips,
    ViewContainer,
    ViewTitle,
    TextTitle,
    NameFood,
    ViewKcalAndTime,
    ViewKcal,
    IconFire,
    TextKcal,
    TextKcalUnit,
    TextTime,
} from './style';
import ImageHealthy from '@/assets/food_healthy.jpg';
import { IFood } from '@/screens/Logged/Food/Daily/helpers/functions';

interface IFoodsTopDetails {
    data: IFood;
}

export default function FoodsTopDetails({ data }: IFoodsTopDetails) {
    return (
        <>
            <ImageTop source={ImageHealthy} />
            <ViewTips>
                <TextTips>Dica do Coach</TextTips>
            </ViewTips>
            <ViewContainer>
                <ViewTitle>
                    <TextTitle>Nutrição</TextTitle>
                </ViewTitle>
                <ViewTitle>
                    <NameFood>{data.attributes.title}</NameFood>
                </ViewTitle>
                <ViewKcalAndTime>
                    <ViewKcal>
                        <IconFire name="fire" size={32} />
                        <TextKcal>{data.attributes.calorie}</TextKcal>
                        <TextKcalUnit>kcal</TextKcalUnit>
                    </ViewKcal>
                    <TextTime>{data.attributes.time} min</TextTime>
                </ViewKcalAndTime>
            </ViewContainer>
        </>
    );
}
