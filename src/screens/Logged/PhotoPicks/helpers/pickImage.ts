import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { PickImageProps } from '..';

export enum TumbleType {
    'perfil',
    'background',
    'frent',
    'final',
}

// FUNCTION THAT PICKS THE IMAGE FROM THE CAMERA

export const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this appp to access your camera!");
        return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result

    if (!result.canceled) {
        return result.assets[0].uri as string;
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
