import { Login } from './Unlogged/Login';
import { RegisterSplash } from './Unlogged/Register/SplashScreen';
import { ForgotPassword } from './Unlogged//Register/ForgotPassword';
import { SignUpGoals } from './Unlogged/Register/SignUpGoals';
import { SignUp } from './Unlogged/Register/SignUp';
import { SignUpNutri } from './Unlogged/Register/SignUpNutri';
import { SingUpSizes } from './Unlogged/Register/SignUpSizes';
import { FinishRegister } from './Unlogged/Register/FinishRegister';
import { Home } from './Logged/Home';
import Notification from './Logged/Notification';
import FoodsDetails from './Logged/Food/Details';
import FoodsDetailsIngredients from './Logged/Food/Details-Ingredients';
import Measures from './Logged/Measures';
import Photos from './Logged/Photos';
import Explorer from './Logged/Explorer';
import Metrics from './Logged/Metrics';
import Calories from './Logged/Calories';
import Photoss from './Logged/PhotoPicks';
import FinishEvolution from './Logged/EvolutionPhotoFinish';
import SharePhotos from './Logged/SharePhotos';
import PhotoComparation from './Logged/PhotosComparation';
import { FineShapeScreen } from '@/types/fineshape/FineShape';
import { format } from 'date-fns';

export {
    Login,
    RegisterSplash,
    ForgotPassword,
    SignUpGoals,
    SignUp,
    SignUpNutri,
    SingUpSizes,
    FinishRegister,
    Home,
    Notification,
    FoodsDetails,
    FoodsDetailsIngredients,
    Measures,
    Photos,
    Explorer,
    Metrics,
    Calories,
    Photoss,
    FinishEvolution,
    SharePhotos,
    PhotoComparation,
};

const todayDate = format(new Date(), 'dd/MM/yyyy');

