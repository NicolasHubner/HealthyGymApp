import { UserGoals, UserMetrics } from '@/types/metrics/MetricsGeneral';
import { useCallback } from 'react';

import { CardProps, renderCardValue } from '../../helpers/cards';
import { handleGraphics } from '../../helpers/conditionalGraphics';

import { AttView, CardTitle, CardTitleAtts, CardTitleAttsUnit } from './styles';

interface RenderCardContentProps {
    card: CardProps;
    userMetrics: UserMetrics;
    userGoals: UserGoals;
    trainPercentage: string | number;
}

export function RenderCardContentProps({
    card,
    trainPercentage,
    userMetrics,
    userGoals,
}: RenderCardContentProps) {
    const { caloriesConsumedToday } = userMetrics;
    const { caloriesToIngest } = userGoals;

    const RenderFunction = useCallback(
        () => (
            <>
                <CardTitle>{card.title}</CardTitle>
                {card.api !== 'trainPercentage' ? (
                    <>{handleGraphics(card.id, caloriesConsumedToday! / caloriesToIngest!)}</>
                ) : (
                    <>{handleGraphics(card.id, Number(trainPercentage) / 100)}</>
                )}

                <AttView>
                    <CardTitleAtts>
                        {card.api !== 'trainPercentage' ? (
                            <>{renderCardValue(card.api, userMetrics[card.api])}</>
                        ) : (
                            <>{trainPercentage}</>
                        )}
                    </CardTitleAtts>
                    {card.atributes && <CardTitleAttsUnit>{card.atributes}</CardTitleAttsUnit>}
                </AttView>
                {/* <CardAttTime>Atualização 0</CardAttTime> */}
            </>
        ),
        [card, trainPercentage, caloriesConsumedToday, caloriesToIngest, userMetrics]
    );

    return <RenderFunction />;
}
