import React, { useState } from 'react';
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
import ImageBacon from '@/assets/Img.png';

interface IFoodsTopDetails {
  nameFood: string;
}

export default function FoodsTopDetails({ nameFood }: IFoodsTopDetails) {
  return (
    <>
      <ImageTop source={ImageBacon} />
      <ViewTips>
        <TextTips>Dica do Coach</TextTips>
      </ViewTips>
      <ViewContainer>
        <ViewTitle>
          <TextTitle>Nutrição</TextTitle>
        </ViewTitle>
        <ViewTitle>
          <NameFood>{nameFood}</NameFood>
        </ViewTitle>
        <ViewKcalAndTime>
          <ViewKcal>
            <IconFire name="fire" size={32} />
            <TextKcal>345</TextKcal>
            <TextKcalUnit>kcal</TextKcalUnit>
          </ViewKcal>
          <TextTime>30 min</TextTime>
        </ViewKcalAndTime>
      </ViewContainer>
    </>
  );
}
