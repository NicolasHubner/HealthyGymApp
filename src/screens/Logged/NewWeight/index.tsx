import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React from 'react';
import * as S from './style';
import { Weigths } from './Weights';
import { IMC } from './Imc';
import { GraphicsWeights } from './GraphicWeights';
import { Divider } from 'native-base';
import { Button } from '@/components/atoms/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Params {
    userIdParam?: string;
    weight?: number;
    height?: number;
}

export default function NewWeight() {
    const navigate = useNavigation() as INavigation;

    const { params } = useRoute() as { params: Params };

    // console.log('params', userIdParam);

    const { isCoach } = useSelector((state: RootState) => state.user);

    return (
        <>
            <ScrollablePageWrapper edges={['left', 'right']} padding={0}>
                <Weigths
                    weightStudent={(params && params.weight) || 0}
                    heightStudent={(params && params.height) || 0}
                />

                <S.ContainerPrincipal>
                    <GraphicsWeights userId={(params && params.userIdParam) || ''} />

                    <Divider my={4} mt={8} />

                    <IMC
                        weightStudent={(params && params.weight) || 0}
                        heightStudent={(params && params.height) || 0}
                    />

                    {!isCoach ? (
                        <Button
                            label="Adicionar novo peso"
                            fullWidth
                            onPress={() => {
                                navigate.navigate(RouteNames.logged.addWeigth);
                            }}
                        />
                    ) : null}
                </S.ContainerPrincipal>
            </ScrollablePageWrapper>
        </>
    );
}
