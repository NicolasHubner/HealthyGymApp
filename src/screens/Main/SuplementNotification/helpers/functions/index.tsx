import { Linking } from 'react-native';

export const sendWppCoach = async (phone: string, message: string) => {
    const suported = await Linking.canOpenURL(`https://wa.me/55${phone}?text=${message}`);

    if (suported) {
        await Linking.openURL(`https://wa.me/55${phone}?text=${message}`);
    } else {
        console.error('Não foi possível abrir o link');
    }
};
