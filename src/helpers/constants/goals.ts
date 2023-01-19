import cardioModeradoImg from '@/assets/cardio_moderado.png';
import cardioAvancadoImg from '@/assets/cardio_avancado.png';
import forcaMusculoImg from '@/assets/forca_musculo.png';

export const userGoalOptions = [
  {
    id: 'cardio-moderado',
    title: 'Cárdio moderado',
    subtitle: 'Voltar a forma • 7 min',
    intensity: 2,
    image: cardioModeradoImg,
  },
  {
    id: 'cardio-avancado',
    title: 'Cárdio avançado',
    subtitle: 'Defina o corpo • 7 min',
    intensity: 2,
    image: cardioAvancadoImg,
  },
  {
    id: 'forca-musculo',
    title: 'Força e músculo',
    subtitle: 'Aumente a massa • 7 min',
    intensity: 3,
    image: forcaMusculoImg,
  },
];
