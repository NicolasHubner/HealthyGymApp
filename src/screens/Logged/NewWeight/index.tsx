import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React, { useState } from 'react';
import * as S from './style';
import { Weigths } from './Weights';
import { IMC } from './Imc';
import { GraphicsWeights } from './GraphicWeights';
import { Divider } from 'native-base';
import { Button } from '@/components/atoms/Button';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';

export default function NewWeight() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigation() as INavigation;
    return (
        <>
            <ScrollablePageWrapper padding={0}>
                <Weigths />

                <S.ContainerPrincipal>
                    <GraphicsWeights />

                    <Divider my={4} mt={8} />

                    <IMC />

                    <Button
                        label="Adicionar novo peso"
                        fullWidth
                        onPress={() => {
                            navigate.navigate(RouteNames.logged.addWeigth);
                        }}
                    />
                </S.ContainerPrincipal>
            </ScrollablePageWrapper>
        </>
    );
}
