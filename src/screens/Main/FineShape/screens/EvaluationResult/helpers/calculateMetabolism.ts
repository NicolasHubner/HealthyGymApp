interface ICalcutateMetabolism {
    idade: number;
    sexo: string;
    peso: number;
}

export function calcularMetabolismoBasal({ idade, sexo, peso }: ICalcutateMetabolism) {
    const faixasEtarias = [
        {
            min: 0,
            max: 3,
            formulas: [
                { sexo: 'masculino', formula: 58.317 * peso - 31.1 },
                { sexo: 'feminino', formula: 59.512 * peso - 30.4 },
            ],
        },
        {
            min: 3,
            max: 10,
            formulas: [
                { sexo: 'masculino', formula: 20.315 * peso + 485.9 },
                { sexo: 'feminino', formula: 22.706 * peso + 504.3 },
            ],
        },
        {
            min: 10,
            max: 18,
            formulas: [
                { sexo: 'masculino', formula: 13.384 * peso + 692.6 },
                { sexo: 'feminino', formula: 17.686 * peso + 658.2 },
            ],
        },
        {
            min: 18,
            max: 30,
            formulas: [
                { sexo: 'masculino', formula: 14.818 * peso + 486.6 },
                { sexo: 'feminino', formula: 15.057 * peso + 692.2 },
            ],
        },
        {
            min: 30,
            max: 60,
            formulas: [
                { sexo: 'masculino', formula: 8.126 * peso + 845.6 },
                { sexo: 'feminino', formula: 11.472 * peso + 873.1 },
            ],
        },
        {
            min: 60,
            max: Infinity,
            formulas: [
                { sexo: 'masculino', formula: 9.082 * peso + 658.5 },
                { sexo: 'feminino', formula: 11.711 * peso + 587.7 },
            ],
        },
    ];

    const faixaEtaria = faixasEtarias.find(faixa => idade >= faixa.min && idade <= faixa.max);

    if (!faixaEtaria) {
        throw new Error('Idade inválida');
    }

    const formulaSex = faixaEtaria.formulas.find(formula => formula.sexo === sexo);

    if (!formulaSex) {
        throw new Error('Sexo inválido');
    }

    return formulaSex.formula.toFixed(2);
}
