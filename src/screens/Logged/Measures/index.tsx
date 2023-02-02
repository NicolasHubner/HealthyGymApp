import { DividerComponent } from '@/components/atoms/Divider';
import CardWarnings from '@/components/molecules/CardWarnings';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import {
  CardContainerHeightAlimentation,
  CardView,
  CartTitle,
  InsertMeasuresText,
  ViewInsertMeasures,
  ViewMeasuresCard,
  WeightText,
  WeightTextSmall,
} from './style';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { MiniCard } from './MiniCard';

export default function Measures() {
  const [weight, setWeight] = useState<string>('58');
  return (
    <ScrollablePageWrapper padding={true}>
      <CardWarnings
        marginTop={40}
        textSubTitle="Dica"
        textSubtitleBody="Tente se pesar uma vez por semana sempre nos mesmos horários. Isso facilita o planejamento do Coach"
        textSeeMore="Ver mais"
      />
      <CardView
        width={335}
        height={257}
        margintop={36}
        justifycontent="flex-start"
        alignitems="flex-start">
        <CartTitle>Seu peso</CartTitle>
        <DividerComponent />
        <ViewMeasuresCard>
          <FontAwesome5 name="weight" size={24} color="#90D692" />
          <WeightText>{weight}</WeightText>
          <WeightTextSmall>kg</WeightTextSmall>
        </ViewMeasuresCard>
        <ViewInsertMeasures>
          <InsertMeasuresText
            onPress={() => {
              console.log('oi');
            }}>
            Insira seu peso atual
          </InsertMeasuresText>
        </ViewInsertMeasures>
      </CardView>
      <CardContainerHeightAlimentation>
        <MiniCard icon="height" quantity={'1,69'} label="Altura" />
        <MiniCard icon="restaurant" quantity={'23'} label="Refeições" />
      </CardContainerHeightAlimentation>
    </ScrollablePageWrapper>
  );
}
