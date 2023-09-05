import React, { useEffect, useMemo, useState } from 'react';
import * as S from './style';
import { useTheme } from 'styled-components';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

interface IMCProps {
    weightStudent?: number;
    heightStudent?: number;
}

export const IMC = ({ weightStudent, heightStudent }: IMCProps) => {
    const { weight, height, isCoach } = useSelector((state: RootState) => state.user);

    const { colors } = useTheme();
    const [faixa, setFaixa] = useState<string>('80 à 90kg');

    const MemoIMC = useMemo(() => {
        if (weightStudent && heightStudent) {
            const result: number = weightStudent / (heightStudent * heightStudent);
            return result.toFixed(0);
        }

        if (!weight || !height) return;
        if (!isCoach) {
            const result: number = weight / (height * height);
            return result.toFixed(0);
        }
    }, [weight, height, weightStudent, heightStudent, isCoach]);

    const imcFaixa = () => {
        const value1 = 18.5;
        const value2 = 24.9;

        if (weightStudent && heightStudent) {
            const value1Calc = value1 * (heightStudent * heightStudent);
            const value2Calc = value2 * (heightStudent * heightStudent);

            const value1CalcResult = value1Calc.toFixed(1);
            const value2CalcResult = value2Calc.toFixed(1);

            const f = `${value1CalcResult} à ${value2CalcResult}kg`;

            setFaixa(f);
            return;
        }

        if (!height) return;

        if (!isCoach) {
            const value1Calc = value1 * (height * height);
            const value2Calc = value2 * (height * height);

            const value1CalcResult = value1Calc.toFixed(1);
            const value2CalcResult = value2Calc.toFixed(1);

            const f = `${value1CalcResult} à ${value2CalcResult}kg`;

            setFaixa(f);
            return;
        }
    };

    const MemoColor = useMemo(() => {
        const faixasIMC = [
            { faixa: 'Abaixo do peso', min: 0, max: 18.5, color: colors.red[500] },
            { faixa: 'no Peso normal', min: 18.5, max: 24.9, color: colors.green[500] },
            { faixa: 'no Sobrepeso', min: 25, max: 29.9, color: colors.yellow[100] },
            { faixa: 'em Obesidade grau 1', min: 30, max: 34.9, color: colors.orange[200] },
            { faixa: 'em Obesidade grau 2', min: 35, max: 39.9, color: colors.orange[500] },
            { faixa: 'em Obesidade grau 3', min: 40, max: 100, color: colors.red[500] },
        ];

        if (!MemoIMC) return faixasIMC[1];

        const numberIMC = Number(MemoIMC);

        const result = faixasIMC.find(item => {
            if (numberIMC >= item.min && numberIMC <= item.max) {
                return item;
            }
        });

        if (!result) return faixasIMC[1];

        return result;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [MemoIMC]);

    useEffect(() => {
        imcFaixa();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <S.ContainerIMC>
                <S.ContainerIMCLeft color={MemoColor.color || ''}>
                    <S.IMCText>IMC</S.IMCText>
                    <S.IMCNumber>{MemoIMC}</S.IMCNumber>
                </S.ContainerIMCLeft>
                <S.ContainerIMCRight>
                    {!isCoach ? 'Você está' : 'O aluno está'} {MemoColor.faixa}. A faixa sugerida é
                    de {faixa}.
                </S.ContainerIMCRight>
            </S.ContainerIMC>

            <S.GoalsDescription>
                {'  '} Obs.: O IMC é uma medida internacional usada para calcular se uma pessoa está
                no peso ideal. O objetivo de peso é criado a partir desse número.
            </S.GoalsDescription>
        </>
    );
};
