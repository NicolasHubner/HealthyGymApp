import { TumbleType } from './pickImage';

export const showImage = (type: TumbleType) => {
    switch (type) {
        case TumbleType.frent: {
            return require('@/assets/PhotoPicks/front-woman.png');
        }
        case TumbleType.background: {
            return require('@/assets/PhotoPicks/back-woman.png');
        }
        case TumbleType.perfil: {
            return require('@/assets/PhotoPicks/body-woman.png');
        }
        case TumbleType.final: {
            return;
        }
    }
};
