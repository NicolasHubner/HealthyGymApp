import { UserGoals, UserMetrics } from '@/types/metrics/MetricsGeneral';
import { useCallback, useMemo } from 'react';

import { CardProps, renderCardAttributes, renderCardValue } from '../../helpers/cards';
import { handleGraphics } from '../../helpers/conditionalGraphics';

import { AttView, CardTitle, CardTitleAtts, CardTitleAttsUnit } from './styles';

interface RenderCardContentProps {
    card: CardProps;
    userMetrics: UserMetrics;
    userGoals: UserGoals;
    trainPercentage: number;
}

export function RenderCardContentProps({
    card,
    trainPercentage,
    userMetrics,
    userGoals,
}: RenderCardContentProps) {
    const { caloriesConsumedToday } = userMetrics;
    const { caloriesToIngest } = userGoals;

    const trainPercentFixed = useMemo(() => {
        if (isNaN(trainPercentage)) return 0;

        return trainPercentage;
    }, [trainPercentage]);

    const caloriesTotalToday = useMemo(() => {
        if (caloriesConsumedToday && caloriesToIngest) {
            return caloriesConsumedToday / caloriesToIngest;
        }

        return 0;
    }, [caloriesConsumedToday, caloriesToIngest]);

    const RenderFunction = useCallback(
        () => (
            <>
                <CardTitle>{card.title}</CardTitle>
                {card.api !== 'trainPercentage' ? (
                    <>{handleGraphics(card.id, caloriesTotalToday)}</>
                ) : (
                    <>
                        {handleGraphics(
                            card.id,
                            Number(trainPercentFixed) > 0 ? Number(trainPercentFixed) / 100 : 0
                        )}
                    </>
                )}

                <AttView>
                    <CardTitleAtts>
                        {card.api !== 'trainPercentage' ? (
                            <>{renderCardValue(card.api, userMetrics[card.api])}</>
                        ) : (
                            <>{trainPercentFixed ?? 0}</>
                        )}
                    </CardTitleAtts>
                    {card.atributes && (
                        <CardTitleAttsUnit>
                            {/* @ts-ignore */}
                            {card.api !== trainPercentFixed && (
                                <>
                                    {renderCardAttributes(
                                        card.api,
                                        card.atributes,
                                        /* @ts-ignore */
                                        userMetrics[card.api]
                                    )}
                                </>
                            )}
                        </CardTitleAttsUnit>
                    )}
                </AttView>
                {/* <CardAttTime>Atualização 0</CardAttTime> */}
            </>
        ),
        [card, userMetrics, trainPercentFixed, caloriesTotalToday]
    );

    return <RenderFunction />;
}
