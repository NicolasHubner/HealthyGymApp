import { api } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Headers {
    [key: string]: any;
}

export async function sentPhotos({ headers }: Headers): Promise<void> {
    const value = (await AsyncStorage.getItem('@CrossLifeApp/evolution-photos-sent')) as string;

    if (value === 'false') {
        const photosData = await AsyncStorage.getItem('@CrossLifeApp/evolution-photos');

        try {
            if (!photosData)
                throw new Error('Ocorreu um erro ao tentar enviar as photos de evolução');

            await api.post('/evolution-photos', JSON.parse(photosData), {
                headers,
            });

            await AsyncStorage.setItem('@CrossLifeApp/evolution-photos-sent', 'true');
        } catch (error) {
            console.error('Ocorreu um erro ao tentar enviar as photos de evolução', error);
        }
    }
    return;
}
