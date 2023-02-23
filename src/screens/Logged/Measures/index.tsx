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
    WeightTextSmall,
} from './style';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { MiniCard } from './MiniCard';
import Picker from '@ouroboros/react-native-picker';
import { weightArray } from '@/helpers/constants/weight';

export default function Measures() {
    const weightMemo = useMemo(() => {
        return weightArray();
    }, []);

    const [weight, setWeight] = useState<number>(58);
    const [open, setOpen] = useState<boolean>(false);

    return (
        <ScrollablePageWrapper padding={16} edges={['right', 'left']}>
            <CardWarnings
                marginTop={80}
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
                    {/* <WeightText>{weight}</WeightText> */}
                    <Picker
                        onChanged={setWeight}
                        options={weightMemo}
                        style={{
                            fontFamily: 'Rubik_700Bold',
                            color: '#2c2c2c',
                            letterSpacing: 0.5,
                            marginBottom: 5,
                            marginLeft: 18,
                            marginRight: -8,
                            padding: 5,
                            fontSize: 48,
                        }}
                        value={weight}
                    />
                    <WeightTextSmall>kg</WeightTextSmall>
                </ViewMeasuresCard>
                <ViewInsertMeasures>
                    <InsertMeasuresText
                        onPress={() => {
                            setOpen(!open);
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
