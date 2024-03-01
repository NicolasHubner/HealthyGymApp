import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React from 'react';
import { ContainerTop, ImageBg, ImageCamera, Subtitle, Title } from './style';
import Buttons from './Buttons';

export default function Photos() {
    return (
        <ScrollablePageWrapper padding={0} edges={['left', 'right']}>
            <ContainerTop>
                <ImageCamera source={require('@/assets/PhotoScreen/camera.png')} />

                <ImageBg
                    resizeMode="cover"
                    source={require('@/assets/PhotoScreen/runningWomen.png')}
                />
                <Title>Prepare-se, Vamos tirar umas fotos!</Title>
                <Subtitle>
                    Procure deixar barriga e braços expostos, pois futuramente mostraremos sua
                    evolução.{' '}
                </Subtitle>

                <Buttons />
            </ContainerTop>
        </ScrollablePageWrapper>
    );
}
