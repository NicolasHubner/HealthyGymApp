import React from 'react';

import { CardGoalsIntensity } from '@/components/molecules/CardGoalsIntensity';

import { Card, CardImage, CardSubtitle, CardTitle, ImageContainer, InfoContainer } from './style';

interface CardsGoalsProps {
  selected?: boolean;
  onPress: () => void;
  title: string;
  subtitle: string;
  intensity: number;
  image: any;
}

export const CardsGoals = ({
  selected,
  onPress,
  intensity = 1,
  title,
  subtitle,
  image,
}: CardsGoalsProps) => {
  return (
    <Card
      onPress={onPress}
      style={{
        borderColor: selected ? '#589A5A' : '#E5E5E5',
        borderWidth: selected ? 2 : 1,
      }}>
      <InfoContainer>
        <CardGoalsIntensity intensity={intensity} />
        <CardTitle>{title ?? ''}</CardTitle>
        <CardSubtitle>{subtitle ?? ''}</CardSubtitle>
      </InfoContainer>
      <ImageContainer>
        <CardImage source={image} />
      </ImageContainer>
    </Card>
  );
};
