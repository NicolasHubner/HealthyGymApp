import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React from 'react';
import { SubTitleComparation } from './style';

export default function PhotoComparation() {
    return (
        <ScrollablePageWrapper>
            <SubTitleComparation>Frente</SubTitleComparation>
            <SubTitleComparation>Costas</SubTitleComparation>
            <SubTitleComparation>Perfil</SubTitleComparation>
        </ScrollablePageWrapper>
    );
}
