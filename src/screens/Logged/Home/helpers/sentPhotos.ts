import { api } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Headers {
    [key: string]: any;
}

export async function sentPhotos({ headers }: Headers): Promise<void> {
    const value = (await AsyncStorage.getItem(
        '@CrossLifeApp/evolution-photos-sent'
    )) as unknown as string;

    if (value === 'false') {
        const photosData = (await AsyncStorage.getItem(
            '@CrossLifeApp/evolution-photos'
        )) as unknown as string;

        try {
            await api.post('/evolution-photos', JSON.parse(photosData), {
                headers,
            });
            await AsyncStorage.setItem('@CrossLifeApp/evolution-photos-sent', 'true');
            console.log('Fotos enviadas com sucesso');
            return;
        } catch (error) {
            console.log('Fotos não enviadas', error);
        }
    }
    console.log('Fotos já enviadas');
    return;
}
