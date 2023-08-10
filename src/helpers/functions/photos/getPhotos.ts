import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const getPhotoCameraRoll = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Você precisa permitir acesso à câmera do celular para continuar');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.1,
    });

    if (!result.canceled) {
        return result.assets[0].uri as string;
    }
};

export const pickImageUserProfile = async () => {
    try {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            throw new Error('Você precisa permitir acesso à câmera do celular para continuar');
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.1,
            presentationStyle: ImagePicker.UIImagePickerPresentationStyle.AUTOMATIC,
        });

        if (!result.canceled) {
            return result.assets[0].uri as string;
        }
    } catch (err) {
        console.error('Ocorreu um erro ao obter acesso à câmera');
    }
};
