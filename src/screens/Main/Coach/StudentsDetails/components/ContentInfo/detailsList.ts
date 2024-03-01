import ListIcon from '@/assets/svg/coach/students/list.svg';
import ClothIcon from '@/assets/svg/coach/students/cloth.svg';
import DoubleArrowIcon from '@/assets/svg/coach/students/double-arrow-top-bottom.svg';
import HandStopIcon from '@/assets/svg/coach/students/hand-stop.svg';
import BottleIcon from '@/assets/svg/coach/students/bottle.svg';
import DollarIcon from '@/assets/svg/coach/students/dollar.svg';

import { generateRandomUuid } from '@/helpers/functions/generateUuid';

export const detailsList = [
    {
        id: generateRandomUuid(),
        title: 'Matricula',
        value: '250416',
        Icon: ListIcon,
    },
    {
        id: generateRandomUuid(),
        title: 'Peso',
        value: '72 Kg',
        Icon: ClothIcon,
    },
    {
        id: generateRandomUuid(),
        title: 'Altura',
        value: '1,72',
        Icon: DoubleArrowIcon,
    },
    {
        id: generateRandomUuid(),
        title: 'Engajamento',
        value: 'Médio',
        Icon: HandStopIcon,
    },
    {
        id: generateRandomUuid(),
        title: 'Suplementa',
        value: 'Sim',
        Icon: BottleIcon,
    },
    {
        id: generateRandomUuid(),
        title: 'Mensalidade',
        value: 'Em atraso',
        Icon: DollarIcon,
    },
];
