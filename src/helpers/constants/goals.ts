import cardioModeradoImg from '@/assets/cardio_moderado.png';
import cardioAvancadoImg from '@/assets/cardio_avancado.png';
import forcaMusculoImg from '@/assets/forca_musculo.png';

export interface UserGoal {
    id: string;
    title: string;
    subtitle: string;
    intensity: number;
    image: string;
}

export const DEFAULT_CALORIES_PER_TRAIN = 400;

export const userGoalOptions: UserGoal[] = [
    {
        id: 'moderate-cardio',
        title: 'Voltar à forma',
        subtitle: 'Cárdio moderado • 7 min',
        intensity: 2,
        image: cardioModeradoImg,
    },
    {
        id: 'advanced-cardio',
        title: 'Defina o corpo',
        subtitle: 'Cárdio avançado • 7 min',
        intensity: 2,
        image: cardioAvancadoImg,
    },
    {
        id: 'strength-muscle',
        title: 'Aumente a massa',
        subtitle: 'Força e músculo • 7 min',
        intensity: 3,
        image: forcaMusculoImg,
    },
];