export const FineShapeScreens: FineShapeScreen[] = [
    {
        id: 'name',
        title: 'Qual o seu nome?',
        placeholder: 'José Damasceno',
        buttonText: 'Continuar',
        keyboardType: 'default',
        mask: (value: string) => {
            return {
                masked: value,
                raw: value,
                error: value?.length <= 1,
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
        mask: (value: string) => {
            const cleaned = value?.replace(/\D/g, '');
            const match = cleaned?.match(/^(\d{2})(\d{5})(\d{4})$/);

            return {
                masked: match ? `(${match[1]}) ${match[2]}-${match[3]}` : cleaned,
                raw: cleaned,
                error: value?.replace(/\D/g, '').length <= 10,
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
        mask: (value: string) => {
            const cleaned = value?.match(/[\d/]/g)?.join('')?.replaceAll(',', '.') ?? '';

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
                    cleaned?.length < 10 ||
                    cleaned[2] !== '/' ||
                    cleaned[5] !== '/' ||
                    conditionToError,
                message: 'Insira uma data válida (dd/mm/aaaa)',
                raw: cleaned,
                masked: cleaned,
            };
        },
    },
    {
        id: 'userEthnicity',
        title: 'Qual a sua etnia?',
        placeholder: 'Digite a sua etnia',
        buttonText: 'Continuar',
        keyboardType: 'default',
        mask: (value: string) => {
            return {
                error: value?.length <= 2,
                message: 'Campo inválido',
                raw: value,
                masked: value,
            };
        },
    },
    {
        id: 'gender',
        title: 'Qual o seu sexo?',
        placeholder: 'Masculino, Feminino',
        buttonText: 'Continuar',
        keyboardType: 'default',
        mask: (value: string) => {
            return {
                error:
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
        mask: (value: string) => {
            return {
                error: value?.length <= 3,
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
        mask: (value: string) => {
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
        mask: (value: string) => {
            const cleaned = value?.replace(/\D/g, '');
            const match = cleaned?.match(/^(\d{5})(\d{3})$/);

            return {
                error: value?.replace(/\D/g, '').length < 8,
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
        mask: (value: string) => {
            return {
                error: value?.length < 2,
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
        mask: (value: string) => {
            return {
                error: value?.length < 2,
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
        mask: (value: string) => {
            const cleaned = value?.match(/[\d/]/g)?.join('')?.replaceAll(',', '.') ?? '';

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
                    cleaned?.length < 10 ||
                    cleaned[2] !== '/' ||
                    cleaned[5] !== '/' ||
                    conditionToError,
                message: 'Insira uma data válida (dd/mm/aaaa)',
                raw: cleaned,
                masked: cleaned,
            };
        },
    },
    {
        id: 'email',
        title: 'Qual é o seu email?',
        placeholder: 'exemplo@email.com',
        buttonText: 'Continuar',
        keyboardType: 'email-address',
        mask: (value: string) => {
            return {
                error: !value?.includes('@') || !value?.includes('.'),
                message: 'Insira um e-mail válido',
                raw: value,
                masked: value,
            };
        },
    },
    {
        id: 'userCpf',
        title: 'Qual o número do seu CPF?',
        placeholder: 'Digite seu CPF sem pontos ou traços',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 14,
        mask: (value: string) => {
            const cleaned = value?.replace(/\D/g, '');
            const match = cleaned?.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

            return {
                masked: match ? `${match[1]}.${match[2]}.${match[3]}-${match[4]}` : cleaned,
                raw: cleaned,
                error: value?.replace(/\D/g, '').length < 11 || /^(\d)\1+$/.test(value),
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
        mask: (value: string) => {
            const cleaned =
                value!
                    .match(/[\d,.]/g)
                    ?.join('')
                    ?.replaceAll(',', '.') ?? '';

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 2,
                message: 'Insira um peso válido',
            };
        },
    },
    {
        id: 'userHeight',
        title: 'Qual sua altura?',
        placeholder: '000',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value: string) => {
            const cleaned = value?.replace(/\D/g, '');

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 2,
                message: 'Insira uma altura válida (em cm. Ex: 185)',
            };
        },
    },
    {
        id: 'userAge',
        title: 'Qual sua idade?',
        placeholder: '00',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 2,
        mask: (value: string) => {
            const cleaned = value?.replace(/\D/g, '');

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 1,
                message: 'Insira uma idade válida',
            };
        },
    },
    {
        id: 'userWaist',
        title: 'Qual é a medida da sua cintura?',
        placeholder: '000',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value: string) => {
            const cleaned =
                value!
                    .match(/[\d,.]/g)
                    ?.join('')
                    ?.replaceAll(',', '.') ?? '';

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 1,
                message: 'Insira uma medida válida',
            };
        },
    },
    {
        id: 'userBelly',
        title: 'Qual a medida da barriga?',
        placeholder: '000',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value: string) => {
            const cleaned =
                value!
                    .match(/[\d,.]/g)
                    ?.join('')
                    ?.replaceAll(',', '.') ?? '';

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 1,
                message: 'Insira uma medida válida',
            };
        },
    },
    {
        id: 'userChest',
        title: 'Qual a medida do tórax?',
        placeholder: '000',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value: string) => {
            const cleaned =
                value!
                    .match(/[\d,.]/g)
                    ?.join('')
                    ?.replaceAll(',', '.') ?? '';

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 1,
                message: 'Insira uma medida válida',
            };
        },
    },
    {
        id: 'userFatPercentage',
        title: 'Qual a porcentagem de gordura corporal?',
        placeholder: '000,00',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value: string) => {
            const cleaned =
                value!
                    .match(/[\d,.]/g)
                    ?.join('')
                    ?.replaceAll(',', '.') ?? '';

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 1,
                message: 'Insira uma medida válida',
            };
        },
    },
    {
        id: 'userMusclePercentage',
        title: 'Qual é a porcentagem de músculos?',
        placeholder: '000,00',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value: string) => {
            const cleaned =
                value!
                    .match(/[\d,.]/g)
                    ?.join('')
                    ?.replaceAll(',', '.') ?? '';

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 1,
                message: 'Insira um valor válido',
            };
        },
    },
    {
        id: 'userVisceralFatPercentage',
        title: 'Qual a porcentagem de gordura visceral?',
        placeholder: '000,00',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 6,
        mask: (value: string) => {
            const cleaned =
                value!
                    .match(/[\d,.]/g)
                    ?.join('')
                    ?.replaceAll(',', '.') ?? '';

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 1,
                message: 'Insira um valor válido',
            };
        },
    },
    {
        id: 'userRM',
        title: 'Qual é o RM?',
        placeholder: 'RM',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value: string) => {
            const cleaned =
                value!
                    .match(/[\d,.]/g)
                    ?.join('')
                    ?.replaceAll(',', '.') ?? '';

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 1,
                message: 'Insira um valor válido',
            };
        },
    },
    {
        id: 'userBodyAge',
        title: 'Qual é a idade do corpo atualmente?',
        placeholder: 'Digite a porcentagem',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 2,
        mask: (value: string) => {
            const cleaned =
                value!
                    .match(/[\d,.]/g)
                    ?.join('')
                    ?.replaceAll(',', '.') ?? '';

            return {
                raw: cleaned,
                masked: cleaned,
                error: value?.length < 1,
                message: 'Insira uma idade válido',
            };
        },
    },
];
