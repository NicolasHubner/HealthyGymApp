function getIdadeRange(idade: number) {
    if (idade >= 18 && idade <= 39) {
        return '18-39';
    } else if (idade >= 40 && idade <= 59) {
        return '40-59';
    } else {
        return '60-80';
    }
}

interface Valores {
    feminino: {
        '18-39': number[];
        '40-59': number[];
        '60-80': number[];
    };
    masculino: {
        '18-39': number[];
        '40-59': number[];
        '60-80': number[];
    };
}

export function calcularIntervaloEMusculo(
    genero: 'feminino' | 'masculino',
    idade: number,
    percentualMusculo: number
): {
    percentil: number;
    ideal: number;
    range: string;
    intervalo: string;
} {
    const valoresPorGenero: Valores = {
        feminino: {
            '18-39': [24.3, 30.3],
            '40-59': [24.1, 30.1],
            '60-80': [23.9, 29.9],
        },
        masculino: {
            '18-39': [33.3, 39.3],
            '40-59': [33.1, 39.1],
            '60-80': [32.9, 38.9],
        },
    };

    const valores = valoresPorGenero[genero][getIdadeRange(idade)];

    const resultado = {
        percentil: percentualMusculo,
        ideal: valores[2],
        range: `${valores[0]}-${valores[1]}`,
        intervalo: '',
    };

    if (percentualMusculo < valores[0]) {
        resultado.intervalo = 'Abaixo';
    } else if (percentualMusculo > valores[0] && percentualMusculo < valores[1]) {
        resultado.intervalo = 'Normal';
    } else {
        resultado.intervalo = 'Acima';
    }

    return resultado;
}
