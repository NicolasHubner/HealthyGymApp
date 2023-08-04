import { FineShapeScreen } from '@/types/fineshape/FineShape';
import { format } from 'date-fns';

const todayDate = format(new Date(), 'dd/MM/yyyy');

const metricInputMask = (
    value = '',
    errorMessage = 'Insira um valor válido',
    minLength = 2,
    maxLength = 2
) => {
    const cleaned =
        String(value)
            .replace(/[^0-9.,]/g, '')
            .replaceAll(',', '.') ?? '';

    return {
        raw: cleaned,
        masked: cleaned,
        error: !value || String(value)?.length < minLength || String(value)?.length > maxLength,
        message: errorMessage,
    };
};

const numberInputMask = (
    value = '',
    errorMessage = 'Insira um valor válido',
    minLength = 1,
    maxLength = 2
) => {
    const cleaned =
        String(value)
            .replace(/[^0-9]/g, '')
            .replaceAll(',', '.') ?? '';

    return {
        raw: cleaned,
        masked: cleaned,
        error: !value || String(value)?.length < minLength || String(value)?.length > maxLength,
        message: errorMessage,
    };
};

const dateInputMask = (value = '') => {
    const cleaned = String(value).replace(/[^0-9/]/g, '') ?? '';

    const day = cleaned?.slice(0, 2);
    const month = cleaned?.slice(3, 5);
    const year = cleaned?.slice(6, 10);

    const conditionToError =
        Number(year) > new Date().getFullYear() ||
        Number(year) <= 1930 ||
        Number(month) > 12 ||
        Number(month) <= 0 ||
        Number(day) > 31 ||
        Number(day) <= 0;

    return {
        error:
            !value ||
            cleaned?.length < 10 ||
            cleaned[2] !== '/' ||
            cleaned[5] !== '/' ||
            conditionToError,
        message: 'Insira uma data válida (dd/mm/aaaa)',
        raw: cleaned,
        masked: cleaned,
    };
};

