import * as ImagePicker from 'expo-image-picker';
import { PickImageProps } from '..';

export enum TumbleType {
    'perfil',
    'background',
    'frent',
    'final',
}

// FUNCTION THAT PICKS THE IMAGE FROM THE CAMERA

export const pickImage = async () => {
    try {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            throw new Error('Você precisa permitir acesso à câmera do celular para continuar');
        }
        const result = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
            // console.log(result);
            return result.assets[0].uri as string;
        }
    } catch (err) {
        console.error('Ocorreu um erro ao obter acesso à câmera');
    }
};

// FUNCTION THAT SETS THE IMAGE FROM THE CAMERA ON THE STATE

interface setImageFromCameraProps {
    image: string;
    type: TumbleType;
    setPicked: React.Dispatch<React.SetStateAction<PickImageProps>>;
}

export const setImageFromCamera = ({ image, type, setPicked }: setImageFromCameraProps) => {
    switch (type) {
        case TumbleType.perfil:
            setPicked((prevState: PickImageProps) => ({
                ...prevState,
                perfil: image,
            }));
            break;
        case TumbleType.background:
            setPicked((prevState: PickImageProps) => ({
                ...prevState,
                costas: image,
            }));
            break;
        case TumbleType.frent:
            setPicked((prevState: PickImageProps) => ({
                ...prevState,
                frente: image,
            }));
            break;
    }
};