import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { useState } from 'react';
import CircleGraphic from './CircleGraphic';
import ComponentType from './ComponentType';
import { TopSubtitle, TopSubtitleBold, TopTitle } from './style';

export default function Calories() {
    const [calories, setCalories] = useState(500);
    return (
        <ScrollablePageWrapper edges={['top', 'left', 'right']}>
            <TopTitle>Dose Diária</TopTitle>
            <TopSubtitle>
                Hoje você consumiu até agora <TopSubtitleBold>{calories} cal</TopSubtitleBold>
            </TopSubtitle>

            <CircleGraphic />

            <ComponentType />

        </ScrollablePageWrapper>
    );
}
