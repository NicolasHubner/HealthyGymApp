import { TumbleType } from './pickImage';

interface TextTitle {
    type: TumbleType;
}
interface TextTitleReturn {
    title: string;
    subtitle: string;
}

export const textTitle = ({ type }: TextTitle): TextTitleReturn => {
    switch (type) {
        case TumbleType.perfil:
            return {
                title: 'Primeiro vamos tirar uma foto de perfil.',
                subtitle: 'Vire para o mesmo lado que o exemplo abaixo:',
            };
        case TumbleType.frent:
            return {
                title: 'Agora, vamos tirar uma foto sua de frente.',
                subtitle: 'Fique de frente assim como no exemplo abaixo:',
            };
        case TumbleType.background:
            return {
                title: 'Por último, vamos triar uma foto sua de costas',
                subtitle: 'Fique de costas assim como no exemplo abaixo:',
            };
        default:
            return {
                title: 'Pronto! Tiramos todas as fotos para sua evolução',
                subtitle: 'Quer conferir mais uma vez antes de finalizar?',
            };
    }
};
