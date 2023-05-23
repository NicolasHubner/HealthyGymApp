export interface SituacaoPeso {
    situacao: string;
    intervaloIdeal: string;
}

export function verificarSituacaoPeso(
    genero: string,
    idade: number,
    gorduraCorporal: number
): SituacaoPeso {
    type SituacaoGenero = Array<[number, number, string]>;
    console.log(genero, idade, gorduraCorporal);
    interface Situacoes {
        feminino: SituacaoGenero;
        masculino: SituacaoGenero;
    }

    const situacoes: Situacoes = {
        feminino: [
            [18, 24.9, '18 à 24,9'],
            [25, 29.9, '25 à 29,9'],
            [24, 35.9, '30 à 35,9'],
        ],
        masculino: [
            [11, 21.9, '11 à 21,9'],
            [22, 27.9, '22 à 27,9'],
            [13, 24.9, '13 à 24,9'],
        ],
    };

    const faixasEtarias = [
        [0, 39],
        [40, 59],
        [60, 79],
    ];

    const generoLowerCase = genero.toLowerCase() as 'feminino' | 'masculino';

    const faixaEtaria = faixasEtarias.find(faixa => {
        const [min, max] = faixa;
        return idade >= min && idade <= max;
    });

    if (!faixaEtaria) {
        return { situacao: '', intervaloIdeal: '' };
    }

    const situacoesGenero = situacoes[generoLowerCase];

    for (let i = 0; i < situacoesGenero.length; i++) {
        const situacao = situacoesGenero[i];
        const [min, max, intervaloIdeal] = situacao;

        const objReturn = { situacao: '', intervaloIdeal: intervaloIdeal };

        if (gorduraCorporal < min) {
            objReturn.situacao = 'Abaixo';
        } else if (gorduraCorporal >= min && gorduraCorporal <= max) {
            objReturn.situacao = 'Normal';
        } else {
            objReturn.situacao = 'Acima';
        }
        return objReturn as SituacaoPeso;
    }

    return { situacao: '', intervaloIdeal: '' };
}
