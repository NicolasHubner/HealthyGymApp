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

    interface Situacoes {
        feminino: SituacaoGenero;
        masculino: SituacaoGenero;
    }

    const situacoes: Situacoes = {
        feminino: [
            [21, 32.9, '18 à 24,9'],
            [33, Infinity, '25 à 29,9'],
        ],
        masculino: [
            [8, 19.9, '11 à 21,9'],
            [20, Infinity, '22 à 27,9'],
        ],
    };

    const faixasEtarias = [
        [0, 39],
        [40, 59],
        [60, 79],
    ];

    const generoLowerCase = genero.toLowerCase() as 'feminino' | 'masculino';

    const faixaEtaria = faixasEtarias.find(faixa => idade >= faixa[0] && idade <= faixa[1]);

    if (!faixaEtaria) {
        return { situacao: '', intervaloIdeal: '' };
    }

    const situacoesGenero = situacoes[generoLowerCase];

    for (let i = 0; i < situacoesGenero.length; i++) {
        const situacao = situacoesGenero[i];
        const [min, max, intervaloIdeal] = situacao;

        if (gorduraCorporal < min) {
            return { situacao: 'Abaixo', intervaloIdeal };
        } else if (gorduraCorporal >= min && gorduraCorporal <= max) {
            return { situacao: 'Normal', intervaloIdeal };
        }
    }

    return { situacao: 'Acima', intervaloIdeal: '' };
}
