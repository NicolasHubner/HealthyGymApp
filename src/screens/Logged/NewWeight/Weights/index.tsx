import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import * as S from './style';
import { FontAwesome5 } from '@expo/vector-icons';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const Weigths = () => {
    const { weight, height } = useSelector((state: RootState) => state.user);

    const MemoGoal = useMemo(() => {
        if (!weight || !height) return;
        const value1 = 18.5;
        const value2 = 24.9;

        const value1Calc = value1 * (height * height);
        const value2Calc = value2 * (height * height);

        const media = (value1Calc + value2Calc) / 2;

        const result = media.toFixed(0);

        return result;
    }, [weight, height]);

    return (
        <>
            <View style={{ position: 'absolute', left: 20, top: 48, zIndex: 10 }}>
                <HeaderGoBackButton canGoBack={true} />
            </View>
            <S.ContainerGreenTop>
                <S.TitleWeight>Peso</S.TitleWeight>

                <S.ContainerWeigth>
                    <S.WeightContainer>
                        <S.WeightText>ATUAL</S.WeightText>
                        <S.WeightValue>
                            {weight}
                            <S.WeightText>kg</S.WeightText>
                        </S.WeightValue>
                    </S.WeightContainer>

                    <FontAwesome5 name="weight" size={24} color="#fff" />

                    <S.WeightContainer>
                        <S.WeightText>Objetivo</S.WeightText>
                        <S.WeightValue>
                            {MemoGoal}
                            <S.WeightText>kg</S.WeightText>
                        </S.WeightValue>
                    </S.WeightContainer>
                </S.ContainerWeigth>
            </S.ContainerGreenTop>
        </>
    );
};
