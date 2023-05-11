export const calcularVisceral = (visceral: number) => {
    const faixasVisceral = [
        {
            min: 1,
            max: 2,
            type: 'Ideal',
        },
        {
            min: 3,
            max: 4,
            type: 'Normal',
        },
        {
            min: 5,
            max: 6,
            type: 'Médio',
        },
        {
            min: 7,
            max: 9,
            type: 'alto',
        },
        {
            min: 10,
            max: 14,
            type: 'Muito Alto(Perigo)',
        },
        {
            min: 15,
            max: Infinity,
            type: 'Extremamente Alto(Perigo)',
        },
    ];
    const faixaVisceral = faixasVisceral.find(
        faixa => visceral >= faixa.min && visceral <= faixa.max
    );

    if (!faixaVisceral) {
        throw new Error('Faixa etária não encontrada');
    }

    return faixaVisceral;
};
