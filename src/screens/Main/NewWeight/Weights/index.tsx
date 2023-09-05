import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import * as S from './style';
import { FontAwesome5 } from '@expo/vector-icons';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

interface WeigthsProps {
    weightStudent?: number;
    heightStudent?: number;
}

export const Weigths = ({ weightStudent, heightStudent }: WeigthsProps) => {
    const { weight, height, isCoach } = useSelector((state: RootState) => state.user);

    const MemoGoal = useMemo(() => {
        const value2 = 24.9;
        if (isCoach || (weightStudent && heightStudent)) {
            const value2Calc = value2 * (heightStudent! * heightStudent!);

            const result = value2Calc.toFixed(0);

            return result;
        }

        if (!weight || !height) return;

        const value2Calc = value2 * (height * height);

        const result = value2Calc.toFixed(0);

        return result;
    }, [isCoach, weightStudent, heightStudent, weight, height]);

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
                            {isCoach ? weightStudent : weight}
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
