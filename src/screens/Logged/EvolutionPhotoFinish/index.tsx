import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React from 'react';
import BgImage from '@/assets/svg/bgimage.svg';
import { Dimensions } from 'react-native';
import { ContainerTop } from './style';

export default function FinishEvolution() {
    const { width } = Dimensions.get('window');
    return (
        <ScrollablePageWrapper padding={0} edges={['left', 'right']}>
            <ContainerTop>
                <BgImage
                    style={{ position: 'absolute', opacity: 0.7 }}
                    preserveAspectRatio="xMidYMid slice"
                    width={width}
                />
            </ContainerTop>
        </ScrollablePageWrapper>
    );
}
