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

import { FineShapeScreen } from '@/types/fineshape/FineShape';

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
};

export const FineShapeScreens: FineShapeScreen[] = [
    {
        id: 'name',
        title: 'Qual o seu nome?',
        placeholder: 'Digite seu nome',
        buttonText: 'Continuar',
        keyboardType: 'default',
    },
    {
        id: 'phone',
        title: 'Qual o telefone?',
        placeholder: 'Digite apenas os números',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 15,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

            if (match) {
                return `(${match[1]}) ${match[2]}-${match[3]}`;
            }

            return value;
        },
    },
    {
        id: 'birthdate',
        title: 'Qual a data de hoje?',
        placeholder: 'DD/MM/AAAA',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 10,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);

            if (match) {
                return `${match[1]}/${match[2]}/${match[3]}`;
            }

            return value;
        },
    },
    {
        id: 'userAddress',
        title: 'Qual o seu endereço?',
        placeholder: 'Rua, número, bairro, cidade, estado',
        buttonText: 'Continuar',
        keyboardType: 'default',
    },
    {
        id: 'userAddressComplement',
        title: 'Tem complemento?',
        placeholder: 'Apto 01, bloco C, etc',
        buttonText: 'Continuar',
        keyboardType: 'default',
    },
    {
        id: 'userCep',
        title: 'Qual seu CEP?',
        placeholder: 'Digite seu CEP',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 9,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            const match = cleaned.match(/^(\d{5})(\d{3})$/);

            if (match) {
                return `${match[1]}-${match[2]}}`;
            }

            return value;
        },
    },
    {
        id: 'birthdate',
        title: 'Qual a sua data de nascimento?',
        placeholder: 'DD/MM/AAAA',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);

            if (match) {
                return `${match[1]}/${match[2]}/${match[3]}`;
            }

            return value;
        },
    },
    {
        id: 'email',
        title: 'Qual é o seu email?',
        placeholder: 'Digite seu email',
        buttonText: 'Continuar',
        keyboardType: 'email-address',
    },
    {
        id: 'userCpf',
        title: 'Qual o número do seu CPF?',
        placeholder: 'Digite seu CPF sem pontos ou traços',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 14,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

            if (match) {
                return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
            }

            return value;
        },
    },
    {
        id: 'userWeight',
        title: 'Qual seu peso?',
        placeholder: 'Digite seu peso em kg',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 5,
    },
    {
        id: 'userHeight',
        title: 'Qual sua altura?',
        placeholder: 'Digite sua altura em cm',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            return cleaned;
        },
    },
    {
        id: 'userAge',
        title: 'Qual sua idade?',
        placeholder: 'Digite sua idade em anos',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
    },
    {
        id: 'userWaist',
        title: 'Qual é a medida da sua cintura?',
        placeholder: 'Digite a medida em cm',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            return cleaned;
        },
    },
    {
        id: 'userBelly',
        title: 'Qual a medida da barriga?',
        placeholder: 'Digite a medida em cm',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            return cleaned;
        },
    },
    {
        id: 'userChest',
        title: 'Qual a medida do tórax?',
        placeholder: 'Digite a medida em cm',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            return cleaned;
        },
    },
    {
        id: 'userFatPercentage',
        title: 'Qual a porcentagem de gordura corporal?',
        placeholder: 'Digite a porcentagem',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            return cleaned;
        },
    },
    {
        id: 'userMusclePercentage',
        title: 'Qual é a porcentagem de músculos?',
        placeholder: 'Digite a porcentagem',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            return cleaned;
        },
    },
    {
        id: 'userVisceralFatPercentage',
        title: 'Qual a porcentagem de gordura visceral?',
        placeholder: 'Digite a porcentagem',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            return cleaned;
        },
    },
    {
        id: 'userRM',
        title: 'Qual é o RM?',
        placeholder: 'Digite o valor do RM',
        buttonText: 'Continuar',
        keyboardType: 'numeric',
        maxLength: 3,
        mask: (value: string) => {
            const cleaned = value.replace(/\D/g, '');
            return cleaned;
        },
    },
];