export const FineShapeScreens: FineShapeScreen[] = [
    {
        id: 'email',
        title: 'Qual é o seu email?',
        placeholder: 'exemplo@email.com',
        buttonText: 'Continuar',
        keyboardType: 'email-address',
        mask: (value = '') => {
            return {
                error: !value || !value?.includes('@') || !value?.includes('.'),
                message: 'Insira um e-mail válido',
                raw: value.toLowerCase(),
                masked: value.toLowerCase(),
            };
        },
    },
    {
        id: 'name',
        title: 'Qual é o seu nome?',
        placeholder: 'José Damasceno',
        buttonText: 'Continuar',
        keyboardType: 'default',
        mask: (value = '') => {
            return {
                masked: value,
                raw: value,
                error: !value || value?.length <= 1,
                message: 'Campo obrigatório',
            };
        },
    },
    {
        id: 'phone',
        title: 'Qual o telefone?',
        placeholder: 'Digite apenas os números',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 15,
        mask: (value = '') => {
            const cleaned = value ? value?.replace(/\D/g, '') : '';
            const match = cleaned?.match(/^(\d{2})(\d{5})(\d{4})$/);

            return {
                masked: match ? `(${match[1]}) ${match[2]}-${match[3]}` : cleaned,
                raw: cleaned,
                error: !cleaned || cleaned?.length <= 10 || cleaned?.length > 11,
                message: 'Insira um número de celular válido',
            };
        },
    },
    {
        id: 'todayDate',
        title: 'Qual a data de hoje?',
        placeholder: todayDate,
        buttonText: 'Continuar',
        keyboardType: 'default',
        maxLength: 10,
        mask: () => dateInputMask(todayDate),
    },
    // {
    //     id: 'userEthnicity',
    //     title: 'Qual a sua etnia?',
    //     placeholder: 'Digite a sua etnia',
    //     buttonText: 'Continuar',
    //     keyboardType: 'default',
    //     mask: (value = '') => {
    //         return {
    //             error: !value || value?.length <= 2,
    //             message: 'Campo inválido',
    //             raw: value,
    //             masked: value,
    //         };
    //     },
    // },
    {
        id: 'gender',
        title: 'Qual o seu sexo?',
        placeholder: 'Masculino, Feminino',
        buttonText: 'Continuar',
        keyboardType: 'default',
        mask: (value = '') => {
            return {
                error:
                    !value ||
                    value?.length <= 2 ||
                    (value?.toLowerCase() !== 'masculino' && value?.toLowerCase() !== 'feminino'),
                message: 'Campo inválido',
                raw: value,
                masked: value,
            };
        },
    },
    {
        id: 'userAddress',
        title: 'Qual o seu endereço?',
        placeholder: 'Rua, número, bairro',
        buttonText: 'Continuar',
        keyboardType: 'default',
        mask: (value = '') => {
            return {
                error: !value || value?.length <= 3,
                message: 'Insira um endereço válido',
                raw: value,
                masked: value,
            };
        },
    },
    {
        id: 'userAddressComplement',
        title: 'Tem complemento?',
        placeholder: 'Apto 01, bloco C, etc',
        buttonText: 'Continuar',
        keyboardType: 'default',
        mask: (value = '') => {
            return {
                error: false,
                message: '',
                raw: value,
                masked: value,
            };
        },
    },
    {
        id: 'userCep',
        title: 'Qual seu CEP?',
        placeholder: 'Digite seu CEP',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 9,
        mask: (value = '') => {
            const cleaned = value.replace(/\D/g, '') ?? '';
            const match = cleaned?.match(/^(\d{5})(\d{3})$/);

            return {
                error: !value || cleaned?.length < 8 || value?.length < 8,
                message: 'Insira um cep válido (apenas números)',
                raw: cleaned,
                masked: match ? `${match[1]}-${match[2]}` : cleaned,
            };
        },
    },
    {
        id: 'userCity',
        title: 'Qual sua cidade?',
        placeholder: 'São Paulo',
        buttonText: 'Continuar',
        keyboardType: 'default',
        mask: (value = '') => {
            return {
                error: !value || value?.length < 2,
                message: 'Campo obrigatório',
                raw: value,
                masked: value,
            };
        },
    },
    {
        id: 'userState',
        title: 'Qual seu estado?',
        placeholder: 'São Paulo',
        buttonText: 'Continuar',
        keyboardType: 'default',
        mask: (value = '') => {
            return {
                error: !value || value?.length < 2,
                message: 'Campo obrigatório',
                raw: value,
                masked: value,
            };
        },
    },
    {
        id: 'birthdate',
        title: 'Qual a sua data de nascimento?',
        placeholder: 'DD/MM/AAAA',
        buttonText: 'Continuar',
        keyboardType: 'default',
        maxLength: 10,
        mask: (value = '') => dateInputMask(value),
    },
    {
        id: 'userCpf',
        title: 'Qual o número do seu CPF?',
        placeholder: 'Digite seu CPF sem pontos ou traços',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 14,
        mask: (value = '') => {
            // console.log('value', value.length);
            let cleaned = '';
            let match = null;
            if (value.length <= 11) {
                cleaned = value.replace(/\D/g, '') ?? '';
                match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
            }
            return {
                masked: match ? `${match[1]}.${match[2]}.${match[3]}-${match[4]}` : cleaned,
                raw: cleaned,
                error: !value || !cleaned || cleaned?.length !== 11 || /^(\d)\1+$/.test(value),
                message: 'Insira um CPF válido',
            };
        },
    },
    {
        id: 'userWeight',
        title: 'Qual seu peso?',
        placeholder: '00',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value = '') => metricInputMask(value, 'Insira um peso válido', 1, 6),
    },
    {
        id: 'userHeight',
        title: 'Qual sua altura?',
        placeholder: '000',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value = '') =>
            numberInputMask(value, 'Insira uma altura válida (em cm. Ex: 185)', 1, 3),
    },
    {
        id: 'userAge',
        title: 'Qual sua idade?',
        placeholder: '00',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 2,
        mask: (value = '') => numberInputMask(value, 'Insira uma idade válida', 1, 3),
    },
    {
        id: 'userWaist',
        title: 'Qual é a medida da sua cintura?',
        placeholder: '000',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value = '') => metricInputMask(value, undefined, 1, 6),
    },
    {
        id: 'userBelly',
        title: 'Qual a medida da barriga?',
        placeholder: '000',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value = '') => metricInputMask(value, undefined, 1, 6),
    },
    {
        id: 'userChest',
        title: 'Qual a medida do tórax?',
        placeholder: '000',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value = '') => metricInputMask(value, undefined, 1, 6),
    },
    {
        id: 'userFatPercentage',
        title: 'Qual a porcentagem de gordura corporal?',
        placeholder: '000,00',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value = '') => metricInputMask(value, undefined, 1, 6),
    },
    {
        id: 'userMusclePercentage',
        title: 'Qual é a porcentagem de músculos?',
        placeholder: '000,00',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value = '') => metricInputMask(value, undefined, 1, 6),
    },
    {
        id: 'userVisceralFatPercentage',
        title: 'Qual a porcentagem de gordura visceral?',
        placeholder: '000,00',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value = '') => metricInputMask(value, undefined, 1, 6),
    },
    {
        id: 'userRM',
        title: 'Qual é a taxa de Metabolismo Basal?',
        placeholder: '0000,00',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 8,
        mask: (value = '') => metricInputMask(value, undefined, 1, 8),
    },
    {
        id: 'userBodyAge',
        title: 'Qual é a idade do corpo atualmente?',
        placeholder: 'Digite a idade do corpo',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 2,
        mask: (value = '') => metricInputMask(value, 'Insira uma idade válida', 1, 2),
    },
];
