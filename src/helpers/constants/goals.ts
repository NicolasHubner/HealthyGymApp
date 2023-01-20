import cardioModeradoImg from '@/assets/cardio_moderado.png';
import cardioAvancadoImg from '@/assets/cardio_avancado.png';
import forcaMusculoImg from '@/assets/forca_musculo.png';

export const userGoalOptions = [
  {
    id: 'voltar-a-forma',
    title: 'Voltar à forma',
    subtitle: 'Cárdio moderado • 7 min',
    intensity: 2,
    image: cardioModeradoImg,
  },
  {
    id: 'defina-o-corpo',
    title: 'Defina o corpo',
    subtitle: 'Cárdio avançado • 7 min',
    intensity: 2,
    image: cardioAvancadoImg,
  },
  {
    id: 'aumente-a-massa',
    title: 'Aumente a massa',
    subtitle: 'Força e músculo • 7 min',
    intensity: 3,
    image: forcaMusculoImg,
  },
];
